#!/usr/bin/env node
// grade.mjs — grade a design episode (a human's or an agent's) on one scale and write a report card.
//
//   node scripts/grade.mjs --files src/**/*.tsx styles.css [--diff change.diff] [--brief brief.md]
//        [--evidence after.png film.mp4 ...] [--transcript session.jsonl] [--claims "passes AA"]
//        [--judges claude,codex] [--categories a,b] [--out .design-grade] [--reroll]
//        [--checks-only] [--dry-run] [--json] [--self-test]
//
// Order of work (references/meta/grading-rubric.md):
//   1. Deterministic checks over the files and the added lines of --diff. Each finding is a
//      Before / After / Why fact that can only CAP an axis (blocker 4, should 6, nit 8, three
//      shoulds 5). A clean run proves no known mistake, not an idea.
//   2. The gaming check: claims in the transcript / --claims that the checks contradict cap
//      Verification at 3.
//   3. Judges (only with --judges): the episode, secret-scrubbed and copied into the output folder,
//      is handed to scripts/council.mjs. Only a judge's score lifts an axis off the floor; an axis
//      no judge scored reads `unjudged`.
// Results are cached by a hash of every input: the same episode gets the same card. --reroll runs
// again and the card records the re-roll. Local by default; --dry-run prints what a judge would
// receive and sends nothing. Tool output in a transcript is dropped; only human and agent turns
// travel. No dependencies; Node 18+.

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const COUNCIL = join(HERE, "council.mjs");
const VERSION = "grade/1";

// ------------------------------------------------------------------ axes and bands (mirror the rubric)
export const AXES = {
  craft: { label: "Craft", categories: ["typography", "hierarchy", "spacing-layout", "iconography", "states", "color-contrast"] },
  motion: { label: "Motion", categories: ["motion"] },
  restraint: { label: "Restraint", categories: ["restraint", "copy"] },
  access: { label: "Access", categories: ["accessibility", "color-contrast"] },
  verification: { label: "Verification", categories: ["verification"] },
  direction: { label: "Direction", categories: ["direction"] },
};
const CAP = { blocker: 4, should: 6, nit: 8 };

export function band(score) {
  if (score == null) return "unjudged";
  if (score < 4) return "generated";
  if (score < 6) return "passable";
  if (score < 8) return "crafted";
  if (score < 9) return "refined";
  return "reference-grade";
}
const BAND_SAYS = {
  generated: "reads as a default; a reviewer would start by deleting",
  passable: "works, nothing to be proud of",
  crafted: "someone made decisions and most of them hold",
  refined: "the details compound; a peer would ship it",
  "reference-grade": "you would put it in the judging panel as a reference",
  unjudged: "no judge scored it; only the ceiling is known",
};

// ------------------------------------------------------------------ deterministic checks
// Each rule: id, axis, severity, test (per line regex unless `whole`), after, why, node.
const UI_EXT = /\.(css|scss|less|tsx|jsx|ts|js|vue|svelte|html|svg|astro|mdx)$/i;
export const RULES = [
  { id: "transition-all", axis: "motion", severity: "should", re: /transition(-property)?\s*:\s*all\b|\btransition-all\b/, after: "transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms", why: "Animating `all` animates layout and colour you never meant to move.", node: "transform-opacity-only" },
  { id: "scale-zero", axis: "motion", severity: "should", re: /scale\(\s*0\s*\)|\bscale-0\b|scale:\s*0[,;\s}]/, after: "scale(0.95) with opacity 0", why: "Nothing real appears from nothing; scale-from-zero reads as a balloon.", node: "never-scale-from-zero" },
  { id: "ease-in-entrance", axis: "motion", severity: "should", re: /\bease-in\b(?!-out)/, after: "cubic-bezier(0.23, 1, 0.32, 1) (ease-out)", why: "ease-in starts slow, so the UI feels late to respond.", node: "easing-curves" },
  { id: "long-duration", axis: "motion", severity: "should", test: (l) => { const m = [...l.matchAll(/(?:transition|animation)(?:-duration)?\s*:[^;{}]*?\b(\d{3,4})ms\b|duration-(\d{3,4})\b|duration:\s*(\d(?:\.\d+)?)\s*[,}]/g)]; return m.some((x) => { const ms = x[1] ? +x[1] : x[2] ? +x[2] : +x[3] * 1000; return ms > 300 && ms < 5000; }); }, after: "150–250 ms for UI; exits faster than entrances", why: "UI motion over 300 ms makes the product feel slow.", node: "duration-table" },
  { id: "layout-animated", axis: "motion", severity: "should", re: /transition(-property)?\s*:[^;]*\b(width|height|top|left|right|bottom|margin|padding)\b/, after: "animate transform and opacity only", why: "Layout properties re-run layout every frame.", node: "transform-opacity-only" },
  { id: "ungated-hover-motion", axis: "motion", severity: "nit", whole: true, test: (t) => /:hover[^{]*\{[^}]*transform/.test(t) && !/@media\s*\(\s*hover\s*:\s*hover/.test(t), after: "@media (hover: hover) and (pointer: fine) { … }", why: "Hover motion fires on tap on touch screens.", node: "hover-states-subtle" },
  { id: "outline-none", axis: "access", severity: "blocker", corpus: true, test: (t) => /outline\s*:\s*(none|0)\b|\boutline-none\b/.test(t) && !/focus-visible/.test(t), find: /outline\s*:\s*(none|0)\b|\boutline-none\b/, after: ":focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }", why: "Removing the outline with no :focus-visible leaves keyboard users lost.", node: "touch-and-focus" },
  { id: "no-reduced-motion", axis: "access", severity: "should", corpus: true, test: (t) => /@keyframes|\banimation\s*:|transition\s*:|\banimate-|motion\.|useSpring|framer-motion|motion\/react/.test(t) && !/prefers-reduced-motion|useReducedMotion|motion-reduce|motion-safe/.test(t), find: /@keyframes|\banimation\s*:|transition\s*:|\banimate-|framer-motion|motion\/react/, after: "@media (prefers-reduced-motion: reduce) { keep opacity, drop movement }", why: "Movement with no reduced-motion branch.", node: "prefers-reduced-motion" },
  { id: "div-onclick", axis: "access", severity: "should", re: /<(div|span)\b[^>]*\bonClick=/, after: "<button type=\"button\" onClick=…>", why: "A clickable div has no keyboard, focus or role.", node: "accessibility-baseline" },
  { id: "icon-button-unnamed", axis: "access", severity: "should", re: /<button\b(?![^>]*aria-label)[^>]*>\s*<(svg|[A-Z]\w*Icon\b|Icon\b)/, after: "<button aria-label=\"Close\">", why: "An icon-only button needs an accessible name.", node: "accessibility-baseline" },
  { id: "gradient-text", axis: "restraint", severity: "should", re: /background-clip\s*:\s*text|\bbg-clip-text\b/, after: "solid text in the foreground token", why: "Gradient text is the most common generated-page tell.", node: "ai-default-tells" },
  { id: "generated-purple", axis: "restraint", severity: "should", re: /\b(from|via|to)-(purple|violet|indigo|fuchsia)-\d{3}\b|linear-gradient\([^)]*(#8b5cf6|#7c3aed|#6366f1|#a855f7)/i, after: "one accent from the contract on a neutral ramp", why: "The purple-to-indigo gradient is the generated default.", node: "ai-default-tells" },
  { id: "attention-loop", axis: "restraint", severity: "should", re: /\banimate-(pulse|bounce|ping)\b|animation\s*:[^;]*\binfinite\b/, after: "no loop; animate once on the event", why: "A looping animation begs for attention it has not earned.", node: "animation-decision-framework" },
  { id: "tracked-caps-eyebrow", axis: "restraint", severity: "nit", re: /\buppercase\b[^"'`]*\btracking-(wide|wider|widest)\b|\btracking-(wide|wider|widest)\b[^"'`]*\buppercase\b/, after: "sentence case label, normal tracking", why: "Tracked-caps eyebrows over every heading are a generated habit.", node: "ai-default-tells" },
  { id: "status-palette", axis: "restraint", severity: "nit", re: /\b(bg|text)-(green|red|yellow|blue)-500\b/, after: "status tokens from the contract", why: "Framework status colours fight the accent.", node: "color-token-tiers" },
  { id: "emoji-ui", axis: "restraint", severity: "nit", re: /<(button|a|li|h[1-6]|span|p)\b[^>]*>\s*[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u, after: "an icon from the one set, or nothing", why: "Emoji as UI breaks the icon system.", node: "icon-systems" },
  { id: "placeholder-data", axis: "craft", severity: "should", re: /\bJohn Doe\b|\bJane Doe\b|lorem ipsum|\$1,234\b|\bAcme( Inc| Corp)?\b|example@example\.com/i, after: "believable names and amounts that add up", why: "Placeholder content makes the whole screen read fake.", node: "content-authenticity" },
  { id: "z-index-arbitrary", axis: "craft", severity: "should", re: /z-index\s*:\s*(9{3,}|\d{5,})|\bz-\[(9{3,}|\d{5,})\]/, after: "a named layer from the z-index scale", why: "An arms-race z-index hides a missing layer scale.", node: "z-index-strategy" },
  { id: "100vh", axis: "craft", severity: "nit", re: /\b100vh\b|\bh-screen\b|\bmin-h-screen\b/, after: "100dvh (or 100svh for a fixed hero)", why: "100vh is taller than the visible area on phones.", node: "viewport-custom-design" },
  { id: "hover-weight", axis: "craft", severity: "nit", whole: true, test: (t) => /:hover[^{]*\{[^}]*font-weight/.test(t) || /\bhover:font-(bold|semibold|medium)\b/.test(t), find: /:hover|hover:font-/, after: "colour or background change; keep the weight", why: "A weight change on hover reflows the text.", node: "hover-states-subtle" },
  { id: "small-input-text", axis: "craft", severity: "nit", whole: true, test: (t) => /\b(input|textarea|select)\b[^{]*\{[^}]*font-size\s*:\s*(1[0-5]|[0-9])px/.test(t), find: /font-size\s*:\s*(1[0-5]|[0-9])px/, after: "font-size: 16px on inputs", why: "Inputs under 16px zoom the page on iOS.", node: "forms-behavior" },
  { id: "disabled-until-valid", axis: "craft", severity: "nit", re: /disabled=\{\s*!\s*(isValid|valid|formState\.isValid)/, after: "enabled submit that explains what is missing", why: "A disabled submit never says why.", node: "forms-validation" },
];

const lineOf = (text, idx) => text.slice(0, idx).split("\n").length;
const clip = (s, n = 140) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export function checkSources(sources) {
  // sources: [{ path, text }]. Returns findings.
  const findings = [];
  const ui = sources.filter((s) => UI_EXT.test(s.path) || s.path.startsWith("diff:"));
  const corpus = ui.map((s) => s.text).join("\n");
  for (const rule of RULES) {
    if (rule.corpus) {
      if (!rule.test(corpus)) continue;
      for (const s of ui) {
        const m = rule.find.exec(s.text);
        if (m) { findings.push(fact(rule, s.path, lineOf(s.text, m.index), s.text.split("\n")[lineOf(s.text, m.index) - 1])); break; }
      }
      continue;
    }
    for (const s of ui) {
      if (rule.whole) {
        if (!rule.test(s.text)) continue;
        const m = (rule.find || /:hover/).exec(s.text);
        const ln = m ? lineOf(s.text, m.index) : 1;
        findings.push(fact(rule, s.path, ln, s.text.split("\n")[ln - 1]));
        continue;
      }
      const lines = s.text.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const hit = rule.test ? rule.test(lines[i]) : rule.re.test(lines[i]);
        if (hit) { findings.push(fact(rule, s.path, i + 1, lines[i])); break; } // one per rule per file
      }
    }
  }
  findings.push(...contrastFindings(ui));
  return findings.map((f, i) => ({ ...f, id: `G${i + 1}` }));
}
function fact(rule, path, line, text) {
  return { rule: rule.id, axis: rule.axis, severity: rule.severity, location: `${path}:${line}`, before: clip(String(text || "").trim()), after: rule.after, why: `${rule.why} See [[${rule.node}]].`, node: rule.node };
}

// WCAG contrast for hex colour + background pairs declared in one CSS block.
export function hexToRgb(h) {
  let s = h.replace("#", "");
  if (s.length === 3) s = s.split("").map((c) => c + c).join("");
  if (s.length !== 6) return null;
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
}
export function contrast(a, b) {
  const L = (rgb) => { const [r, g, bl] = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * bl; };
  const A = hexToRgb(a), B = hexToRgb(b);
  if (!A || !B) return null;
  const [hi, lo] = [L(A), L(B)].sort((x, y) => y - x);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}
function contrastFindings(sources) {
  const out = [];
  for (const s of sources) {
    const re = /\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(s.text))) {
      const body = m[1];
      const fg = /(?:^|[;\s])color\s*:\s*(#[0-9a-f]{3,6})\b/i.exec(body);
      const bg = /background(?:-color)?\s*:\s*(#[0-9a-f]{3,6})\b/i.exec(body);
      if (!fg || !bg) continue;
      const r = contrast(fg[1], bg[1]);
      if (r == null || r >= 4.5) continue;
      const ln = lineOf(s.text, m.index);
      out.push({ rule: "contrast", axis: "access", severity: r < 3 ? "blocker" : "should", location: `${s.path}:${ln}`, before: `color ${fg[1]} on ${bg[1]} = ${r}:1`, after: "a pair at 4.5:1 or more for body text (3:1 large text)", why: `Measured ${r}:1, under the 4.5:1 floor. See [[wcag-thresholds]].`, node: "wcag-thresholds" });
      break;
    }
  }
  return out;
}

// ------------------------------------------------------------------ moves seen from evidence (never from narration)
export function detectMoves({ sources, removed, evidence }) {
  const all = sources.map((s) => s.text).join("\n");
  const moves = [];
  if (/prefers-reduced-motion|useReducedMotion|motion-reduce/.test(all)) moves.push({ move: "Reduced motion has a still", axis: "access", node: "prefers-reduced-motion" });
  if (evidence.some((e) => /\.(mp4|webm|mov|gif)$/i.test(e))) moves.push({ move: "Film it", axis: "verification", node: "demo-rehearsal" });
  if (/\.design\b|DESIGN\.md|var\(--/.test(all)) moves.push({ move: "Contract first", axis: "craft", node: "using-design-file" });
  if (/:focus-visible/.test(all)) moves.push({ move: "Visible focus", axis: "access", node: "touch-and-focus" });
  if (/(linear-gradient|bg-gradient|animate-(pulse|bounce)|box-shadow)/.test(removed || "")) moves.push({ move: "Subtract before adding", axis: "restraint", node: "unslop-pass" });
  if (/cubic-bezier\(/.test(all)) moves.push({ move: "Name the value", axis: "motion", node: "articulate-precisely" });
  return moves;
}

// ------------------------------------------------------------------ gaming check
const CLAIMS = [
  { re: /reduced[- ]motion/i, contradictedBy: ["no-reduced-motion"], claim: "respects reduced motion" },
  { re: /\b(passes|meets)\b[^.\n]{0,20}\b(AA|WCAG|contrast)\b|contrast (is )?(fine|ok|passes)/i, contradictedBy: ["contrast"], claim: "passes contrast" },
  { re: /\bkeyboard[- ]accessible|focus (states?|rings?) (are |is )?(in place|visible|handled)/i, contradictedBy: ["outline-none", "div-onclick"], claim: "keyboard accessible" },
  { re: /\b(filmed|recorded|rehearsed) (it|the demo|the loop)/i, needsEvidence: /\.(mp4|webm|mov|gif)$/i, claim: "filmed the work" },
  { re: /\b(tested|checked|verified) (it )?(on|at) (mobile|phone|375)/i, needsEvidence: /\.(png|jpe?g|webp|mp4|webm)$/i, claim: "checked at phone width" },
  { re: /no (AI[- ]default )?tells|removed (all )?(the )?gradients?/i, contradictedBy: ["gradient-text", "generated-purple"], claim: "no AI-default tells" },
];
export function gamingCheck(claimText, findings, evidence) {
  const hits = [];
  if (!claimText) return hits;
  const rules = new Set(findings.map((f) => f.rule));
  for (const c of CLAIMS) {
    const m = c.re.exec(claimText);
    if (!m) continue;
    if (c.contradictedBy && c.contradictedBy.some((r) => rules.has(r))) hits.push({ claim: c.claim, quote: clip(m[0], 80), contradiction: `check ${c.contradictedBy.filter((r) => rules.has(r)).join(", ")} fired` });
    if (c.needsEvidence && !evidence.some((e) => c.needsEvidence.test(e))) hits.push({ claim: c.claim, quote: clip(m[0], 80), contradiction: "no matching evidence file" });
  }
  return hits;
}

// ------------------------------------------------------------------ privacy
const SECRET_RES = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g,
  /\bsk-(ant-)?[A-Za-z0-9_-]{16,}/g,
  /\bgh[pousr]_[A-Za-z0-9]{20,}/g,
  /\bgithub_pat_[A-Za-z0-9_]{20,}/g,
  /\bAKIA[0-9A-Z]{16}\b/g,
  /\bxox[abprs]-[A-Za-z0-9-]{10,}/g,
  /\bAIza[0-9A-Za-z_-]{30,}/g,
  /\b(eyJ[A-Za-z0-9_-]{10,}\.){2}[A-Za-z0-9_-]{10,}/g,
  /(Bearer\s+)[A-Za-z0-9._~+/-]{16,}=*/gi,
  /\b((?:api[_-]?key|secret|token|password|passwd|pwd)["']?\s*[:=]\s*["']?)[^\s"',;]{6,}/gi,
];
export function scrub(text) {
  let out = String(text || "");
  let n = 0;
  for (const re of SECRET_RES) out = out.replace(re, (...a) => { n++; const pre = typeof a[1] === "string" && /[:=\s]$/.test(a[1]) ? a[1] : ""; return `${pre}[REDACTED]`; });
  return { text: out, redactions: n };
}

// Keep only human and agent turns; drop tool calls and tool output.
export function transcriptTurns(raw) {
  const lines = String(raw || "").split(/\r?\n/).filter((l) => l.trim());
  const json = lines.every((l) => l.trim().startsWith("{"));
  if (!json) return String(raw || "").split(/\r?\n/).filter((l) => !/^\s*(tool(_result| output| call)|<tool|⎿)/i.test(l)).join("\n");
  const turns = [];
  for (const l of lines) {
    let o; try { o = JSON.parse(l); } catch { continue; }
    const role = o.type === "user" || o.message?.role === "user" ? "human" : o.type === "assistant" || o.message?.role === "assistant" ? "agent" : null;
    if (!role) continue;
    const content = o.message?.content ?? o.content;
    const parts = typeof content === "string" ? [content] : Array.isArray(content) ? content.filter((c) => c && c.type === "text").map((c) => c.text) : [];
    const text = parts.join("\n").trim();
    if (text) turns.push(`${role}: ${text}`);
  }
  return turns.join("\n\n");
}

// Only the agent's own words can be a claim; a human asking for reduced motion is not the agent claiming it.
export function agentText(transcript) {
  const t = String(transcript || "");
  if (/(^|\n)(human|agent): /.test(t)) return t.split(/\n\n(?=(?:human|agent): )/).filter((b) => b.startsWith("agent: ")).join("\n");
  return t.split("\n").filter((l) => !/^\s*(human|user|you)\s*[:>]/i.test(l)).join("\n");
}
// A source path as safe segments under the episode folder: no "..", no drive colon, never escapes it.
export function safeSegments(p) {
  const segs = String(p).replace(/^diff:/, "diff/").replace(/\\/g, "/").split("/").filter((x) => x && x !== "." && x !== "..").map((x) => x.replace(/[:*?"<>|]/g, "_"));
  return segs.length ? segs : ["file"];
}

// ------------------------------------------------------------------ diff
export function parseDiff(raw) {
  const added = {}, removed = [];
  let file = null;
  for (const l of String(raw || "").split(/\r?\n/)) {
    if (l.startsWith("+++ ")) { file = l.slice(4).replace(/^b\//, "").trim(); added[file] = added[file] || []; continue; }
    if (l.startsWith("--- ")) continue;
    if (l.startsWith("+") && file) added[file].push(l.slice(1));
    else if (l.startsWith("-")) removed.push(l.slice(1));
  }
  return { sources: Object.entries(added).filter(([f]) => f !== "/dev/null").map(([f, ls]) => ({ path: `diff:${f}`, text: ls.join("\n") })), removed: removed.join("\n") };
}

// ------------------------------------------------------------------ scoring
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const n = s.length; return n ? (n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2) : null; };

export function ceilingFor(findings, axis, gaming) {
  const fs = findings.filter((f) => f.axis === axis);
  let c = 10;
  for (const f of fs) c = Math.min(c, CAP[f.severity] ?? 10);
  if (fs.filter((f) => f.severity === "should").length >= 3) c = Math.min(c, 5);
  if (axis === "verification" && gaming.length) c = Math.min(c, 3);
  return c;
}

export function scoreAxes({ findings, gaming, judges, hasDirection }) {
  const axes = {};
  const scored = (judges?.members || []).filter((m) => !m.jester && m.status === "ok");
  for (const [id, ax] of Object.entries(AXES)) {
    if (id === "direction" && !hasDirection) continue;
    const ceiling = ceilingFor(findings, id, gaming);
    const vals = [];
    for (const m of scored) for (const c of ax.categories) if (m.scores?.[c]) vals.push(m.scores[c].score);
    const raw = vals.length ? Math.round(median(vals) * 10) / 10 : null;
    const score = raw == null ? null : Math.min(raw, ceiling);
    const spread = vals.length > 1 ? Math.max(...vals) - Math.min(...vals) : null;
    const confs = scored.map((m) => m.confidence).filter((x) => x != null);
    let confidence = null;
    if (score != null) {
      confidence = Math.min(1, 0.4 + 0.15 * scored.length + (confs.length ? 0.2 * median(confs) : 0)) - (spread != null ? Math.min(0.3, spread * 0.06) : 0);
      confidence = Math.round(Math.max(0.1, confidence) * 100) / 100;
    }
    axes[id] = { label: ax.label, score, ceiling, judged: raw, band: band(score), confidence, facts: findings.filter((f) => f.axis === id), capped: raw != null && raw > ceiling };
  }
  return axes;
}

function interpretation(a) {
  const b = a.band;
  const soft = a.confidence != null && a.confidence < 0.7 ? `leans ${b}` : b;
  if (a.score == null) return `Unjudged; the checks set a ceiling of ${a.ceiling}. ${a.facts.length ? `${a.facts.length} check finding(s) hold it there.` : "No known mistake found, which is not the same as a good idea."}`;
  return `${soft[0].toUpperCase()}${soft.slice(1)}: ${BAND_SAYS[b]}.${a.capped ? ` Judges said ${a.judged}; the checks cap it at ${a.ceiling}.` : ""}`;
}
function counterweight(a, ctx) {
  if (a.capped) return "The cap may punish a deliberate choice: read each fact's location before believing the number.";
  if (a.score == null) return "A clean or near-clean check run is the absence of known mistakes, not evidence of craft; only a judge can raise this.";
  if (!ctx.evidence.length) return "No rendered evidence: the judges read code, which flatters layout and hides motion.";
  if (a.confidence != null && a.confidence < 0.7) return "Few judges or a wide spread: one round is noise, read the trend.";
  if (a.facts.length === 0) return "No check fired, so the score rests on the judges alone, who drift upward round over round.";
  return "The reference panel sets the bar; a weaker panel inflates this score.";
}

// ------------------------------------------------------------------ report card
export function reportCard(card) {
  const L = [];
  L.push(`# Design grade`, "", `Episode \`${card.hash}\`${card.cached ? " (cached)" : ""}${card.rerolls ? `, re-rolled ${card.rerolls}×` : ""} · ${card.files.length} file(s) · ${card.evidence.length} evidence file(s) · judges: ${card.judges ? card.judges.members.filter((m) => !m.jester).map((m) => `${m.name} ${m.status}`).join(", ") || "none reachable" : "none (checks only)"}`, "");
  L.push("| Axis | Score | Ceiling | Band | Facts |", "| --- | --- | --- | --- | --- |");
  for (const a of Object.values(card.axes)) L.push(`| ${a.label} | ${a.score ?? "no score"} | ${a.ceiling} | ${a.band} | ${a.facts.length} |`);
  if (card.gaming.length) {
    L.push("", "## Gaming check", "", "| Claim | Quote | Contradicted by |", "| --- | --- | --- |");
    for (const g of card.gaming) L.push(`| ${g.claim} | "${g.quote.replace(/\|/g, "\\|")}" | ${g.contradiction} |`);
    L.push("", "Verification is capped at 3.");
  }
  for (const a of Object.values(card.axes)) {
    L.push("", `## ${a.label}: ${a.score ?? "no score"} (ceiling ${a.ceiling}), ${a.band}`, "");
    if (a.facts.length) {
      L.push("| Before | After | Why |", "| --- | --- | --- |");
      for (const f of a.facts) L.push(`| \`${f.location}\` ${f.severity}: \`${f.before.replace(/\|/g, "\\|").replace(/`/g, "'")}\` | ${f.after.replace(/\|/g, "\\|")} | ${f.why.replace(/\|/g, "\\|")} |`);
      L.push("");
    }
    const mv = card.moves.filter((m) => m.axis === Object.keys(AXES).find((k) => AXES[k].label === a.label));
    if (mv.length) L.push(`Moves seen: ${mv.map((m) => `${m.move} ([[${m.node}]])`).join("; ")}.`, "");
    L.push(`**Interpretation.** ${interpretation(a)}`, "", `**Counterweight.** ${counterweight(a, card)}`, "", `**Confidence.** ${a.confidence ?? "n/a (unjudged)"}`);
  }
  L.push("", "## Not checked", "", "- Anything a script cannot see: whether the idea is good, the copy's voice, motion feel at real speed.");
  if (!card.evidence.length) L.push("- No rendered evidence was supplied.");
  if (card.redactions) L.push(`- ${card.redactions} secret-looking string(s) were redacted before any judge saw the episode.`);
  return L.join("\n") + "\n";
}

// ------------------------------------------------------------------ inputs
function expand(paths) {
  const out = [];
  for (const p of paths) {
    if (!existsSync(p)) continue;
    const st = statSync(p);
    if (st.isDirectory()) {
      for (const e of readdirSync(p)) if (!/^(node_modules|\.git|dist|build|\.next|\.design-grade|\.design-council)$/.test(e)) out.push(...expand([join(p, e)]));
    } else out.push(p);
  }
  return out;
}
function parseArgs(argv) {
  const o = { files: [], evidence: [], _: [] };
  const multi = new Set(["--files", "--evidence"]);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) { o.files.push(a); continue; }
    const k = a.slice(2);
    if (["dry-run", "json", "reroll", "checks-only", "self-test", "help"].includes(k)) { o[k] = true; continue; }
    if (multi.has(a)) { while (i + 1 < argv.length && !argv[i + 1].startsWith("--")) o[k].push(argv[++i]); continue; }
    o[k] = argv[++i];
  }
  return o;
}
const sha = (s) => createHash("sha256").update(s).digest("hex");

export function episodeHash(parts) { return sha(JSON.stringify([VERSION, ...parts])).slice(0, 16); }

const USAGE = `usage: node grade.mjs [--files] <files|dirs...> [--diff f] [--brief f] [--evidence f...] [--transcript f]
       [--claims "text"] [--judges claude,codex] [--categories a,b] [--out dir] [--reroll] [--checks-only] [--dry-run] [--json] [--self-test]`;

export async function main(argv = process.argv.slice(2)) {
  const o = parseArgs(argv);
  if (o.help) { console.log(USAGE); return 0; }
  if (o["self-test"]) return selfTest();
  const files = expand(o.files).filter((f) => UI_EXT.test(f) || /\.(md|txt)$/i.test(f));
  if (!files.length && !o.diff) { console.error(USAGE); return 1; }
  const cwd = process.cwd();
  const sources = files.map((f) => ({ path: relative(cwd, resolve(f)).replace(/\\/g, "/"), text: readFileSync(f, "utf8").replace(/\r\n/g, "\n") }));
  let removed = "";
  if (o.diff) { const d = parseDiff(readFileSync(o.diff, "utf8")); sources.push(...d.sources); removed = d.removed; }
  const evidence = o.evidence.filter((e) => existsSync(e));
  const brief = o.brief && existsSync(o.brief) ? readFileSync(o.brief, "utf8") : o.brief || "";
  const transcript = o.transcript && existsSync(o.transcript) ? transcriptTurns(readFileSync(o.transcript, "utf8")) : "";
  const hasDirection = /(^|\n)human:/.test(transcript) && /(^|\n)agent:/.test(transcript);
  const judgesSpec = o["checks-only"] ? null : o.judges || null;

  const hash = episodeHash([sources.map((s) => [s.path, sha(s.text)]), removed && sha(removed), evidence.map((e) => [basename(e), sha(readFileSync(e))]), sha(brief), sha(transcript), o.claims || "", judgesSpec, o.categories || ""]);
  const outDir = resolve(o.out || ".design-grade", hash);
  const cardPath = join(outDir, "grade.json");

  if (existsSync(cardPath) && !o.reroll && !o["dry-run"]) {
    const card = { ...JSON.parse(readFileSync(cardPath, "utf8")), cached: true };
    console.log(o.json ? JSON.stringify(card, null, 2) : reportCard(card));
    return 0;
  }
  const prevRerolls = existsSync(cardPath) ? (JSON.parse(readFileSync(cardPath, "utf8")).rerolls || 0) : 0;

  const findings = checkSources(sources);
  if (!evidence.some((e) => /\.(png|jpe?g|webp|gif|mp4|webm|mov|svg)$/i.test(e))) findings.push({ id: `G${findings.length + 1}`, rule: "no-evidence", axis: "verification", severity: "blocker", location: "(episode)", before: "no screenshot, render or film supplied", after: "screenshots at desktop and 375 px; a film for anything that moves", why: "Nobody looked at it rendered. See [[demo-rehearsal]].", node: "demo-rehearsal" });
  const gaming = gamingCheck([agentText(transcript), o.claims || ""].join("\n"), findings, evidence);
  const moves = detectMoves({ sources, removed, evidence });

  // Judges: scrubbed copy of the episode, handed to council.mjs.
  let judges = null, redactions = 0;
  if (judgesSpec || o["dry-run"]) {
    const epDir = join(outDir, "episode");
    const copies = [];
    const ctxParts = [];
    for (const s of sources) { const r = scrub(s.text); redactions += r.redactions; copies.push({ path: join(epDir, ...safeSegments(s.path)), text: r.text }); }
    const b = scrub(brief), t = scrub(transcript);
    redactions += b.redactions + t.redactions;
    ctxParts.push("This is a graded design episode. The files listed are scrubbed copies of the author's work.");
    if (b.text) ctxParts.push(`## Brief\n\n${b.text.trim()}`);
    if (t.text) ctxParts.push(`## Transcript (human and agent turns only; tool output removed)\n\n${t.text.trim().slice(0, 20000)}`);
    if (findings.length) ctxParts.push(`## Deterministic findings already recorded (do not repeat them; judge what a script cannot see)\n\n${findings.map((f) => `- ${f.id} ${f.severity} ${f.location}: ${f.rule}`).join("\n")}`);
    const ctxText = ctxParts.join("\n\n") + "\n";
    const categories = o.categories || [...new Set(Object.entries(AXES).filter(([k]) => k !== "direction" || hasDirection).flatMap(([, a]) => a.categories))].join(",");
    const ctxFile = join(outDir, "context.md");
    const args = [COUNCIL, "--target", `Design episode ${hash}`, "--categories", categories, "--members", judgesSpec || "claude,codex", "--no-ledger", "--ledger", join(outDir, "council", "ledger.json"), "--context-file", ctxFile, "--files", ...copies.map((c) => c.path)];
    if (evidence.length) args.push("--evidence", ...evidence.map((e) => resolve(e)));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(ctxFile, ctxText);
    if (o["dry-run"]) {
      console.log(`# grade dry run (nothing is sent; scrubbed copies and context are written under ${outDir})\n`);
      for (const c of copies) { mkdirSync(dirname(c.path), { recursive: true }); writeFileSync(c.path, c.text); }
      console.log(`Redactions: ${redactions}\nDeterministic findings: ${findings.length}\nGaming hits: ${gaming.length}\n\n--- context sent to judges ---\n\n${ctxText}`);
      const r = spawnSync(process.execPath, [...args, "--dry-run"], { encoding: "utf8" });
      console.log("--- council dry run ---\n");
      console.log(r.stdout || r.stderr);
      return 0;
    }
    for (const c of copies) { mkdirSync(dirname(c.path), { recursive: true }); writeFileSync(c.path, c.text); }
    const r = spawnSync(process.execPath, [...args, "--json"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    try { judges = JSON.parse(r.stdout.slice(r.stdout.indexOf("{"))); } catch { judges = { members: [], error: (r.stderr || r.stdout || "council failed").slice(0, 400) }; }
  }

  const axes = scoreAxes({ findings, gaming, judges, hasDirection });
  const card = { version: VERSION, hash, at: new Date().toISOString(), files: sources.map((s) => s.path), evidence: evidence.map((e) => relative(cwd, resolve(e)).replace(/\\/g, "/")), judges, axes, gaming, moves, redactions, rerolls: o.reroll ? prevRerolls + 1 : prevRerolls, cached: false };
  mkdirSync(outDir, { recursive: true });
  writeFileSync(cardPath, JSON.stringify(card, null, 2));
  writeFileSync(join(outDir, "REPORT.md"), reportCard(card));
  console.log(o.json ? JSON.stringify(card, null, 2) : reportCard(card));
  return 0;
}

// ------------------------------------------------------------------ self-test
function selfTest() {
  let pass = 0, failN = 0;
  const ok = (cond, name) => { if (cond) pass++; else { failN++; console.error(`FAIL ${name}`); } };
  const bad = { path: "bad.css", text: `.modal { transition: all 0.3s ease-in; transform: scale(0); }\n.btn:focus { outline: none; }\n.toast { animation: pulse 2s infinite; transition: opacity 500ms; }\n.hero h1 { background-clip: text; }\n.muted { color: #999; background: #fff; }\n.layer { z-index: 99999; }` };
  const good = { path: "good.css", text: `.modal { transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms; transform: scale(0.95); }\n.btn:focus-visible { outline: 2px solid var(--accent); }\n.body { color: #1a1a1a; background: #ffffff; }\n@media (prefers-reduced-motion: reduce) { .modal { transform: none; } }` };
  const fb = checkSources([bad]);
  const rules = new Set(fb.map((f) => f.rule));
  for (const r of ["transition-all", "scale-zero", "ease-in-entrance", "outline-none", "attention-loop", "gradient-text", "long-duration", "contrast", "z-index-arbitrary", "no-reduced-motion"]) ok(rules.has(r), `bad fixture fires ${r}`);
  const fg = checkSources([good]);
  ok(fg.length === 0, `good fixture is clean (got ${fg.map((f) => f.rule).join(",")})`);
  ok(fb.every((f) => /\[\[[a-z0-9-]+\]\]/.test(f.why)), "every fact ends in a wikilink");
  ok(fb.every((f) => /^bad\.css:\d+$/.test(f.location)), "every fact has file:line");
  ok(contrast("#777777", "#ffffff") === 4.48, `contrast #777 on #fff is 4.48 (got ${contrast("#777777", "#ffffff")})`);
  ok(contrast("#000", "#fff") === 21, "contrast black on white is 21");
  ok(band(3.9) === "generated" && band(4) === "passable" && band(6) === "crafted" && band(8.5) === "refined" && band(9) === "reference-grade" && band(null) === "unjudged", "bands");
  const g = gamingCheck("agent: Done — it respects reduced motion and passes WCAG AA.", fb, []);
  ok(g.length === 2, `gaming check catches two contradicted claims (got ${g.length})`);
  ok(gamingCheck("agent: I filmed the demo.", [], []).length === 1, "gaming check: filmed with no film");
  ok(gamingCheck("agent: respects reduced motion", fg, []).length === 0, "gaming check quiet when true");
  const axesBad = scoreAxes({ findings: fb, gaming: g, judges: { members: [{ status: "ok", scores: { motion: { score: 9 }, accessibility: { score: 8 }, verification: { score: 9 }, restraint: { score: 9 } }, confidence: 0.9 }] }, hasDirection: false });
  ok(axesBad.motion.score === 5 && axesBad.motion.capped, `three shoulds cap Motion at 5 (got ${axesBad.motion.score})`);
  ok(axesBad.access.score === 4, `a blocker caps Access at 4 (got ${axesBad.access.score})`);
  ok(axesBad.verification.ceiling === 3, "gaming caps Verification at 3");
  ok(!("direction" in axesBad), "Direction omitted without a steering transcript");
  const axesNone = scoreAxes({ findings: fg, gaming: [], judges: null, hasDirection: false });
  ok(Object.values(axesNone).every((a) => a.score === null && a.band === "unjudged" && a.ceiling === 10), "checks alone never raise: clean and unjudged");
  const s = scrub("key sk-ant-api03-abcdefghijklmnopqrstuvwxyz and token=hunter2hunter2 and ghp_abcdefghijklmnopqrstuvwxyz0123");
  ok(s.redactions === 3 && !/sk-ant|hunter2|ghp_/.test(s.text), `scrub redacts three secrets (got ${s.redactions}: ${s.text})`);
  const tt = transcriptTurns([JSON.stringify({ type: "user", message: { role: "user", content: "make the card calmer" } }), JSON.stringify({ type: "assistant", message: { role: "assistant", content: [{ type: "text", text: "Removed the gradient." }, { type: "tool_use", name: "Edit" }] } }), JSON.stringify({ type: "user", message: { role: "user", content: [{ type: "tool_result", content: "SECRET FILE CONTENTS" }] } })].join("\n"));
  ok(/human: make the card calmer/.test(tt) && /agent: Removed the gradient\./.test(tt) && !/SECRET FILE/.test(tt), "transcript keeps turns, drops tool output");
  const d = parseDiff("--- a/x.css\n+++ b/x.css\n@@\n-.a { background: linear-gradient(red, blue) }\n+.a { transition: all 1s }\n");
  ok(d.sources.length === 1 && checkSources(d.sources).some((f) => f.rule === "transition-all"), "diff added lines are checked");
  ok(detectMoves({ sources: d.sources, removed: d.removed, evidence: [] }).some((m) => m.move === "Subtract before adding"), "removed gradient counts as subtract");
  const h1 = episodeHash([[["a", "1"]], "b"]), h2 = episodeHash([[["a", "1"]], "b"]), h3 = episodeHash([[["a", "2"]], "b"]);
  ok(h1 === h2 && h1 !== h3, "cache hash is stable and input-sensitive");
  const md = reportCard({ hash: h1, files: ["bad.css"], evidence: [], judges: null, axes: axesBad, gaming: g, moves: [], redactions: 0, rerolls: 1 });
  ok(/## Gaming check/.test(md) && /re-rolled 1×/.test(md) && /\*\*Counterweight\.\*\*/.test(md), "report card has gaming, re-roll and counterweight");
  ok(safeSegments("../../../x/y.css").join("/") === "x/y.css" && safeSegments("diff:C:/a/../b.css").join("/") === "diff/C_/a/b.css", "episode copy paths never escape the episode folder");
  ok(gamingCheck(agentText("human: make it calm\nplease keep reduced motion\n\nagent: Done."), fb, []).length === 0, "a human request is not an agent claim");
  ok(gamingCheck(agentText("human: fix it\n\nagent: Done, it respects reduced motion."), fb, []).length === 1, "an agent claim is still caught");
  console.log(`grade.mjs self-test: ${pass} passed, ${failN} failed`);
  return failN ? 1 : 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then((code) => process.exit(code), (e) => { console.error(e.stack || e.message); process.exit(1); });
}
