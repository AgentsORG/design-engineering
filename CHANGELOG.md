# Changelog

All notable changes to this skill are recorded here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.7.2] — 2026-05-22

### Added

- **`.plugin/plugin.json`** — vendor-neutral manifest for `npx plugins add AgentsORG/design-engineering` ([vercel-labs/plugins](https://github.com/vercel-labs/plugins)).
- **`agents/`** (repo root) — six workflow subagents hoisted from `skills/design-engineering/agents/` so the plugins CLI and Cursor/Codex manifests discover them at install time.
- **`commands/`** — six slash workflows: `review-ui`, `motion-audit`, `scan-ai-tells`, `agentation-fix`, `apply-design-md`, `fork-pov`.

### Changed

- **`.cursor-plugin/plugin.json`**, **`.codex-plugin/plugin.json`** — `agents` and `commands` paths; version **1.7.2**.
- **`README.md`** — Plugins CLI install section; repository layout updated.
- **`AGENTS.md`**, **`SOUL.md`**, **`skills/design-engineering/SKILL.md`** — subagent path `agents/`; version **1.7.2**.
- **`.github/workflows/lint.yml`** — CI checks `agents/` at repo root; five-manifest version parity including `.plugin/`.

### Removed

- **`skills/design-engineering/agents/*.md`** (except redirect `README.md`) — content lives under repo-root `agents/`.

## [1.7.1] — 2026-05-22

### Fixed

- **`skills/design-engineering/SKILL.md`** — description rewrapped as a double-quoted YAML scalar and embedded `"..."` substrings rephrased to plain prose. The skills.sh web indexer was showing "0 skills" despite the CLI installing fine (CLI parses YAML loosely; the indexer's parser appeared brittle on unquoted double-quote substrings inside the value). Similar regressions documented at [vercel-labs/skills#1017](https://github.com/vercel-labs/skills/issues/1017) and [#1036](https://github.com/vercel-labs/skills/issues/1036).
- **`.claude-plugin/plugin.json`**, **`.claude-plugin/marketplace.json`**, **`.codex-plugin/plugin.json`**, **`.cursor-plugin/plugin.json`** — version bumped to 1.7.1 to satisfy the `Plugin manifest versions match` CI check.

No content changes; pure indexing-safety patch.

## [1.7.0] — 2026-05-22

### Added — multi-agent plugin manifests (hyperframes pattern)

The repo now ships three agent-specific plugin manifests in addition to the skills.sh / `npx skills add` install path, following the same pattern as [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes). Each major agent host can install the design-engineering skill via its native plugin system without going through the cross-agent `skills.sh` shim.

- **`.claude-plugin/plugin.json`** (NEW) — minimal Claude Code plugin metadata (name, description, version, author, homepage, repository, license). No `skills` field — Claude Code auto-discovers from `skills/`.
- **`.claude-plugin/marketplace.json`** (refactored) — single-entry pattern with `"source": "./"` so the repo doubles as its own marketplace. Drops the nested `plugins[].skills[]` array in favor of auto-discovery. Top-level `owner` instead of `author` (matches the hyperframes / Claude Code marketplace schema).
- **`.codex-plugin/plugin.json`** (NEW) — full OpenAI Codex manifest with `keywords`, `skills: "./skills/"`, and an `interface` block (displayName: "Design Engineering by HKTITAN", shortDescription, longDescription, developerName, category: Design, capabilities: Read+Write, defaultPrompt array, brandColor: `#0a0a0a`).
- **`.cursor-plugin/plugin.json`** (NEW) — Cursor IDE manifest with `$schema`, `displayName`, `publisher`, `category: developer-tools`, `tags`, `keywords`, and the same `skills` path.

Install paths now read:

```bash
# Cross-agent (recommended) — skills.sh
npx skills add AgentsORG/design-engineering

# Claude Code marketplace
/plugin marketplace add AgentsORG/design-engineering
/plugin install design-engineering

# Codex marketplace
codex plugin marketplace add AgentsORG/design-engineering --sparse .codex-plugin --sparse skills

# Cursor — sideload via Settings → Plugins → Load unpacked
```

### Changed

- **`README.md`** — Install section expanded with per-agent commands. Repository-layout tree updated to show all three plugin dotfolders.
- **`AGENTS.md`** — new `## Plugin manifests` section documenting the four manifests and the version-parity convention.
- **`.github/workflows/lint.yml`** — required-files check extended to `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`, `.cursor-plugin/plugin.json`. New `Plugin manifests are valid JSON` step parses all four manifests with Python. New `Plugin manifest versions match` step verifies that all four manifests + SKILL.md report the same version (drift fails the lint job).
- **`skills/design-engineering/SKILL.md`** version bumped to 1.7.0.

### Breaking-ish

The Claude Code `marketplace.json` schema changed shape: top-level `owner` replaces `author`, and the nested `plugins[].skills[]` array was removed in favor of auto-discovery from `skills/`. Existing installs continue to work because the skill content path (`skills/design-engineering/SKILL.md`) is unchanged. New installs via `/plugin marketplace add` use the simpler pattern.

## [1.6.0] — 2026-05-22

### Added — per-agent souls

Each of the six workflow subagents now carries its own `## Soul` section at the bottom of its file. The block inherits from the repo-root `SOUL.md` and narrows that floor to the subagent's specific job — who it is, truths it holds, boundaries it refuses to cross, and the voice it speaks in.

The pattern follows the same five-section spirit as [steipete/SOUL.md](https://github.com/steipete/SOUL.md), compressed inline so the harness can load it alongside the agent's system prompt without a separate file fetch:

- **`ui-reviewer`** — Senior design engineer pairing on code review. Table is the deliverable; prose is throat-clearing.
- **`motion-auditor`** — Tuner of timing and easing. Animator's precision, no flourish; cite the curve and the number.
- **`anti-pattern-scanner`** — Deletion specialist. Clinical, surgical; flag the unmotivated, not the merely common.
- **`agentation-fix-loop`** — Implementer's voice. Annotation is the spec; the diff is the deliverable.
- **`design-md-consumer`** — Consumer, not author. Deferential to the project's design system; confident about *how*, respectful about *what*.
- **`pov-curator`** — Facilitator, not author. Prompts with the right questions; writes only what the installer dictates.

### Changed

- **`SOUL.md`** — Related section now flags that each subagent ships its own narrowed soul block.
- **`skills/design-engineering/agents/README.md`** — "What they all share" section documents the soul-block convention.
- **`.github/workflows/lint.yml`** — new `Subagent soul block` step verifies every subagent file declares a `## Soul` section. Joins the existing frontmatter + filename-match checks.
- **`skills/design-engineering/SKILL.md`** + **`.claude-plugin/marketplace.json`** version bumped to 1.6.0.

## [1.5.0] — 2026-05-22

### Added — SOUL.md, 6 workflow subagents, AGENTS.md polish

The skill now ships an identity layer (`SOUL.md`) and a set of six narrow-purpose subagents that cover the highest-value design-engineering workflows. Everything stays Obsidian-compatible and skills.sh-compliant.

- **`SOUL.md`** at repo root — the [steipete/SOUL.md](https://github.com/steipete/SOUL.md) + [OpenClaw](https://docs.openclaw.ai/reference/templates/SOUL) five-section template (Core Truths, Boundaries, Vibe, Continuity, Related). Anchors voice in the existing taste lineage (Emil, Benji, Jakub, guidelines.sh, Vercel, Ben DC). Cross-linked from AGENTS.md and SKILL.md so non-OpenClaw harnesses pick it up.
- **`skills/design-engineering/agents/`** — six workflow subagents, each ~80–150 lines, with `name` / `description` / `tools` / `model` frontmatter per the [Claude Code subagent spec](https://docs.claude.com/en/docs/claude-code/sub-agents):
  - `ui-reviewer` — runs the `[[review-format]]` Before / After / Why table + `[[review-checklist]]` audit.
  - `motion-auditor` — animation / transition critique against the motion cluster + transitions.dev.
  - `anti-pattern-scanner` — AI-default-tell deletion list (purple gradients, Inter-on-marketing, stock copy).
  - `agentation-fix-loop` — Session-2 fix side of the [[agentation-workflow]] two-session pattern.
  - `design-md-consumer` — reads a project's DESIGN.md and threads tokens through generated UI.
  - `pov-curator` — helps installers fork [[pov]] and append to [[gotchas]].
- **`skills/design-engineering/agents/README.md`** — directory index + selection guide. Documents *why* there are workflow subagents instead of theme parrots.

### Changed

- **`AGENTS.md`** — adds explicit `## Testing` section (CI gate explainer), a `## skills.sh discovery` paragraph documenting the re-index trigger, and a cross-link to SOUL.md. File-conventions section now covers the `agents/` directory layout.
- **`SKILL.md`** — adds `compatibility:` frontmatter field per [Agent Skills specification](spec/agent-skills-spec.md), `metadata.subagents` + `metadata.soul` pointers, and two new MOC sections (Workflow subagents, Identity / SOUL.md). Version bumped to 1.5.0.
- **`.github/workflows/lint.yml`** — required-files check extended to validate SOUL.md and all six subagent files. New `Subagent frontmatter fields` step verifies each subagent declares `name`, `description`, `tools`, `model`, and that the name matches the filename. Wikilink resolver now indexes `agents/` basenames so cross-references from SKILL.md resolve.
- **`.claude-plugin/marketplace.json`** — version bumped to 1.5.0; description expanded to mention subagents and SOUL.md.

### skills.sh compatibility note

The local SKILL.md was already structurally compatible with [skills.sh](https://www.skills.sh) (valid `name` / `description`, `Load when` prefix, name-matches-folder). The live page at [skills.sh/agentsorg/design-engineering/design-engineering](https://www.skills.sh/agentsorg/design-engineering/design-engineering) was showing a stale "No SKILL.md available" warning. Re-running `npx skills add AgentsORG/design-engineering` after this release should trigger a re-index.

## [1.4.0] — 2026-05-22

### Added — Obsidian vault polish

The `.obsidian/` config now ships a coherent visual layer for installers who open the repo as a vault:

- **Graph view color groups** — every node is colored by its theme cluster, with `MOC-*.md` hub files standing out in the warmest hue so the structure of the graph reads at a glance. Nine groups: MOCs, philosophy, motion, typography, surface, components, layout, anti-patterns, meta.
- **`.obsidian/snippets/vault-tokens.css`** — small CSS snippet that wires Obsidian's UI to the same tokens the skill itself recommends: one easing curve, three durations (60ms / 180ms / 220ms), the 6 / 10 / 14px radius scale, 1px hover lifts on interactive elements, `scale(0.98)` press, full `prefers-reduced-motion` guard.
- **Accent color** set to a calm coral that complements the warm-cream surface most note-taking themes default to.
- **`appearance.json`** declares the snippet enabled so it's active on first open.

Nothing in the published skill content changed — these only affect the vault-view experience when installers browse the repo in Obsidian.

## [1.3.0] — 2026-05-22

### Changed — repo migration

The skill's canonical home moved from [`HKTITAN/design-engineering`](https://github.com/AgentsORG/design-engineering) (auto-redirects) to [`AgentsORG/design-engineering`](https://github.com/AgentsORG/design-engineering). All URL references updated:

- **Install command** is now `npx skills add AgentsORG/design-engineering`.
- **README** badges (`skills.sh`, `CI`), the paste-into-agent block, file-tree mentions, and Sources section updated to the new URL.
- **AGENTS.md** install command updated.
- **CONTRIBUTING.md** clone URL and issues link updated.
- **.claude-plugin/marketplace.json** `homepage` and `repository` updated; version bumped to 1.3.0.
- **skills/design-engineering/SKILL.md** frontmatter `metadata.version` bumped to 1.3.0.
- **CHANGELOG** compare links updated.

The old URL (`HKTITAN/design-engineering`) auto-redirects via GitHub, so existing clones and installed skills continue to work. New installs should use the AgentsORG URL.

### Attribution unchanged

- LICENSE copyright stays "HKTITAN" — the individual author.
- `metadata.author: HKTITAN` in SKILL.md frontmatter — unchanged.
- `marketplace.json` `author.name: HKTITAN`, `author.url: https://github.com/HKTITAN` — unchanged (HKTITAN is the human curator; AgentsORG is the new repo owner).
- `meta/pov.md` HKTITAN starter POV — unchanged (it's an example for installers to override).

## [1.2.1] — 2026-05-22

### Fixed

- `template/SKILL.md` renamed to `template/TEMPLATE.md`. The skills.sh CLI globs `**/SKILL.md` across the repo when discovering installable skills, so the template file was appearing as a second skill candidate (`your-skill-name`) in the install picker. Renaming sidesteps the glob while keeping the starter content discoverable to contributors. ([#install-picker-fix](https://github.com/AgentsORG/design-engineering/commit/v1.2.1))
- `.github/workflows/lint.yml` required-files check updated to reference `template/TEMPLATE.md`.
- README file tree and `marketplace.json` version updated accordingly.

## [1.2.0] — 2026-05-21

Adds two more named sources mirrored offline in `spec/` — the full [Agent Skills specification](https://github.com/agentskills/agentskills) and [Google Labs' design.md format](https://github.com/google-labs-code/design.md) — plus integrates [Agentation](https://www.agentation.com) as both an installer-recommended companion tool and a skill-graph node.

### Added — 3 new nodes

- `meta/using-design-md.md` — How the agent reads, respects, and rarely updates a project's `DESIGN.md` file. Token-category → relevant skill-node cross-reference table.
- `meta/agentation-workflow.md` — Install Agentation. Click-to-annotate design review. Two-session critique-then-fix workflow with MCP. Critique style guidelines.
- `philosophy/pointing-beats-describing.md` — Benji Taylor's principle: precise machine-readable selection (selectors, file paths, computed styles) beats prose when feedback goes to an AI agent.

### Added — 2 new spec mirrors

- `spec/agent-skills-spec.md` — Full mirror of the canonical Agent Skills specification (previously only a one-line pointer). Apache-2.0 / CC-BY-4.0.
- `spec/design-md-spec.md` — Full mirror of the design.md format spec (frontmatter token schema, section order, CLI, linter rules, programmatic API). Apache-2.0.

### Changed

- `SKILL.md` description expanded to mention consuming DESIGN.md tokens and giving feedback through Agentation. Version bumped to 1.2.0.
- `MOC-philosophy.md` links `[[pointing-beats-describing]]`. SKILL.md Meta section links the two new meta nodes.
- `README.md` adds a **Recommended companions** section that points installers to Obsidian and Agentation, with install commands. Sources section expanded with Google Labs Code, agentskills.io, and Agentation. See-also section links the new spec mirrors. File count updated to 75.
- `AGENTS.md` adds three new entries to Sources of truth: Google Labs Code, Agentation, agentskills.io.
- `marketplace.json` v1.2.0; description mentions Agentation workflow and design.md consumption.

## [1.1.0] — 2026-05-21

Adds two more named sources — [Vercel's web-interface guidelines](https://vercel.com/design/guidelines) and [Ben DC's frontend-guidelines](https://github.com/bendc/frontend-guidelines) — distilled into 7 new atomic nodes covering accessibility, copy voice, URL state, contrast math, optimistic updates, CSS conventions, and dependency discipline.

### Added — 7 new nodes

**`components/` (3 nodes)**

- `accessibility-baseline.md` — Keyboard-everywhere, `:focus-visible` rings, hit targets (24/44px), ARIA names on icon-only buttons, polite aria-live for async. The a11y floor below taste. (Vercel + bendc)
- `optimistic-updates.md` — Update UI immediately on likely-success actions, reconcile or undo on failure. Largest perceived-latency win available without infra changes. Pair destructive actions with Undo toasts. (Vercel)
- `copy-voice.md` — Active voice, Title Case for headings/buttons, "&" over "and", numerals for counts, error messages that guide the exit. Microcopy is design. (Vercel)

**`layout/` (1 node)**

- `url-as-state.md` — Filters, tabs, pagination, panels — all live in the URL. Back/forward restores scroll. Deep-link every modal. (Vercel)

**`surface/` (1 node)**

- `contrast-and-color-scheme.md` — APCA over WCAG 2 for contrast math. `<meta name="theme-color">` + `color-scheme: dark`. Interactions raise contrast. Avoid gradient banding. (Vercel)

**`motion/` (1 node)**

- `css-conventions.md` — `1turn` over `360deg`, unitless line-height, hex over rgb, native browser APIs over libraries. Ben DC's CSS dialect choices. (bendc)

**`philosophy/` (1 node)**

- `dependency-discipline.md` — Every dependency is a tax. Replicate simple utilities. Draw shapes in CSS. Prefer native browser APIs. The bundle is design. (bendc)

### Changed

- `SKILL.md` description expanded to mention writing UI copy and auditing a11y. All 5 affected MOCs updated to link the new nodes.
- `marketplace.json` version bumped to 1.1.0; description expanded to list the new source authors.
- `README.md` — repo layout tree includes new nodes; Sources section adds Vercel + bendc with their specific contributions; file count updated to 72 markdown files.
- `AGENTS.md` — Sources of truth section adds Vercel + bendc with the node lists they sourced.

## [1.0.0] — 2026-05-21

Initial public release of the `design-engineering` skill graph.

### Skill content

**8 themed clusters, 53 atomic nodes + 8 MOCs + 1 SKILL.md.**

- `philosophy/` — 8 nodes: taste-is-trained, unseen-details-compound, beauty-is-leverage, delight-impact-curve, feeling-right, marketing-vs-product-ui, states-are-the-work, data-is-content.
- `motion/` — 25 nodes covering animation decisions, easing, durations, springs, gestures, stagger, accessibility, transitions, library design, debugging, and Benji Taylor's full catalog (lerp-breathing, morphing-icons, shared-letter-morph, tray-rules) plus the lucide-animated hover-default-imperative pattern.
- `typography/` — 2 nodes: typography-humanity, line-length-tracking.
- `surface/` — 5 nodes: color-monochromatic, dark-mode, shadows-whisper, border-radius, visual-imperfection.
- `components/` — 7 nodes: hover-states-subtle, empty-loading-states, icon-systems, cards-design, forms-validation, avatar-systems (all 31 DiceBear v9.x styles with previews), interaction-personality.
- `layout/` — 2 nodes: viewport-custom-design, sticky-and-scroll-tells.
- `anti-patterns/` — 2 nodes: ai-default-tells, content-authenticity.
- `meta/` — 5 files: review-format (required for UI critiques), review-checklist, cross-model-testing, gotchas, pov.

### Evals (Perplexity Step 0)

- `skills/design-engineering/evals/loading.jsonl` — 20 positive + negative routing tests.
- `skills/design-engineering/evals/progressive-reads.jsonl` — 20 retrieval tests.
- `skills/design-engineering/evals/README.md` — format spec.

### Scaffolding

- `spec/agent-skills-spec.md` — pointer to the [Agent Skills specification](https://agentskills.io/specification).
- `template/SKILL.md` — starter template for new skills.
- `.claude-plugin/marketplace.json` — Claude Code marketplace manifest.

### Policy and CI

- `CODE_OF_CONDUCT.md` — Contributor Covenant v2.1.
- `SECURITY.md` — responsible-disclosure (3-business-day acknowledgement).
- `CONTRIBUTING.md` — node format, length targets, themes table, PR checklist, evals guidance, cross-model testing.
- `.github/workflows/lint.yml` — markdownlint, frontmatter check, required-files check, `Load when` description check, wikilink resolution check.
- `.github/PULL_REQUEST_TEMPLATE.md`.
- `AGENTS.md` — repo-level operating guidance for AI agents editing the repo.

### Sources distilled

- **Emil Kowalski** — [emilkowalski/skill](https://github.com/emilkowalski/skill), [animations.dev](https://animations.dev), Sonner, Vaul.
- **Benji Taylor** — [benji.org](https://benji.org) (Family Values, Honkish, Liveline, Morphing Icons with Claude, Annotating, Agentation).
- **Jakub Antalik** — [transitions.dev](https://transitions.dev) (cross-blur, compose-subtract-asymmetry, distance-falloff-propagation, multi-segment-shake).
- **James Frewin** — [guidelines.sh](https://guidelines.sh).
- **dmytro / @pqoqubbw** — [lucide-animated.com](https://lucide-animated.com).
- **DiceBear** — [dicebear.com/styles](https://www.dicebear.com/styles) — all 31 v9.x styles in `components/avatar-systems`.
- **HKTITAN / Duolingo Skills** — [hktitan/duolingo](https://github.com/hktitan/duolingo) — skill-graph layout reference.
- **Akshay Pachaar** — [Skill Graphs > SKILL.md](https://x.com/akshay_pachaar) — skill-graph framing.
- **Perplexity Agents team** — [Designing, Refining, and Maintaining Agent Skills](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity) — progressive disclosure, gotchas flywheel, evals-first.
- **Anthropic** — [anthropics/skills](https://github.com/anthropics/skills) — `spec/` + `template/` repo layout.

### Install

```bash
npx skills add AgentsORG/design-engineering
```

[Unreleased]: https://github.com/AgentsORG/design-engineering/compare/v1.7.1...HEAD
[1.7.1]: https://github.com/AgentsORG/design-engineering/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/AgentsORG/design-engineering/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/AgentsORG/design-engineering/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/AgentsORG/design-engineering/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/AgentsORG/design-engineering/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/AgentsORG/design-engineering/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/AgentsORG/design-engineering/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/AgentsORG/design-engineering/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/AgentsORG/design-engineering/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/AgentsORG/design-engineering/releases/tag/v1.0.0
