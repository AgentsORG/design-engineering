---
title: stacking-chains
summary: Ordered node chains for multi-step jobs — a new screen, a feel-better pass, a design system, a marketing site — so sequencing decisions aren't re-derived per session.
tags: [meta, routing, workflow]
---

# Stacking chains — ordered routes for multi-step jobs

Single questions route to single nodes ([[routing-table]]). Real jobs — "build this screen", "make the app feel better" — chain several clusters, and the *order* matters: deciding motion before layout wastes work; polishing before the states exist polishes the wrong thing. These chains encode the orderings that survived use.

## The chains

### New feature screen, start to ship

[[feeling-right]] → [[typography-humanity]] + [[color-monochromatic]] + [[shadows-whisper]] → [[forms-validation]] (if inputs) → [[animation-decision-framework]] → [[accessibility-baseline]] → [[review-checklist]] → [[review-format]]

Structure first, surfaces second, behavior third, motion only after the static version works, floor checks before the gate.

### "Make this app feel better"

[[motion-auditor]] (audit what exists) → [[delight-impact-curve]] (where motion is missing — propose few) → [[review-checklist]] (the finishing pass)

Fix what's wrong before adding what's absent.

### Design system from scratch

[[color-monochromatic]] → [[typography-humanity]] → [[shadows-whisper]] + [[border-radius]] → [[using-design-md]] (capture the tokens so agents consume, not reinvent)

### Marketing surface

[[marketing-vs-product-ui]] → [[typography-humanity]] → [[ai-default-tells]] (delete pass) → [[review-format]]

Marketing tolerates more expression and *less* default — the deletion pass is not optional here.

### Accessibility pass

[[accessibility-baseline]] → [[contrast-and-color-scheme]] → [[prefers-reduced-motion]]

### Slow or janky app

[[transform-opacity-only]] → [[debugging-animations]] → [[duration-table]]

Property discipline first — most jank is animating the wrong property, not animating too much.

### Don't know what it should look like yet

Build three genuinely different versions before committing. Each variant must diverge on a *named axis* — layout, density, personality, motion, or interaction model — or you've built the same thing three times with different paint. Converge on one, then enter the "new feature screen" chain at the surfaces step. See [[taste-is-trained]]: comparison is how taste gets exercised.

## Rules

1. **Chains are orderings, not checklists.** Skip links that don't apply; never reorder them.
2. **Each link is a read, not a rewrite.** Enter a link, apply its values to the work in hand, move on.
3. **Every shipping chain ends at [[review-format]].** If the chain ends and no review happened, it isn't done.
4. **[[gotchas]] and [[pov]] apply at every link**, not as a final step — an installer override can prune a whole link.

## Gotcha

Don't run a full chain on a one-line change. Chains are for jobs that touch three or more clusters; a hover tweak routes through [[routing-table]] to one node and stops.

## Sources

- HKTITAN — orderings distilled from repeated multi-cluster sessions; companions: [[routing-table]], [[disambiguation]].
