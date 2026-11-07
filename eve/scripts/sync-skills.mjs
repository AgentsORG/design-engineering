// Copies the canonical skill graph (../skills/design-engineering/ at the repo
// root) into every eve authored skill slot under the eve app root (eve/): the
// root agent (agent/skills/design-engineering/) and each declared subagent at
// any depth (agent/subagents/<name>/skills/...,
// agent/subagents/<name>/subagents/<child>/skills/...). eve seeds each slot
// into that agent's sandbox at $HOME/.agents/skills/design-engineering/.
// Declared subagents inherit nothing from the root, so each needs its own slot.
// Each slot mirrors the canonical tree with per-file hard links, so there is one
// copy on disk and eve still sees ordinary files (eve's discovery does not follow
// directory symlinks or junctions: a linked slot shows no skills in `eve info`).
// If hard-linking fails (another volume), or with --copy, it copies. Every slot
// is gitignored.
//
// Run from eve/ (npm run sync:skills does):
//
//   node scripts/sync-skills.mjs          hard-link root + all subagents
//   node scripts/sync-skills.mjs --copy   real copies (for builds that won't follow links)
//   node scripts/sync-skills.mjs --check  exit 1 if any slot is missing or stale
//   node scripts/sync-skills.mjs --clean  remove every synced copy
import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, linkSync, unlinkSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// The eve app root (eve/); the canonical skill lives one level up, at the repo root.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "..", "skills", "design-engineering");
const args = new Set(process.argv.slice(2));

/** Agent directories: agent/ plus every agent/subagents/<name>/ (recursive) that has an agent.ts. */
function agentDirs(dir = join(root, "agent")) {
  const out = [dir];
  const subs = join(dir, "subagents");
  if (!existsSync(subs)) return out;
  for (const name of readdirSync(subs).sort()) {
    const child = join(subs, name);
    if (statSync(child).isDirectory() && existsSync(join(child, "agent.ts"))) out.push(...agentDirs(child));
  }
  return out;
}

function files(dir, base = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? files(p, base) : [relative(base, p)];
  });
}

function isLink(p) {
  try { return lstatSync(p).isSymbolicLink(); } catch { return false; }
}
// Remove a slot without following a link into the canonical copy.
function remove(p) {
  if (isLink(p)) unlinkSync(p);
  else rmSync(p, { recursive: true, force: true });
}

const targets = agentDirs().map((d) => join(d, "skills", "design-engineering"));

if (args.has("--clean")) {
  for (const t of targets) remove(t);
  console.log(`removed ${targets.length} synced skill copies`);
} else if (args.has("--check")) {
  const want = files(src).sort();
  const stale = targets.filter((t) => {
    if (!existsSync(t)) return true;
    const have = files(t).sort();
    if (have.join("\n") !== want.join("\n")) return true;
    return want.some((f) => !readFileSync(join(t, f)).equals(readFileSync(join(src, f))));
  });
  for (const t of stale) console.error(`stale: ${relative(root, t)}`);
  if (stale.length) process.exit(1);
  console.log(`ok: ${targets.length} skill copies match ${relative(root, src)}`);
} else {
  let copied = 0;
  for (const t of targets) {
    remove(t);
    mkdirSync(dirname(t), { recursive: true });
    if (!args.has("--copy")) {
      try {
        for (const f of files(src)) {
          mkdirSync(dirname(join(t, f)), { recursive: true });
          linkSync(join(src, f), join(t, f));
        }
        continue;
      } catch {
        remove(t);
      }
    }
    cpSync(src, t, { recursive: true });
    copied++;
  }
  const how = copied === 0 ? "hard-linked" : copied === targets.length ? "copied" : `linked ${targets.length - copied}, copied ${copied}`;
  console.log(`${how} ${relative(root, src)} -> ${targets.length} agents:`);
  for (const t of targets) console.log(`  ${relative(root, t)}`);
}
