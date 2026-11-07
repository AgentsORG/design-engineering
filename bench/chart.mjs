#!/usr/bin/env node
// Draws the README's benchmark charts from one run's report.json. No dependencies.
//
//   node bench/chart.mjs bench/results/2026-11-07-opus-ablation [--out docs/readme/img]
//
// Writes three charts, each as a light and a dark SVG (GitHub picks one through
// <picture> and prefers-color-scheme):
//   bench-tasks-{light,dark}.svg     every task, plain model vs full skill, sorted by the gap
//   bench-clusters-{light,dark}.svg  Δ with its 95% CI against the noise floor, per cluster
//   bench-cost-{light,dark}.svg      score against cost, one dot per run
// Reads only report.json (bench.mjs writes per-fixture means and one row per run into it),
// so the charts rebuild from what is committed; runs/ is not needed.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const runDir = args.find((a) => !a.startsWith("--"));
if (!runDir) { console.error("usage: node bench/chart.mjs <bench/results/run> [--out docs/readme/img]"); process.exit(1); }
const outIdx = args.indexOf("--out");
const OUT = resolve(outIdx >= 0 ? args[outIdx + 1] : join(ROOT, "docs/readme/img"));
const R = JSON.parse(readFileSync(join(resolve(runDir), "report.json"), "utf8"));
if (!R.fixtures || !R.runs) { console.error("report.json has no fixtures/runs; regenerate it with: node bench/bench.mjs --report-only --out " + runDir); process.exit(1); }

const MODEL = { opus: "Opus 5.5", sonnet: "Sonnet 4.6", haiku: "Haiku 4.5" }[R.model] || R.model;

// Tokens. One accent (the full skill), one neutral (the plain model). Text never wears the series colour.
const THEMES = {
  light: { bg: "#ffffff", text: "#1f2328", text2: "#59636e", muted: "#818b98", grid: "#d1d9e0", axis: "#9198a1", band: "#eef1f4", accent: "#2a78d6", base: "#6e7781", link: "#b6bec7" },
  dark: { bg: "#0d1117", text: "#f0f6fc", text2: "#9198a1", muted: "#6e7681", grid: "#262c36", axis: "#3d444d", band: "#1c222b", accent: "#3987e5", base: "#8b949e", link: "#4a525c" },
};
const SANS = "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const n2 = (x) => Math.round(x * 100) / 100;
const pts = (d) => (d > 0 ? "+" : d < 0 ? "−" : "") + Math.abs(Math.round(d * 100)); // a score gap in percentage points
const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;

function svg(w, h, title, desc, body, t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d">
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<style>text{font-family:${SANS};fill:${t.text}}.s{fill:${t.text2}}.m{fill:${t.muted}}.mono{font-family:${MONO}}.b{font-weight:600}</style>
${body}
</svg>
`;
}
const text = (x, y, s, { cls = "", size = 12, anchor = "start", weight } = {}) =>
  `<text x="${n2(x)}" y="${n2(y)}" font-size="${size}"${anchor !== "start" ? ` text-anchor="${anchor}"` : ""}${cls ? ` class="${cls}"` : ""}${weight ? ` font-weight="${weight}"` : ""}>${esc(s)}</text>`;
const dot = (x, y, r, fill, ring) => `<circle cx="${n2(x)}" cy="${n2(y)}" r="${r}" fill="${fill}" stroke="${ring}" stroke-width="2"/>`;
const line = (x1, y1, x2, y2, stroke, w = 1) => `<line x1="${n2(x1)}" y1="${n2(y1)}" x2="${n2(x2)}" y2="${n2(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"/>`;
const legend = (x, y, items, t) => {
  let o = "", cx = x;
  for (const [label, fill] of items) { o += dot(cx + 5, y - 4, 5, fill, t.bg) + text(cx + 16, y, label, { cls: "s" }); cx += 16 + label.length * 6.6 + 22; }
  return o;
};

// ---------- 1. every task, plain vs full ----------
function tasksChart(t) {
  const rows = Object.entries(R.fixtures).filter(([, f]) => f.arms.full && f.arms.none)
    .map(([id, f]) => ({ id, none: f.arms.none.score, full: f.arms.full.score, d: f.arms.full.score - f.arms.none.score, n: Math.min(f.arms.full.n, f.arms.none.n) }))
    .sort((a, b) => b.d - a.d || a.id.localeCompare(b.id));
  const eps = 1e-9;
  const groups = [
    ["Better with the skill", rows.filter((r) => r.d > eps)],
    ["Same score", rows.filter((r) => Math.abs(r.d) <= eps)],
    ["Better without it", rows.filter((r) => r.d < -eps)],
  ].filter(([, g]) => g.length);
  const W = 760, X0 = 196, X1 = 660, RH = 22, GH = 30;
  const x = (s) => X0 + s * (X1 - X0);
  const tries = Math.max(...rows.map((r) => r.n));
  let y = 0, body = "";
  body += text(0, 18, `${MODEL}, with and without design-engineering: ${rows.length} tasks`, { size: 15, cls: "b" });
  body += text(0, 38, `Share of each task's rules passed, mean of ${tries} tries per arm. Sorted by the gap.`, { cls: "s" });
  body += legend(0, 64, [[`${MODEL} alone`, t.base], [`${MODEL} + design-engineering`, t.accent]], t);
  const top = 84;
  for (const s of [0, 0.25, 0.5, 0.75, 1]) body += text(x(s), top + 10, `${s * 100}%`, { cls: "m", size: 11, anchor: "middle" });
  body += text(W, top + 10, "gap, pts", { cls: "m", size: 11, anchor: "end" });
  y = top + 22;
  const gridTop = y;
  let rowsSvg = "";
  for (const [name, g] of groups) {
    y += GH;
    rowsSvg += text(0, y - 9, `${name} · ${g.length}`, { size: 12, cls: "b" });
    for (const r of g) {
      const cy = y + RH / 2;
      rowsSvg += text(0, cy + 4, r.id, { cls: "mono s", size: 11.5 });
      if (Math.abs(r.d) <= eps) {
        rowsSvg += dot(x(r.none), cy, 7.5, t.base, t.bg) + dot(x(r.full), cy, 4, t.accent, t.bg);
      } else {
        rowsSvg += line(x(r.none), cy, x(r.full), cy, t.link, 2) + dot(x(r.none), cy, 5, t.base, t.bg) + dot(x(r.full), cy, 5, t.accent, t.bg);
      }
      rowsSvg += text(W, cy + 4, Math.abs(r.d) <= eps ? "0" : pts(r.d), { anchor: "end", size: 12 });
      y += RH;
    }
  }
  let grid = "";
  for (const s of [0, 0.25, 0.5, 0.75, 1]) grid += line(x(s), gridTop, x(s), y, t.grid);
  const H = y + 30;
  const foot = text(0, H - 8, `A ringed dot: both arms scored the same. Run of ${R.date}.`, { cls: "m", size: 11 });
  const wins = rows.filter((r) => r.d > eps).map((r) => `${r.id} ${pts(r.d)}`), losses = rows.filter((r) => r.d < -eps).map((r) => `${r.id} ${pts(r.d)}`);
  return svg(W, H, `${MODEL} with and without design-engineering, per task`,
    `Dot plot of ${rows.length} tasks. Better with the skill: ${wins.join(", ")}. Same score on ${rows.filter((r) => Math.abs(r.d) <= eps).length} tasks. Better without it: ${losses.join(", ")}.`,
    grid + body + rowsSvg + foot, t);
}

// ---------- 2. per-cluster Δ, CI and noise floor ----------
function clustersChart(t) {
  const fv = R.comparisons["full-vs-none"];
  const rows = [];
  if (fv) rows.push({ name: "whole skill vs none", ...fv, verdict: !(fv.se > 0) ? "too few runs" : Math.abs(fv.delta) < fv.mdd ? "within noise" : fv.delta > 0 ? "real gain" : "real loss", lead: true });
  const order = { keep: 0, retire: 1, slim: 2, "insufficient data": 3, "not run": 4 };
  const measured = Object.entries(R.verdicts || {}).map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => (order[a.verdict] ?? 9) - (order[b.verdict] ?? 9) || b.delta - a.delta || a.name.localeCompare(b.name));
  rows.push(...measured);
  for (const c of R.clusters || []) if (!R.verdicts?.[c]) rows.push({ name: c, verdict: "not measured" });
  const W = 760, X0 = 170, X1 = 560, RH = 26, LIM = 0.3;
  const x = (d) => X0 + ((Math.max(-LIM, Math.min(LIM, d)) + LIM) / (2 * LIM)) * (X1 - X0);
  let body = "";
  body += text(0, 18, `What each part adds: full skill minus that part, ${MODEL}`, { size: 15, cls: "b" });
  body += text(0, 38, "Δ in score points with its 95% bootstrap interval. The grey band is the noise floor (±MDD):", { cls: "s" });
  body += text(0, 56, "a dot inside it, or an interval crossing 0, is not a measurable effect.", { cls: "s" });
  const top = 78;
  for (const d of [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3]) body += text(x(d), top + 10, d === 0 ? "0" : pts(d), { cls: "m", size: 11, anchor: "middle" });
  body += text(X1 + 24, top + 10, "verdict", { cls: "m", size: 11 });
  body += text(W, top + 10, "tasks", { cls: "m", size: 11, anchor: "end" });
  let y = top + 22;
  const gridTop = y;
  let rowsSvg = "";
  for (const r of rows) {
    const cy = y + RH / 2;
    rowsSvg += text(0, cy + 4, r.name, { size: 12, cls: r.lead ? "b" : r.verdict === "not measured" ? "m" : "s" });
    if (r.verdict === "not measured") {
      rowsSvg += text(X0 + 6, cy + 4, "no tasks in the bench", { cls: "m", size: 11 });
    } else {
      if (r.mdd > 0) rowsSvg += `<rect x="${n2(x(-r.mdd))}" y="${n2(cy - 8)}" width="${n2(x(r.mdd) - x(-r.mdd))}" height="16" rx="3" fill="${t.band}"/>`;
      const thin = r.verdict === "insufficient data" || r.verdict === "too few runs";
      if (r.hi > r.lo) rowsSvg += line(x(r.lo), cy, x(r.hi), cy, thin ? t.base : t.accent, 2);
      rowsSvg += dot(x(r.delta), cy, 5, thin ? t.base : t.accent, t.bg);
    }
    rowsSvg += text(X1 + 24, cy + 4, r.verdict, { size: 12, cls: r.verdict === "not measured" || r.verdict === "insufficient data" ? "m" : "" });
    rowsSvg += text(W, cy + 4, r.fixtures ? String(r.fixtures) : "0", { size: 12, anchor: "end", cls: r.fixtures ? "" : "m" });
    if (r.lead) { y += 8; }
    y += RH;
    if (r.lead) rowsSvg += line(0, y - RH + 4 + RH - 8, W, y - RH + 4 + RH - 8, t.grid);
  }
  let grid = "";
  for (const d of [-0.3, -0.2, -0.1, 0.1, 0.2, 0.3]) grid += line(x(d), gridTop, x(d), y, t.grid);
  grid += line(x(0), gridTop, x(0), y, t.axis, 1.5);
  const H = y + 46;
  const foot = text(x(-0.15), y + 18, "← the part hurts", { cls: "m", size: 11, anchor: "middle" }) + text(x(0.15), y + 18, "the part helps →", { cls: "m", size: 11, anchor: "middle" })
    + text(0, H - 6, "Grey dots: too few tasks or no variance to set a noise floor. Minus-cluster arms ran only the tasks tagged with that cluster.", { cls: "m", size: 11 });
  const desc = rows.map((r) => (r.verdict === "not measured" ? `${r.name}: not measured` : `${r.name}: Δ ${pts(r.delta)} pts, CI ${pts(r.lo)} to ${pts(r.hi)}, MDD ${Math.round(r.mdd * 100)}, ${r.verdict}, ${r.fixtures} tasks`)).join("; ");
  return svg(W, H, `Per-cluster effect against the noise floor, ${MODEL}`, desc, grid + body + rowsSvg + foot, t);
}

// ---------- 3. score against cost, one dot per run ----------
function costChart(t) {
  const arms = ["none", "full"].map((a) => ({ a, runs: R.runs.filter((r) => r.arm === a) }));
  const maxCost = Math.max(...R.runs.filter((r) => r.arm === "none" || r.arm === "full").map((r) => r.cost_usd));
  const XMAX = Math.ceil(maxCost * 4) / 4;
  const W = 760, X0 = 48, X1 = 740, Y0 = 96, Y1 = 356; // y: score 0..1, top = 1
  const x = (c) => X0 + (c / XMAX) * (X1 - X0), y = (s) => Y1 - s * (Y1 - Y0);
  let body = "";
  body += text(0, 18, `Score against cost, ${MODEL}: one dot per run`, { size: 15, cls: "b" });
  body += text(0, 38, `${arms.map(({ a, runs }) => `${runs.length} ${a === "none" ? "plain" : "full-skill"} runs`).join(", ")}. Cost is what Claude Code reported for the run.`, { cls: "s" });
  body += legend(0, 64, [[`${MODEL} alone`, t.base], [`${MODEL} + design-engineering`, t.accent]], t);
  let grid = "";
  for (const s of [0, 0.25, 0.5, 0.75, 1]) { grid += line(X0, y(s), X1, y(s), s === 0 ? t.axis : t.grid); grid += text(X0 - 8, y(s) + 4, `${s * 100}%`, { cls: "m", size: 11, anchor: "end" }); }
  for (let c = 0; c <= XMAX + 1e-9; c += 0.25) { grid += text(x(c), Y1 + 18, `$${c.toFixed(2)}`, { cls: "m", size: 11, anchor: c === 0 ? "start" : "middle" }); if (c > 0) grid += line(x(c), Y0, x(c), Y1, t.grid); }
  grid += text((X0 + X1) / 2, Y1 + 38, "cost per run (USD)", { cls: "m", size: 11, anchor: "middle" });
  let dots = "", labels = "";
  for (const { a, runs } of arms) {
    const fill = a === "none" ? t.base : t.accent;
    for (const r of runs) dots += dot(x(r.cost_usd), y(r.score), 4, fill, t.bg);
    const mc = mean(runs.map((r) => r.cost_usd)), ms = R.arms[a]?.score ?? mean(runs.map((r) => r.score)), mt = (R.arms[a]?.mean_ms ?? mean(runs.map((r) => r.ms))) / 1000;
    // Mean marker: a rule down from the cloud at the mean cost; labels stacked so the two arms never collide.
    const ly = a === "none" ? 0.14 : 0.30;
    labels += line(x(mc), y(0.46), x(mc), y(ly) + 20, t.text2, 1.5);
    labels += text(x(mc) + 8, y(ly) + 4, `mean $${mc.toFixed(2)} a run · score ${Math.round(ms * 1000) / 10}% · ${Math.round(mt)} s`, { size: 12, cls: "b" });
    labels += text(x(mc) + 8, y(ly) + 20, a === "none" ? `${MODEL} alone` : `${MODEL} + design-engineering`, { size: 11, cls: "s" });
  }
  const H = Y1 + 56;
  const desc = arms.map(({ a, runs }) => `${a === "none" ? "Plain" : "Full skill"}: ${runs.length} runs, mean cost $${mean(runs.map((r) => r.cost_usd)).toFixed(2)}, mean score ${Math.round((R.arms[a]?.score ?? 0) * 1000) / 10}%`).join(". ") + ". Most runs of both arms score 100%; the full-skill dots sit further right.";
  return svg(W, H, `Score against cost per run, ${MODEL}`, desc, grid + body + labels + dots, t);
}

mkdirSync(OUT, { recursive: true });
const written = [];
for (const [name, fn] of [["bench-tasks", tasksChart], ["bench-clusters", clustersChart], ["bench-cost", costChart]]) {
  for (const mode of ["light", "dark"]) { const f = join(OUT, `${name}-${mode}.svg`); writeFileSync(f, fn(THEMES[mode])); written.push(f); }
}
console.log(written.map((f) => f.replace(ROOT + "\\", "").replace(ROOT + "/", "")).join("\n"));
