---
title: prototype-picker
summary: When the decision hasn't been made, build three to five genuinely different versions behind a live picker — real materials, worst content, a named axis each, every uncertain number on a control — then write the decision down, promote the winner, and delete the harness.
tags: [meta, prototyping, exploration, workflow]
---

# Prototype behind a picker

A divergence workflow for the exploration phase: a rough description and a decision nobody has made yet. If the user has already decided, build the one thing — a picker holding three answers to a settled question wastes the run. This is the "don't know what it should look like yet" entry in [[stacking-chains]], expanded.

## Hard rules

1. **Never touch production code during exploration.** Prototypes live in a throwaway route (`/proto/<slug>`) imported by nothing. Integration happens only for the winner.
2. **Real materials, worst content.** Real fonts, tokens, and components — a prototype built from other materials answers a question about an interface you aren't building. Then fill it with the content that breaks it: the longest real name, the two-line title, forty rows, the empty state. Pretty placeholder content makes every variant look fine and hides the decision.
3. **Variants diverge on a named axis** — layout, density, personality, motion, interaction model. If you cannot state each variant's axis in a phrase, you have three tints of one idea. Names describe direction ("Quiet", "Editorial", "Dense"), never "Option A/B/C".
4. **Every variant fully works.** Real interactions, motion, states. No dead buttons, no "imagine this part".
5. **The picker is chrome, not a contestant.** A fixed dark pill, bottom-center, unbranded, never restyled with the project's tokens. Number keys and arrows switch, `R` replays, `?v=2` persists the selection. Switching is instant — it happens a hundred times a session.
6. **The output is a decision, not code.**

## Workflow

- **Scope** one thing per run; if the brief spans a dashboard, pick the highest-leverage piece and offer the rest as follow-ups.
- **Recon** the stack, materials, personality, and context. If the piece exists, the current implementation is variant 1, unchanged — a baseline beats a memory.
- **Loadout**: before variant code, load the nodes the brief needs — [[feeling-right]] always; then [[type-scale-and-rhythm]], [[color-scales-oklch]], [[depth-and-nesting]], [[animation-decision-framework]], [[forms-behavior]], [[marketing-surface-rules]] as relevant; [[ui-polish-pass]] and [[touch-and-focus]] before the user sees anything. The loadout applies to every variant equally, or the comparison is rigged.
- **Three variants** by default, up to five. Render one at a time, full size, in realistic surrounding context; thumbnails distort spacing.
- **Controls** whenever the brief has a number in it — duration, easing, spring, blur, radius, offset. Any number you would hardcode is a decision not yet made; put it on a slider with a range wide enough to be wrong, a speed multiplier on anything that moves, the value visible and copyable. Controls write to CSS variables, not React state, so the slider itself doesn't stutter.
- **Verify** every variant yourself: renders, responds, clean console, no [[review-checklist]] escalations.
- **Present** a table — variant, axis, when it wins, its cost — with the URL and keys. Then **stop**; the choice is the user's. Never pre-pick a favorite.

## Promote and write it down

When the user picks, write the decision first — it is the only artifact that survives:

```md
Dropdown entrance — decided from /proto/dropdown
- scale from 0.96, opacity 0 → 1; 180ms enter, 140ms exit, cubic-bezier(0.32, 0.72, 0, 1)
- Rejected: slide-down felt heavy at 200ms and jittery below it
```

The rejected options are the part everyone skips and the part that saves the next discussion. Then integrate the winner per project conventions ([[component-api-design]] if it becomes shared) and delete the route. A picker that survives the run is exactly the dead code rule 1 exists to prevent.

## When to apply

"Show me a few options", "which feels better", "not sure if". Not for reviewing existing UI ([[review-format]]) or polishing a finished component ([[ui-polish-pass]]).

## Gotcha

Divergence is not an excuse to drop the craft bar. A sloppy variant doesn't widen the exploration; the user rejects a good direction because the type was ugly, and the run taught them nothing.

## Sources

- Emil Kowalski's design-engineering practice on prototyping, distilled by HKTITAN; Josh Puckett's DialKit for the control panel.
- Related: [[taste-is-trained]], [[stacking-chains]], [[build-a-tool]], [[vibe-to-generator]].
