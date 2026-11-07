// Copies the canonical skill graph (skills/design-engineering/) into every eve
// authored skill slot: the root agent (agent/skills/design-engineering/) and
// each declared subagent at any depth (agent/subagents/<name>/skills/...,
// agent/subagents/<name>/subagents/<child>/skills/...). eve seeds each slot
// into that agent's sandbox at $HOME/.agents/skills/design-engineering/.
// Declared subagents inherit nothing from the root, so each needs its own copy.
// The repo-root copy is the single source of truth; every synced copy is
// generated and gitignored.
//
//   node scripts/sync-skills.mjs          sync root + all subagents
//   node scripts/sync-skills.mjs --check  exit 1 if any slot is missing or stale
//   node scripts/sync-skills.mjs --clean  remove every synced copy
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "skills", "design-engineering");
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

const targets = agentDirs().map((d) => join(d, "skills", "design-engineering"));

if (args.has("--clean")) {
  for (const t of targets) rmSync(t, { recursive: true, force: true });
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
  for (const t of targets) {
    rmSync(t, { recursive: true, force: true });
    cpSync(src, t, { recursive: true });
  }
  console.log(`synced ${relative(root, src)} -> ${targets.length} agents:`);
  for (const t of targets) console.log(`  ${relative(root, t)}`);
}
