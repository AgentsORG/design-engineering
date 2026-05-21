---
title: delight-impact-curve
summary: Potential for delight rises as feature frequency falls. Daily-use features need minimal delight; rare moments earn big ones.
tags: [philosophy, delight, animation]
---

# The delight-impact curve

The more often a user encounters a feature, the *less* delight it can carry without becoming annoying. The less often a user encounters it, the *more* delight it can carry, because each encounter is fresh.

This is Benji Taylor's framing and it is the single most useful heuristic for deciding "should this animate / make a sound / have a flourish?"

## The curve, concretely

| Frequency of use | Delight allowance |
|---|---|
| Every keystroke (typing, scroll) | **None.** Any animation here is friction. |
| Every action (clicking primary buttons, hovering rows) | Subtle. ~100–160ms. No flourish. |
| Daily-use moments (commit, send, save) | Small. A tick. A momentary highlight. |
| Weekly moments (new doc, share, complete a flow) | Medium. Stagger or scale-in. |
| Rare milestones (sign up complete, first export, year-in-review) | **Big.** Confetti is fine here. |

## What this means in practice

- The keyboard never gets animation. Period.
- Primary buttons should feel immediate and pressable, but not "delightful."
- The big motion budget is reserved for moments the user encounters rarely. Save your best ideas for those.
- A daily-use feature that gets weekly-tier animation will feel slow within a week.

## When to apply

Anytime someone proposes "let's make this more fun." Ask: how often does the user see this? Then look at the curve. If it's high-frequency, the right answer is usually "make it more invisible," not "make it more visible."

## Gotcha

The curve breaks for first-run experiences. Onboarding is rare-per-user but high-leverage; it can carry weekly-tier delight even on per-action moments. Once onboarding is done, the budget collapses back to the per-frequency norm.

## Sources

- Benji Taylor, "Family Values" — the explicit delight-impact framing.
- Emil Kowalski, [[animation-decision-framework]] — frequency-based decision tree variant.
