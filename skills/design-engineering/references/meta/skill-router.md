---
title: skill-router
summary: What `/design-engineering` does first — classify the phase and the material, resolve the design contract, then hand the job to the owning node, subagent, or installed companion skill (AgentsORG design, impeccable, HyperFrames, ElevenLabs, the transitions catalog, the shadcn CLI, diagram-design, tldraw, GSAP, better-icons). One or two owners, never five.
tags: [meta, routing, ecosystem, skills]
---

# The skill router

`/design-engineering` is a router before it is a library. Loading four craft skills at once spreads attention across four bars and applies none of them, so the first job on any request is to name **one or two owners** and hand off. [[routing-table]] maps intent to a node *inside* this graph; this node adds the phase question and the ecosystem *outside* it, and the precedence that keeps them from fighting.

## 1. Resolve the contract first

Walk up from the edited file. A `.design` (schema `design.v1`) outranks everything below the user's prompt — see [[using-design-file]]. In a video project, `frame.md` → `design.md` → `DESIGN.md` resolve in that order ([[using-design-md]]). A contract's `tokens.motion` and `tokens.sound` win over this graph's duration and level tables; the graph supplies craft where the contract is silent, and says so.

Precedence: user prompt → nearest `.design` → the `design` skill procedure → **this graph and its companions** → model defaults.

## 2. Classify the phase

| Phase | The user is saying | Owner |
|---|---|---|
| Undecided | "try a few", "not sure which", "show me options" | [[prototype-picker]] — before any building skill |
| Stuck on a vibe | "something like…", "I'll know it when I see it" | [[vibe-to-generator]] |
| Foundation | "build this screen", "lay this out" | [[feeling-right]] → [[stacking-chains]] |
| Pieces | card, form, component, landing page, sound, SVG | the material node below, or its subagent |
| Works, feels off | "feels cheap", "janky", "broken on mobile" | [[ui-polish-pass]] / [[motion-auditor]] / [[touch-and-focus]] |
| Done | "does this look right", "review before I ship" | [[ui-reviewer]] or [[review-format]]; a film → [[launch-video-review]] (or spawn [[launch-film-analyst]]) |
| The words | "what's it called when…" | [[design-vocabulary]] — answer and stop |
| Keeps missing | "closer, but not quite" after a round or two | [[build-a-tool]] |

## 3. Pick the material

Type → [[typography-humanity]], [[type-scale-and-rhythm]]. Color → [[color-scales-oklch]]. Depth → [[depth-and-nesting]]. Motion → [[animation-decision-framework]]. Sound → [[sound-decision-framework]] / [[sound-designer]]. SVG → [[svg-creation]] / [[svg-creator]], [[svg-animation]] / [[svg-animator]]. Diagram or whiteboard → [[diagram-decision]], then [[diagram-craft]] or [[tldraw-canvas]]. Forms → [[forms-behavior]]. Props → [[component-api-design]]. Marketing → [[marketing-surface-rules]]. Generated look → [[unslop-pass]] / [[anti-pattern-scanner]]. Speed → [[performance-discipline]]. Docs for agents → [[design-system-docs]]. Launch film → [[MOC-launch-video]].

## 4. Hand off to installed companions

A companion is installed when its `SKILL.md` exists under `.agents/skills/`, `.claude/skills/`, or a plugin cache, or its slash command is registered. Hand the job over, pass the contract, and run the result back through [[gotchas]], [[pov]], and (for reviews) [[review-format]]. If it is not installed, do the job from this graph and say which companion would have owned it.

| Job | Companion | Boundary |
|---|---|---|
| Discover, follow, update, verify a `.design`; bootstrap one | AgentsORG `design` skill | It owns the contract; this graph never redefines a token |
| A named pass: polish, critique, audit, typeset, layout, colorize, animate, distill, harden, onboard, clarify, adapt, optimize | impeccable (`/impeccable <command>`) | Its output still passes [[review-checklist]]; a DESIGN.md it writes imports per [[using-design-md]] |
| A launch film, sting, sizzle, or any rendered motion piece | HyperFrames: `/hyperframes` front door → `product-launch-video` (a product or URL; strongest at 30–90 s, up to ~3 min), `music-to-video` (a track's beat grid drives an unnarrated piece), `motion-graphics` (unnarrated sting, under ~10 s, up to ~30 s), `general-video` (sizzles, montages, anything past ~3 min, and every `flow: companion` build); `hyperframes-animation` owns rules, blueprints and transitions | This graph decides register, structure and type cadence, picks the seams and cuts ([[launch-video-seams]], [[launch-video-cuts]]), and owns the sound ([[MOC-launch-video]], [[launch-video-sound]], [[sound-from-motion]]) and the frame.md export. Inside a HyperFrames project the seam stamp's eases, zoom values and exit timings win whether or not the repo-internal doctrine (`motion-doctrine`, `cut-the-curve`, `oversized-cursor`) is installed. `npx skills add` skips that doctrine, so check `.agents/skills/`, and if it is missing write the stamp's values by hand. Every other value conflict → [[hyperframes-reconciliation]] |
| Generating audio files | ElevenLabs `sound-effects` / `text-to-speech` | [[sound-palette]] material is the prompt prefix; [[sound-spec]] is the acceptance test |
| One of the thirty-two canonical CSS transitions | `transitions-dev` | Values still checked against [[easing-curves]] and [[duration-table]] |
| Installing or theming components | shadcn CLI / MCP (`info`, `search`, `view`, `add --dry-run`, `apply --preset`, `migrate`) | Driven by the contract's `integrations.shadcn`; tokens win over `css_vars` |
| A curated UI sound file | `soundcn` via `npx shadcn add @soundcn/<name>` | Re-pitch into the family; never ship raw |
| A diagram for readers: architecture, flow, sequence, state, ER, timeline, journey, chart — or redrawing Mermaid, draw.io or Excalidraw | `diagram-design` (Cathryn Lavery) | This graph decides whether to draw and on which surface ([[diagram-decision]]), maps the contract onto its color roles and families ([[diagram-design-reconciliation]]) and reviews against [[diagram-craft]]; inside its file, its geometry, type ramp and motion controller win |
| An editable canvas: a whiteboard, a planning board, a `.tldraw` or `.tldr` file | tldraw: Desktop's `tldraw-offline` skill (spawn its subagent for long jobs), or the tldraw MCP app in hosted clients; `tldraw-migrate` for SDK upgrades | [[tldraw-canvas]]'s rules (bound arrows, Mermaid for structure, lints before done, anchored comments); the surface's own skill owns the API |
| A GSAP SVG tween: DrawSVG, MorphSVG, MotionPath | GreenSock's `gsap-plugins` (with `gsap-core`) | Whether a library is justified ([[dependency-discipline]]), swap or morph ([[svg-path-morphing]]), durations, easing and reduced motion stay here |
| Fetching icons from a set | `better-icons` (Iconify, CLI or MCP) | One pack, passed as `--prefix` ([[icon-systems]]); token cleanup ([[svg-creation]]); check the set's license yourself; add its MCP server by hand pinned to a version npm has (`npm view better-icons version`; 1.0.4 on 2026-10-08), not through `setup`, which edits every agent's config |

## 5. A launch film, end to end

This graph directs the film and HyperFrames builds it. When the sound is derived from the motion and there is no stock bed or voice-over, host the build in HyperFrames' `general-video` with `flow: companion`. `product-launch-video` runs its own capture, voice-over and library-music pipeline, so use it only when the user wants that pipeline.

1. **Contract, then taste.** `frame.md` → `design.md` → `DESIGN.md` ([[using-design-md]]). Then [[pov]], which names the default register for an unspecified launch film.
2. **Decide the film.** Pick the register first ([[launch-video-registers]]), then [[launch-video-structure]], [[launch-video-type]] and [[launch-video-ui-demo]].
3. **Write the plan before the timeline.** Record the motion ([[launch-video-motion]]) and one ledger row per seam ([[launch-video-seams]], [[launch-video-cuts]]) in `STORYBOARD.md` and `ledger.json`. Build and gate it in HyperFrames (`check` must pass); inside the project, [[hyperframes-reconciliation]] settles value conflicts.
4. **Lock the picture, then score it.** Write one cue per contact frame and render the stem with `sound-sheet.mjs` ([[sound-from-motion]], [[launch-video-sound]]).
5. **Measure the render against its register** before anyone calls it done ([[launch-video-review]], or spawn [[launch-film-analyst]]).

This repo's own launch film, `docs/demo/hyperframes/`, is the worked example: its `STORYBOARD.md`, `ledger.json` and `assets/sfx/cues.json` follow these five steps.

## Rules

1. **Two questions, then act.** Phase, then material. If you opened four nodes before answering either, start over.
2. **Judge posture never writes; build posture never reviews silently.** Keep the posture the user asked for.
3. **Companions inherit the contract and the overrides.** Nothing leaves this router without [[gotchas]] and [[pov]] applied.
4. **Say when nothing fits.** Backend logic, data fetching, build tooling, and state management are not this graph's job; answer plainly and say no skill applies.

## Gotcha

Polishing a screen whose layout is still wrong wastes the pass — the polish is thrown away with the layout. Phase decides before material does.

## Sources

- HKTITAN — routing distilled from operating this graph beside its companions.
- AgentsORG `.design` spec §5 (precedence) and `skills/design` §8 (companion skills); impeccable command surface; HyperFrames `references/design-spec.md`.
- heygen-com/hyperframes skills (HEAD 2026-09-28, Apache-2.0): `skills/hyperframes/SKILL.md` (the front door's routes and length bands), `skills/motion-graphics/SKILL.md`, `skills/general-video/SKILL.md`, `.agents/skills/motion-doctrine` (internal, `metadata.internal: true`), `.agents/skills/README.md` (internal skills skipped by `npx skills add`).
- Cathryn Lavery, `diagram-design` (MIT; HEAD `f4547ee`, 2026-10-08): README "Install", SKILL.md §0, §11, §12. tldraw: Desktop's `tldraw-offline` agent skill (cited only), `tldraw/tldraw` `apps/mcp-app` and `skills/tldraw-migrate`. greensock/gsap-skills (MIT) `gsap-plugins`; better-auth/better-icons (MIT; npm 1.0.4 on 2026-10-08, the repo's 1.0.5 is unpublished) README.
- Related: [[routing-table]], [[disambiguation]], [[stacking-chains]].
