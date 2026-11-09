---
title: marketing-vs-product-ui
summary: Marketing is brand expression and narrative pacing. Product is consistency for the 100th session, not the first. Different rules apply.
tags: [philosophy, marketing, product]
---

# Marketing UI vs Product UI

The single most common mistake in modern design is applying marketing-page energy to in-app product UI, or vice versa. They are different mediums with different goals.

## The split

| | Marketing | Product |
|---|---|---|
| Frequency | Visited once or twice | Used 100s of times |
| Goal | Convert, communicate, impress | Get out of the way |
| Asymmetry | Welcome (narrative pacing) | Bad (looks broken) |
| Animation budget | Generous for one hero entrance and explanatory motion; never a reveal on every section | Tight (see [[delight-impact-curve]]) |
| Custom typography | Encouraged | Risky (legibility at small sizes) |
| Density | Loose | Often dense |
| Personality | Front and center | Earned in small moments |

## What this means in practice

- **Marketing pages can break the design system.** Custom layouts, asymmetric grids, hand-rendered illustrations, scroll-driven hero motion — all valid here. They would be tells in-app.
- **Product UI cannot break the design system.** The 100th session reveals every inconsistency. The micro-stagger that delighted on session 1 nauseates on session 50.
- **States are the real work in product UI.** Empty, loading, error, full, dense, sparse. Marketing rarely has these problems; product has them constantly.
- **Power-user features signal craft in product UI.** Keyboard shortcuts, multi-select, bulk operations. These are how product UI earns delight at low cost.

A fade-in on every section fails even on marketing: it replays on every visit and holds content back from anyone scrolling fast. Keep the hero, drop the rest ([[marketing-surface-rules]], [[animation-removal-hazards]]).

## When to apply

- Before reviewing any UI, ask: is this marketing or product? The criteria are different.
- When a designer proposes "let's add an animation here," ask the same question. The answer changes the verdict.
- See [[ai-default-tells]] for the giveaways of mixing the two — e.g., generic hero + 3-cards + FAQ on a *product* page, or pristine grid on a *marketing* page.

## Reference

The same invoices list, as each medium wants it:

| | Product shot on a marketing page | The product itself |
|---|---|---|
| Size | designed at the size it is shown: 400 x 300 card, 720 x 340 hero beside copy | the app's own width (Stageshow draws Linear at 860) |
| Words | 3 to 7 real strings: the selected row, its neighbors, the total; bars elsewhere | every row real |
| Frame | window pinned top-left, running off the right and bottom | the whole window and its chrome |
| Motion | a story may slow down; the payoff holds 2s | feedback as quick as the real product, starting on the input |

Gold example: `stageshow/examples/static-card/` for the marketing crop, beside `stageshow/examples/linear/` for an app at its own width with color only on content marks.

Check: count the real strings in the marketing shot (3 to 7 is the budget in `stageshow/references/craft.md`), then open the shipped product view at 390 wide and confirm no placeholder survives into it.

## Gotcha

Onboarding straddles both. It is in-product but rare-per-user. Treat onboarding more like marketing for delight budget, but more like product for layout discipline. The first run is allowed to be theatrical.

## Sources

- guidelines.sh — "Marketing: brand expression, asymmetry, narrative pacing. Product: consistency, design for the 100th session, states are the real work."
- Benji Taylor — Family Values essay, Honkish.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/remove-animations/SKILL.md (per-section reveals removed, the hero kept).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): stageshow/SKILL.md (Workflow step 1), stageshow/references/craft.md (Restraint), stageshow/references/motion.md, stageshow/examples/static-card/, stageshow/examples/linear/.
