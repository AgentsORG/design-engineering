// Generates registry.json (the shadcn registry source) and r/*.json (the built,
// content-embedded registry items served over raw GitHub URLs).
//
//   node scripts/build-registry.mjs
//
// Items:
//   design-engineering         the full skill graph  -> ~/.agents/skills/design-engineering/
//   design-engineering-agents  subagents + commands  -> ~/.claude/{agents,commands}/
//   design-engineering-design  starter .design       -> ~/.design
//   design-engineering-motion  motion tokens as cssVars (registry:theme)
import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const HOMEPAGE = "https://github.com/AgentsORG/design-engineering";
// Direct raw host — shadcn does not follow github.com's cross-host redirect.
const RAW = "https://raw.githubusercontent.com/AgentsORG/design-engineering/main/r";

// Sorted so the built output is identical regardless of the filesystem's
// directory order — CI byte-compares it against the committed copy.
const walk = (dir) =>
  readdirSync(join(root, dir))
    .sort()
    .flatMap((entry) => {
      const rel = posix.join(dir, entry);
      return statSync(join(root, rel)).isDirectory() ? walk(rel) : [rel];
    });

const toPosix = (p) => p.split(sep).join(posix.sep);

// Normalize CRLF so the built output is byte-identical on Windows and Linux —
// otherwise a Windows checkout embeds \r\n and CI's rebuild reports drift.
const readText = (path) => readFileSync(join(root, path), "utf8").replace(/\r\n/g, "\n");

// Every file in the skill graph lands under the cross-agent skills directory,
// preserving its path below skills/design-engineering/.
const skillFiles = walk("skills/design-engineering")
  .filter((p) => p.endsWith(".md") || p.endsWith(".jsonl"))
  .map((path) => ({
    path,
    type: "registry:file",
    target: `~/.agents/skills/design-engineering/${relative("skills/design-engineering", path).split(sep).join(posix.sep)}`,
  }));

const hostFiles = [
  ...walk("agents")
    .filter((p) => p.endsWith(".md"))
    .map((path) => ({ path, type: "registry:file", target: `~/.claude/${path}` })),
  ...walk("commands")
    .filter((p) => p.endsWith(".md"))
    .map((path) => ({ path, type: "registry:file", target: `~/.claude/${path}` })),
];

// Canonical motion values. Sourced from references/motion/easing-curves.md and
// duration-table.md, and mirrored in templates/design-engineering.design.
const motionVars = {
  "ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
  "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
  "ease-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
  "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
  "duration-press": "120ms",
  "duration-hover": "160ms",
  "duration-popover": "200ms",
  "duration-modal": "250ms",
  "duration-page": "300ms",
};

const items = [
  {
    name: "design-engineering",
    type: "registry:file",
    title: "Design Engineering skill graph",
    description:
      "The full design-engineering skill graph — 8 themed clusters of atomic, wikilinked nodes covering motion, typography, surface, components, layout, anti-patterns, and the routing layer. Installs into .agents/skills/ where any coding agent can load it.",
    author: "HKTITAN",
    categories: ["design", "agents", "skills"],
    docs: "Restart your coding agent after installing so it picks up the new skill. Start at .agents/skills/design-engineering/SKILL.md; the router is references/meta/routing-table.md. Fork references/meta/pov.md to record your own taste overrides.",
    files: skillFiles,
  },
  {
    name: "design-engineering-agents",
    type: "registry:file",
    title: "Design Engineering subagents and commands",
    description:
      "Six workflow subagents (ui-reviewer, motion-auditor, anti-pattern-scanner, agentation-fix-loop, design-md-consumer, pov-curator) and their slash commands, in Claude Code format.",
    author: "HKTITAN",
    categories: ["design", "agents"],
    docs: "Installs into .claude/agents/ and .claude/commands/. Requires the design-engineering skill item for the reference nodes these agents load.",
    registryDependencies: [`${RAW}/design-engineering.json`],
    files: hostFiles,
  },
  {
    name: "design-engineering-design-file",
    type: "registry:file",
    title: "Starter .design contract",
    description:
      "A design.v1 living visual contract encoding this skill's canonical motion and surface defaults — easing curves, duration scale, layered elevation, and the constraints that keep AI-default tells out. Color and typography are left to your brand.",
    author: "HKTITAN",
    categories: ["design", "design-tokens"],
    docs: "Installs as .design at your project root. Adapt name, intent, and tokens to your product — or reference it from your own contract via `extends`. Agents read it before generating UI; it outranks generic taste skills.",
    files: [
      {
        path: "templates/design-engineering.design",
        type: "registry:file",
        target: "~/.design",
      },
    ],
  },
  {
    name: "design-engineering-motion",
    type: "registry:theme",
    title: "Design Engineering motion tokens",
    description:
      "Motion theme variables: four easing curves worth memorizing and a duration scale keyed to element type. Drop-in for any shadcn project — reference them as var(--ease-out-quart) or, on Tailwind v4, register under @theme inline for utility classes.",
    author: "HKTITAN",
    categories: ["design", "animation", "design-tokens"],
    docs: "Never `transition: all` — name the properties. Entrances use --ease-out-quart; exits run at 60% of their entrance duration. Never ease-in on a UI entrance, and never scale an entrance from 0 (start at 0.95).",
    cssVars: { theme: motionVars },
  },
];

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "design-engineering",
  homepage: HOMEPAGE,
  items,
};

writeFileSync(join(root, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);

const outDir = join(root, "r");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const item of items) {
  const built = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files: item.files?.map((file) => ({
      ...file,
      path: toPosix(file.path),
      content: readText(file.path),
    })),
  };
  if (!built.files) delete built.files;
  writeFileSync(join(outDir, `${item.name}.json`), `${JSON.stringify(built, null, 2)}\n`);
  const size = (JSON.stringify(built).length / 1024).toFixed(0);
  console.log(`r/${item.name}.json  ${item.files?.length ?? 0} files  ${size}kb`);
}

console.log(`registry.json  ${items.length} items  v${pkg.version}`);
