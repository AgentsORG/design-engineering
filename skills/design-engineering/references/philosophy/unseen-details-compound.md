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

## Gotcha

Detail-obsession can become procrastination. There are details that compound and details that don't — taste tells you which is which ([[taste-is-trained]]). If you're spending three days on the loading spinner of a feature that ships once a quarter, you've lost the plot.

## Sources

- Paul Graham — "Taste for Makers" (the compound-details argument).
- Emil Kowalski — Core Philosophy in [emilkowalski/skill](https://github.com/emilkowalski/skill).
- Related: [[taste-is-trained]], [[beauty-is-leverage]], [[delight-impact-curve]].
