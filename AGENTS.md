# AGENTS.md

Repo-level operating guidance for AI agents working in this codebase. Pairs with [SOUL.md](SOUL.md), which carries identity (voice, stance, taste lineage). This file is the **what / how**; SOUL.md is the **who / why**. Read both on cold start.

## What this repo is

A single agent skill packaged as a **skill graph** — one root `SKILL.md` (the Map of Content) plus a `references/` folder of atomic, wikilinked nodes organised into themed subfolders (`philosophy/`, `motion/`, `typography/`, `surface/`, `components/`, `layout/`, `anti-patterns/`, `meta/`) and an `evals/` folder for Perplexity-style Step-0 evals. A sibling `agents/` directory ships six workflow subagents that map to the highest-value design-engineering tasks. The skill encodes design engineering knowledge.

The graph is intentionally **Obsidian-compatible**: installers can open this repo as a vault to navigate clusters in the graph view and edit nodes in place. The recommended companion is [kepano/obsidian-skills](https://www.skills.sh/kepano/obsidian-skills). Preserving that compatibility is a constraint on every edit (see rule 6).

## When editing this repo

**1. Edit atomic nodes, not the SKILL.md.** The SKILL.md is a map. Real content lives in `references/<theme>/`. If you're adding new knowledge, drop the atomic node into the matching themed subfolder and link it from that theme's `MOC-<theme>.md`. Only update SKILL.md when adding a new top-level topic (which means adding a whole new theme folder).

**2. Atomic nodes are short and standalone.** Target 40–80 lines per node. Each node:
- States the principle in the first paragraph.
- Backs it with a source (Emil, Benji, guidelines.sh, or HKTITAN).
- Ends with a gotcha or counter-example.
- Links to neighbors via `[[node-name]]` (no `.md` extension).

**3. The description in SKILL.md frontmatter is a routing trigger.** It says *when* to load the skill, not *what* the skill does. Phrasing should match real user queries ("designing a component", "why does this feel flat", "should this animate"). Do not rewrite it without an eval.

**4. Gotchas append, instructions don't grow.** When the agent gets something wrong, add a one-liner to `references/gotchas.md`. Do not lengthen existing nodes or rewrite the description.

**5. Wikilinks carry meaning.** Embed `[[name]]` in prose, not in a bare "See also" list at the end. Per Akshay's framing: the link itself is an instruction to the model about when/why to follow it.

**6. Keep the graph Obsidian-compatible.** Installers view and edit this skill as an Obsidian vault. That means: wikilinks stay as `[[name]]` (no path, no `.md` extension), every node carries YAML frontmatter so the graph view can index it, and filenames stay unique across the vault — Obsidian resolves `[[name]]` by basename, so two files sharing a name silently collide. Never introduce path-prefixed wikilinks (`[[references/name]]`) or `.md`-suffixed ones; both break the bare-name pattern and degrade the graph view.

## File conventions

- Filenames: lowercase, hyphenated, no extension in wikilinks, **unique across the vault** (Obsidian resolves wikilinks by basename, so theme subfolders are organizational only — they don't create namespaces).
- Theme folders: `references/<theme>/` — one per cluster. Current themes: philosophy, motion, typography, surface, components, layout, anti-patterns, meta.
- MOCs: `references/<theme>/MOC-<theme>.md` — one per theme folder. Indexes that theme's atomic nodes.
- Atomic nodes: `references/<theme>/<concept-name>.md`.
- A new theme = a new folder + a new `MOC-<theme>.md` + a link from SKILL.md. Don't create themes for fewer than 3 nodes — fold into an existing one.
- Frontmatter on every node (light: `title`, `summary`, `tags`) — required for Obsidian graph indexing.
- **Subagents**: `skills/design-engineering/agents/<agent-name>.md` — YAML frontmatter (`name`, `description`, `tools`, `model`) plus a system-prompt body. Names match the basename so wikilinks resolve. Don't add a subagent unless it has a workflow the main agent can't do cheaply inline.
- Markdown linted via `.markdownlint.jsonc`.

## Sources of truth

Each atomic node should cite its source at the bottom. The current sources are:

- **Emil Kowalski** — animation, easing, springs, gestures, transform/opacity discipline, clip-path, Sonner principles, debugging.
- **Benji Taylor** — delight-impact curve, fly-not-teleport, feeling-right, lerp-breathing (Liveline), morphing-icons, shared-letter-morph, tray-rules.
- **Jakub Antalik (transitions.dev)** — cross-blur, compose-subtract-asymmetry, distance-falloff-propagation, multi-segment-shake.
- **guidelines.sh** — typography, color, hover states, visual-imperfection, interaction-personality, cards-design, forms-validation, layout, content-authenticity, anti-patterns, marketing-vs-product UI.
- **Vercel (vercel.com/design/guidelines)** — accessibility-baseline, optimistic-updates, copy-voice, url-as-state, contrast-and-color-scheme.
- **Ben DC (github.com/bendc/frontend-guidelines)** — css-conventions, dependency-discipline.
- **DiceBear** — `components/avatar-systems` references the v9.x catalog of procedural avatar styles.
- **Lucide-animated / @pqoqubbw** — `motion/hover-default-imperative` pattern.
- **Google Labs Code (github.com/google-labs-code/design.md)** — design-token format. Mirrored offline at `spec/design-md-spec.md`; runtime guidance in `meta/using-design-md`.
- **Agentation (agentation.com / benjitaylor/agentation)** — click-to-annotate design-review workflow. Drives `philosophy/pointing-beats-describing` and `meta/agentation-workflow`.
- **agentskills/agentskills** — canonical Agent Skills specification, mirrored offline at `spec/agent-skills-spec.md`.
- **HKTITAN / installer** — `meta/gotchas.md` and `meta/pov.md`. These grow over time and reflect lived experience. Forked installers should edit `meta/pov.md`.

## What NOT to do

- Don't duplicate content across nodes. Link instead.
- Don't add a node that the model already knows from training data (per Perplexity's "every Skill is a tax" rule).
- Don't add prescriptive command sequences ("run git X then Y") — describe the intent, let the model choose the steps.
- Don't add empty MOCs. An MOC with fewer than 3 atomic nodes should be inlined into SKILL.md.

## For human contributors

See:
- [CONTRIBUTING.md](CONTRIBUTING.md) — PR conventions, node format, length targets, checklist, cross-model testing.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — Contributor Covenant v2.1.
- [SECURITY.md](SECURITY.md) — responsible-disclosure policy.
- [CHANGELOG.md](CHANGELOG.md) — release notes.

The rules in this file are operating guidance for AI agents editing the repo; CONTRIBUTING.md is the human-facing version of the same constraints.

## Install & test

```bash
# install
npx skills add AgentsORG/design-engineering

# validate (optional, agentskills.io CLI)
skills-ref validate ./skills/design-engineering
```

## Testing

CI runs four checks on every PR (see [`.github/workflows/lint.yml`](.github/workflows/lint.yml)):

1. **`markdown-lint`** — `markdownlint` against `.markdownlint.jsonc`.
2. **`frontmatter-check`** — every file under `skills/design-engineering/references/` and `skills/design-engineering/agents/` must start with `---` YAML.
3. **`skill-structure`** — required files exist (`SKILL.md`, `AGENTS.md`, `SOUL.md`, `LICENSE`, `CONTRIBUTING.md`, etc.); description starts with `Load when` or `Use when`; skill name matches folder name.
4. **`link-check`** — every `[[wikilink]]` in skill content resolves to a real reference node or subagent file.

Run locally before pushing:

```bash
npm install -g markdownlint-cli@0.41.0
markdownlint '**/*.md' --ignore node_modules --ignore .obsidian --config .markdownlint.jsonc
```

The lint job is the authoritative gate. If it passes on your branch, the PR is mechanically clean.

## skills.sh discovery

This skill is indexed at [skills.sh/agentsorg/design-engineering/design-engineering](https://www.skills.sh/agentsorg/design-engineering/design-engineering). Discovery is automatic — skills.sh re-indexes on `npx skills add` calls. If the live page shows stale metadata after a release, re-run `npx skills add AgentsORG/design-engineering` once to trigger a re-index. There is no manual publish step.

## License

MIT.
