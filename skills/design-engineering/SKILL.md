---
name: design-engineering
description: "Load when reviewing UI code, designing a component or page layout, picking an easing curve or transition pattern, deciding whether something should animate at all, choosing an avatar/typography/color system, building an OKLCH palette or fixing contrast, writing UI copy or error messages, auditing for AI-default tells, code tells, or a11y misses, making a screen look less generated, consuming a project's DESIGN.md or .design tokens, writing design-system docs for agents, giving feedback through Agentation or a similar annotation tool, asking why a UI feels flat or unfinished, judging when delight earns its weight, deciding whether an interaction should make a sound, designing or generating UI sound effects (ElevenLabs or open-source), syncing sound to animation, scoring a product launch video or deriving its sound stem from the motion, cutting a multi-scene launch video so it reads as one camera move, creating or animating SVG (icons, mascots, logo reveals, video-to-vector), prototyping several directions behind a picker, building a tool instead of re-prompting for an artifact, or choosing which design skill should own a job. Distills Emil Kowalski, Benji Taylor, Jakub Antalik (transitions.dev), guidelines.sh, Vercel design guidelines, Ben DC, DiceBear, lucide-animated, Google Labs design.md, AgentsORG .design, Agentation, Index (index.how — Emil Kowalski and Glenn Carstens-Peters), Apple's audio-haptic principles, Josh Comeau's use-sound, bruno (@tvnxty) on launch-video sound, and Adrian Abelarde's video-to-vector pipeline."
license: MIT
compatibility: Agent-agnostic. Pairs with Obsidian as a vault, Agentation for click-to-annotate review, and any coding agent that reads SKILL.md (Claude Code, Cursor, Codex, Windsurf, Aider, Cline, Gemini, 18+ via skills.sh).
metadata:
  author: HKTITAN
  version: "2.3.0"
  graph: true
  subagents: agents/
  soul: SOUL.md
---

# design-engineering

> This skill is a graph, not a file. The body below is the **Map of Content**. Follow the `[[wikilinks]]` only as needed — that's the whole point of progressive disclosure.

## How to use this skill

0. `/design-engineering` is a router before it is a library: `[[skill-router]]` resolves the design contract, classifies the phase (undecided → build → refine → check → name), and hands the job to one owner — a node here, a subagent, or an installed companion skill (AgentsORG `design`, impeccable, HyperFrames, ElevenLabs, transitions-dev, the shadcn CLI). One or two owners, never five.
1. Route first: `[[routing-table]]` maps intent → entry node for most single questions. If two intents blur, `[[disambiguation]]` names the tiebreaker. Multi-cluster jobs follow `[[stacking-chains]]`.
2. Otherwise scan the MOCs below, pick the cluster, and open its `MOC-*.md` for the atomic nodes under it.
3. Read only the atomic nodes that match. Each node is standalone — you don't need siblings.
4. Before reviewing UI code, also load `[[gotchas]]` and `[[pov]]`.

If the user asks for a UI code review, use the format defined in `[[review-format]]` and scan against `[[review-checklist]]`.

## Philosophy — when, where, and why polish matters

How to think about taste, delight, and the difference between marketing and product UI.

- `[[MOC-philosophy]]` → [[taste-is-trained]], [[unseen-details-compound]], [[beauty-is-leverage]], [[delight-impact-curve]], [[feeling-right]], [[marketing-vs-product-ui]], [[states-are-the-work]], [[data-is-content]], [[dependency-discipline]], [[pointing-beats-describing]], [[articulate-precisely]]

## Motion — when something should move, and how

The largest cluster. Animation is the most overused tool in modern UI; this cluster tells you when *not* to animate as much as when to.

- `[[MOC-motion]]` → [[animation-decision-framework]], [[easing-curves]], [[duration-table]], [[spring-animations]], [[transform-opacity-only]], [[performance-discipline]], [[transform-mastery]], [[clip-path-tricks]], [[never-scale-from-zero]], [[gesture-momentum]], [[stagger-choreography]], [[prefers-reduced-motion]], [[fly-not-teleport]], [[responsive-feedback]], [[sonner-principles]], [[debugging-animations]], [[lerp-breathing]], [[morphing-icons]], [[shared-letter-morph]], [[hover-default-imperative]], [[tray-rules]], [[css-conventions]], [[launch-video-seams]]

## Transition techniques — Jakub Antalik's catalog

A subset of motion focused on **canonical** transitions for common UI archetypes. Where the Motion MOC teaches principles, these nodes teach implementation. From transitions.dev.

- [[cross-blur-transitions]] — Pair opacity 0↔1 with `filter: blur(2px) ↔ 0` to mask imperfect crossfades.
- [[compose-subtract-asymmetry]] — Enter with more properties than exit. Disappearance feels soft, not reversed.
- [[distance-falloff-propagation]] — Per-element lift via `lift * pow(falloff, distance)` for grouped hover.
- [[multi-segment-shake]] — Form-error shake at 0%, 28.57%, 57.14%, 78.57%, 100% over 280ms.

## Sound — when an interface should be heard, and how

The sense the web forgot. Product UI is silent by default; a launch video is the reverse. This cluster decides which, designs one material family, syncs it to motion, and generates the files — ElevenLabs on demand, or open-weight / procedural / CC0 without a key.

- `[[MOC-sound]]` → [[sound-decision-framework]], [[sound-motion-sync]], [[sound-palette]], [[sound-spec]], [[sound-playback-web]], [[sound-generation-elevenlabs]], [[sound-generation-open-source]], [[launch-video-sound]], [[sound-from-motion]]

## SVG — creating, animating, morphing, and vectorizing

The only image format that is also an interface. Author it on the token system, move it with the engine its home allows, morph it by the command-count rule, and turn flat clips into editable mascots.

- `[[MOC-svg]]` → [[svg-creation]], [[svg-animation]], [[svg-path-morphing]], [[video-to-vector-pipeline]]

## Typography — humanizing text

The font defaults of the AI era are tells. Better choices and the rules around them.

- `[[MOC-typography]]` → [[typography-humanity]], [[line-length-tracking]], [[type-scale-and-rhythm]], [[line-behavior]]

## Surface — color, shadow, radius, dark mode, imperfection

The "background" choices that most decks of guidelines skip. They're load-bearing for feel.

- `[[MOC-surface]]` → [[color-monochromatic]], [[color-scales-oklch]], [[dark-mode]], [[shadows-whisper]], [[depth-and-nesting]], [[border-radius]], [[visual-imperfection]], [[contrast-and-color-scheme]]

## Layout — page-level grids, viewports, sticky chrome, URL-as-state, marketing surfaces

The container, not the component. Marketing especially benefits from custom-per-viewport thinking; product apps benefit from URL-driven state.

- `[[MOC-layout]]` → [[viewport-custom-design]], [[sticky-and-scroll-tells]], [[url-as-state]], [[marketing-surface-rules]]

## Components — buttons, hovers, states, cards, forms, avatars, icons, a11y, copy, APIs

The atoms users actually touch. Their behavior is where craft lives.

- `[[MOC-components]]` → [[hover-states-subtle]], [[empty-loading-states]], [[icon-systems]], [[cards-design]], [[forms-validation]], [[forms-behavior]], [[touch-and-focus]], [[ui-polish-pass]], [[component-api-design]], [[avatar-systems]], [[interaction-personality]], [[accessibility-baseline]], [[optimistic-updates]], [[copy-voice]]

## Anti-patterns — what AI-generated UI gives away

What looks "AI default" and what to do instead. High-value because it's about deletion, not addition.

- `[[MOC-anti-patterns]]` → [[ai-default-tells]], [[unslop-pass]], [[content-authenticity]], [[copy-tells]], [[code-tells]]

## Meta — review format, design.md, Agentation, evals, per-installer files

Procedural rules and growing files. `[[review-format]]` is mandatory when doing UI code reviews.

- [[skill-router]] — What `/design-engineering` does first: resolve the contract, classify the phase, hand off to one owner — a node, a subagent, or an installed companion (AgentsORG `design`, impeccable, HyperFrames, ElevenLabs, transitions-dev, shadcn CLI).
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
- [[review-checklist]] — Thirteen-row audit to scan against before signing off on a UI review.
- [[design-vocabulary]] — The precise word for each design phenomenon and where the skill goes deeper. The lexicon behind [[articulate-precisely]]; seeded by Index (Emil Kowalski & Glenn Carstens-Peters).
- [[using-design-file]] — How to consume a project's `.design` contract (schema `design.v1`). Machine-readable tokens, committed intent, executable policy — and it outranks this skill's defaults.
- [[using-design-md]] — How to consume a project's DESIGN.md (Google Labs spec). Tokens are normative; prose is context.
- [[agentation-workflow]] — Install and use [Agentation](https://www.agentation.com) for click-to-annotate design review. Two-session critique-then-fix workflow.
- [[cross-model-testing]] — How to test description / routing changes across GPT, Claude Opus, and Claude Sonnet.
- [[gotchas]] — lived failures, appended as the agent trips up.
- [[pov]] — author/installer's opinions and taste calls that override defaults. Edit this when you fork.
- [[animations-dev-curriculum]] — external pointer to Emil's course; don't duplicate.

## Workflow subagents — sibling `agents/` directory

Nine narrow-purpose subagents live in `agents/` next to this file. Spawn one when its specific workflow matches the user's ask. Each subagent loads its own slice of the graph and returns to the main agent with a structured result.

- [[ui-reviewer]] — Runs the `[[review-format]]` table + `[[review-checklist]]` audit on a UI snippet.
- [[motion-auditor]] — Animation/transition critique against the motion cluster + transitions.dev nodes.
- [[anti-pattern-scanner]] — Scans for AI-default tells and content-authenticity misses.
- [[agentation-fix-loop]] — Session-2 fix side of `[[agentation-workflow]]`. Reads MCP annotations and applies fixes.
- [[design-md-consumer]] — Reads a project's DESIGN.md and threads its tokens through generated UI per `[[using-design-md]]`.
- [[pov-curator]] — Helps the installer fork `[[pov]]` and append to `[[gotchas]]` after a real failure.
- [[sound-designer]] — Runs the sound cluster end to end: decide, palette, generate (`scripts/sound-family.mjs` for a product family, `scripts/sound-sheet.mjs` for a video stem derived from the motion), spec, wire up. Returns a sound map.
- [[svg-creator]] — Authors or refactors an SVG asset: grid, named groups, token colors, SVGO with the right flags, accessible name.
- [[svg-animator]] — Animates an SVG or builds a vector flipbook from frames (`scripts/svg-flipbook.mjs`), engine chosen by where the file lives.

See `agents/README.md` for the full directory and selection guide.

## Identity — SOUL.md

The repo also ships a [`SOUL.md`](../../SOUL.md) at root — voice, stance, and taste lineage for any agent operating in this skill. AGENTS.md is the "what/how"; SOUL.md is the "who/why". Read it once per session if your harness doesn't auto-inject it.

## Tax check

Every sentence above costs tokens in every session. If you find yourself adding a sentence, ask: *would the agent get this wrong without it?* If no, delete it. If yes, it belongs in an atomic node, not here.

— HKTITAN, 2026.
