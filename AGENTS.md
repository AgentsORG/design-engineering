# AGENTS.md

Repo-level operating guidance for AI agents working in this codebase. Pairs with [SOUL.md](SOUL.md), which carries identity (voice, stance, taste lineage). This file is the **what / how**; SOUL.md is the **who / why**. Read both on cold start.

## What this repo is

A single agent skill packaged as a **skill graph** — one root `SKILL.md` (the Map of Content) plus a `references/` folder of atomic, wikilinked nodes organised into themed subfolders (`philosophy/`, `motion/`, `sound/`, `typography/`, `surface/`, `components/`, `layout/`, `anti-patterns/`, `meta/`), an `evals/` folder for Perplexity-style Step-0 evals, and a `scripts/` folder with the one tool the knowledge needs (`sound-family.mjs`, a dependency-free sound generator). A sibling `agents/` directory ships nine workflow subagents that map to the highest-value design-engineering tasks. The skill encodes design engineering knowledge.

Since v2.0.0 the repo is organised around **four primitives**: Knowledge (`skills/design-engineering/`, Agent Skills spec), Package (root `plugin.json`, [Agent Plugins v1.0.0](https://agent-plugins.org/)), Runtime (`agent/` + `evals/`, the [eve](https://eve.dev/) framework), and Client extensions (`agents/`, `commands/`, and the per-host manifest dirs, declared under reverse-domain namespaces in `plugin.json` `extensions`). The knowledge is canonical; everything else delivers it. `agent/skills/` is **generated** by `scripts/sync-skills.mjs` — never edit it; edit `skills/design-engineering/` and re-sync.

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
- Theme folders: `references/<theme>/` — one per cluster. Current themes: philosophy, motion, sound, svg, typography, surface, components, layout, anti-patterns, meta.
- Scripts: `skills/design-engineering/scripts/` — only for work the agent cannot do by reading (today: `sound-family.mjs`, which calls ElevenLabs or synthesizes offline, with its example manifest; `svg-flipbook.mjs`, which assembles SVG frames into one animated SVG). No dependencies, Node 18+. Don't add a script for anything a node can describe.
- The router: `references/meta/skill-router.md` is the first thing `/design-engineering` runs — contract, phase, one owner, companions. New clusters and subagents get a row there and in `routing-table.md`, or they are unreachable.
- MOCs: `references/<theme>/MOC-<theme>.md` — one per theme folder. Indexes that theme's atomic nodes.
- Atomic nodes: `references/<theme>/<concept-name>.md`.
- A new theme = a new folder + a new `MOC-<theme>.md` + a link from SKILL.md. Don't create themes for fewer than 3 nodes — fold into an existing one.
- Frontmatter on every node (light: `title`, `summary`, `tags`) — required for Obsidian graph indexing.
- **Subagents**: `agents/<agent-name>.md` — YAML frontmatter (`name`, `description`, `tools`, `model`) plus a system-prompt body. Hoisted to repo root for `npx plugins` / Cursor plugin discovery; names match the basename so wikilinks resolve. Don't add a subagent unless it has a workflow the main agent can't do cheaply inline.
- **eve mirrors**: every subagent in `agents/<name>.md` has an eve twin at `agent/subagents/<name>/` (an `agent.ts` carrying the delegation `description` + model, and an `instructions.md` carrying the body with skill paths rewritten to `$HOME/.agents/skills/...`). When you change a subagent, change both. Root identity lives in `agent/instructions.md` (distilled from SOUL.md). Evals in `evals/*.eval.ts` guard the review-format table contract and concrete-motion-values rule — keep them passing.
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
- **AgentsORG `.design` (github.com/AgentsORG/design)** — the `design.v1` living visual contract. Mirrored offline at `spec/design-file-spec.md`; runtime guidance in `meta/using-design-file`; starter contract at `templates/design-engineering.design`. Note the precedence chain: a project's `.design` outranks this skill, which sits at the "generic taste skills" tier. When editing the starter, re-validate with the upstream `scripts/lint_design.py`.
- **Agentation (agentation.com / benjitaylor/agentation)** — click-to-annotate design-review workflow. Drives `philosophy/pointing-beats-describing` and `meta/agentation-workflow`.
- **Index — Emil Kowalski & Glenn Carstens-Peters (index.how)** — "say precisely what you mean" design vocabulary. Drives `philosophy/articulate-precisely`, `meta/design-vocabulary`, and `components/component-confusables`.
- **Apple (WWDC19 *Designing Audio-Haptic Experiences*, HIG *Playing audio* / *Feedback*, Twenty Thousand Hertz *The Sound of Apple* with Hugo Verweij)** — causality / harmony / utility, the first-vs-hundredth-use test, silent-switch respect, organic materials. Drives the `sound/` cluster.
- **ITU-R BT.1359** — audio/video sync thresholds (+45 / −125 ms) in `sound/sound-motion-sync`.
- **bruno (@tvnxty, superfx.co)** — launch-video sound register; the measured sound map in `sound/launch-video-sound` comes from HKTITAN's analysis of the 2026-09-03 Base logo reveal.
- **Studio Dumbar/DEPT** — OpenAI brand motion and ChatGPT-5 sizzle sound; the "organic motion" register.
- **Josh Comeau (use-sound)** — mute-toggle rules, playback-rate variation, the hook API. **Blattner et al. (1989)** — earcon grammar.
- **ElevenLabs (text-to-sound-effects API)** — on-demand generation path. **Stability AI (Stable Audio 3 Small-SFX, Community License)**, **KilledByAPixel/ZzFX**, **Kenney**, **soundcn**, **Freesound** — the no-key paths.
- **Emil Kowalski's design-engineering practice, distilled** — the typography, color, surface, forms, touch, polish, performance, component-API, marketing, prototyping, tooling, docs, unslop, and skill-writing nodes added in 2.1.0. Cite as "Emil Kowalski's design-engineering practice … distilled by HKTITAN"; glosses are this graph's own and no course material is quoted or linked.
- **supermemoryai/skills `svg-animations`** — engine choice, stroke drawing, SMIL timing, the morphing rule in `svg/`.
- **Adrian Abelarde (Anim8)** — the MP4 → editable animated SVG pipeline and its flat-art constraint in `svg/video-to-vector-pipeline`; tools: vtracer, Potrace, ffmpeg, SVGO.
- **WebPAI DesignBench (arXiv 2506.06251) and Design Arena** — `meta/design-benchmarks` and the `design-bench` eval fixtures.
- **Companions** — AgentsORG `.design` (contract 1.3: `tokens.sound`, `exports.frame_md`, video targets), impeccable (23 named passes), HyperFrames (`frame.md`), ElevenLabs, transitions-dev, shadcn CLI — routed by `meta/skill-router`, never duplicated.
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
2. **`frontmatter-check`** — every file under `skills/design-engineering/references/` and `agents/` must start with `---` YAML.
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

## Plugin manifests

Six manifests ship alongside the skills.sh registry entry:

- **`plugin.json`** (repo root) — the **canonical** manifest, conforming to the [Agent Plugins specification v1.0.0](https://agent-plugins.org/) (`$schema: https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`). Declares the portable core (`skills/`) implicitly and the client extensions explicitly under reverse-domain namespaces in `extensions`. Edit identity fields here first; mirror to the host manifests.
- **`.plugin/plugin.json`** — vendor-neutral manifest for [vercel-labs/plugins](https://github.com/vercel-labs/plugins) (`npx plugins add AgentsORG/design-engineering`). The CLI translates `.plugin/` into per-host folders when missing.
- **`.claude-plugin/plugin.json`** — minimal Claude Code plugin metadata (name, description, version, author, homepage, repository, license). Omits a `skills` field — Claude Code auto-discovers the root `skills/` directory.
- **`.claude-plugin/marketplace.json`** — single-entry marketplace with `"source": "./"` so the repo doubles as its own marketplace. Add via `/plugin marketplace add AgentsORG/design-engineering`.
- **`.codex-plugin/plugin.json`** — richer manifest with `keywords`, `skills: "./skills/"`, `agents: "./agents/"`, `commands: "./commands/"`, and an `interface` block (displayName, shortDescription, longDescription, developerName, category, capabilities, defaultPrompt, brandColor).
- **`.cursor-plugin/plugin.json`** — Cursor IDE manifest with `$schema`, `displayName`, `publisher`, `category`, `tags`, `keywords`, `skills`, `agents`, and `commands` paths.

**shadcn registry.** `registry.json` and `r/*.json` are **generated** by `npm run build:registry` from `skills/`, `agents/`, `commands/`, and `templates/design-engineering.design`. The `r/` items embed file content, so any edit to those sources makes them stale — rebuild and commit in the same PR. CI fails on drift and validates every item against the published shadcn schemas. Edit `scripts/build-registry.mjs` to change what ships, never the generated JSON.

When changing version: bump it in all six manifest files (root `plugin.json`, `.plugin/`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/`, `.cursor-plugin/`) plus `skills/design-engineering/SKILL.md` and `package.json`. The `Plugin manifest versions match` CI step enforces parity — drift will fail the lint job.

## License

MIT.
