# Changelog

All notable changes to this skill are recorded here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

*Nothing yet.*

## [2.1.0] — 2026-09-05

Three things at once: `/design-engineering` becomes a **router** over the design-skill ecosystem; two new clusters, **sound** and **svg**; and twenty nodes distilled from Emil Kowalski's design-engineering practice that fill the graph's thin spots (typography mechanics, OKLCH color, surfaces, forms, touch, polish, performance, component APIs, marketing surfaces, prototyping, tooling, docs, the unslop passes, skill writing). Plus design benchmarks and alignment with AgentsORG `.design` contract 1.3.

### Added — the router

- **`references/meta/skill-router.md`** — what `/design-engineering` does first: resolve the design contract (`.design` → `frame.md` / `design.md` / `DESIGN.md`), classify the phase (undecided → foundation → pieces → refine → check → name), pick the material, and hand the job to **one owner** — a node, a subagent, or an installed companion: AgentsORG `design`, impeccable (`/impeccable <command>`), HyperFrames, ElevenLabs `sound-effects`, `transitions-dev`, the shadcn CLI / MCP, `soundcn`. Detection rule for "installed"; companions inherit the contract and [[gotchas]] / [[pov]]. `SKILL.md` step 0, `agent/instructions.md`, `SOUL.md`, and `agents/README.md` point at it.

### Added — `references/svg/` (4 nodes + MOC)

- **`svg-creation`** — viewBox always, paths when it animates, `currentColor` / CSS variables, defs and symbols, named layers, SVGO with animation-safe flags, `<title>`/`<desc>`, the tells of generated SVG.
- **`svg-animation`** — engine by where the file lives (inline CSS/WAAPI · library for gestures · embedded keyframes or SMIL for image use), stroke drawing, `transform-box: fill-box`, composite-only, reduced motion, size budgets vs Lottie.
- **`svg-path-morphing`** — the same-command-count rule, authoring to it, flubber when it fails, and why icon swaps usually beat morphs.
- **`video-to-vector-pipeline`** — flat clip → frames → quantize → vectorize (vtracer / Potrace) → clean → match layers → vector flipbook → Lottie / Rive; the flat-art constraint; after Adrian Abelarde's Anim8.
- **`scripts/svg-flipbook.mjs`** — dependency-free: a folder of SVG frames → one self-contained animated SVG (stepped keyframes, duplicate frames collapsed into holds, `--vars` lifts colors to CSS custom properties, reduced motion freezes on frame 0, `<title>` labelling).
- **`agents/svg-creator.md`**, **`agents/svg-animator.md`** (+ eve twins) and **`commands/svg-create.md`**, **`commands/svg-animate.md`**.

### Added — distilled craft nodes (20)

- surface: **`color-scales-oklch`**, **`depth-and-nesting`**. typography: **`type-scale-and-rhythm`**, **`line-behavior`**. components: **`forms-behavior`**, **`touch-and-focus`** (with the mobile-native fixes table), **`ui-polish-pass`**, **`component-api-design`**. motion: **`performance-discipline`**. layout: **`marketing-surface-rules`**. anti-patterns: **`unslop-pass`**, **`copy-tells`**, **`code-tells`**. meta: **`prototype-picker`**, **`build-a-tool`**, **`vibe-to-generator`**, **`design-system-docs`**, **`skill-writing-rules`**, **`design-benchmarks`**, **`skill-router`**.
- Every one cites "Emil Kowalski's design-engineering practice, distilled by HKTITAN" plus public references; no course material is quoted or linked.

### Added — demo

- **`docs/demo/`** — a twelve-second HyperFrames composition (`hyperframes/index.html`, `check` clean) rendered to MP4 with sound and GIF for the README, five scene screenshots, the six ElevenLabs-generated sounds with their manifest, and the mascot flipbook produced by `svg-flipbook.mjs`. README gains a Demo section and a "What `/design-engineering` produces" gallery.
- **`sound-family.example.json`** — `send` and `receive` prompts ask for damped, very-short-decay notes.
- **`sound-family.mjs`** — tails are trimmed *relative to the peak* (a 5 ms RMS envelope followed until it sits 36 dB under its own peak) instead of at an absolute threshold, because generated audio's room tone lands at a different level every run; the WAV reader walks RIFF chunks. Verified live: tick 66 ms, tap 60 ms, receive 120 ms, error 153 ms, send 384 ms, success 641 ms, all at −3 dBFS.
- **Demo motion pass** — 80 ms group staggers, exits at ~65% of the entrance with an 8 px nudge, overlay and modal paired, every transient placed one frame after its tween settles.

### Added — benchmarks and evals

- **`references/meta/design-benchmarks.md`** — DesignBench (generation / edit / repair, compile + CLIP + MLLM-judge, 9 edit types, repair issue categories) and Design Arena (anonymous pairwise votes, Bradley-Terry, vote threshold), and how this skill borrows both shapes.
- **`skills/design-engineering/evals/design-bench.jsonl`** — twelve fixtures: generation, edit, and repair rows with `must_match` / `must_not_match` regexes tied to review-checklist rows, plus two `arena` rows for blind pairwise judging of node changes.
- **`evals/design-bench.eval.ts`** — eve eval: a generated modal must carry reduced motion and a 0.9x start scale and must not carry `transition: all` or `scale(0)`.

### Added — `.design` contract 1.3 alignment

- **`spec/design-file-spec.md`** mirror and **`references/meta/using-design-file.md`** — `tokens.sound`, `assets.sounds`, `decisions.sound`, video targets, `exports.frame_md`, companion routing; the contract's sound tokens outrank `sound-spec` / `sound-decision-framework`.
- **`templates/design-engineering.design`** — `tokens.sound.enabled: false` + `material`, `exports.frame_md`, commented `assets.sounds`; template 1.2.0; validates against the upstream linter and exports a `frame.md`.

### Added — sound cluster

Adds a ninth cluster: **sound**. The web forgot audio; this release gives the skill a source-cited way to decide whether an interface should be heard, design one material family, sync it to motion, and produce the files — with ElevenLabs when a key is present and open-weight / procedural / CC0 paths when it is not. The launch-video register (OpenAI / Studio Dumbar, bruno @tvnxty) is treated as its own surface with opposite defaults.

### Added — `references/sound/` (8 nodes + MOC)

- **`MOC-sound`** — the two surfaces (product UI silent by default; launch video sound-as-medium) and the read order.
- **`sound-decision-framework`** — frequency → purpose → the 100th-use test → visual twin → off-by-default. Extends `delight-impact-curve` one notch stricter. Sources: Apple WWDC19 *Designing Audio-Haptic Experiences* (utility), Benji Taylor, Josh Comeau, Material Design.
- **`sound-motion-sync`** — the transient lands on the contact frame; audio may lag a frame but never leads. ITU-R BT.1359 thresholds (+45 / −125 ms detectable). Measured: 32 onsets in a 10.7 s bruno (@tvnxty) logo reveal, every one within two frames of a visual motion peak; holds at −56 dBFS.
- **`sound-palette`** — one material per product; size → pitch and length; contour → meaning; consonance → success, dissonance → error; pitch variation on repeats. Earcon grammar (Blattner 1989), Apple's real-instrument practice.
- **`sound-spec`** — duration bands by category, −18 to −14 LUFS for feedback, ≈ −12 for notifications, −14 LUFS / −1 dBTP video master, −3 dBFS peak, mono 44.1 kHz, zero leading silence, high-pass at 150 Hz.
- **`sound-playback-web`** — lazy `AudioContext`, resume on first gesture, decode once, one `AudioBufferSourceNode` per play, persisted mute off by default, never sound-only information, never on `focus`; iOS silent switch and `ambient` session category.
- **`sound-generation-elevenlabs`** — `POST /v1/sound-generation` fields and ranges, 200 credits per generation, the material-first prompt formula ("felt mallet on wood, dry, no tail"), `prompt_influence` 0.8, 0.5 s requests, one session per family, regenerate the whole family.
- **`sound-generation-open-source`** — decision table across open-weight models (Stable Audio 3 Small-SFX on CPU under the Community License; AudioGen weights are non-commercial), procedural synthesis (Web Audio, ZzFX < 1 KB MIT), and CC0 libraries (Kenney, soundcn via shadcn CLI, Freesound APIv2 with a CC0 filter).
- **`launch-video-sound`** — the four measurable properties of the premium register (density mirrors motion, holds are silence, size → pitch/length, materials not effects), a full timed sound map of the @tvnxty Base reveal, and a Remotion / HyperFrames timeline recipe.

### Added — tooling

- **`skills/design-engineering/scripts/sound-family.mjs`** — dependency-free Node 18+ script. One manifest → a normalized family of files. Uses ElevenLabs when `ELEVENLABS_API_KEY` is set, a built-in synthesizer (tick, tap, chime, thud, pop, whoosh) when it is not; trims leading and trailing silence, fades the tail, peaks at −3 dBFS, writes mono 44.1 kHz WAV and a `manifest.json` with prompts, recipes, and licenses. `--dry-run` prints prompts without spending credits. **`sound-family.example.json`** ships a six-sound family.
- **`agents/sound-designer.md`** (+ eve twin `agent/subagents/sound-designer/`) — seventh subagent: decide → palette → generate → spec → wire → sound-map table. **`commands/sound-pass.md`** — its slash command.
- **`evals/sound-values.eval.ts`** — sound advice must name a duration, a level, or say "no sound".

### Changed

- **`SKILL.md`** — description gains sound triggers (deciding whether an interaction should make a sound, generating UI sound effects, syncing sound to animation, scoring a launch video) and the new sources; new **Sound** section; subagents list gains `sound-designer`; version **2.1.0**.
- **`references/meta/routing-table`** — four sound rows. **`disambiguation`** — "Sound has three owners". **`stacking-chains`** — "Add sound to a product" and "Launch video or logo reveal" chains.
- **`references/meta/review-checklist`** — rows 12 (sound with no mute / on by default) and 13 (sound on hover / focus / keystroke / page load); "eleven-row" → "thirteen-row" in `ui-reviewer` and `SKILL.md`.
- **`references/meta/design-vocabulary`** — new category 13, Sound (transient, earcon, contour, material, envelope, tail, dry/wet, one-shot/loop, sprite, LUFS/dBFS/true peak, ducking, pre-roll, whoosh/riser/stinger/braam, audio-haptic harmony).
- **`references/anti-patterns/ai-default-tells`** — Sound table (click on every button, stock-pack sounds, reverb blips, on by default, bed hiding unsynced hits). **`MOC-anti-patterns`**, **`MOC-motion`**, **`interaction-personality`** — cross-cluster pointers.
- **`references/meta/gotchas`** — six sound gotchas dated 2026-09-05.
- **`evals/loading.jsonl`** — five positive and three negative sound queries. **`evals/progressive-reads.jsonl`** — one row per new node.
- **`templates/design-engineering.design`** — `tokens.sound` (default off, peak, loudness classes, durations, max sync lag), `decisions.sound`, three `constraints.never` rows, a sound source; template version 1.1.0.
- **`scripts/build-registry.mjs`** — the skill item now ships `.mjs` and `.json` under `skills/` so the generator installs with the graph; descriptions updated to nine clusters / seven subagents. Registry rebuilt.
- **`.github/workflows/lint.yml`** — required files gain `agents/sound-designer.md` and the script.
- **`README.md`**, **`AGENTS.md`**, **`SOUL.md`**, **`CONTRIBUTING.md`**, **`agents/README.md`**, **`agent/instructions.md`**, all six plugin manifests, `package.json` — ten clusters, nine subagents, nine commands, new sources, version 2.1.0.
- **`references/meta/routing-table`** — twenty new rows for the distilled and SVG nodes; **`disambiguation`** — feels-finished now routes to `ui-polish-pass`, plus feels-wrong vs drops-frames and broken vs unpolished; **`stacking-chains`** — mascot/vector, "looks AI-generated", and documenting-the-system chains; the undecided chain now names `prototype-picker`, `vibe-to-generator`, `build-a-tool`.
- **`references/meta/gotchas`** — nine more entries (nested radius, L-only contrast, `text-wrap: balance` on paragraphs, `opacity: 0` drawers in the tab order, cargo-cult `will-change`, restyling without subtracting, SVG origin, morph command mismatch, loading four skills at once).
- **`evals/loading.jsonl`** and **`progressive-reads.jsonl`** — rows for every new node and the router.
- **`.github/workflows/lint.yml`** — required files gain both SVG subagents and `svg-flipbook.mjs`.

## [2.0.0] — 2026-08-08

The repo is reorganised around **four primitives**: Knowledge (the skill graph), Package ([Agent Plugins v1.0.0](https://agent-plugins.org/)), Runtime ([eve](https://eve.dev/)), and Client extensions (per-host manifests, plus a [shadcn registry](https://ui.shadcn.com/docs/registry)). No knowledge was removed; the delivery layers were rebuilt from first principles.

### Added — shadcn registry

The repo is now a [shadcn registry](https://ui.shadcn.com/docs/registry), so any frontend project can install the skill with the CLI it already has: `npx shadcn@latest add https://raw.githubusercontent.com/AgentsORG/design-engineering/main/r/design-engineering.json`.

- **`registry.json`** + **`r/*.json`** — four items: `design-engineering` (the full 85-file skill graph → `.agents/skills/`), `design-engineering-agents` (six subagents + six commands → `.claude/`), `design-engineering-design-file` (the starter `.design` → project root), and `design-engineering-motion` (a `registry:theme` of easing curves and durations as CSS variables — the lightest way in, no skill install).
- **`scripts/build-registry.mjs`** + `npm run build:registry` — generates both from the canonical sources. The `r/` items embed file content and are committed so raw URLs resolve.
- **CI `registry-check`** — rebuilds and fails on drift, then validates every item and the registry against the published shadcn schemas.

### Added — `.design` contract support

Integrates the [`design.v1` living visual contract](https://github.com/AgentsORG/design) — a machine-readable YAML system with committed aesthetic intent, executable policy, and copy voice.

- **`references/meta/using-design-file.md`** — new meta node: discovery (nearest wins, `extends` resolution), load order, following, updating, drift verification, and the shadcn bridge. States the precedence chain plainly: a project's `.design` outranks this skill, which sits at the generic-taste tier. Silence in the contract is where the craft canon still applies.
- **`spec/design-file-spec.md`** — offline spec mirror (MIT), matching the existing `spec/` convention.
- **`templates/design-engineering.design`** — a starter contract encoding this skill's canonical motion and surface defaults (four easing curves, the duration scale with a 0.6 exit ratio, layered elevation, `constraints.never`). Color and typography are declared in `omitted` — brand decisions the skill advises on but does not make. Validates clean against the upstream linter.
- **`agents/design-md-consumer.md`** (+ eve twin) — broadened from DESIGN.md-only to any design contract: discovers `.design` first, resolves precedence, reports drift as added/removed/modified with a regression flag, and honors `locked` paths.
- **`commands/apply-design-md.md`** — rewritten around contract discovery and bootstrap.
- **`references/meta/using-design-md.md`** — now points at `.design` as the higher-precedence contract when both exist.
- **`plugin.json`** — new `com.shadcn.registry` and `org.agentsorg.design` extension namespaces.

### Added — Agent Plugins conformance

- **`plugin.json`** (repo root, NEW) — canonical manifest with `$schema: https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`. The portable core is `plugin.json` + `skills/`; every client-specific surface is declared under `extensions`, keyed by reverse-domain namespace (`com.anthropic.claude-code`, `com.openai.codex`, `com.cursor.editor`, `dev.vercel.plugins`, `dev.eve.agent`). Clients ignore namespaces they don't implement.

### Added — eve runtime

The repo is now a runnable [eve](https://eve.dev/) project: a durable design-engineering agent whose knowledge is the skill graph.

- **`agent/agent.ts`** — `defineAgent()` runtime config for the root agent.
- **`agent/instructions.md`** — base system prompt distilled from `SOUL.md` (core truths, operating rules, delegation, voice).
- **`agent/subagents/<name>/`** — eve twins of all six workflow subagents, each with an `agent.ts` (delegation description + model) and `instructions.md` (skill paths rewritten to the sandbox seed location `$HOME/.agents/skills/...`).
- **`evals/`** — `defineEval()` scored checks: `review-format.eval.ts` (review requests must return the Before | After | Why table) and `motion-values.eval.ts` (easing advice must name concrete values). `evals.config.ts` holds shared defaults.
- **`scripts/sync-skills.mjs`** + **`package.json`** scripts — `skills/design-engineering/` stays the single source of truth; `agent/skills/` is generated (gitignored) before `eve dev` / `eve eval`.

### Added — routing layer (meta cluster)

Three new meta nodes encode how to *navigate* the graph, not just what's in it:

- **`references/meta/routing-table.md`** — intent → entry-node router plus the four postures (build / judge / decide / name) and their output-shape rules.
- **`references/meta/disambiguation.md`** — the questions that blur together (the four motion questions, three dark-mode owners, two layout-shift owners, craft-vs-floor hit areas) with tiebreakers.
- **`references/meta/stacking-chains.md`** — ordered node chains for multi-step jobs (new screen start-to-ship, feel-better pass, design system from scratch, marketing surface, a11y pass, jank triage, divergent prototyping on a named axis).

### Changed — delivery layers

- **`skills/design-engineering/SKILL.md`** — "How to use" now routes through `[[routing-table]]` first; Meta section lists the three routing nodes; version **2.0.0**.
- **`README.md`** — rewritten around the four primitives; repository layout, Agent Plugins conformance section, eve runtime section.
- **`AGENTS.md`** — four-primitives overview, eve-mirror editing rule (change `agents/<name>.md` and `agent/subagents/<name>/` together), six-manifest version parity.
- **`.github/workflows/lint.yml`** — validates root `plugin.json` + `package.json` JSON; version parity now spans eight files; required-files list includes the eve runtime.
- **`.gitignore`** — ignores `.eve/`, `agent/skills/` (generated), `package-lock.json`.
- All manifests bumped to **2.0.0**.

### Added — Index "articulate" integration (index.how)

Integrates [index.how/to/articulate](https://index.how/to/articulate) — Emil Kowalski & Glenn Carstens-Peters' "say precisely what you mean" design vocabulary — into the skill. Glosses are this skill's own (re-expressed, not lifted); Index is the canonical reference.

- **`references/philosophy/articulate-precisely.md`** — new philosophy node: name the phenomenon exactly and say why it works; precise vocabulary is what converts taste into a rule an agent can follow. Sibling to `pointing-beats-describing` (the *word* vs the *target*). Sources: Index and Emil Kowalski's *Agents with Taste*.
- **`references/meta/design-vocabulary.md`** — new lexicon node: the precise word for each design phenomenon across Index's 188-term `articulate` module (12 categories), with original glosses and `→ [[node]]` cross-links to where each concept is treated in depth. Terms with no deeper node are named but left as plain vocabulary.
- **`references/components/component-confusables.md`** — new components node converting Index's confusable component pairs into a rule: tooltip vs popover (interactive content?), badge vs tag (attached/read-only vs standalone/interactive), sheet vs drawer vs dialog.

### Changed

- **`skills/design-engineering/SKILL.md`** — Philosophy MOC line gains `articulate-precisely`; Meta section gains `design-vocabulary`; description source list adds Index (index.how).
- **`references/philosophy/MOC-philosophy.md`** — lists the new `articulate-precisely` node.
- **`references/components/MOC-components.md`** — lists `component-confusables`.
- **`references/typography/MOC-typography.md`** — cross-cluster pointer to `design-vocabulary` for precise typographic terms.
- **`README.md`**, **`AGENTS.md`**, **`SOUL.md`** — Index added to the "Distills…" intro, repository-layout tree, node count (66 atomic nodes / 86 files), and the Sources / Sources-of-truth / taste-lineage registries.

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
