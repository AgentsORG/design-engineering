---
name: design-engineering
description: "Load when reviewing UI code, designing a component or page layout, picking an easing curve or transition pattern, deciding whether something should animate at all, choosing an avatar/typography/color system, writing UI copy or error messages, auditing for AI-default tells or a11y misses, consuming a project's DESIGN.md tokens, giving feedback through Agentation or a similar annotation tool, asking why a UI feels flat, or judging when delight earns its weight. Distills Emil Kowalski, Benji Taylor, Jakub Antalik (transitions.dev), guidelines.sh, Vercel design guidelines, Ben DC, DiceBear, lucide-animated, Google Labs design.md, Agentation, and Index (index.how — Emil Kowalski and Glenn Carstens-Peters)."
license: MIT
compatibility: Agent-agnostic. Pairs with Obsidian as a vault, Agentation for click-to-annotate review, and any coding agent that reads SKILL.md (Claude Code, Cursor, Codex, Windsurf, Aider, Cline, Gemini, 18+ via skills.sh).
metadata:
  author: HKTITAN
  version: "1.7.2"
  graph: true
  subagents: agents/
  soul: SOUL.md
---

# design-engineering

> This skill is a graph, not a file. The body below is the **Map of Content**. Follow the `[[wikilinks]]` only as needed — that's the whole point of progressive disclosure.

## How to use this skill

1. Scan the MOCs below. Pick the cluster that matches the user's question.
2. Open the relevant `MOC-*.md` for that cluster. It lists the atomic nodes under it.
3. Read only the atomic nodes that match. Each node is standalone — you don't need siblings.
4. Before reviewing UI code, also load `[[gotchas]]` and `[[pov]]`.

If the user asks for a UI code review, use the format defined in `[[review-format]]` and scan against `[[review-checklist]]`.

## Philosophy — when, where, and why polish matters

How to think about taste, delight, and the difference between marketing and product UI.

- `[[MOC-philosophy]]` → [[taste-is-trained]], [[unseen-details-compound]], [[beauty-is-leverage]], [[delight-impact-curve]], [[feeling-right]], [[marketing-vs-product-ui]], [[states-are-the-work]], [[data-is-content]], [[dependency-discipline]], [[pointing-beats-describing]], [[articulate-precisely]]

## Motion — when something should move, and how

The largest cluster. Animation is the most overused tool in modern UI; this cluster tells you when *not* to animate as much as when to.

- `[[MOC-motion]]` → [[animation-decision-framework]], [[easing-curves]], [[duration-table]], [[spring-animations]], [[transform-opacity-only]], [[transform-mastery]], [[clip-path-tricks]], [[never-scale-from-zero]], [[gesture-momentum]], [[stagger-choreography]], [[prefers-reduced-motion]], [[fly-not-teleport]], [[responsive-feedback]], [[sonner-principles]], [[debugging-animations]], [[lerp-breathing]], [[morphing-icons]], [[shared-letter-morph]], [[hover-default-imperative]], [[tray-rules]], [[css-conventions]]

## Transition techniques — Jakub Antalik's catalog

A subset of motion focused on **canonical** transitions for common UI archetypes. Where the Motion MOC teaches principles, these nodes teach implementation. From transitions.dev.

- [[cross-blur-transitions]] — Pair opacity 0↔1 with `filter: blur(2px) ↔ 0` to mask imperfect crossfades.
- [[compose-subtract-asymmetry]] — Enter with more properties than exit. Disappearance feels soft, not reversed.
- [[distance-falloff-propagation]] — Per-element lift via `lift * pow(falloff, distance)` for grouped hover.
- [[multi-segment-shake]] — Form-error shake at 0%, 28.57%, 57.14%, 78.57%, 100% over 280ms.

## Typography — humanizing text

The font defaults of the AI era are tells. Better choices and the rules around them.

- `[[MOC-typography]]` → [[typography-humanity]], [[line-length-tracking]]

## Surface — color, shadow, radius, dark mode, imperfection

The "background" choices that most decks of guidelines skip. They're load-bearing for feel.

- `[[MOC-surface]]` → [[color-monochromatic]], [[dark-mode]], [[shadows-whisper]], [[border-radius]], [[visual-imperfection]], [[contrast-and-color-scheme]]

## Layout — page-level grids, viewports, sticky chrome, URL-as-state

The container, not the component. Marketing especially benefits from custom-per-viewport thinking; product apps benefit from URL-driven state.

- `[[MOC-layout]]` → [[viewport-custom-design]], [[sticky-and-scroll-tells]], [[url-as-state]]

## Components — buttons, hovers, states, cards, forms, avatars, icons, a11y, copy

The atoms users actually touch. Their behavior is where craft lives.

- `[[MOC-components]]` → [[hover-states-subtle]], [[empty-loading-states]], [[icon-systems]], [[cards-design]], [[forms-validation]], [[avatar-systems]], [[interaction-personality]], [[accessibility-baseline]], [[optimistic-updates]], [[copy-voice]]

## Anti-patterns — what AI-generated UI gives away

What looks "AI default" and what to do instead. High-value because it's about deletion, not addition.

- `[[MOC-anti-patterns]]` → [[ai-default-tells]], [[content-authenticity]]

## Meta — review format, design.md, Agentation, evals, per-installer files

Procedural rules and growing files. `[[review-format]]` is mandatory when doing UI code reviews.

- [[review-format]] — Required output format for UI critiques (Before | After | Why markdown table).
- [[review-checklist]] — Eleven-row audit to scan against before signing off on a UI review.
- [[design-vocabulary]] — The precise word for each design phenomenon and where the skill goes deeper. The lexicon behind [[articulate-precisely]]; seeded by Index (Emil Kowalski & Glenn Carstens-Peters).
- [[using-design-md]] — How to consume a project's DESIGN.md (Google Labs spec). Tokens are normative; prose is context.
- [[agentation-workflow]] — Install and use [Agentation](https://www.agentation.com) for click-to-annotate design review. Two-session critique-then-fix workflow.
- [[cross-model-testing]] — How to test description / routing changes across GPT, Claude Opus, and Claude Sonnet.
- [[gotchas]] — lived failures, appended as the agent trips up.
- [[pov]] — author/installer's opinions and taste calls that override defaults. Edit this when you fork.
- [[animations-dev-curriculum]] — external pointer to Emil's course; don't duplicate.

## Workflow subagents — sibling `agents/` directory

Six narrow-purpose subagents live in `agents/` next to this file. Spawn one when its specific workflow matches the user's ask. Each subagent loads its own slice of the graph and returns to the main agent with a structured result.

- [[ui-reviewer]] — Runs the `[[review-format]]` table + `[[review-checklist]]` audit on a UI snippet.
- [[motion-auditor]] — Animation/transition critique against the motion cluster + transitions.dev nodes.
- [[anti-pattern-scanner]] — Scans for AI-default tells and content-authenticity misses.
- [[agentation-fix-loop]] — Session-2 fix side of `[[agentation-workflow]]`. Reads MCP annotations and applies fixes.
- [[design-md-consumer]] — Reads a project's DESIGN.md and threads its tokens through generated UI per `[[using-design-md]]`.
- [[pov-curator]] — Helps the installer fork `[[pov]]` and append to `[[gotchas]]` after a real failure.

See `agents/README.md` for the full directory and selection guide.

## Identity — SOUL.md

The repo also ships a [`SOUL.md`](../../SOUL.md) at root — voice, stance, and taste lineage for any agent operating in this skill. AGENTS.md is the "what/how"; SOUL.md is the "who/why". Read it once per session if your harness doesn't auto-inject it.

## Tax check

Every sentence above costs tokens in every session. If you find yourself adding a sentence, ask: *would the agent get this wrong without it?* If no, delete it. If yes, it belongs in an atomic node, not here.

— HKTITAN, 2026.
