#!/usr/bin/env node
// design-engineering PostToolUse hook: after an Edit/Write to a CSS, TSX, JSX,
// SVG or HTML file, run the deterministic design checks and hand any findings
// back to the agent as a non-blocking note (additionalContext). Never blocks,
// never fails the tool call, never sends file contents anywhere.
//
// Order of preference for the checks:
//   1. skills/design-engineering/scripts/grade.mjs --checks-only --json <file>
//      (found via the skill-root list below)
//   2. the small built-in rule set in this file
//
// Opt out: DE_HOOKS=0, or a file named `hooks.off` in
// ~/.config/design-engineering/ (the installer writes it for --no-hooks).

import { existsSync, readFileSync, statSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

const EXTS = new Set(['.css', '.scss', '.tsx', '.jsx', '.svg', '.html', '.vue', '.svelte']);
const MAX_BYTES = 512 * 1024;
const MAX_NOTES = 8;

function done(context) {
  if (context) {
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: context },
    }));
  }
  process.exit(0);
}

function optedOut() {
  if (process.env.DE_HOOKS === '0' || process.env.DE_HOOKS === 'off') return true;
  const cfg = process.env.XDG_CONFIG_HOME || join(homedir(), '.config');
  return existsSync(join(cfg, 'design-engineering', 'hooks.off'));
}

function readStdin() {
  try { return readFileSync(0, 'utf8'); } catch { return ''; }
}

function skillRoots() {
  const roots = [];
  if (process.env.CLAUDE_PLUGIN_ROOT) roots.push(join(process.env.CLAUDE_PLUGIN_ROOT, 'skills', 'design-engineering'));
  if (process.env.DE_SKILL_ROOT) roots.push(process.env.DE_SKILL_ROOT);
  // no cwd-relative root: a cloned repo must not get its own grade.mjs run on every edit
  roots.push(join(homedir(), '.agents', 'skills', 'design-engineering'));
  roots.push(join(homedir(), '.claude', 'skills', 'design-engineering'));
  return roots;
}

function gradeChecks(file) {
  for (const root of skillRoots()) {
    const grade = join(root, 'scripts', 'grade.mjs');
    if (!existsSync(grade)) continue;
    // --out keeps grade.mjs's report card out of the user's project (it defaults to ./.design-grade)
    const outDir = join(tmpdir(), 'design-engineering-hook');
    const r = spawnSync(process.execPath, [grade, '--checks-only', '--json', '--out', outDir, file], {
      encoding: 'utf8', timeout: 12000,
    });
    if (r.status !== 0 || !r.stdout) return null;
    try {
      const out = JSON.parse(r.stdout);
      // grade/1 card: facts live under axes.<id>.facts; also accept a flat list
      const list = Array.isArray(out) ? out
        : (out.findings || out.checks || Object.values(out.axes || {}).flatMap((a) => a.facts || []));
      return list
        .filter((f) => !String(f.location || '').startsWith('(')) // episode-level facts (no-evidence) are not about this edit
        .map((f) => ({
          line: f.line ?? Number(String(f.location || '').match(/:(\d+)$/)?.[1] || 0),
          severity: f.severity || 'should',
          msg: f.message || f.msg || f.title || f.why || String(f.rule || f.id || ''),
          node: f.node || f.ref || '',
        }));
    } catch { return null; }
  }
  return null;
}

// Built-in fallback rules. Each one names the graph node that explains it.
const RULES = [
  { re: /transition\s*:\s*all\b/i, sev: 'should', node: 'motion/transform-opacity-only',
    msg: '`transition: all` animates every property; list the ones you mean (transform, opacity).' },
  { re: /transition(-property)?\s*:[^;]*\b(width|height|top|left|right|bottom|margin|padding)\b/i, sev: 'should',
    node: 'motion/transform-opacity-only', msg: 'Layout property in a transition; animate transform/opacity instead.' },
  { re: /scale\(\s*0(\.0+)?\s*\)/, sev: 'should', node: 'motion/never-scale-from-zero',
    msg: 'Element scales from 0; start near 0.95 with opacity so it does not pop from nothing.' },
  { re: /(?:transition|animation)[^;]*?(?:\b(?:[6-9]\d\d|[1-9]\d{3,})ms\b|[\s:,](?:0?\.[6-9]\d*|[1-9]\d*(?:\.\d+)?)s\b)/i, sev: 'nit',
    node: 'motion/duration-table', msg: 'Duration over 500 ms; UI motion usually sits at 150-300 ms.' },
  { re: /outline\s*:\s*(none|0)\b/i, sev: 'blocker', node: 'components/touch-and-focus',
    msg: 'Outline removed; make sure a :focus-visible style replaces it.', unless: /focus-visible/ },
  { re: /z-index\s*:\s*\d{4,}/i, sev: 'nit', node: 'surface/z-index-strategy',
    msg: 'Four-digit z-index; use the layer scale instead of escalating.' },
  { re: /<img\b(?![^>]*\balt=)[^>]*>/i, sev: 'blocker', node: 'components/accessibility-baseline',
    msg: '<img> without alt.' },
  { re: /<svg\b(?![^>]*\bviewBox=)[^>]*>/, sev: 'should', node: 'svg/svg-creation',
    msg: '<svg> without viewBox will not scale cleanly.' },
  { re: /\bonClick=\{[^}]*\}[^>]*>/, sev: 'nit', node: 'components/keyboard-patterns',
    msg: 'onClick on a non-button element? Use <button> so keyboard and screen readers work.',
    lineTest: /<(div|span|li)\b[^>]*onClick=/ },
];

function builtinChecks(file, text) {
  const out = [];
  const lines = text.split(/\r?\n/);
  for (const rule of RULES) {
    if (rule.unless && rule.unless.test(text)) continue;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (rule.lineTest ? rule.lineTest.test(l) : rule.re.test(l)) {
        out.push({ line: i + 1, severity: rule.sev, msg: rule.msg, node: rule.node });
        break; // one note per rule per file keeps the context small
      }
    }
  }
  const animates = /@keyframes|animation\s*:|transition\s*:/.test(text);
  const ext = extname(file).toLowerCase();
  if (animates && (ext === '.css' || ext === '.scss') && !/prefers-reduced-motion/.test(text)) {
    out.push({ line: 0, severity: 'should', node: 'motion/prefers-reduced-motion',
      msg: 'Motion without a prefers-reduced-motion branch in this file.' });
  }
  return out;
}

const raw = readStdin();
if (optedOut() || !raw) done();
let input;
try { input = JSON.parse(raw); } catch { done(); }
const ti = (input && input.tool_input) || {};
const file = ti.file_path || ti.path || '';
if (!file || !EXTS.has(extname(file).toLowerCase()) || !existsSync(file)) done();
let text;
try {
  if (statSync(file).size > MAX_BYTES) done();
  text = readFileSync(file, 'utf8');
} catch { done(); }

const findings = gradeChecks(file) ?? builtinChecks(file, text);
if (!findings.length) done();
const rows = findings.slice(0, MAX_NOTES).map((f) => {
  const where = f.line ? `:${f.line}` : '';
  const slug = f.node ? String(f.node).split('/').pop() : '';
  const ref = slug && !String(f.msg).includes(`[[${slug}]]`) ? ` [[${slug}]]` : '';
  return `- ${f.severity}${where}: ${f.msg}${ref}`;
});
const more = findings.length > MAX_NOTES ? `\n- ...and ${findings.length - MAX_NOTES} more` : '';
done(`design-engineering checks on ${file} (non-blocking; fix if they apply, ignore if intended):\n${rows.join('\n')}${more}`);
