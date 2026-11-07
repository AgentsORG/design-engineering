#!/usr/bin/env node
// Add or remove the design-engineering PostToolUse hook in a Claude Code
// settings.json without touching anything else in the file.
//
//   node merge-settings.mjs --settings ~/.claude/settings.json --command "node /abs/design-check.mjs"
//   node merge-settings.mjs --settings ~/.claude/settings.json --remove
//   add --dry-run to print the result instead of writing it
//
// Idempotent: our entry is found by the marker `design-check.mjs` in its
// command. A timestamped backup is written before any change. A settings file
// that does not parse as JSON is left alone (exit 2), never overwritten.

import { existsSync, readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const MARK = 'design-check.mjs';
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const has = (k) => args.includes(k);
const file = opt('--settings');
const command = opt('--command');
const remove = has('--remove');
const dry = has('--dry-run');
if (!file || (!remove && !command)) {
  console.error('usage: merge-settings.mjs --settings <file> (--command <cmd> | --remove) [--dry-run]');
  process.exit(64);
}

let data = {};
const exists = existsSync(file);
if (exists) {
  const raw = readFileSync(file, 'utf8');
  if (raw.trim()) {
    try { data = JSON.parse(raw); } catch {
      console.error(`skip: ${file} is not valid JSON; add the hook by hand (hooks/settings-snippet.json)`);
      process.exit(2);
    }
  }
}

const ours = (h) => typeof h?.command === 'string' && h.command.includes(MARK);
data.hooks ??= {};
const groups = Array.isArray(data.hooks.PostToolUse) ? data.hooks.PostToolUse : [];
// strip any previous copy of our hook, dropping groups we emptied
const stripped = groups
  .map((g) => ({ ...g, hooks: (g.hooks || []).filter((h) => !ours(h)) }))
  .filter((g, i) => g.hooks.length > 0 || !(groups[i].hooks || []).some(ours));
const before = JSON.stringify(groups);

if (!remove) {
  stripped.push({
    matcher: 'Edit|Write|MultiEdit',
    hooks: [{ type: 'command', command, timeout: 20 }],
  });
}
if (stripped.length) data.hooks.PostToolUse = stripped;
else delete data.hooks.PostToolUse;
if (!Object.keys(data.hooks).length) delete data.hooks;

const changed = JSON.stringify(stripped) !== before;
if (!changed) { console.log(`unchanged: ${file}`); process.exit(0); }
const out = JSON.stringify(data, null, 2) + '\n';
if (dry) { console.log(`would write ${file}:\n${out}`); process.exit(0); }
mkdirSync(dirname(file), { recursive: true });
if (exists) {
  const bak = `${file}.de-backup-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  copyFileSync(file, bak);
  console.log(`backup: ${bak}`);
}
writeFileSync(file, out);
console.log(`${remove ? 'removed hook from' : 'added hook to'} ${file}`);
