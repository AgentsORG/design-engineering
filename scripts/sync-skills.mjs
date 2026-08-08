// Copies the canonical skill graph (skills/design-engineering/) into the eve
// authored slot (agent/skills/design-engineering/) so eve seeds it into the
// sandbox at $HOME/.agents/skills/design-engineering/. The repo-root copy is
// the single source of truth; agent/skills/ is generated and gitignored.
import { cpSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "skills", "design-engineering");
const dest = join(root, "agent", "skills", "design-engineering");

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
console.log(`synced ${src} -> ${dest}`);
