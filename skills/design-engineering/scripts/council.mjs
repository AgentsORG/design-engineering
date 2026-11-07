#!/usr/bin/env node
// council.mjs — convene a cross-provider design council: one judge brief, fanned out to the
// model CLIs installed on this machine, scores parsed, a round recorded, a table printed.
//
//   node scripts/council.mjs --target "Settings screen redesign" \
//        [--files src/settings/*.tsx ...] [--before shots/before.png] [--after shots/after.png] \
//        [--reference "Linear=refs/linear.png" ...] [--evidence film.mp4 ...] \
//        [--categories typography,hierarchy,...] [--members claude:opus,codex:gpt-6.1-sol,gemini] \
//        [--stage --threshold 9] [--timeout 900] [--ledger .design-council/ledger.json] \
//        [--context-file extra.md] [--json] [--no-ledger] [--dry-run] [--list]
//
// Members (provider:model, model optional):
//   claude  Anthropic via `claude -p --output-format json --json-schema` (read-only tools)
//   codex   OpenAI via `codex exec -s read-only --output-schema -o`
//   cursor  Cursor's agent via `cursor-agent -p --output-format json --mode ask` (`cmd /c` on Windows);
//           its provider is whatever --model names, so name a third provider's model for it
//   grok    xAI via `grok -p --output-format json` (only when named)
//   gemini  Google via `gemini -p -o json --approval-mode plan` — always the unscored jester:
//           same brief, never told, its score never enters the table
// Default members: claude, codex, gemini (jester). A missing member is REPORTED, never substituted.
//
// Rules carried from the rubric (references/meta/grading-rubric.md): judges are read-only, score
// each category 1–10 relative to the reference products, and never see the threshold. Timeout,
// error or an unparsable reply is `no score`, never approval. --stage runs members one at a time
// (cheapest first, as listed) and adds the next only once the previous one clears --threshold.
// The brief is written to <ledger dir>/round-N/brief.md and every CLI is told to read it, which
// keeps command lines short on Windows. No dependencies; Node 18+.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SKILL = resolve(HERE, "..");
const RUBRIC = join(SKILL, "references", "meta", "grading-rubric.md");
const WIN = process.platform === "win32";

// ------------------------------------------------------------------ categories (mirror the rubric)
export const CATEGORIES = {
  typography: "Typography: one family doing several jobs, a scale with real steps, tracking and leading per size.",
  hierarchy: "Hierarchy: the eye lands on the one thing that matters; labels and chrome recede.",
  "color-contrast": "Colour and contrast: one accent, a neutral ramp, every text pair readable (WCAG 4.5:1 body, 3:1 large and non-text).",
  "spacing-layout": "Spacing and layout: one gutter, grouping by space, alignment that holds at phone width.",
  motion: "Motion: only what earns it moves; ease-out entrances under 300 ms; interruptible; a still for reduced motion.",
  states: "States: empty, loading, error, long and hostile content all designed, not just the happy path.",
  accessibility: "Accessibility: keyboard, visible focus, accessible names and announcements work without a mouse.",
  copy: "Copy: says it once, in the product's voice, with believable content.",
  iconography: "Iconography: one set, one stroke weight, sized to the type, no emoji as UI.",
  restraint: "Restraint: nothing a reviewer would delete; no AI-default tells or decoration without a job.",
  verification: "Verification: evidence the author rendered, filmed and checked the work, including at phone width.",
  direction: "Direction: how well the human steered the agent — named concepts over adjectives, few passes, system fixed not screen.",
};
export const DEFAULT_CATEGORIES = ["typography", "hierarchy", "color-contrast", "spacing-layout", "motion", "states", "accessibility", "copy"];

// The reply schema. Kept free of cmd.exe metacharacters (& | < > ^ %) so it survives `cmd /c`.
export const REPLY_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["scores", "findings", "confidence", "summary"],
  properties: {
    scores: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["category", "score", "reason"],
        properties: { category: { type: "string" }, score: { type: "number" }, reason: { type: "string" } },
      },
    },
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "severity", "location", "before", "after", "why"],
        properties: {
          id: { type: "string" },
          severity: { type: "string", enum: ["blocker", "should", "nit"] },
          location: { type: "string" },
          before: { type: "string" },
          after: { type: "string" },
          why: { type: "string" },
        },
      },
    },
    confidence: { type: "number" },
    summary: { type: "string" },
  },
};

// ------------------------------------------------------------------ providers
const PROVIDERS = {
  claude: { label: "Claude", provider: "Anthropic", bins: ["claude"], defaultModel: "opus" },
  codex: { label: "Codex", provider: "OpenAI", bins: ["codex"], defaultModel: null },
  cursor: { label: "Cursor agent", provider: "per --model", bins: WIN ? ["cursor-agent.cmd", "cursor-agent"] : ["cursor-agent", "agent"], defaultModel: null },
  grok: { label: "Grok", provider: "xAI", bins: ["grok"], defaultModel: null },
  gemini: { label: "Gemini", provider: "Google", bins: ["gemini"], defaultModel: null, jester: true },
};
const DEFAULT_MEMBERS = "claude,codex,gemini";

function which(bin) {
  const r = WIN
    ? spawnSync("where", [bin], { encoding: "utf8", windowsHide: true })
    : spawnSync("sh", ["-c", `command -v ${bin}`], { encoding: "utf8" });
  if (r.status !== 0) return null;
  const hits = String(r.stdout).split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  if (!WIN) return hits[0] || null;
  // Prefer something Windows can launch: .exe, then .cmd/.bat.
  return hits.find((h) => /\.exe$/i.test(h)) || hits.find((h) => /\.(cmd|bat)$/i.test(h)) || null;
}

export function detect() {
  const out = {};
  for (const [id, p] of Object.entries(PROVIDERS)) {
    let path = null;
    for (const b of p.bins) { path = which(b); if (path) break; }
    out[id] = path;
  }
  return out;
}

export function parseMembers(spec) {
  return String(spec || DEFAULT_MEMBERS).split(",").map((s) => s.trim()).filter(Boolean).map((s) => {
    const [id, ...rest] = s.split(":");
    const model = rest.join(":") || null;
    const p = PROVIDERS[id.toLowerCase()];
    return { id: id.toLowerCase(), known: !!p, model: model === "jester" ? null : model || p?.defaultModel || null, jester: !!p?.jester || model === "jester" };
  });
}

// ------------------------------------------------------------------ the brief
export function buildBrief(o) {
  const cats = o.categories;
  const lines = [];
  lines.push("# Design judge brief", "");
  lines.push("Review only. Do not edit, create or delete files, commit, push, comment on PRs, or start subagents. Read what you need; write nothing.", "");
  lines.push(`Target: ${o.target || "(unnamed)"}`);
  if (o.cwd) lines.push(`Repository: ${o.cwd}`);
  if (o.files?.length) lines.push("", "Files to read:", ...o.files.map((f) => `- ${f}`));
  const ev = [];
  for (const f of o.before || []) ev.push(`- BEFORE: ${f}`);
  for (const f of o.after || []) ev.push(`- AFTER: ${f}`);
  for (const f of o.evidence || []) ev.push(`- EVIDENCE: ${f}`);
  if (ev.length) lines.push("", "Rendered evidence (open each file; images and video frames are the primary evidence):", ...ev);
  if (o.references?.length) {
    lines.push("", "Reference products in the judging panel. Score the target RELATIVE to these; a 9 means it holds up beside the best of them:");
    for (const r of o.references) lines.push(`- ${r.name}${r.path ? `: ${r.path}` : ""}`);
  } else {
    lines.push("", "No reference products were supplied. Judge against the best shipped product UI you know in this category, and say which you had in mind.");
  }
  lines.push("", "Score each category from 1 to 10 (decimals allowed). If you cannot see enough to judge a category, leave it out of `scores` rather than guessing.");
  for (const c of cats) lines.push(`- \`${c}\` — ${CATEGORIES[c] || c}`);
  lines.push("", `Rubric (read the "Council categories" and "Bands" sections if you can open it): ${RUBRIC}`);
  lines.push("", "Bands: under 4 generated, 4–6 passable, 6–8 crafted, 8–9 refined, 9–10 reference-grade. Approval is earned, not assumed; default to flagging.");
  lines.push("", "Findings: at most eight, most impactful first, each with a stable id (J1, J2…), severity `blocker` (the intended case is wrong or an accessibility floor fails), `should` (a real problem users will hit) or `nit`, a location (file:line or the screenshot region), the quoted Before, a concrete After with values, and a Why.");
  if (o.context) lines.push("", "Additional context:", "", o.context.trim());
  lines.push("", "Reply with ONLY one JSON object, no prose before or after, of this shape:", "", "```json", JSON.stringify({ scores: [{ category: cats[0], score: 7.5, reason: "…" }], findings: [{ id: "J1", severity: "should", location: "src/x.tsx:12", before: "…", after: "…", why: "…" }], confidence: 0.8, summary: "one or two sentences" }, null, 2), "```");
  return lines.join("\n") + "\n";
}

// ------------------------------------------------------------------ commands
const PROMPT = (briefPath) => `Read the judge brief at ${briefPath} and follow it exactly. Reply with only the JSON object it asks for.`;

export function commandFor(m, bin, ctx) {
  const prompt = PROMPT(ctx.briefPath);
  const images = [...(ctx.before || []), ...(ctx.after || []), ...(ctx.evidence || []), ...(ctx.references || []).map((r) => r.path).filter(Boolean)].filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f));
  switch (m.id) {
    case "claude":
      return { bin, args: ["-p", prompt, "--output-format", "json", "--json-schema", JSON.stringify(REPLY_SCHEMA), "--tools", "Read,Grep,Glob", "--no-session-persistence", "--add-dir", ctx.briefDir, SKILL, ...(m.model ? ["--model", m.model] : []), "--effort", "high"] };
    case "codex":
      return { bin, args: ["exec", prompt, "-s", "read-only", "--skip-git-repo-check", "--ephemeral", "-c", "model_reasoning_effort=high", "--output-schema", ctx.schemaPath, "-o", ctx.outPath(m), ...(m.model ? ["-m", m.model] : []), ...images.flatMap((f) => ["-i", f])] };
    case "cursor":
      return { bin, args: ["-p", "--output-format", "json", "--mode", "ask", "--trust", ...(m.model ? ["--model", m.model] : []), prompt] };
    case "grok":
      return { bin, args: ["-p", prompt, "--output-format", "json", ...(m.model ? ["-m", m.model] : [])] };
    case "gemini":
      return { bin, args: ["-p", prompt, "-o", "json", "--approval-mode", "plan", ...(m.model ? ["-m", m.model] : [])] };
    default:
      return null;
  }
}

// cmd.exe quoting for .cmd/.bat shims (Node refuses to spawn them without a shell).
const CMD_META = /[%^&|<>!]/;
function cmdQuote(a) {
  const s = String(a);
  if (!/[\s"]/.test(s) && s.length) return s;
  return `"${s.replace(/(\\*)"/g, '$1$1\\"').replace(/(\\+)$/, "$1$1")}"`;
}
export function launchSpec(cmd) {
  if (WIN && /\.(cmd|bat)$/i.test(cmd.bin)) {
    const bad = cmd.args.find((a) => CMD_META.test(String(a)));
    if (bad) throw new Error(`argument unsafe for cmd.exe: ${String(bad).slice(0, 60)}`);
    const line = [cmdQuote(cmd.bin), ...cmd.args.map(cmdQuote)].join(" ");
    return { file: process.env.ComSpec || "cmd.exe", args: ["/d", "/s", "/c", `"${line}"`], opts: { windowsVerbatimArguments: true } };
  }
  return { file: cmd.bin, args: cmd.args, opts: {} };
}
export const printable = (cmd) => [cmd.bin, ...cmd.args.map((a) => (String(a).length > 120 ? `'${String(a).slice(0, 60)}…'` : /[\s"']/.test(a) ? `'${a}'` : a))].join(" ");

function run(cmd, { cwd, timeoutMs }) {
  return new Promise((done) => {
    const t0 = Date.now();
    let spec;
    try { spec = launchSpec(cmd); } catch (e) { return done({ status: "error", error: e.message, ms: 0, stdout: "", stderr: "" }); }
    const child = spawn(spec.file, spec.args, { cwd, windowsHide: true, stdio: ["ignore", "pipe", "pipe"], ...spec.opts });
    let stdout = "", stderr = "", timedOut = false;
    child.stdout.on("data", (d) => { stdout += d; });
    child.stderr.on("data", (d) => { stderr += d; });
    const timer = setTimeout(() => {
      timedOut = true;
      if (WIN) spawnSync("taskkill", ["/pid", String(child.pid), "/t", "/f"], { windowsHide: true });
      else child.kill("SIGKILL");
    }, timeoutMs);
    child.on("error", (e) => { clearTimeout(timer); done({ status: "error", error: e.message, ms: Date.now() - t0, stdout, stderr }); });
    child.on("close", (code) => {
      clearTimeout(timer);
      done({ status: timedOut ? "timeout" : code === 0 ? "ok" : "error", code, ms: Date.now() - t0, stdout, stderr, error: timedOut ? `timed out after ${timeoutMs} ms` : code ? `exit ${code}` : null });
    });
  });
}

// ------------------------------------------------------------------ parsing
function balancedObjects(text) {
  const out = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== "{") continue;
    let depth = 0, inStr = false, esc = false;
    for (let j = i; j < text.length; j++) {
      const c = text[j];
      if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') inStr = false; continue; }
      if (c === '"') inStr = true;
      else if (c === "{") depth++;
      else if (c === "}" && --depth === 0) { out.push(text.slice(i, j + 1)); i = j; break; }
    }
  }
  return out;
}
function hasScores(o) { return o && typeof o === "object" && Array.isArray(o.scores); }

export function extractReply(raw) {
  if (raw == null) return null;
  if (typeof raw === "object") {
    if (hasScores(raw)) return raw;
    for (const k of ["structured_output", "result", "response", "text", "output", "message", "content"]) {
      if (k in raw) { const r = extractReply(raw[k]); if (r) return r; }
    }
    return null;
  }
  const s = String(raw).trim();
  if (!s) return null;
  try { const r = extractReply(JSON.parse(s)); if (r) return r; } catch { /* not whole JSON */ }
  // JSONL streams: try each line from the end.
  for (const line of s.split(/\r?\n/).reverse()) {
    const l = line.trim();
    if (!l.startsWith("{")) continue;
    try { const r = extractReply(JSON.parse(l)); if (r) return r; } catch { /* keep looking */ }
  }
  const objs = balancedObjects(s).reverse();
  for (const o of objs) { try { const p = JSON.parse(o); const r = extractReply(p); if (r) return r; } catch { /* next */ } }
  return null;
}

export function normaliseReply(reply, categories) {
  if (!reply) return null;
  const scores = {};
  for (const s of reply.scores || []) {
    const id = String(s.category || "").toLowerCase().trim().replace(/\s*(&|and)\s*/g, "-").replace(/\s+/g, "-");
    const n = Number(s.score);
    if (!categories.includes(id) || !Number.isFinite(n) || n < 1 || n > 10) continue;
    scores[id] = { score: Math.round(n * 10) / 10, reason: String(s.reason || "") };
  }
  const vals = Object.values(scores).map((v) => v.score);
  const overall = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : null;
  const confidence = Number.isFinite(Number(reply.confidence)) ? Math.max(0, Math.min(1, Number(reply.confidence))) : null;
  return { scores, overall, min: vals.length ? Math.min(...vals) : null, findings: Array.isArray(reply.findings) ? reply.findings.slice(0, 12) : [], confidence, summary: String(reply.summary || "") };
}

// ------------------------------------------------------------------ ledger + table
const fmt = (n) => (n == null ? "no score" : `${n}/10`);
export function delegateName(m) { const p = PROVIDERS[m.id]; return `${p ? p.label : m.id}${m.model ? ` (${m.model})` : ""}`; }

export function councilTable(rounds) {
  const names = [];
  for (const r of rounds) for (const m of r.members) if (!m.jester && !names.includes(m.name)) names.push(m.name);
  const out = ["## Council review", "", `Rounds: ${rounds.length}`, ""];
  out.push(`| Delegate | ${rounds.map((r) => `Round ${r.round}`).join(" | ")} |`);
  out.push(`| --- | ${rounds.map(() => "---").join(" | ")} |`);
  for (const n of names) out.push(`| ${n} | ${rounds.map((r) => { const m = r.members.find((x) => x.name === n); return m ? fmt(m.overall) : "not run"; }).join(" | ")} |`);
  const last = rounds[rounds.length - 1];
  const scored = last.members.filter((m) => !m.jester);
  if (scored.length && last.categories.length) {
    out.push("", `Round ${last.round} by category:`, "");
    out.push(`| Category | ${scored.map((m) => m.name).join(" | ")} |`);
    out.push(`| --- | ${scored.map(() => "---").join(" | ")} |`);
    for (const c of last.categories) out.push(`| ${c} | ${scored.map((m) => (m.scores?.[c] ? `${m.scores[c].score}` : "no score")).join(" | ")} |`);
  }
  if (last.missing?.length) out.push("", `Missing: ${last.missing.join("; ")}. Reported, not substituted.`);
  return out.join("\n") + "\n";
}

// ------------------------------------------------------------------ CLI
function parseArgs(argv) {
  const o = { files: [], before: [], after: [], evidence: [], references: [], _: [] };
  const multi = new Set(["--files", "--before", "--after", "--evidence", "--reference"]);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) { o._.push(a); continue; }
    const key = a.slice(2);
    if (["dry-run", "json", "no-ledger", "stage", "list", "help"].includes(key)) { o[key] = true; continue; }
    if (multi.has(a)) {
      while (i + 1 < argv.length && !argv[i + 1].startsWith("--")) {
        const v = argv[++i];
        if (a === "--reference") { const [name, ...p] = v.split("="); o.references.push({ name, path: p.join("=") || null }); } else o[key === "files" ? "files" : key].push(v);
      }
      continue;
    }
    o[key] = argv[++i];
  }
  return o;
}

const USAGE = `usage: node council.mjs --target "<what is judged>" [--files ...] [--before img] [--after img]
       [--reference "Name=path" ...] [--evidence file ...] [--categories a,b] [--members claude:opus,codex,gemini]
       [--stage --threshold 9] [--timeout 900] [--ledger path] [--context-file md] [--json] [--no-ledger] [--dry-run] [--list]`;

export async function main(argv = process.argv.slice(2)) {
  const o = parseArgs(argv);
  if (o.help) { console.log(USAGE); return 0; }
  const found = detect();
  if (o.list) {
    for (const [id, p] of Object.entries(PROVIDERS)) console.log(`${id.padEnd(7)} ${p.provider.padEnd(12)} ${found[id] || "not found"}${p.jester ? "  (jester, unscored)" : ""}`);
    return 0;
  }
  if (!o.target && !o.files.length && !o.after.length && !o.evidence.length) { console.error(USAGE); return 1; }
  const categories = (o.categories ? o.categories.split(",") : DEFAULT_CATEGORIES).map((c) => c.trim()).filter(Boolean);
  const unknown = categories.filter((c) => !CATEGORIES[c]);
  if (unknown.length) { console.error(`unknown categories: ${unknown.join(", ")} (known: ${Object.keys(CATEGORIES).join(", ")})`); return 1; }
  const threshold = o.threshold != null ? Number(o.threshold) : null;
  if (o.stage && !Number.isFinite(threshold)) { console.error("--stage needs --threshold (the judges never see it)"); return 1; }
  const timeoutMs = Number(o.timeout || 900) * 1000;
  const cwd = resolve(o.cwd || process.cwd());
  const ledgerPath = resolve(o.ledger || join(cwd, ".design-council", "ledger.json"));
  let ledger = { rounds: [] };
  if (existsSync(ledgerPath)) { try { ledger = JSON.parse(readFileSync(ledgerPath, "utf8")); } catch { ledger = { rounds: [] }; } }
  const round = Number(o.round || (ledger.rounds.length + 1));
  const briefDir = join(dirname(ledgerPath), `round-${round}`);
  const ctx = {
    target: o.target, cwd, files: o.files, before: o.before, after: o.after, evidence: o.evidence, references: o.references, categories,
    context: o["context-file"] ? readFileSync(o["context-file"], "utf8") : "",
    briefDir, briefPath: join(briefDir, "brief.md"), schemaPath: join(briefDir, "schema.json"), outPath: (m) => join(briefDir, `${m.id}.last.json`),
  };
  const brief = buildBrief(ctx);
  const members = parseMembers(o.members);
  const missing = [];
  const plan = [];
  for (const m of members) {
    if (!m.known) { missing.push(`${m.id}: unknown member`); continue; }
    const bin = found[m.id];
    if (!bin) { missing.push(`${delegateName(m)}: CLI not found on PATH`); continue; }
    plan.push({ m, cmd: commandFor(m, bin, ctx) });
  }
  const scoredProviders = new Set(plan.filter((p) => !p.m.jester).map((p) => p.m.id));
  if (scoredProviders.size < 3) missing.push(`only ${scoredProviders.size} scored provider(s) reachable; a council wants three (name a third with --members, e.g. cursor:<model> or grok)`);

  if (o["dry-run"]) {
    console.log("# council dry run (nothing is called, nothing is written)\n");
    console.log("Detected CLIs:");
    for (const [id, p] of Object.entries(found)) console.log(`- ${id}: ${p || "not found"}`);
    console.log(`\nRound ${round}${o.stage ? `, staged, threshold ${threshold} (never shown to judges)` : ""}; brief would be written to ${ctx.briefPath}\n`);
    console.log("Commands:");
    for (const { m, cmd } of plan) console.log(`- ${delegateName(m)}${m.jester ? " [jester, unscored]" : ""}: ${printable(cmd)}`);
    if (missing.length) console.log(`\nMissing (reported, not substituted):\n${missing.map((x) => `- ${x}`).join("\n")}`);
    console.log("\n--- brief ---\n");
    console.log(brief);
    return 0;
  }
  if (!plan.some((p) => !p.m.jester)) { console.error(`no scored council member is reachable.\n${missing.map((x) => `- ${x}`).join("\n")}`); return 3; }

  mkdirSync(briefDir, { recursive: true });
  writeFileSync(ctx.briefPath, brief);
  writeFileSync(ctx.schemaPath, JSON.stringify(REPLY_SCHEMA, null, 2));

  const runOne = async ({ m, cmd }) => {
    const r = await run(cmd, { cwd, timeoutMs });
    let raw = r.stdout;
    if (m.id === "codex" && existsSync(ctx.outPath(m))) raw = readFileSync(ctx.outPath(m), "utf8");
    const parsed = r.status === "ok" ? normaliseReply(extractReply(raw), categories) : null;
    writeFileSync(join(briefDir, `${m.id}.raw.txt`), `${r.stdout}\n--- stderr ---\n${r.stderr}`);
    return { id: m.id, name: delegateName(m), provider: PROVIDERS[m.id].provider, model: m.model, jester: m.jester, ms: r.ms,
      status: r.status === "ok" && !parsed ? "unparsable" : r.status, error: r.error || (r.status === "ok" && !parsed ? "reply had no scores" : null),
      ...(parsed || { scores: {}, overall: null, min: null, findings: [], confidence: null, summary: "" }) };
  };

  const jesters = plan.filter((p) => p.m.jester);
  const scored = plan.filter((p) => !p.m.jester);
  const jesterRuns = jesters.map(runOne);
  let results = [];
  if (o.stage) {
    for (let i = 0; i < scored.length; i++) {
      const res = await runOne(scored[i]);
      results.push(res);
      if (!(res.min != null && res.min >= threshold)) {
        for (const rest of scored.slice(i + 1)) results.push({ id: rest.m.id, name: delegateName(rest.m), provider: PROVIDERS[rest.m.id].provider, model: rest.m.model, status: "staged", error: "not run: an earlier judge has not cleared the bar", scores: {}, overall: null, min: null, findings: [], confidence: null, summary: "" });
        break;
      }
    }
  } else {
    results = await Promise.all(scored.map(runOne));
  }
  const jesterResults = await Promise.all(jesterRuns);

  const scoredResults = results.filter((r) => r.status !== "staged");
  const passed = Number.isFinite(threshold) ? results.length > 0 && results.every((r) => r.min != null && r.min >= threshold) : null;
  const record = { round, at: new Date().toISOString(), target: o.target || null, categories, staged: !!o.stage, threshold, passed,
    members: [...results, ...jesterResults], missing, briefPath: ctx.briefPath };
  if (!o["no-ledger"]) {
    ledger.rounds = ledger.rounds.filter((r) => r.round !== round).concat(record).sort((a, b) => a.round - b.round);
    mkdirSync(dirname(ledgerPath), { recursive: true });
    writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2));
  }
  if (o.json) { console.log(JSON.stringify(record, null, 2)); return 0; }
  const rounds = o["no-ledger"] ? [record] : ledger.rounds;
  console.log(councilTable(rounds));
  for (const r of scoredResults) if (r.status !== "ok") console.log(`- ${r.name}: ${r.status}${r.error ? ` (${r.error})` : ""} — no score, not approval.`);
  for (const r of jesterResults) console.log(`- Jester ${r.name}: ${r.status === "ok" ? `replied (${r.findings.length} findings; score ignored). Log anything absurd under "Gemini flub" in the final reply only.` : r.status}`);
  if (passed != null) console.log(`\nThreshold ${threshold}: ${passed ? "every scored judge cleared it in every category" : "not cleared"}.`);
  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then((code) => process.exit(code), (e) => { console.error(e.stack || e.message); process.exit(1); });
}
