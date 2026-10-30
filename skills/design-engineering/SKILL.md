---
name: design-engineering
description: "Load when reviewing UI code, designing a component or layout, picking an easing curve or transition, deciding whether something should animate or make a sound, choosing typography, color (OKLCH, contrast) or avatars, writing UI copy or errors, auditing for AI-default tells, code tells or a11y misses, making a screen look less generated, consuming DESIGN.md or .design tokens, writing design-system docs for agents, giving Agentation feedback, asking why a UI feels flat or unfinished, judging when delight earns its weight, designing or generating UI sound effects and syncing them to motion, planning, cutting, scoring or reviewing a product launch video, creating or animating SVG (icons, mascots, logo reveals, video-to-vector), drawing a diagram or tldraw canvas, prototyping directions behind a picker, building a tool instead of re-prompting, or choosing which design skill should own a job. Distills Emil Kowalski, Benji Taylor, transitions.dev, guidelines.sh, Vercel, Index, Apple and 47 measured launch films."
license: MIT
compatibility: Agent-agnostic. Pairs with Obsidian as a vault, Agentation for click-to-annotate review, and any coding agent that reads SKILL.md (Claude Code, Cursor, Codex, Windsurf, Aider, Cline, Gemini, 18+ via skills.sh).
metadata:
  author: HKTITAN
  version: "3.0.0"
  graph: true
  subagents: agents/
  soul: SOUL.md
---

# design-engineering

> One skill, one entry: `/design-engineering [verb] [target]`. Everything below is reachable from it. The body is the **Map of Content**: follow a `[[wikilink]]` only when the job needs it. A `[[name]]` is the file `references/**/name.md` (names are unique), and paths such as `scripts/` are relative to this skill's folder.

## Dispatch — read this first, every time

Look at what the user typed after `/design-engineering`. Claude Code passes it as `ARGUMENTS:`; other hosts pass the rest of the message. Then:

1. **The first word is a verb in the table** (or one of its aliases): open that command file and follow it exactly. Pass the remaining words on as its target.
2. **The arguments are a plain request** ("why does this card feel flat"): run [[skill-router]]. It resolves the contract, classifies the phase and names one or two owners. Then follow [[routing-table]] to the entry node.
3. **No arguments, and the conversation already holds a design request:** treat that request as rule 2.
4. **No arguments and no request:** show the table below as a menu, lead with the 2–3 verbs that fit what is in front of you (a diff → `review`, a `.design` file → `tokens`, a video file → `film review`), and wait. Never auto-run a verb.
5. If two verbs fit, ask once. If none fits and the job is not design (backend logic, data, build tooling), say no skill applies.

| Verb | Aliases | Does | Command file |
|---|---|---|---|
| `review` | `review-ui`, `critique` | A UI code review as a Before / After / Why table; change-scoped for a diff | [[cmd-review]] |
| `polish` | `finish` | The screen works but feels unfinished: states, optical details, fixes applied | [[cmd-polish]] |
| `motion` | `motion-audit`, `animate` | Should it move? Then timing, easing, springs and transitions with concrete values | [[cmd-motion]] |
| `tells` | `unslop`, `scan-ai-tells` | AI-default tells in UI, code or copy, as a deletion list | [[cmd-tells]] |
| `a11y` | `accessibility` | An evidence-only accessibility audit tied to WCAG 2.2 criteria | [[cmd-a11y]] |
| `tokens` | `contract`, `apply-design-md` | Find the `.design` / DESIGN.md and thread its tokens through the UI | [[cmd-tokens]] |
| `sound` | `sound-pass` | Which moments earn a sound, one family, generated, wired, mapped | [[cmd-sound]] |
| `svg` | `svg-create`, `svg-animate` | `create`, `animate` or `sticker`: an SVG on tokens, or one that moves | [[cmd-svg]] |
| `film` | `film-review`, `video` | `plan` a launch film from its register, `review` a render, or `formats` | [[cmd-film]] |
| `diagram` · `options` · `name` · `which` · `agentation` · `pov` | `variants`, `vocab`, `route`, `agentation-fix`, `fork-pov` | Draw or not; three directions behind a picker; the exact word; who owns a job; the annotation fix loop; fork taste or log a gotcha | [[cmd-small]] |
| `help` | `menu`, `?` | This table, with the 2–3 verbs that fit now | — |

The command files are indexed in `[[MOC-commands]]`. Every verb applies [[gotchas]] and [[pov]], and both outrank the graph's defaults. A project's `.design` outranks both ([[using-design-file]]). Keep the posture the verb names: a judge verb reports and never edits unless asked. Where the host ships this skill's subagents (the Claude Code plugin), a command file may be handed to its subagent as the brief. Each command file is the whole procedure on its own, so nothing needs the plugin.

## Philosophy — when, where, and why polish matters

How to think about taste, delight, and the difference between marketing and product UI.

- `[[MOC-philosophy]]` → [[taste-is-trained]], [[unseen-details-compound]], [[beauty-is-leverage]], [[delight-impact-curve]], [[feeling-right]], [[marketing-vs-product-ui]], [[states-are-the-work]], [[data-is-content]], [[dependency-discipline]], [[pointing-beats-describing]], [[articulate-precisely]]

## Motion — when something should move, and how

The largest cluster. Animation is the most overused tool in modern UI; this cluster tells you when *not* to animate as much as when to.

- `[[MOC-motion]]` → [[animation-decision-framework]], [[easing-curves]], [[duration-table]], [[spring-animations]], [[transform-opacity-only]], [[performance-discipline]], [[transform-mastery]], [[clip-path-tricks]], [[never-scale-from-zero]], [[gesture-momentum]], [[stagger-choreography]], [[prefers-reduced-motion]], [[fly-not-teleport]], [[responsive-feedback]], [[sonner-principles]], [[debugging-animations]], [[lerp-breathing]], [[morphing-icons]], [[shared-letter-morph]], [[hover-default-imperative]], [[tray-rules]], [[css-conventions]], [[frame-rate-independence]], [[animated-hit-testing]]

## Transition techniques — Jakub Antalik's catalog

A subset of motion focused on **canonical** transitions for common UI archetypes. Where the Motion MOC teaches principles, these nodes teach implementation. From transitions.dev.

- [[cross-blur-transitions]] — Pair opacity 0↔1 with `filter: blur(2px) ↔ 0` to mask imperfect crossfades.
- [[compose-subtract-asymmetry]] — Enter with more properties than exit. Disappearance feels soft, not reversed.
- [[distance-falloff-propagation]] — Per-element lift via `lift * pow(falloff, distance)` for grouped hover.
- [[multi-segment-shake]] — Form-error shake at 0%, 28.57%, 57.14%, 78.57%, 100% over 280ms.

## Sound — when an interface should be heard, and how

The sense the web forgot. Product UI is silent by default; a launch video is the reverse. This cluster decides which, designs one material family, syncs it to motion, and generates the files — ElevenLabs on demand, or open-weight / procedural / CC0 without a key.

- `[[MOC-sound]]` → [[sound-decision-framework]], [[sound-motion-sync]], [[sound-palette]], [[sound-spec]], [[sound-playback-web]], [[sound-generation-elevenlabs]], [[sound-generation-open-source]], [[launch-video-sound]], [[launch-video-music]], [[sound-from-motion]], [[designed-sfx-anatomy]], [[earshot-reconciliation]], [[sound-licensing]]

## Launch video — planning, cutting, scoring and reviewing a launch film

A rendered film is its own surface: name the register, time the beats, set the words and the UI demo, make the seams and cuts, place the sound, review against the register. HyperFrames builds; this cluster decides the register, beats, words and sound, and [[hyperframes-reconciliation]] settles seams inside a HyperFrames project.

- `[[MOC-launch-video]]` → [[launch-video-registers]], [[launch-video-structure]], [[launch-video-type]], [[launch-video-ui-demo]], [[launch-video-motion]], [[launch-video-seams]], [[launch-video-cuts]], [[launch-video-review]], [[hyperframes-reconciliation]], [[launch-video-formats]], [[cinetic-reconciliation]], [[scenario-kinetic-reconciliation]], [[film-as-function-of-time]]

## SVG — creating, animating, morphing, and vectorizing

The only image format that is also an interface. Author it on the token system, move it with the engine its home allows, morph it by the command-count rule, and turn flat clips into editable mascots.

- `[[MOC-svg]]` → [[svg-creation]], [[svg-animation]], [[svg-path-morphing]], [[video-to-vector-pipeline]], [[isometric-stickers]], [[fun-isometric-reconciliation]]

## Diagrams — figures, canvases, and whether to draw at all

A diagram is the costliest way to say something. Decide whether a picture earns its place and who touches it next. Then draw a finished figure (Cathryn Lavery's diagram-design) or edit a live canvas (tldraw's Desktop skill or MCP app). Map the project's contract onto the figure, and review it by the connector rules.

- `[[MOC-diagram]]` → [[diagram-decision]], [[diagram-craft]], [[diagram-design-reconciliation]], [[tldraw-canvas]]

## Typography — humanizing text

The font defaults of the AI era are tells. Better choices and the rules around them.

- `[[MOC-typography]]` → [[typography-humanity]], [[line-length-tracking]], [[type-scale-and-rhythm]], [[line-behavior]]

## Surface — color, shadow, radius, dark mode, imperfection

The "background" choices that most decks of guidelines skip. They're load-bearing for feel.

- `[[MOC-surface]]` → [[color-monochromatic]], [[color-scales-oklch]], [[dark-mode]], [[shadows-whisper]], [[depth-and-nesting]], [[border-radius]], [[visual-imperfection]], [[contrast-and-color-scheme]], [[z-index-strategy]], [[color-token-tiers]], [[palette-step-roles]], [[gradient-interpolation]]

## Layout — page-level grids, viewports, sticky chrome, URL-as-state, marketing surfaces

The container, not the component. Marketing especially benefits from custom-per-viewport thinking; product apps benefit from URL-driven state.

- `[[MOC-layout]]` → [[viewport-custom-design]], [[sticky-and-scroll-tells]], [[url-as-state]], [[marketing-surface-rules]], [[page-frame]], [[scroll-anchoring]], [[grouping-by-space]], [[growth-and-overflow]], [[logical-properties-rtl]]

## Components — buttons, hovers, states, cards, forms, avatars, icons, a11y, copy, APIs

The atoms users actually touch. Their behavior is where craft lives.

- `[[MOC-components]]` → [[hover-states-subtle]], [[empty-loading-states]], [[icon-systems]], [[cards-design]], [[forms-validation]], [[forms-behavior]], [[touch-and-focus]], [[ui-polish-pass]], [[component-api-design]], [[avatar-systems]], [[interaction-personality]], [[accessibility-baseline]], [[optimistic-updates]], [[copy-voice]], [[dashboard-tells]], [[screen-reader-announcements]], [[keyboard-patterns]], [[wcag-thresholds]], [[strings-and-locale]], [[destructive-actions]]

## Anti-patterns — what AI-generated UI gives away

What looks "AI default" and what to do instead. High-value because it's about deletion, not addition.

- `[[MOC-anti-patterns]]` → [[ai-default-tells]], [[unslop-pass]], [[content-authenticity]], [[copy-tells]], [[code-tells]], [[screenshot-critique]]

## Meta — review format, design.md, Agentation, evals, per-installer files

Procedural rules and growing files. `[[review-format]]` is mandatory when doing UI code reviews.

- [[skill-router]] — What `/design-engineering` does first: resolve the contract, classify the phase, hand off to one owner — a node, a subagent, or an installed companion (AgentsORG `design`, impeccable, HyperFrames, ElevenLabs, transitions-dev, shadcn CLI, diagram-design, tldraw, GSAP, better-icons, fun-isometric).
- [[routing-table]] — Intent → entry-node router with the four postures (build / judge / decide / name). Open this before anything else on a single question.
- [[prototype-picker]] — Undecided? Three to five genuinely different versions behind a live picker, numbers on controls, then write the decision and delete the harness.
- [[build-a-tool]] — "Closer, but not quite" twice? Stop re-prompting; diagnose the gap and build the small tool that produces the artifact.
- [[vibe-to-generator]] — Only a mood, no spec? Research the visual language into rules, then a seeded generator with knobs and a save button.
- [[design-system-docs]] — Writing a DESIGN.md or docs folder an agent can follow: inventory the code, when/alternative, closed variant sets, correct/incorrect examples, verify by prompting.
- [[skill-writing-rules]] — Encode process, write the why, be strict, earn every line, one aspect per skill, test by running. Governs every node here and [[pov]].
- [[design-benchmarks]] — DesignBench's generation / edit / repair tasks and Design Arena's pairwise votes, and this skill's own eval suite that borrows both.
- [[disambiguation]] — The questions that blur together (four motion questions, three dark-mode owners, two layout-shift owners) and which node owns each.
- [[stacking-chains]] — Ordered node chains for multi-step jobs (new screen, feel-better pass, design system, marketing site, a11y pass).
- [[review-format]] — Required output format for UI critiques (Before | After | Why markdown table).
- [[review-checklist]] — Twenty-six-row audit to scan against before signing off on a UI review.
- [[change-scoped-review]] — Reviewing a diff, not a screen: scope, blast radius, the removed side of every hunk, and each finding statused Introduced, Regression or Pre-existing.
- [[stress-scenarios]] — One component under every scenario that can reach it (length, shape, quantity, container, state) on a throwaway harness, and its product states behind a switcher.
- [[reading-others-interfaces]] — How someone else's site or effect was built: evidence not instruction, measured / derived / inferred, layers in paint order, the recipe in words.
- [[interfaces-reconciliation]] — Jakub Krehel's interfaces skills as companions: who owns which job when installed, and twelve value conflicts settled.
- [[design-vocabulary]] — The precise word for each design phenomenon and where the skill goes deeper. The lexicon behind [[articulate-precisely]]; seeded by Index (Emil Kowalski & Glenn Carstens-Peters).
- [[using-design-file]] — How to consume a project's `.design` contract (schema `design.v1`). Machine-readable tokens, committed intent, executable policy — and it outranks this skill's defaults.
- [[using-design-md]] — How to consume a project's DESIGN.md (Google Labs spec). Tokens are normative; prose is context.
- [[agentation-workflow]] — Install and use [Agentation](https://www.agentation.com) for click-to-annotate design review. Two-session critique-then-fix workflow.
- [[cross-model-testing]] — How to test description / routing changes across GPT, Claude Opus, and Claude Sonnet.
- [[gotchas]] — lived failures, appended as the agent trips up.
- [[pov]] — author/installer's opinions and taste calls that override defaults. Edit this when you fork.
- [[animations-dev-curriculum]] — external pointer to Emil's course; don't duplicate.

## Workflow subagents — sibling `agents/` directory

Ten narrow-purpose subagents live in `agents/` next to this file. Spawn one when its specific workflow matches the user's ask. Each subagent loads its own slice of the graph and returns to the main agent with a structured result.

- [[ui-reviewer]] — Runs the `[[review-format]]` table + `[[review-checklist]]` audit on a UI snippet.
- [[motion-auditor]] — Animation/transition critique against the motion cluster + transitions.dev nodes.
- [[anti-pattern-scanner]] — Scans for AI-default tells and content-authenticity misses.
- [[agentation-fix-loop]] — Session-2 fix side of `[[agentation-workflow]]`. Reads MCP annotations and applies fixes.
- [[design-md-consumer]] — Reads a project's DESIGN.md and threads its tokens through generated UI per `[[using-design-md]]`.
- [[pov-curator]] — Helps the installer fork `[[pov]]` and append to `[[gotchas]]` after a real failure.
- [[sound-designer]] — Runs the sound cluster end to end: decide, palette, generate (`scripts/sound-family.mjs` for a product family, `scripts/sound-sheet.mjs` for a video stem derived from the motion), spec, wire up. Returns a sound map.
- [[svg-creator]] — Authors or refactors an SVG asset: grid, named groups, token colors, SVGO with the right flags, accessible name.
- [[svg-animator]] — Animates an SVG or builds a vector flipbook from frames (`scripts/svg-flipbook.mjs`), engine chosen by where the file lives.
- [[launch-film-analyst]] — Measures a reference launch film or your own render at native fps and returns the [[launch-video-review]] rubric plus a per-film JSON.

See `docs/subagents.md` in the repo for the full directory and selection guide. Every [dispatch](#dispatch--read-this-first-every-time) verb runs without them.

## Identity — SOUL.md

The repo also ships a [`SOUL.md`](../../SOUL.md) at root — voice, stance, and taste lineage for any agent operating in this skill. AGENTS.md is the "what/how"; SOUL.md is the "who/why". Read it once per session if your harness doesn't auto-inject it.

## Tax check

Every sentence above costs tokens in every session. If you find yourself adding a sentence, ask: *would the agent get this wrong without it?* If no, delete it. If yes, it belongs in an atomic node, not here.

— HKTITAN, 2026.
