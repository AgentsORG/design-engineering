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
| Animation budget | Generous (scroll reveals, hero motion) | Tight (see [[delight-impact-curve]]) |
| Custom typography | Encouraged | Risky (legibility at small sizes) |
| Density | Loose | Often dense |
| Personality | Front and center | Earned in small moments |

## What this means in practice

- **Marketing pages can break the design system.** Custom layouts, asymmetric grids, hand-rendered illustrations, scroll-driven hero motion — all valid here. They would be tells in-app.
- **Product UI cannot break the design system.** The 100th session reveals every inconsistency. The micro-stagger that delighted on session 1 nauseates on session 50.
- **States are the real work in product UI.** Empty, loading, error, full, dense, sparse. Marketing rarely has these problems; product has them constantly.
- **Power-user features signal craft in product UI.** Keyboard shortcuts, multi-select, bulk operations. These are how product UI earns delight at low cost.

## When to apply

- Before reviewing any UI, ask: is this marketing or product? The criteria are different.
- When a designer proposes "let's add an animation here," ask the same question. The answer changes the verdict.
- See [[ai-default-tells]] for the giveaways of mixing the two — e.g., generic hero + 3-cards + FAQ on a *product* page, or pristine grid on a *marketing* page.

## Gotcha

Onboarding straddles both. It is in-product but rare-per-user. Treat onboarding more like marketing for delight budget, but more like product for layout discipline. The first run is allowed to be theatrical.

## Sources

- guidelines.sh — "Marketing: brand expression, asymmetry, narrative pacing. Product: consistency, design for the 100th session, states are the real work."
- Benji Taylor — Family Values essay, Honkish.
