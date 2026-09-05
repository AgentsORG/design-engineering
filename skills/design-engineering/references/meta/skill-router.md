---
title: skill-router
summary: What `/design-engineering` does first — classify the phase and the material, resolve the design contract, then hand the job to the owning node, subagent, or installed companion skill (AgentsORG design, impeccable, HyperFrames, ElevenLabs, the transitions catalog, the shadcn CLI). One or two owners, never five.
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
| Done | "does this look right", "review before I ship" | [[ui-reviewer]] or [[review-format]] |
| The words | "what's it called when…" | [[design-vocabulary]] — answer and stop |
| Keeps missing | "closer, but not quite" after a round or two | [[build-a-tool]] |

## 3. Pick the material

Type → [[typography-humanity]], [[type-scale-and-rhythm]]. Color → [[color-scales-oklch]]. Depth → [[depth-and-nesting]]. Motion → [[animation-decision-framework]]. Sound → [[sound-decision-framework]] / [[sound-designer]]. SVG → [[svg-creation]] / [[svg-creator]], [[svg-animation]] / [[svg-animator]]. Forms → [[forms-behavior]]. Props → [[component-api-design]]. Marketing → [[marketing-surface-rules]]. Generated look → [[unslop-pass]] / [[anti-pattern-scanner]]. Speed → [[performance-discipline]]. Docs for agents → [[design-system-docs]].

## 4. Hand off to installed companions

A companion is installed when its `SKILL.md` exists under `.agents/skills/`, `.claude/skills/`, or a plugin cache, or its slash command is registered. Hand the job over, pass the contract, and run the result back through [[gotchas]], [[pov]], and (for reviews) [[review-format]]. If it is not installed, do the job from this graph and say which companion would have owned it.

| Job | Companion | Boundary |
|---|---|---|
| Discover, follow, update, verify a `.design`; bootstrap one | AgentsORG `design` skill | It owns the contract; this graph never redefines a token |
| A named pass: polish, critique, audit, typeset, layout, colorize, animate, distill, harden, onboard, clarify, adapt, optimize | impeccable (`/impeccable <command>`) | Its output still passes [[review-checklist]]; a DESIGN.md it writes imports per [[using-design-md]] |
| A launch film, reveal, or any rendered motion piece | HyperFrames (`hyperframes-creative`, `hyperframes-audio`) | This graph supplies [[launch-video-sound]] and the frame.md export from the contract |
| Generating audio files | ElevenLabs `sound-effects` / `text-to-speech` | [[sound-palette]] material is the prompt prefix; [[sound-spec]] is the acceptance test |
| One of the thirty-two canonical CSS transitions | `transitions-dev` | Values still checked against [[easing-curves]] and [[duration-table]] |
| Installing or theming components | shadcn CLI / MCP (`info`, `search`, `view`, `add --dry-run`, `apply --preset`, `migrate`) | Driven by the contract's `integrations.shadcn`; tokens win over `css_vars` |
| A curated UI sound file | `soundcn` via `npx shadcn add @soundcn/<name>` | Re-pitch into the family; never ship raw |

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
- Related: [[routing-table]], [[disambiguation]], [[stacking-chains]].
