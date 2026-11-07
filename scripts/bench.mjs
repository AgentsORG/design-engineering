#!/usr/bin/env node
// bench.mjs — local ablation benchmark for the design-engineering skill, driven by Claude Code.
//
// Arms (same model, same prompt, same tools; only the plugin copy differs):
//   none            no design-engineering anywhere (isolation verified from the init line)
//   full            an isolated copy of the plugin (skill + agents) via --plugin-dir
//   minus-<cluster> the copy with skills/design-engineering/references/<cluster>/ removed
//                   (minus-agents removes agents/). Clusters are discovered from disk.
//
//   node scripts/bench.mjs --arms none,full --fixtures 2 --tries 1 --model sonnet --concurrency 2
//   node scripts/bench.mjs --arms all --tries 3 --relevant-only --concurrency 4
//   node scripts/bench.mjs --report-only --out evals/results/2026-11-07-sonnet-ablation
//
// Flags: --arms <list|all>  --fixtures <N|id,id>  --tries <N> (3)  --model <m> (sonnet)
//   --concurrency <N> (2)  --relevant-only  --max-turns <N> (12)  --timeout <s> (600)
//   --max-cost-usd <usd>  --out <dir>  --report-only  --dry-run  --no-nudge  --seed <n>
//
// Every run is a fresh `claude -p` in an empty temp workspace with --setting-sources project,
// --strict-mcp-config and a Read/Glob/Grep/Skill tool set, so user-installed skills, agents,
// plugins and MCP servers do not leak in. Each run's stream-json init line is checked: the
// none arm must list no design-engineering skill/agent/plugin; plugin arms must list exactly
// our copy. A run that fails the check is excluded from scoring and shown in the report.
// Runs are saved under <out>/runs/<arm>/<fixture>.t<k>.json, so a stopped sweep resumes.
// Scoring: run-bench's must_match / must_not_match rules (evals/run-bench.mjs), plus the
// deterministic checks of skills/design-engineering/scripts/grade.mjs when that file exists.

import { spawn } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadFixtures, scoreFixture } from "../evals/run-bench.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillDir = join(root, "skills/design-engineering");
const gradeScript = join(skillDir, "scripts/grade.mjs");

// ---------- args ----------
const argv = process.argv.slice(2);
const opt = (name, dflt) => { const i = argv.indexOf(`--${name}`); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : dflt; };
const flag = (name) => argv.includes(`--${name}`);
const MODEL = opt("model", "sonnet");
const TRIES = +opt("tries", 3);
if (!Number.isInteger(TRIES) || TRIES < 1) { console.error("--tries must be a positive integer"); process.exit(1); }
const CONC = Math.max(1, +opt("concurrency", 2));
const MAX_TURNS = +opt("max-turns", 12);
const TIMEOUT_S = +opt("timeout", 600);
const MAX_COST = opt("max-cost-usd", null) ? +opt("max-cost-usd") : Infinity;
const RELEVANT_ONLY = flag("relevant-only");
const NUDGE = !flag("no-nudge");
const today = new Date().toISOString().slice(0, 10);
const OUT = resolve(opt("out", join(root, "evals/results", `${today}-${MODEL.replace(/[^\w.-]/g, "_")}-ablation`)));
let seed = +opt("seed", 7);

// ---------- clusters + fixtures ----------
const refDir = join(skillDir, "references");
// commands/ holds the verb files the router dispatches to; ablating it tests dispatch, not knowledge.
export const CLUSTERS = [...readdirSync(refDir, { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== "commands").map((d) => d.name).sort(), "agents"];

// Cluster tags for fixtures written before the `clusters` field existed. New fixtures carry their own.
const LEGACY_CLUSTERS = {
  "gen-modal-01": ["motion", "components"], "gen-form-01": ["components", "layout"], "gen-toolbar-01": ["components", "motion"],
  "gen-send-sound-01": ["sound"], "edit-hover-01": ["motion", "surface"], "edit-dropdown-01": ["motion", "components"],
  "repair-input-01": ["components"], "repair-darkmode-01": ["surface"], "repair-spinner-01": ["motion"], "repair-focus-01": ["components"],
  "repair-launch-seam-01": ["launch-video"], "gen-launch-zoom-01": ["launch-video"], "repair-launch-zseam-01": ["launch-video"],
  "edit-launch-typing-01": ["launch-video"], "gen-launch-sfx-01": ["launch-video", "sound"], "gen-launch-drop-01": ["launch-video", "sound"],
};
const clustersOf = (f) => { const c = new Set(f.clusters || LEGACY_CLUSTERS[f.id] || []); if ((f.checklist_rows || []).length) c.add("meta"); return [...c]; };

let fixtures = loadFixtures().filter((f) => f.task !== "arena");
const fx = opt("fixtures", null);
if (fx) fixtures = /^\d+$/.test(fx) ? fixtures.slice(0, +fx) : fixtures.filter((f) => fx.split(",").includes(f.id));

let arms = opt("arms", "none,full").split(",").map((s) => s.trim()).filter(Boolean);
if (arms.includes("all")) arms = ["none", "full", ...CLUSTERS.map((c) => `minus-${c}`)];
for (const a of arms) if (!/^(none|full)$/.test(a) && !(a.startsWith("minus-") && CLUSTERS.includes(a.slice(6)))) { console.error(`unknown arm ${a}; clusters: ${CLUSTERS.join(", ")}`); process.exit(1); }
const armFixtures = (arm) => (arm.startsWith("minus-") && RELEVANT_ONLY ? fixtures.filter((f) => clustersOf(f).includes(arm.slice(6))) : fixtures);

// ---------- prompt ----------
function promptFor(f) {
  const head = f.prompt || f.instruction || f.issue;
  const body = f.input ? `\n\n\`\`\`\n${f.input}\n\`\`\`` : "";
  const tail = "\n\nAnswer in one reply. Put every piece of code you ship in fenced code blocks. The workspace is empty: do not look for project files and do not ask questions." + (NUDGE ? " If a skill applies, use it." : "");
  return head + body + tail;
}

// ---------- isolated plugin copies ----------
let work = null; // created on first real run, so --dry-run and --report-only leave nothing behind
const workDir = () => (work ||= mkdtempSync(join(tmpdir(), "de-bench-")));
function pluginCopy(arm) {
  if (arm === "none") return null;
  workDir();
  const dir = join(work, "plugins", arm);
  if (existsSync(dir)) return dir;
  mkdirSync(join(dir, ".claude-plugin"), { recursive: true });
  writeFileSync(join(dir, ".claude-plugin/plugin.json"), JSON.stringify({ name: "design-engineering", version: `0.0.0-bench-${arm}` }) + "\n");
  cpSync(skillDir, join(dir, "skills/design-engineering"), { recursive: true });
  if (arm !== "minus-agents") cpSync(join(root, "agents"), join(dir, "agents"), { recursive: true });
  if (arm.startsWith("minus-") && arm !== "minus-agents") rmSync(join(dir, "skills/design-engineering/references", arm.slice(6)), { recursive: true, force: true });
  return dir;
}

// ---------- isolation check from the stream-json init line ----------
const DE_NAMES = /design-engineering|ui-reviewer|motion-auditor|anti-pattern-scanner|agentation-fix-loop|design-md-consumer|pov-curator|sound-designer|svg-creator|svg-animator|launch-film-analyst|design-council|design-judge|design-grader/;
function checkIsolation(init, arm, pdir) {
  if (!init) return { ok: false, reason: "no init line" };
  const names = [...(init.skills || []), ...(init.agents || []), ...(init.slash_commands || [])];
  const dePlugins = (init.plugins || []).filter((p) => DE_NAMES.test(p.name) || DE_NAMES.test(p.source || ""));
  const deNames = names.filter((n) => DE_NAMES.test(n));
  const ev = { plugins: dePlugins.map((p) => p.source), de_skills: (init.skills || []).filter((n) => DE_NAMES.test(n)), de_agents: (init.agents || []).filter((n) => DE_NAMES.test(n)).length, mcp_servers: (init.mcp_servers || []).length, plugin_errors: init.plugin_errors || [] };
  if (arm === "none") return { ok: dePlugins.length === 0 && deNames.length === 0, reason: dePlugins.length || deNames.length ? `leak: ${[...dePlugins.map((p) => p.source), ...deNames].join(", ")}` : "clean", ...ev };
  const ours = dePlugins.filter((p) => p.source === "design-engineering@inline" && resolve(p.path) === resolve(pdir));
  const foreign = deNames.filter((n) => !n.startsWith("design-engineering:"));
  const ok = ours.length === 1 && dePlugins.length === 1 && foreign.length === 0 && ev.de_skills.includes("design-engineering:design-engineering");
  return { ok, reason: ok ? "only the bench copy" : `plugins=${dePlugins.map((p) => p.source).join("|")} foreign=${foreign.join("|")}`, ...ev };
}

// ---------- one run ----------
const q = (s) => (process.platform === "win32" ? `"${String(s).replace(/"/g, '\\"')}"` : s);
function runClaude(prompt, pdir) {
  const ws = mkdtempSync(join(workDir(), "ws-"));
  const args = ["-p", "--output-format", "stream-json", "--verbose", "--model", MODEL, "--max-turns", String(MAX_TURNS),
    "--setting-sources", "project", "--strict-mcp-config", "--no-session-persistence",
    "--tools", "Read,Glob,Grep,Skill", "--allowedTools", "Read,Glob,Grep,Skill"];
  if (pdir) args.push("--plugin-dir", pdir);
  return new Promise((done) => {
    const env = { ...process.env, ENABLE_CLAUDEAI_MCP_SERVERS: "false" };
    const win = process.platform === "win32";
    // Windows: `claude` is a .cmd shim, so it needs a shell; pass one pre-quoted command string.
    const child = win ? spawn(["claude", ...args.map(q)].join(" "), { cwd: ws, env, shell: true, windowsHide: true }) : spawn("claude", args, { cwd: ws, env, windowsHide: true });
    let out = "", err = "";
    // On Windows child is cmd.exe; kill the whole tree or claude keeps running and the pipes never close.
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; if (win) spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], { windowsHide: true }); else child.kill(); }, TIMEOUT_S * 1000);
    child.on("error", (e) => { err += String(e.message || e); });
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("close", (code) => { clearTimeout(timer); rmSync(ws, { recursive: true, force: true }); done({ code, out, err: timedOut ? `timeout after ${TIMEOUT_S}s` : err }); });
    child.stdin.end(prompt);
  });
}

function parseStream(out, pdir) {
  const lines = out.split("\n").filter((l) => l.trim().startsWith("{")).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const init = lines.find((l) => l.type === "system" && l.subtype === "init");
  const result = [...lines].reverse().find((l) => l.type === "result");
  const tools = [];
  for (const l of lines) if (l.type === "assistant") for (const c of l.message?.content || []) if (c.type === "tool_use") tools.push({ name: c.name, input: c.input });
  const skillFired = tools.some((t) => t.name === "Skill" && /design-engineering/.test(JSON.stringify(t.input)));
  const norm = (x) => (process.platform === "win32" ? resolve(x).toLowerCase() : resolve(x));
  const reads = pdir ? tools.filter((t) => t.name === "Read" && t.input?.file_path && norm(t.input.file_path).startsWith(norm(pdir) + sep)).map((t) => relative(pdir, resolve(t.input.file_path)).split(sep).join("/")) : [];
  return { init, result, tools, skillFired, reads };
}

// grade.mjs deterministic checks (checkSources) over the fenced blocks the answer shipped.
// Findings only count mistakes; they never raise a score (references/meta/grading-rubric.md).
let grader;
async function gradeChecks(answer, f) {
  if (grader === undefined) grader = existsSync(gradeScript) ? await import(pathToFileURL(gradeScript).href).catch(() => null) : null;
  if (!grader?.checkSources) return null;
  const EXT = { css: "css", scss: "css", html: "html", svg: "svg", jsx: "jsx", tsx: "tsx", js: "js", ts: "ts", vue: "vue" };
  const sources = [...answer.matchAll(/```(\w*)[^\n]*\n([\s\S]*?)```/g)]
    .filter((m) => !(f.input && m[2].trim() === f.input.trim()))
    .map((m, i) => ({ path: `answer-${i + 1}.${EXT[m[1].toLowerCase()] || "tsx"}`, text: m[2] }));
  if (!sources.length) return { findings: 0, blockers: 0, shoulds: 0, rules: [] };
  try {
    const found = grader.checkSources(sources);
    return { findings: found.length, blockers: found.filter((x) => x.severity === "blocker").length, shoulds: found.filter((x) => x.severity === "should").length, rules: [...new Set(found.map((x) => x.rule))] };
  } catch (e) { return { error: String(e.message || e).slice(0, 200) }; }
}

async function runOne(job) {
  const { arm, f, t, file } = job;
  const pdir = pluginCopy(arm);
  const started = Date.now();
  const { code, out, err } = await runClaude(promptFor(f), pdir);
  const p = parseStream(out, pdir);
  const iso = checkIsolation(p.init, arm, pdir);
  const answer = p.result?.result || "";
  const rec = {
    arm, fixture: f.id, try: t, model: MODEL, exit: code, ms: Date.now() - started,
    error: !p.result || p.result.is_error ? (p.result?.subtype || err.slice(-400) || `exit ${code}`) : null,
    isolation: iso, skill_fired: p.skillFired, reads: p.reads, tool_calls: p.tools.length,
    cost_usd: p.result?.total_cost_usd ?? 0, usage: p.result?.usage ? { input: p.result.usage.input_tokens || 0, cache_read: p.result.usage.cache_read_input_tokens || 0, cache_write: p.result.usage.cache_creation_input_tokens || 0, output: p.result.usage.output_tokens || 0 } : null,
    num_turns: p.result?.num_turns, init_line: p.init ? { session_id: p.init.session_id, claude_code_version: p.init.claude_code_version, plugins: p.init.plugins, skills: p.init.skills, agents: p.init.agents, mcp_servers: p.init.mcp_servers } : null,
    score: answer ? scoreFixture(f, answer) : null, grade: answer ? await gradeChecks(answer, f) : null, answer,
  };
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(rec, null, 2) + "\n");
  return rec;
}

// ---------- stats ----------
function rng() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }
const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
const sd = (a) => { const m = mean(a); return a.length > 1 ? Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)) : 0; };
// Paired two-level bootstrap: resample fixtures, then tries within each fixture, per arm.
function compare(byFix, a, b, B = 2000) {
  const ids = Object.keys(byFix).filter((id) => byFix[id][a]?.length && byFix[id][b]?.length);
  if (!ids.length) return null;
  const point = mean(ids.map((id) => mean(byFix[id][a]) - mean(byFix[id][b])));
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const boots = [];
  for (let i = 0; i < B; i++) {
    const s = ids.map(() => pick(ids)).map((id) => { const ra = byFix[id][a], rb = byFix[id][b]; return mean(ra.map(() => pick(ra))) - mean(rb.map(() => pick(rb))); });
    boots.push(mean(s));
  }
  boots.sort((x, y) => x - y);
  const se = sd(boots);
  const minTries = Math.min(...ids.flatMap((id) => [byFix[id][a].length, byFix[id][b].length]));
  return { fixtures: ids.length, delta: point, lo: boots[Math.floor(0.025 * B)], hi: boots[Math.floor(0.975 * B)], se, mdd: 2.8 * se, enough: ids.length >= 2 && minTries >= 2 };
}
const verdictFor = (c) => {
  if (!c) return "not run";
  if (!c.enough) return "insufficient data";
  if (c.delta >= c.mdd && c.lo > 0) return "keep";
  if (c.delta <= -c.mdd && c.hi < 0) return "retire";
  return "slim";
};

function report(recs) {
  const triesSeen = Math.max(0, ...recs.map((r) => r.try || 0)); // from the runs on disk, not the --tries flag (matters for --report-only)
  const valid = recs.filter((r) => !r.error && r.isolation?.ok && r.score);
  const armsSeen = [...new Set(recs.map((r) => r.arm))];
  const byFix = {};
  for (const r of valid) ((byFix[r.fixture] ||= {})[r.arm] ||= []).push(r.score.score);
  const armStats = Object.fromEntries(armsSeen.map((a) => {
    const rs = recs.filter((r) => r.arm === a), vs = valid.filter((r) => r.arm === a);
    const withinSd = mean(Object.values(byFix).map((m) => m[a]).filter((x) => x && x.length > 1).map(sd));
    return [a, { runs: rs.length, valid: vs.length, isolation_failed: rs.filter((r) => !r.isolation?.ok).length, errors: rs.filter((r) => r.error).length,
      score: mean(Object.values(byFix).map((m) => m[a]).filter(Boolean).map(mean)), within_fixture_sd: Number.isNaN(withinSd) ? null : withinSd,
      skill_fired: vs.length ? vs.filter((r) => r.skill_fired).length / vs.length : null, cost_usd: rs.reduce((s, r) => s + (r.cost_usd || 0), 0),
      tokens_in: rs.reduce((s, r) => s + (r.usage ? r.usage.input + r.usage.cache_read + r.usage.cache_write : 0), 0), tokens_out: rs.reduce((s, r) => s + (r.usage?.output || 0), 0),
      mean_ms: mean(rs.map((r) => r.ms)), grade_findings: mean(vs.filter((r) => r.grade && !r.grade.error).map((r) => r.grade.findings)) }];
  }));
  const comparisons = {};
  if (armsSeen.includes("full") && armsSeen.includes("none")) comparisons["full-vs-none"] = compare(byFix, "full", "none");
  const verdicts = {};
  for (const a of armsSeen.filter((x) => x.startsWith("minus-"))) { const c = compare(byFix, "full", a); comparisons[`full-vs-${a}`] = c; verdicts[a.slice(6)] = { verdict: verdictFor(c), ...c }; }
  const f3 = (x) => (x == null || Number.isNaN(x) ? "—" : x.toFixed(3));
  const pct = (x) => (x == null || Number.isNaN(x) ? "—" : `${Math.round(100 * x)}%`);
  const label = (c) => (!c ? "—" : !c.enough ? "too few runs for a noise floor" : Math.abs(c.delta) < c.mdd ? "noise" : c.delta > 0 ? "real gain" : "real loss");
  let md = `# Ablation bench · ${MODEL} · ${today}\n\n`;
  md += `Generated by \`scripts/bench.mjs\`. Fixtures: \`skills/design-engineering/evals/design-bench.jsonl\` (${new Set(recs.map((r) => r.fixture)).size} run). Tries per fixture: ${triesSeen}. Score = share of the fixture's must_match / must_not_match rules passed (\`evals/run-bench.mjs\`), averaged per fixture, then across fixtures.${RELEVANT_ONLY ? " Minus-cluster arms ran only fixtures tagged with that cluster." : ""}\n\n`;
  md += `## Arms\n\n| arm | runs | valid | isolation failed | errors | score | try-to-try SD | skill fired | grade.mjs findings per answer | cost (USD) | tokens in / out | mean time (s) |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
  for (const [a, s] of Object.entries(armStats)) md += `| ${a} | ${s.runs} | ${s.valid} | ${s.isolation_failed} | ${s.errors} | ${f3(s.score)} | ${f3(s.within_fixture_sd)} | ${pct(s.skill_fired)} | ${s.grade_findings == null || Number.isNaN(s.grade_findings) ? "—" : s.grade_findings.toFixed(2)} | ${s.cost_usd.toFixed(4)} | ${s.tokens_in} / ${s.tokens_out} | ${(s.mean_ms / 1000).toFixed(1)} |\n`;
  md += `\n## Comparisons\n\nΔ is the first arm minus the second. 95% CI from a paired two-level bootstrap (fixtures, then tries). Minimum detectable difference (MDD) = 2.8 × bootstrap SE (α 0.05, power 0.8); a gap below it is labelled noise.\n\n| comparison | fixtures | Δ | 95% CI | MDD | reading |\n| --- | --- | --- | --- | --- | --- |\n`;
  for (const [k, c] of Object.entries(comparisons)) md += c ? `| ${k} | ${c.fixtures} | ${f3(c.delta)} | ${f3(c.lo)} … ${f3(c.hi)} | ${f3(c.mdd)} | ${label(c)} |\n` : `| ${k} | 0 | — | — | — | no shared fixtures |\n`;
  if (Object.keys(verdicts).length) {
    md += `\n## Cluster verdicts\n\nkeep: removing the cluster costs more than the MDD. retire: removing it helps by more than the MDD. slim: the gap is noise on these fixtures, so trim weight but leave fact-carrying nodes (value-recall evals protect them). insufficient data: fewer than 2 fixtures or 2 tries.\n\n| cluster | verdict | Δ (full − minus) | MDD | fixtures |\n| --- | --- | --- | --- | --- |\n`;
    for (const [c, v] of Object.entries(verdicts)) md += `| ${c} | ${v.verdict} | ${f3(v.delta)} | ${f3(v.mdd)} | ${v.fixtures ?? 0} |\n`;
  }
  md += `\n## Isolation evidence\n\nFrom each run's stream-json \`system/init\` line (Claude Code ${recs.find((r) => r.init_line)?.init_line?.claude_code_version ?? "?"}).\n\n| arm | design-engineering plugins seen | design-engineering skills | design-engineering agents | MCP servers | verdict |\n| --- | --- | --- | --- | --- | --- |\n`;
  for (const a of armsSeen) {
    const r = recs.find((x) => x.arm === a && x.isolation);
    if (r) md += `| ${a} | ${r.isolation.plugins?.join(", ") || "none"} | ${r.isolation.de_skills?.join(", ") || "none"} | ${r.isolation.de_agents ?? 0} | ${r.isolation.mcp_servers ?? 0} | ${r.isolation.reason} |\n`;
  }
  md += `\n## Per fixture\n\n| fixture | clusters | ${armsSeen.join(" | ")} |\n| --- | --- | ${armsSeen.map(() => "---").join(" | ")} |\n`;
  for (const f of fixtures) if (byFix[f.id] || recs.some((r) => r.fixture === f.id)) md += `| ${f.id} | ${clustersOf(f).join(", ")} | ${armsSeen.map((a) => (byFix[f.id]?.[a] ? f3(mean(byFix[f.id][a])) : "—")).join(" | ")} |\n`;
  const missed = valid.filter((r) => r.score.missed.length).slice(0, 40);
  if (missed.length) { md += `\n## Rules missed\n\n| arm | fixture | try | missed |\n| --- | --- | --- | --- |\n`; for (const r of missed) md += `| ${r.arm} | ${r.fixture} | ${r.try} | ${r.score.missed.join("<br>")} |\n`; }
  md += `\nRaw runs (answers, init lines, tool calls) live in \`runs/\` next to this file and are git-ignored.\n`;
  writeFileSync(join(OUT, "REPORT.md"), md);
  writeFileSync(join(OUT, "report.json"), JSON.stringify({ model: MODEL, date: today, tries: triesSeen, relevant_only: RELEVANT_ONLY, clusters: CLUSTERS, arms: armStats, comparisons, verdicts }, null, 2) + "\n");
  return md;
}

// ---------- main ----------
const jobs = [];
// Try-major, then fixture, then arm: if a cost ceiling or Ctrl-C stops the sweep, what is on disk is still paired across arms.
for (let t = 1; t <= TRIES; t++) for (const f of fixtures) for (const arm of arms) if (armFixtures(arm).includes(f)) jobs.push({ arm, f, t, file: join(OUT, "runs", arm, `${f.id}.t${t}.json`) });
const load = (file) => { try { return JSON.parse(readFileSync(file, "utf8")); } catch { return null; } };

if (flag("dry-run")) {
  console.log(`out: ${OUT}\nclusters: ${CLUSTERS.join(", ")}\njobs: ${jobs.length}`);
  for (const a of arms) console.log(`  ${a}: ${armFixtures(a).map((f) => f.id).join(", ") || "(no fixtures)"}`);
  process.exit(0);
}
if (!flag("report-only")) mkdirSync(OUT, { recursive: true });
if (!flag("report-only")) {
  const probe = await new Promise((ok) => { const c = (process.platform === "win32" ? spawn("claude --version", { shell: true, windowsHide: true }) : spawn("claude", ["--version"])); let o = ""; c.stdout?.on("data", (d) => (o += d)); c.on("error", () => ok(null)); c.on("close", (code) => ok(code === 0 ? o.trim() : null)); });
  if (!probe) { console.error("claude CLI not found or not working (`claude --version` failed). Install Claude Code and log in, then rerun."); process.exit(1); }
  console.log(`claude ${probe}`);
  const todo = jobs.filter((j) => { const r = load(j.file); return !r || r.error || !r.isolation?.ok; });
  console.log(`${jobs.length} runs planned, ${jobs.length - todo.length} already on disk, ${todo.length} to run (concurrency ${CONC}).`);
  let spent = 0, i = 0, done = 0;
  const worker = async () => {
    while (i < todo.length) {
      if (spent >= MAX_COST) { console.log(`cost ceiling ${MAX_COST} reached; stopping`); return; }
      const j = todo[i++];
      const r = await runOne(j);
      spent += r.cost_usd || 0; done++;
      console.log(`[${done}/${todo.length}] ${j.arm} ${j.f.id} t${j.t}: ${r.error ? `ERROR ${String(r.error).slice(0, 80)}` : `score ${r.score?.score.toFixed(2)}`} | isolation ${r.isolation.ok ? "ok" : "FAIL"} (${r.isolation.reason}) | skill ${r.skill_fired ? "fired" : "-"} | $${(r.cost_usd || 0).toFixed(4)}`);
    }
  };
  await Promise.all(Array.from({ length: CONC }, worker));
}
const recs = [];
if (!existsSync(join(OUT, "runs"))) { console.error(`no runs in ${OUT}; nothing to report`); process.exit(1); }
for (const arm of readdirSync(join(OUT, "runs"), { withFileTypes: true }).filter((d) => d.isDirectory())) for (const f of readdirSync(join(OUT, "runs", arm.name))) if (f.endsWith(".json")) { const r = load(join(OUT, "runs", arm.name, f)); if (r) recs.push(r); }
// Re-score saved answers with the current rules and checks, so a fixture or grade.mjs fix needs no re-run.
const allFixtures = Object.fromEntries(loadFixtures().map((f) => [f.id, f]));
for (const r of recs) if (r.answer && allFixtures[r.fixture]) { r.score = scoreFixture(allFixtures[r.fixture], r.answer); r.grade = await gradeChecks(r.answer, allFixtures[r.fixture]); }
console.log(report(recs));
if (work) rmSync(work, { recursive: true, force: true });
