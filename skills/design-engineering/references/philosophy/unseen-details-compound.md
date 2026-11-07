---
title: unseen-details-compound
summary: The details users never consciously notice are the ones that decide whether they trust the product.
tags: [philosophy, details, taste]
---

# Unseen details compound

Paul Graham's framing, sharpened by Emil Kowalski: the details a user *consciously* notices are mostly noise; the details they *don't* notice are signal. A product that gets the unseen details right accumulates trust that has no single attributable source.

## What "unseen details" are

- The button that scales to 0.97 on press, not 0.95.
- The 600ms tooltip delay that drops to 0ms after the first hover ([[responsive-feedback]]).
- The skeleton placeholder that matches the actual layout ([[empty-loading-states]]).
- The dark-mode background that is `#18181b`, not pure black ([[dark-mode]]).
- The font tracking that tightens at display size ([[line-length-tracking]]).
- The shadow that uses three layers at 4% opacity instead of one at 10% ([[shadows-whisper]]).
- The unread dot that hangs 7px into the margin, so a row never shifts when it is read (Benji Taylor, Stageshow `kit/parts/Row.css`).

None of these are noticed individually. All of them compound.

## How compounding works

Each invisible detail does one of two things:
1. **Removes a micro-friction.** The user doesn't notice the absence of friction; they just feel better using the product.
2. **Signals care.** Even unconsciously, users distinguish between a product where someone tuned the details and one where nobody did.

Twenty unseen details = twenty micro-frictions removed = a product that feels uncared-for is replaced by one that feels considered. Users won't say "the tooltip delay is great"; they'll say "this feels nice."

## The corollary

If you can articulate why a detail matters in one sentence, it's probably not the most valuable detail. The most valuable details are the ones that need three paragraphs to explain *why* the absence is felt. That's why this skill exists — to encode them.

## When to apply

- When deciding what to do with the last day of a sprint. The features are done; spend it on the unseen.
- When reviewing a PR that's "functionally complete." The PR is *not* done. Ask what's been tuned.
- When picking what to deep-dive in a design critique. The obvious problems are obvious. The valuable ones are below the surface.

## Reference

Benji Taylor's bar for unseen details is the exacting reviewer who screenshots the one wrong thing and sends it back asking what it is. Four that reviewer catches, with the fix:

- Bad: unread rows push their avatar in, so the column zigzags. Good: every avatar on one edge; the dot hangs 7px left of the lead.
- Bad: a confirmation card stops 2px short of the panel edge. Good: edges line up exactly or part by at least the gutter, never under 8px.
- Bad: "Sent" beside a check sits low in its button. Good: `text-box: trim-both cap alphabetic` centers the label on its capitals.
- Bad: the 1 in a progress ring sits off center on tabular digits. Good: proportional figures, trimmed to cap height.

Gold example: `stageshow/teaching/composition.tsx` (the `unread-gutter`, `edge-separation` and `control-alignment` pairs) and `stageshow/kit/parts/Row.css`.

Check: zoom the still to 2x and ask what you would circle and send back. If you can picture that screenshot, it is the next fix; then film it, since a pill hopping 4px only shows between frames.

## Gotcha

Detail-obsession can become procrastination. There are details that compound and details that don't — taste tells you which is which ([[taste-is-trained]]). If you're spending three days on the loading spinner of a feature that ships once a quarter, you've lost the plot.

## Sources

- Paul Graham — "Taste for Makers" (the compound-details argument).
- Emil Kowalski — Core Philosophy in [emilkowalski/skill](https://github.com/emilkowalski/skill).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/SKILL.md` (How hard to press), `stageshow/references/craft.md` (Spacing and alignment), `stageshow/kit/parts/Row.css`, `stageshow/teaching/composition.tsx`.
- Benji Taylor, benji.org/stageshow (read 2026-11-07).
- Related: [[taste-is-trained]], [[beauty-is-leverage]], [[delight-impact-curve]].
