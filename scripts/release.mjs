#!/usr/bin/env node
// Release helper. One version, eight places.
//
//   node scripts/release.mjs --bump 4.1.0        # write the version everywhere + open a CHANGELOG section
//   node scripts/release.mjs --verify 4.1.0      # exit 1 unless every place says 4.1.0 (CI, release.yml)
//   node scripts/release.mjs --assets 4.1.0 dist # build release zips + notes from CHANGELOG (release.yml)
//
// Then: commit, `git tag v4.1.0`, `git push --follow-tags` — release.yml publishes the GitHub release.
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const JSON_PLACES = [
  ["plugin.json", (j) => j, "version"],
  ["package.json", (j) => j, "version"],
  [".plugin/plugin.json", (j) => j, "version"],
  [".claude-plugin/plugin.json", (j) => j, "version"],
  [".claude-plugin/marketplace.json", (j) => j.plugins[0], "version"],
  [".codex-plugin/plugin.json", (j) => j, "version"],
  [".cursor-plugin/plugin.json", (j) => j, "version"],
];
const SKILL = "skills/design-engineering/SKILL.md";
const SKILL_RE = /^(\s*version:\s*")([^"]+)(")/m;

const [cmd, version, outDir = "dist"] = process.argv.slice(2);
if (!cmd || !version || !/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
  console.error("usage: release.mjs --bump|--verify|--assets <x.y.z> [outDir]");
  process.exit(64);
}

const read = (p) => readFileSync(p, "utf8");
const versions = () => [
  ...JSON_PLACES.map(([p, pick, k]) => [p, pick(JSON.parse(read(p)))[k]]),
  [SKILL, (read(SKILL).match(SKILL_RE) || [])[2]],
];

if (cmd === "--verify") {
  const bad = versions().filter(([, v]) => v !== version);
  for (const [p, v] of versions()) console.log(`${v === version ? "ok " : "BAD"} ${p}: ${v}`);
  if (bad.length) process.exit(1);
} else if (cmd === "--bump") {
  for (const [p, pick, k] of JSON_PLACES) {
    const raw = read(p);
    const j = JSON.parse(raw);
    pick(j)[k] = version;
    writeFileSync(p, JSON.stringify(j, null, 2) + (raw.endsWith("\n") ? "\n" : ""));
  }
  writeFileSync(SKILL, read(SKILL).replace(SKILL_RE, `$1${version}$3`));
  const log = read("CHANGELOG.md");
  if (!log.includes(`## [${version}]`)) {
    const today = new Date().toISOString().slice(0, 10);
    // Whatever sat under [Unreleased] becomes this version's section.
    writeFileSync("CHANGELOG.md", log.replace(/## \[Unreleased\]\n(\nNothing yet\.\n)?/, `## [Unreleased]\n\nNothing yet.\n\n## [${version}] — ${today}\n`));
  }
  console.log(`bumped to ${version}; edit CHANGELOG.md, then rebuild: npm run build:agents && npm run build:registry`);
} else if (cmd === "--assets") {
  mkdirSync(join(outDir, "registry"), { recursive: true });
  // claude.ai / Skills API upload format: the skill folder at the zip root.
  execFileSync("git", ["archive", "--format=zip", "--prefix=design-engineering/", "-o", join(outDir, `design-engineering-skill-${version}.zip`), "HEAD:skills/design-engineering"]);
  execFileSync("git", ["archive", "--format=zip", "--prefix=design-engineering/", "-o", join(outDir, `design-engineering-${version}.zip`), "HEAD"]);
  for (const f of readdirSync("r")) cpSync(join("r", f), join(outDir, "registry", f));
  const log = read("CHANGELOG.md");
  const start = log.indexOf(`## [${version}]`);
  if (start < 0) { console.error(`CHANGELOG.md has no ## [${version}] section`); process.exit(1); }
  const next = log.indexOf("\n## [", start + 5);
  const section = log.slice(start, next < 0 ? undefined : next).trim();
  const title = section.split("\n")[0].replace(/^## \[(.+?)\]\s*—?\s*/, "v$1 — ").trim();
  const body = section.split("\n").slice(1).join("\n").trim();
  writeFileSync(join(outDir, "NOTES.md"), `${title}\n`);
  writeFileSync(join(outDir, "NOTES-BODY.md"), `${body}\n\nInstall: \`curl -fsSL https://raw.githubusercontent.com/AgentsORG/design-engineering/v${version}/install.sh | bash\` (Windows: \`irm https://raw.githubusercontent.com/AgentsORG/design-engineering/v${version}/install.ps1 | iex\`).\n`);
  console.log(`assets in ${outDir}`);
} else {
  console.error(`unknown command ${cmd}`);
  process.exit(64);
}
