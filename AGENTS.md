# AGENTS.md

Repo-level operating guidance for AI agents working in this codebase. Pairs with [SOUL.md](docs/SOUL.md), which carries identity (voice, stance, taste lineage). This file is the **what / how**; SOUL.md is the **who / why**. Read both on cold start.

## What this repo is

A single agent skill packaged as a **skill graph** — one root `SKILL.md` (the Map of Content) plus a `references/` folder of atomic, wikilinked nodes organised into themed subfolders (`philosophy/`, `motion/`, `sound/`, `svg/`, `diagram/`, `launch-video/`, `faux-ui/`, `typography/`, `surface/`, `components/`, `layout/`, `anti-patterns/`, `meta/`, plus `commands/` for the `/design-engineering [verb]` files), an `evals/` folder for Perplexity-style Step-0 evals, and a `scripts/` folder with the tools the knowledge needs (`sound-family.mjs`, `sound-sheet.mjs`, `svg-flipbook.mjs`, and the judging tools `council.mjs` and `grade.mjs`). A sibling `agents/` directory ships thirteen subagents: ten workflow subagents plus the judging trio `design-council`, `design-judge` and `design-grader`. The skill encodes design engineering knowledge.

Since v2.0.0 the repo is organised around **four primitives**: Knowledge (`skills/design-engineering/`, Agent Skills spec), Package (root `plugin.json`, [Agent Plugins v1.0.0](https://agent-plugins.org/)), Runtime (`eve/`: `eve/agent/` + `eve/evals/`, the [eve](https://eve.dev/) framework, `eve@^1.0.0-rc.6`, Node 24+), and Client extensions (`plugin/agents/`, `plugin/harness/`, `plugin/hooks/`, and the per-host manifest dirs, declared under reverse-domain namespaces in `plugin.json` `extensions`). The repo root holds only the manifests, installers and top-level docs; everything else lives in a folder (`plugin/`, `eve/`, `bench/`, `registry/`, `scripts/`, `docs/`, `.github/`). The knowledge is canonical; everything else delivers it. Three things are **generated** — never edit them by hand:

- `eve/agent/skills/` (and each subagent's synced skill copy) by `eve/scripts/sync-skills.mjs` (`npm --prefix eve run sync:skills`); edit `skills/design-engineering/` and re-sync.
- `eve/agent/subagents/<name>/` (eve twins) and `plugin/harness/{codex,opencode,gemini,cursor}/agents/` by `scripts/build-agents.mjs` from `plugin/agents/*.md`; edit the Claude Code file and run `node scripts/build-agents.mjs`. A twin whose first line contains `build-agents: keep` is hand-written and left alone.
- `registry/registry.json` and `registry/r/*.json` by `scripts/build-registry.mjs` (see Plugin manifests).

The graph is intentionally **Obsidian-compatible**: installers can open `skills/design-engineering/` as a vault to navigate clusters in the graph view and edit nodes in place. The recommended companion is [kepano/obsidian-skills](https://www.skills.sh/kepano/obsidian-skills). Preserving that compatibility is a constraint on every edit (see rule 6).

## When editing this repo

**1. Edit atomic nodes, not the SKILL.md.** The SKILL.md is a map. Real content lives in `references/<theme>/`. If you're adding new knowledge, drop the atomic node into the matching themed subfolder and link it from that theme's `MOC-<theme>.md`. Only update SKILL.md when adding a new top-level topic (which means adding a whole new theme folder).

**2. Atomic nodes are short and standalone.** Target 40–80 lines per node. Each node:
- States the principle in the first paragraph.
- Backs it with a source (Emil, Benji, guidelines.sh, or AgentsORG).
- Ends with a gotcha or counter-example.
- Links to neighbors via `[[node-name]]` (no `.md` extension).

**3. The description in SKILL.md frontmatter is a routing trigger.** It says *when* to load the skill, not *what* the skill does. Phrasing should match real user queries ("designing a component", "why does this feel flat", "should this animate"). Do not rewrite it without an eval.

**4. Gotchas append, instructions don't grow.** When the agent gets something wrong, add a one-liner to `references/meta/gotchas.md`. Do not lengthen existing nodes or rewrite the description.

**5. Wikilinks carry meaning.** Embed `[[name]]` in prose, not in a bare "See also" list at the end. Per Akshay's framing: the link itself is an instruction to the model about when/why to follow it.

**6. Keep the graph Obsidian-compatible.** Installers view and edit this skill as an Obsidian vault. That means: wikilinks stay as `[[name]]` (no path, no `.md` extension), every node carries YAML frontmatter so the graph view can index it, and filenames stay unique across the vault — Obsidian resolves `[[name]]` by basename, so two files sharing a name silently collide. Never introduce path-prefixed wikilinks (`[[references/name]]`) or `.md`-suffixed ones; both break the bare-name pattern and degrade the graph view.

## File conventions

- Filenames: lowercase, hyphenated, no extension in wikilinks, **unique across the vault** (Obsidian resolves wikilinks by basename, so theme subfolders are organizational only — they don't create namespaces).
- Theme folders: `references/<theme>/` — one per cluster. Current themes: philosophy, motion, sound, svg, diagram, launch-video, faux-ui, typography, surface, components, layout, anti-patterns, meta (plus `commands/`, which holds the `cmd-<verb>.md` files and `MOC-commands.md`, not knowledge).
- Scripts: `skills/design-engineering/scripts/` — only for work the agent cannot do by reading (today: `sound-family.mjs`, which calls ElevenLabs or synthesizes offline, with its example manifest; `sound-sheet.mjs`, which renders a stereo stem from a motion cue sheet; `svg-flipbook.mjs`, which assembles SVG frames into one animated SVG; `council.mjs`, which detects the installed model CLIs and fans one judge brief out to them; `grade.mjs`, which runs the deterministic design checks and hands the episode to the judges). No dependencies, Node 18+ (the eve runtime under `agent/` needs Node 24+).
- Subagents: `plugin/agents/<name>.md` is the one source for every harness. Name equals basename and is unique against every node basename; frontmatter has `name`, `description`, `tools`, `model`; the body stays under 150 lines and carries a `## Loop` (budget, stop conditions, findings ledger) and a `## Soul`. After editing one, run `node scripts/build-agents.mjs`. Don't add a script for anything a node can describe. The Python scripts under `docs/research/launch-films/` (`measure.py`, `aggregate.py` and the rest) are research tools that produced the launch-video numbers, not skill scripts: they need NumPy, OpenCV and ffmpeg (SciPy for one probe; the stats scripts are standard library only) and never move into `skills/`.
- **One entry point.** The skill is invoked only as `/design-engineering [verb] [target]`. Verbs live in the dispatch table at the top of SKILL.md, and each has one command file in `references/commands/cmd-<verb>.md` (a procedure that points into the graph; it repeats no node). A new verb is a table row plus a command file plus an `evals/dispatch.jsonl` row, and CI enforces all three. Never add a root `commands/` folder or a second skill: that splits the entry point. Never put a non-subagent `.md` in root `agents/`, because Claude Code registers each one as a subagent.
- The router: `references/meta/skill-router.md` is the first thing `/design-engineering` runs — contract, phase, one owner, companions. New clusters and subagents get a row there and in `routing-table.md`, or they are unreachable.
- MOCs: `references/<theme>/MOC-<theme>.md` — one per theme folder. Indexes that theme's atomic nodes.
- Atomic nodes: `references/<theme>/<concept-name>.md`.
- A new theme = a new folder + a new `MOC-<theme>.md` + a link from SKILL.md. Don't create themes for fewer than 3 nodes — fold into an existing one.
- Frontmatter on every node (light: `title`, `summary`, `tags`) — required for Obsidian graph indexing.
- **Subagents**: `plugin/agents/<agent-name>.md` — YAML frontmatter (`name`, `description`, `tools`, `model`) plus a system-prompt body. Every manifest points at `./plugin/agents/` (`.claude-plugin/plugin.json` lists each file, since Claude Code takes explicit agent files rather than a directory there); names match the basename so wikilinks resolve. Don't add a subagent unless it has a workflow the main agent can't do cheaply inline.
- **eve mirrors**: every subagent in `plugin/agents/<name>.md` has an eve twin at `eve/agent/subagents/<name>/` (an `agent.ts` carrying the delegation `description` + model, and an `instructions.md` carrying the body with skill paths rewritten to `$HOME/.agents/skills/...`). When you change a subagent, change both. Root identity lives in `eve/agent/instructions.md` (distilled from `docs/SOUL.md`). Evals in `eve/evals/*.eval.ts` guard the review-format table contract, concrete motion and sound values, launch-film numbers and the generated-modal floor — keep them passing.
- Markdown linted via `.github/markdownlint.jsonc`.

## Sources of truth

Each atomic node should cite its source at the bottom. The current sources are:

- **Emil Kowalski** — animation, easing, springs, gestures, transform/opacity discipline, clip-path, Sonner principles, debugging.
- **Benji Taylor** — delight-impact curve, fly-not-teleport, feeling-right, lerp-breathing (Liveline, with its live-data states), morphing-icons, shared-letter-morph, tray-rules, presence-signals (Honk), drawing-toolbar (Drawesome), and the faux-ui cluster from Stageshow.
- **Jakub Antalik (transitions.dev)** — cross-blur, compose-subtract-asymmetry, distance-falloff-propagation, multi-segment-shake.
- **guidelines.sh** — typography, color, hover states, visual-imperfection, interaction-personality, cards-design, forms-validation, layout, content-authenticity, anti-patterns, marketing-vs-product UI.
- **Vercel (vercel.com/design/guidelines)** — accessibility-baseline, optimistic-updates, copy-voice, url-as-state, contrast-and-color-scheme.
- **Ben DC (github.com/bendc/frontend-guidelines)** — css-conventions, dependency-discipline.
- **DiceBear** — `components/avatar-systems` references the v9.x catalog of procedural avatar styles.
- **Lucide-animated / @pqoqubbw** — `motion/hover-default-imperative` pattern.
- **Google Labs Code (github.com/google-labs-code/design.md)** — design-token format. Mirrored offline at `docs/spec/design-md-spec.md`; runtime guidance in `meta/using-design-md`.
- **AgentsORG `.design` (github.com/AgentsORG/design)** — the `design.v1` living visual contract. Mirrored offline at `docs/spec/design-file-spec.md`; runtime guidance in `meta/using-design-file`; starter contract at `registry/design-engineering.design`. Note the precedence chain: a project's `.design` outranks this skill, which sits at the "generic taste skills" tier. When editing the starter, re-validate with the upstream `scripts/lint_design.py`.
- **Agentation (agentation.com / benjitaylor/agentation)** — click-to-annotate design-review workflow. Drives `philosophy/pointing-beats-describing` and `meta/agentation-workflow`.
- **Index — Emil Kowalski & Glenn Carstens-Peters (index.how)** — "say precisely what you mean" design vocabulary. Drives `philosophy/articulate-precisely`, `meta/design-vocabulary`, and `components/component-confusables`.
- **Apple (WWDC19 *Designing Audio-Haptic Experiences*, HIG *Playing audio* / *Feedback*, Twenty Thousand Hertz *The Sound of Apple* with Hugo Verweij)** — causality / harmony / utility, the first-vs-hundredth-use test, silent-switch respect, organic materials. Drives the `sound/` cluster.
- **ITU-R BT.1359** — audio/video sync thresholds (+45 / −125 ms) in `sound/sound-motion-sync`.
- **bruno (@tvnxty, superfx.co)** — launch-video sound register; the measured sound map in `sound/launch-video-sound` comes from AgentsORG's analysis of the 2026-09-03 Base logo reveal.
- **Studio Dumbar/DEPT** — OpenAI brand motion and ChatGPT-5 sizzle sound; the "organic motion" register.
- **Skale (skale.solutions/portfolio)** — 28 client films and the studio's 2025 reel, measured by AgentsORG on 2026-09-28 at native frame rate; the counted evidence behind the `launch-video/` cluster. Cite films by client (Typesafe, Browserbase, Replit Slides …), with the qualifiers in `docs/research/launch-films/`. Skale's site names Google DeepMind and Polymarket, but neither is among the 28 films (DeepMind shows only as a customer logo in Browserbase's endcard).
- **Acclaimed launch films, 2024–2026** — 18 films measured on 2026-09-28: Linear Agent (2026), Raycast (2025), Claude Cowork (Anthropic, 2026), Cursor 2.0, Notion Mail, Notion 3.0, Granola 2.0, Figma glass and Spline Hana (all 2025), Figma Motion (2026, uploaded at 12 fps), Framer 3.0 (2026, maker uncredited), Arc on Windows (The Browser Company, 2024), Apple Liquid Glass (2025), Material 3 Expressive (Google Design, 2025), Claude Opus 4.6 (Anthropic, 2026; BUCK per brief), Perplexity Comet (Studio Freight, 2025), Google Gemini app (Ordinary Folk, 2024) and Google AI Mode (2025; Ordinary Folk, inferred). Keep the maker qualifiers when citing.
- **HeyGen hyperframes-launches (github.com/heygen-com/hyperframes-launches)** — the 3,446-call tween census over its composition source, the seam recipes, three verification renders measured at native frame rate, and the sound-restoration lessons (three films shipped without their soundtrack in source, two silent and one VO-only, and the mixes recovered from their published renders were a frame late, 100 ms early and 64 ms late against the picture). Cite by project and file path. Only the Apache-2.0 code and timing are used; bundled media, brand marks and fonts are excluded, per its NOTICE.
- **heygen-com/hyperframes skills (Apache-2.0)** — the build owner for any rendered film. The distributed `skills/` layer (`hyperframes`, `product-launch-video`, `motion-graphics`, `general-video`, `hyperframes-animation`) is what `npx skills add` installs; the repo-internal `.agents/skills/` doctrine (`motion-doctrine`, `cut-the-curve`, `oversized-cursor`, `seam-craft`) is not. Routed by `meta/skill-router` and reconciled value by value in `launch-video/hyperframes-reconciliation`, never duplicated.
- **Leon Lin, earshot (MIT, github.com/Leonxlnx/earshot, HEAD `925ebe5`, read 2026-10-19)** — the agent-listening companion and its measured motion-SFX study (58 bed-subtracted events in 8 unnamed professional films, 39 from one sound-design film): `sound/designed-sfx-anatomy`, `sound/earshot-reconciliation`, `sound/sound-licensing`, the per-kind sync points in `sound/sound-motion-sync`, and the designed-effect voices in `scripts/sound-sheet.mjs`. Its 7-film launch profile is unnamed and mostly music-led: cite it with that qualifier, and never let its −14 LUFS or real-recordings-only rules override `meta/pov.md`.
- **Leon Lin, cinetic (MIT, github.com/Leonxlnx/cinetic, HEAD `ecfa660`)** — the Remotion launch-film companion: `launch-video/launch-video-formats` (loops, stings, feed re-layouts) and `launch-video/cinetic-reconciliation`, plus the Chromium render gotchas. Its "measured" pacing numbers name no films and no count, so they sit in the reconciliation node as claims awaiting measurement, never as rules.
- **Leonxlnx, taste-skill v2.1.1 (MIT, github.com/Leonxlnx/taste-skill, HEAD `a9c73c3`)** — the 246-site and 97-site gallery studies and the 23-screen app study behind `layout/page-frame`, `components/dashboard-tells`, `anti-patterns/screenshot-critique`, `review-checklist` rows 14–22 and the prevalence paragraph in `ai-default-tells`. Its top / weak tiers are model-panel scores; its own blind test lost to no skill, so take the measurements, not the house style (no mono, numbering, hairline or shadow bans).
- **Aniket Pawar, MotionVideo (MIT, github.com/motionvideohq/motionvideo.xyz)** — its launch film's `sounddesign.json` is the worked earshot build in `sound/earshot-reconciliation`. The paid MotionVideo skill pack is private and is not distilled.
- **Cheng Lou, chenguini (MIT, github.com/chenglou/chenguini, HEAD `84fb27d`) and handwired (MIT, github.com/chenglou/handwired, HEAD `257856e`)** — interaction engineering: `motion/animated-hit-testing`, `motion/frame-rate-independence`, `layout/scroll-anchoring`, `surface/z-index-strategy`, the velocity window in `gesture-momentum`. chenguini's `docs/` are the guidelines; handwired's `docs/behavior-choices.md` measures them (the three-press toast stack, 359 px between 10 and 120 fps, the 533 px column jump). handwired's compiler itself is not design material.
- **Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, plugin `interfaces` 1.17.0, read 2026-10-25)** — six evidence-not-taste domain skills, an orchestrator and seven verb skills. Distilled into `components/screen-reader-announcements`, `components/keyboard-patterns`, `components/wcag-thresholds`, `components/strings-and-locale`, `components/destructive-actions`, `surface/color-token-tiers`, `surface/palette-step-roles`, `surface/gradient-interpolation`, `layout/grouping-by-space`, `layout/growth-and-overflow`, `layout/logical-properties-rtl`, `meta/change-scoped-review`, `meta/stress-scenarios`, `meta/reading-others-interfaces` and `review-checklist` rows 23–26. `meta/interfaces-reconciliation` routes its verb skills and settles twelve conflicts. Not the same person as Jakub Antalik (transitions.dev); cite them separately.
- **Kelvin Adithya, fun-isometric (MIT, github.com/kelvinkn17/skills, HEAD `7c8a752`, read 2026-10-27; skills.klvn.dev/fun-isometric)** — animated isometric slab stickers: `svg/isometric-stickers` (drawing grammar, palette roles, verb-picked After Effects keys, the still hold) and `svg/fun-isometric-reconciliation` (ownership, ten conflicts settled). Its kit is copied into projects by the companion, never vendored here.
- **Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07; benji.org/stageshow)** — faux product UI: `faux-ui/product-shot-framing` (crop, satellites, gutter, layouts, compact design), `faux-ui-restraint` (word budget, fidelity, spacing numbers, marks), `demo-story-and-loops` (beats, poster, caused resets, the kit's timing), `demo-cursor-and-touch` (travel, press, drags, phones, from `kit/act.ts`), `bento-grids`, `demo-rehearsal` (filming, the never-intentional faults, the fresh-eye brief); `stageshow-reconciliation` settles nine conflicts; 1.1 adds always `--gate` and the kit part over any lookalike. Paraphrased, values cited.
- **Lochie Axon, skullet 0.0.3 (MIT, github.com/lochie/skullet, HEAD `770cba4`), torph 0.1.3 (MIT, github.com/lochie/torph, HEAD `d79a5aa`) and web-haptics 0.0.6 (MIT, github.com/lochie/web-haptics, HEAD `7904ed1`), read 2026-11-08; skullet.lochie.me, torph.lochie.me, haptics.lochie.me** — `components/measured-skeletons` (skeletons measured from a sample render, font-metric text bars, shape-source order, the `smart` reveal, one shimmer clock), `motion/text-morph-engine` (word-then-character alignment, replaced runs, place-value numbers, the velocity carry), `sound/haptic-feedback` and `sound/web-haptics-reconciliation` (the presets, the Android PWM and iOS switch routes; web-haptics ships its own `SKILL.md`, routed as a companion in `meta/skill-router`). Torph credits Benji Taylor's *Family Values* for the method. Paraphrased, values cited.
- **Scenario, scenario-kinetic-film (zip received 2026-10-30, no licence file: cite, never copy)** — a beat-cut kinetic-type film engine (one page, a pure function of time, sub-frame motion blur, render / mix / gate scripts) with Scenario MCP for the music, sound kit and key art. Drives `launch-video/film-as-function-of-time` and `launch-video/scenario-kinetic-reconciliation`. Its energy references are unnamed and uncounted; Kaiju Postal is its own film measured by its own tool. Quote its numbers as "scenario-kinetic-film reports".
- **Josh Comeau (use-sound)** — mute-toggle rules, playback-rate variation, the hook API. **Blattner et al. (1989)** — earcon grammar.
- **ElevenLabs (text-to-sound-effects API)** — on-demand generation path. **Stability AI (Stable Audio 3 Small-SFX, Community License)**, **KilledByAPixel/ZzFX**, **Kenney**, **soundcn**, **Freesound** — the no-key paths.
- **Emil Kowalski's design-engineering practice, distilled** — the typography, color, surface, forms, touch, polish, performance, component-API, marketing, prototyping, tooling, docs, unslop, and skill-writing nodes added in 2.1.0, and in 3.1.0 the ship pass (`ship-check`, `production-baseline`, `leftovers-and-leaks`, `share-and-crawl-metadata`), `information-architecture`, `opentype-features-and-axes`, `oklch-gamut-and-migration`, `directing-agents`, and the corrections to the motion, colour and loading values. Cite as "Emil Kowalski's design-engineering practice … distilled by AgentsORG"; glosses are this graph's own and no source text is quoted.
- **Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07)** — the public set: `animate`, `animate-expo`, `animation-performance`, `remove-animations`, `choreograph`, `apple-design`, `mobile-native`, `break-ui`, `prototype`, `pick-ui-library`, `ask-sonner`, `write-swift`. Drives `motion-choreography` (from `choreograph`), the motion 14.2 shorthand rule in `transform-opacity-only` and `performance-discipline`, `animation-removal-hazards`, `react-native-motion`, `sonner-usage`, `momentum-projection`, `translucent-materials`, `mobile-platform-layer`, the `break` and `mobile` verbs, and the strong easing set in `easing-curves`. `apple-design`, `animate-expo`, `write-swift` and `ask-sonner` are routed as companions in `meta/skill-router`, never duplicated.
- **supermemoryai/skills `svg-animations`** — engine choice, stroke drawing, SMIL timing, the morphing rule in `svg/`. Its "bounce" `keySplines` is out of SMIL's 0–1 range (see `meta/gotchas.md`).
- **Cathryn Lavery (`diagram-design`, MIT, github.com/cathrynlavery/diagram-design)** — the `diagram/` cluster's figure rules: deletion first, the complexity budget, node treatments, the six connector rules, the type ramp per size preset, the motion clock and the export procedure. Read at HEAD `f4547ee` (plugin 2.6.68) on 2026-10-08. It is a companion, so this graph distills it and never copies its templates; `diagram/diagram-design-reconciliation` settles the conflicts.
- **tldraw** — the `tldraw-offline` agent skill that tldraw Desktop installs (the app is not open source: cite, never copy), the tldraw MCP app (`tldraw/tldraw` `apps/mcp-app`), and `tldraw-migrate` (served at `tldraw.dev/.well-known/agent-skills/`). Drives `diagram/tldraw-canvas`.
- **GreenSock `gsap-skills` (MIT)** — `gsap-plugins` for DrawSVG, MorphSVG and MotionPath, routed from `svg/svg-animation`. **better-auth `better-icons` (MIT)** — Iconify lookup, routed from `components/icon-systems`. **iart-ai `web-animation-skills` (MIT)** — `prefixIds` for inlined SVGs, cited in `svg/svg-creation`. Eight other skills.sh SVG skills were read on 2026-10-08 and not adopted: generic, unlicensed, deleted, license-conflicted, or shipping the AI-default gradient (see CHANGELOG 2.7.0).
- **Adrian Abelarde (Anim8)** — the MP4 → editable animated SVG pipeline and its flat-art constraint in `svg/video-to-vector-pipeline`; tools: vtracer, Potrace, ffmpeg, SVGO.
- **WebPAI DesignBench (arXiv 2506.06251) and Design Arena** — `meta/design-benchmarks` and the `design-bench` eval fixtures.
- **Companions** — AgentsORG `.design` (contract 1.3: `tokens.sound`, `exports.frame_md`, video targets), impeccable (23 named passes), HyperFrames (`frame.md`), ElevenLabs, transitions-dev, shadcn CLI, diagram-design, tldraw (Desktop skill, MCP app, `tldraw-migrate`), GSAP `gsap-plugins`, better-icons, cinetic (Remotion builds), earshot (listening and the effects bank), taste-skill (opt-in), interfaces (`/interface-review`, `/break`, `/state-machine`, `/variant`, `/explain-interface`, `build-design`, `teardown`), fun-isometric (animated isometric stickers), Stageshow (faux product UI, React kit, film-and-gate), web-haptics (mobile-web haptics), scenario-kinetic-film (beat-cut type films, Scenario MCP generation) — routed by `meta/skill-router`, never duplicated.
- **agentskills/agentskills** — canonical Agent Skills specification, mirrored offline at `docs/spec/agent-skills-spec.md`.
- **AgentsORG / installer** — `meta/gotchas.md` and `meta/pov.md`. These grow over time and reflect lived experience. Forked installers should edit `meta/pov.md`.

## What NOT to do

- Don't duplicate content across nodes. Link instead.
- Don't add a node that the model already knows from training data (per Perplexity's "every Skill is a tax" rule).
- Don't add prescriptive command sequences ("run git X then Y") — describe the intent, let the model choose the steps.
- Don't add empty MOCs. An MOC with fewer than 3 atomic nodes should be inlined into SKILL.md.

## For human contributors

See:
- [CONTRIBUTING.md](.github/CONTRIBUTING.md) — PR conventions, node format, length targets, checklist, cross-model testing.
- [CODE_OF_CONDUCT.md](.github/CODE_OF_CONDUCT.md) — Contributor Covenant v2.1.
- [SECURITY.md](.github/SECURITY.md) — responsible-disclosure policy.
- [CHANGELOG.md](CHANGELOG.md) — release notes.

The rules in this file are operating guidance for AI agents editing the repo; CONTRIBUTING.md is the human-facing version of the same constraints.

## Install & test

```bash
# install everything for every detected harness (skill, plugin, agents, hooks)
curl -fsSL https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.sh | bash
# Windows: irm https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.ps1 | iex

# skill only
npx skills add AgentsORG/design-engineering

# validate (optional, agentskills.io CLI)
skills-ref validate ./skills/design-engineering
```

## Testing

CI runs seven jobs on every push and PR to `main` (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)). No job calls a model or runs an eval; evals and benchmarks run locally (`node bench/bench.mjs`, `claude plugin eval .`, `npm --prefix eve run eval`).

1. **`code`** — every script parses (`node --check`), the eve runtime typechecks (`tsc --noEmit`), the eve skill slots are in sync, all eight version fields agree (`scripts/release.mjs --verify`), `npx skills add ./ --list` finds exactly one skill, and `claude plugin validate .` passes.
2. **`markdown-lint`** — `markdownlint` against `.github/markdownlint.jsonc` (everything but `node_modules` folders and `.obsidian`).
3. **`frontmatter-check`** — every file under `skills/design-engineering/references/` and `plugin/agents/` must start with `---` YAML.
4. **`skill-structure`** — required files exist; the SKILL.md description is one double-quoted line of at most 1,024 characters starting `Load when` or `Use when`; the body stays under 500 lines with `## Dispatch` near the top; every `cmd-<verb>.md` is linked from SKILL.md and has a `dispatch.jsonl` row; every subagent has `name` (equal to its basename), `description`, `tools`, `model` and a `## Soul`; every manifest is valid JSON and all eight version fields match.
5. **`agents-check`** — reruns `scripts/build-agents.mjs` and fails if `eve/agent/subagents/` or `plugin/harness/` drifts from `plugin/agents/*.md`.
6. **`registry-check`** — reruns `scripts/build-registry.mjs`, fails on drift in `registry/registry.json` or `registry/r/`, and validates every item against the published shadcn schemas.
7. **`link-check`** — every `[[wikilink]]` in skill content resolves to a real reference node or subagent file.

Run locally before pushing:

```bash
npm install -g markdownlint-cli@0.41.0
markdownlint '**/*.md' --ignore '**/node_modules/**' --ignore .obsidian --config .github/markdownlint.jsonc
node scripts/build-agents.mjs --check
node scripts/build-registry.mjs && git diff --stat -- registry/
node scripts/release.mjs --verify "$(node -p "require('./plugin.json').version")"
(cd eve && npm install && npx tsc --noEmit && npm run sync:skills -- --check)
```

Two more workflows: [`install.yml`](.github/workflows/install.yml) dry-runs, installs, re-installs and uninstalls with `install.sh` (Ubuntu, macOS) and `install.ps1` (Windows) into a temporary home whenever the installer or anything under `plugin/` changes; [`release.yml`](.github/workflows/release.yml) publishes a GitHub release when a `v*` tag is pushed (`node scripts/release.mjs --bump x.y.z`, commit, tag, push).

CI is the authoritative gate. If it passes on your branch, the PR is mechanically clean.

## skills.sh discovery

This skill is indexed at [skills.sh/agentsorg/design-engineering/design-engineering](https://www.skills.sh/agentsorg/design-engineering/design-engineering). Discovery is automatic — skills.sh re-indexes on `npx skills add` calls. If the live page shows stale metadata after a release, re-run `npx skills add AgentsORG/design-engineering` once to trigger a re-index. There is no manual publish step.

## Plugin manifests

Six manifests ship alongside the skills.sh registry entry:

- **`plugin.json`** (repo root) — the **canonical** manifest, conforming to the [Agent Plugins specification v1.0.0](https://agent-plugins.org/) (`$schema: https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`). Declares the portable core (`skills/`) implicitly and the client extensions explicitly under reverse-domain namespaces in `extensions`. Edit identity fields here first; mirror to the host manifests.
- **`.plugin/plugin.json`** — vendor-neutral manifest for [the `plugins` CLI](https://www.npmjs.com/package/plugins) (`npx plugins add AgentsORG/design-engineering`). The CLI translates `.plugin/` into per-host folders when missing.
- **`.claude-plugin/plugin.json`** — Claude Code plugin metadata (name, description, version, author, homepage, repository, license) plus `agents` (an explicit list of `./plugin/agents/*.md` files; CI checks it matches the folder), `hooks` (`./plugin/hooks/hooks.json`) and `experimental.evals` (`./bench/plugin`). Omits a `skills` field — Claude Code auto-discovers the root `skills/` directory, which is why the plugin root stays the repo root.
- **`.claude-plugin/marketplace.json`** — the `agentsorg` marketplace, one entry with `"source": "./"` so the repo doubles as its own marketplace. The Claude Code plugin is named `design-engineering` (display name AgentsORG Design Engineering) in the `agentsorg` marketplace, so it installs as `design-engineering@agentsorg` and its components are namespaced `design-engineering:*`; `renames` maps 3.3.0's `agentsorg` back to it. Add via `/plugin marketplace add AgentsORG/design-engineering`, then `/plugin install design-engineering@agentsorg`. Never rename it again without a new `renames` entry.
- **`.codex-plugin/plugin.json`** — richer manifest with `keywords`, `skills: "./skills/"`, `agents: "./plugin/agents/"`, and an `interface` block (displayName, shortDescription, longDescription, developerName, category, capabilities, defaultPrompt, brandColor). Codex plugins document skills, MCP servers, apps and hooks but not agents, so the `agents` field is likely ignored: Codex custom agents are the TOML files in `plugin/harness/codex/agents/`, which the installer copies to `~/.codex/agents/`.
- **`.cursor-plugin/plugin.json`** — Cursor IDE manifest with `$schema`, `displayName`, `publisher`, `category`, `tags`, `keywords`, `skills` and `agents` paths.

**shadcn registry.** `registry/registry.json` and `registry/r/*.json` are **generated** by `node scripts/build-registry.mjs` from `skills/`, `plugin/agents/` and `registry/design-engineering.design`, and served from `https://raw.githubusercontent.com/AgentsORG/design-engineering/main/registry/r/<item>.json`. The `registry/r/` items embed file content, so any edit to those sources makes them stale — rebuild and commit in the same PR. CI fails on drift and validates every item against the published shadcn schemas. Edit `scripts/build-registry.mjs` to change what ships, never the generated JSON.

When changing version: bump it in all six manifest files (root `plugin.json`, `.plugin/`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/`, `.cursor-plugin/`) plus `skills/design-engineering/SKILL.md` and `eve/package.json` (`node scripts/release.mjs --bump x.y.z` writes all eight). The `Plugin manifest versions match` CI step enforces parity — drift will fail the lint job.

## License

MIT.
