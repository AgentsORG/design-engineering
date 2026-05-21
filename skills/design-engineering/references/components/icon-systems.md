---
title: icon-systems
summary: Never mix icon packs. 10-32px range. Match stroke to font weight. Lucide is overused.
tags: [components, icons]
---

# Icon systems

Icons are the most replicated UI element in a product. They are also the easiest to get wrong via mismatch — three icons from three different packs at three different stroke widths in the same UI.

## Pick one icon pack

The single most important rule: **never mix icon packs**. The eye notices instantly, even if the user can't articulate why the UI feels off.

If you started with Material Icons and now want a feature that needs a custom icon, draw the custom icon to match Material's style (rounded, filled, 24px viewbox). Don't reach for Heroicons "just for this one."

## Packs worth considering

| Pack | Style | Best for |
|---|---|---|
| **Lucide** | Outline, 24×24 | Solid default but overused — pick Phosphor or Hugeicons if you want differentiation |
| **Phosphor** | Multi-weight outline | More personality than Lucide, same coverage |
| **Hugeicons** | Wide library | Less common, distinctive |
| **Tabler** | Outline, 1.5px stroke | Cleaner than Lucide at small sizes |
| **Iconoir** | Outline, hand-drawn feel | Editorial / blog energy |
| **Heroicons** | Outline + solid pairs | Tailwind ecosystem |
| **Material Symbols** | Filled, variable | Apps that already use Material |

## Sizing

| Use | Size |
|---|---|
| Inline with body text | 16px |
| Toolbar buttons | 20px |
| Primary navigation | 20–24px |
| Hero / empty state | 32–48px |
| Marketing | 24–96px |

Below 14px, most icon packs lose detail. Above 32px, hand-drawn or larger-viewBox icons fare better than 24px-viewBox stretched up.

## Match stroke weight to font weight

If your font is **500 (Medium)**, your outline icons should have a **1.75–2px stroke** at 24px.
If your font is **400 (Regular)**, your icons should have a **1.5px stroke**.

Phosphor's "regular" weight is 1.5px; "bold" is 2.5px. Pick the one that matches your type.

## Icon transformations, not crossfades

When toggling an icon (e.g., chevron expand/collapse, play/pause, sun/moon), **rotate or transform** rather than crossfade between two icons. See [[fly-not-teleport]].

- Chevron up/down: rotate 180°.
- Play/pause: replace via opacity *but* if you have the bandwidth, draw a single morphing path.
- Sun/moon: morph via shared geometry (lucide-animated.com has examples).

See [[animations-dev-curriculum]] for the canonical resource on icon animation.

## When to apply

- Setting up a new design system: pick the pack, document it, lock it.
- Reviewing a PR that introduces a new icon: check the pack source.
- Auditing an existing UI: grep for `<svg>` elements from different packs.

## Gotcha

Icon stroke is `stroke-width`, not `border-width`. Setting `stroke-width: 2` on a 16px icon yields a different visual weight than 2px on a 24px icon (the smaller icon looks heavier). Either scale stroke proportionally or use a variable-weight icon pack like Phosphor.

## Sources

- guidelines.sh — "Never mix icon packs; match stroke to font weight; Lucide is overused."
- lucide-animated.com — icon animation patterns.
- Phosphor Icons — weight system documentation.
