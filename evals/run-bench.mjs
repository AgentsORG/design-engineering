#!/usr/bin/env node
// run-bench.mjs — score the design-bench fixtures against real outputs.
//
// Two arms, same model: `baseline` answers from its own knowledge; `skill` reads
// SKILL.md and follows the router first. Each arm writes one markdown file per fixture:
//
//   evals/results/<run>/<fixture-id>.baseline.md
//   evals/results/<run>/<fixture-id>.skill.md
//
// This script does the deterministic part — the DesignBench-style must_match /
// must_not_match checks from skills/design-engineering/evals/design-bench.jsonl —
// on the fenced code blocks each arm shipped, and writes evals/results/<run>/REPORT.md with per-fixture pass rates and the
// rules each arm missed. Arena rows (pairwise judge) are listed, not scored.
//
//   node evals/run-bench.mjs evals/results/2026-09-05-sonnet
//
// To produce the arms yourself, run each fixture's prompt twice through any agent
// that can read files: once with "answer from your own knowledge, read nothing",
// once with "read skills/design-engineering/SKILL.md and follow its routing first".
// scripts/bench.mjs does this for you with `claude -p` and imports scoreFixture() from here.

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

export function loadFixtures(file = join(root, "skills/design-engineering/evals/design-bench.jsonl")) {
  return readFileSync(file, "utf8").split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l));
}

// Score one arm's answer against a fixture. Default target: the fenced code blocks the
// arm shipped, minus any block that just quotes the fixture's input back (a Before column
// is not an answer). Fixtures with `"score_on": "text"` (reviews, council, grading) score
// the whole reply. Returns null for arena rows, which need a pairwise judge.
export function scoreFixture(f, raw) {
  if (f.task === "arena") return null;
  const rules = [...(f.must_match || []).map((r) => ({ r, want: true })), ...(f.must_not_match || []).map((r) => ({ r, want: false }))];
  let text = raw;
  if (f.score_on !== "text") {
    const blocks = [...raw.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((m) => m[1]);
    text = blocks.filter((b) => !(f.input && b.trim() === f.input.trim())).join("\n") || raw;
  }
  const missed = rules.filter(({ r, want }) => new RegExp(r, "m").test(text) !== want).map(({ r, want }) => `${want ? "missing" : "present"} \`${r.replace(/\|/g, "\\|")}\``);
  return { rules: rules.length, passed: rules.length - missed.length, missed, score: rules.length ? (rules.length - missed.length) / rules.length : 1 };
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMain) main();

function main() {
const runDir = process.argv[2];
if (!runDir) { console.error("usage: node evals/run-bench.mjs evals/results/<run>"); process.exit(1); }

const fixtures = loadFixtures();

const ARMS = ["baseline", "skill"];
const rows = [];
for (const f of fixtures) {
  if (f.task === "arena") { rows.push({ id: f.id, task: f.task, arena: true }); continue; }
  const nRules = (f.must_match || []).length + (f.must_not_match || []).length;
  const row = { id: f.id, task: f.task, rules: nRules, arms: {} };
  for (const arm of ARMS) {
    const file = join(runDir, `${f.id}.${arm}.md`);
    if (!existsSync(file)) { row.arms[arm] = null; continue; }
    const s = scoreFixture(f, readFileSync(file, "utf8"));
    row.arms[arm] = { passed: s.passed, missed: s.missed };
  }
  rows.push(row);
}

const scored = rows.filter((r) => !r.arena);
const totals = Object.fromEntries(ARMS.map((a) => [a, { passed: 0, rules: 0, clean: 0, n: 0 }]));
for (const r of scored) for (const a of ARMS) { const s = r.arms[a]; if (!s) continue; totals[a].passed += s.passed; totals[a].rules += r.rules; totals[a].n++; if (s.passed === r.rules) totals[a].clean++; }

const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : "—");
let md = `# design-bench · ${basename(runDir)}\n\n`;
md += `Deterministic checks from \`skills/design-engineering/evals/design-bench.jsonl\`. Same model in both arms; the only difference is whether the agent read \`SKILL.md\` and followed its routing before answering.\n\n`;
md += `| arm | rules passed | fixtures fully clean |\n| --- | --- | --- |\n`;
for (const a of ARMS) md += `| ${a} | ${totals[a].passed} / ${totals[a].rules} (${pct(totals[a].passed, totals[a].rules)}) | ${totals[a].clean} / ${totals[a].n} |\n`;
md += `\n| fixture | task | rules | baseline | skill | what the baseline missed | what the skill missed |\n| --- | --- | --- | --- | --- | --- | --- |\n`;
for (const r of scored) {
  const cell = (s) => (s ? `${s.passed}/${r.rules}` : "—");
  const miss = (s) => (s && s.missed.length ? s.missed.join("<br>") : "");
  md += `| ${r.id} | ${r.task} | ${r.rules} | ${cell(r.arms.baseline)} | ${cell(r.arms.skill)} | ${miss(r.arms.baseline)} | ${miss(r.arms.skill)} |\n`;
}
const arena = rows.filter((r) => r.arena);
if (arena.length) md += `\nArena rows (${arena.map((r) => r.id).join(", ")}) need a pairwise judge and are not scored here.\n`;
md += `\nOutputs: ${readdirSync(runDir).filter((f) => /\.(baseline|skill)\.md$/.test(f)).length} files in this directory.\n`;
writeFileSync(join(runDir, "REPORT.md"), md);
writeFileSync(join(runDir, "report.json"), JSON.stringify({ run: basename(runDir), totals, rows }, null, 2) + "\n");
console.log(md);
}
