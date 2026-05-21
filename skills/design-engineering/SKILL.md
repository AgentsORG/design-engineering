---
name: design-engineering
description: Load when reviewing UI code, designing a component or page layout, picking an easing curve or transition pattern, deciding "should this animate at all?", choosing an avatar/typography/color system, auditing for AI-default tells, asking "why does this feel flat?", or judging when delight earns its weight. Distills Emil Kowalski, Benji Taylor, Jakub Antalik (transitions.dev), guidelines.sh.
license: MIT
metadata:
  author: HKTITAN
  version: "1.1.0"
  graph: true
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

- `[[MOC-philosophy]]` → [[taste-is-trained]], [[unseen-details-compound]], [[beauty-is-leverage]], [[delight-impact-curve]], [[feeling-right]], [[marketing-vs-product-ui]], [[states-are-the-work]], [[data-is-content]]

## Motion — when something should move, and how

The largest cluster. Animation is the most overused tool in modern UI; this cluster tells you when *not* to animate as much as when to.

- `[[MOC-motion]]` → [[animation-decision-framework]], [[easing-curves]], [[duration-table]], [[spring-animations]], [[transform-opacity-only]], [[transform-mastery]], [[clip-path-tricks]], [[never-scale-from-zero]], [[gesture-momentum]], [[stagger-choreography]], [[prefers-reduced-motion]], [[fly-not-teleport]], [[responsive-feedback]], [[sonner-principles]], [[debugging-animations]], [[lerp-breathing]], [[morphing-icons]], [[shared-letter-morph]], [[hover-default-imperative]], [[tray-rules]]

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

- `[[MOC-surface]]` → [[color-monochromatic]], [[dark-mode]], [[shadows-whisper]], [[border-radius]], [[visual-imperfection]]

## Layout — page-level grids, viewports, sticky chrome

The container, not the component. Marketing especially benefits from custom-per-viewport thinking.

- `[[MOC-layout]]` → [[viewport-custom-design]], [[sticky-and-scroll-tells]]

## Components — buttons, hovers, states, cards, forms, avatars, icons

The atoms users actually touch. Their behavior is where craft lives.

- `[[MOC-components]]` → [[hover-states-subtle]], [[empty-loading-states]], [[icon-systems]], [[cards-design]], [[forms-validation]], [[avatar-systems]], [[interaction-personality]]

## Anti-patterns — what AI-generated UI gives away

What looks "AI default" and what to do instead. High-value because it's about deletion, not addition.

- `[[MOC-anti-patterns]]` → [[ai-default-tells]], [[content-authenticity]]

## Meta — review format, evals, per-installer files

Procedural rules and growing files. `[[review-format]]` is mandatory when doing UI code reviews.

- [[review-format]] — Required output format for UI critiques (Before | After | Why markdown table).
- [[review-checklist]] — Eleven-row audit to scan against before signing off on a UI review.
- [[cross-model-testing]] — How to test description / routing changes across GPT, Claude Opus, and Claude Sonnet.
- [[gotchas]] — lived failures, appended as the agent trips up.
- [[pov]] — author/installer's opinions and taste calls that override defaults. Edit this when you fork.
- [[animations-dev-curriculum]] — external pointer to Emil's course; don't duplicate.

## Tax check

Every sentence above costs tokens in every session. If you find yourself adding a sentence, ask: *would the agent get this wrong without it?* If no, delete it. If yes, it belongs in an atomic node, not here.

— HKTITAN, 2026.
