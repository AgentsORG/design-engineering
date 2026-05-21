---
title: visual-imperfection
summary: Optical alignment beats mathematical. Texture and noise beat flat. Imperfect shapes beat perfect geometry — in marketing.
tags: [surface, imperfection, asymmetry, texture]
---

# Visual imperfection

Mathematically perfect design reads as cold and computer-generated. A small amount of deliberate imperfection — optical adjustments, subtle texture, slightly irregular shapes — is what makes work feel human.

Important: this is mostly a *marketing* / *brand* concern. In-app product UI should stay disciplined ([[data-is-content]], [[states-are-the-work]]). The imperfection live on the marketing surface.

## 1. Optical vs. mathematical alignment

A circle next to a square at the same height does *not* look the same height. The square fills its bounding box; the circle doesn't. To look the same, the circle needs to be ~5% larger.

Same with:

- A triangle (icon) next to a rectangle (label) — the triangle's bounding box is mostly negative space; it reads smaller.
- A capital letter next to a lowercase — visual weight differs.
- A pill button next to a rectangle button — pill ends are visually lighter.

The fix is *optical adjustment*: nudge sizes/positions until they *look* aligned, even if the numbers say they're off.

Example — icon next to text:

```css
/* Mathematical: same line-height, same vertical-align */
.icon { vertical-align: middle; }

/* Optical: nudge icon up by 1px because text baseline reads lower */
.icon { vertical-align: middle; transform: translateY(-1px); }
```

Trust your eye over the numbers. If it looks wrong, it is wrong.

## 2. Texture and noise

Flat color fills can feel sterile. Adding subtle texture warms a surface without anyone noticing why.

```css
.surface {
  background-color: var(--bg);
  background-image: url('data:image/svg+xml;utf8,<svg ...noise pattern...></svg>');
  /* or */
  background-image: radial-gradient(circle, rgba(0,0,0,0.012) 1px, transparent 1px);
  background-size: 4px 4px;
}
```

Common patterns:
- **Paper grain** — subtle 4–8px noise overlay at ~1% opacity.
- **Film grain** — slightly more visible noise for editorial / brand surfaces.
- **Gradient mesh** — instead of a flat hero color, use a 2–3 stop gradient that's barely perceptible.

The noise should be felt, not seen. If a user notices the texture explicitly, it's too strong.

## 3. Imperfect shapes

For brand-led work, geometric perfection is a tell. Slight irregularity adds character:

- **Slightly irregular borders** — not perfectly straight lines; hand-drawn feel.
- **Hand-drawn strokes** — for marketing illustrations, accents, dividers.
- **Asymmetric blob shapes** — for hero backgrounds, instead of perfect circles.
- **Wobbly bullets, slightly off-grid icons** — when the brand is playful.

These read as "made by a person." Perfectly round circles and perfectly straight lines read as "made by a machine" — fine for utility UI, wrong for personality.

Tools: hand-drawn SVG libraries (Open Doodles, Croodles via DiceBear), or just sketch in Procreate / iPad and import.

## 4. Asymmetric layouts (marketing only)

Symmetric layouts feel safe. Asymmetric layouts feel intentional.

```
Symmetric (default):    Asymmetric (marketing):
   [hero]                       [hero]
   [3-card grid]            [big card] [stack of 2 small]
   [CTA]                    [pull-quote that escapes the grid]
```

Asymmetric is a marketing-page tool. It signals craft and confidence. But it requires real layout work — you can't just shuffle modules randomly. See [[viewport-custom-design]].

## When to apply

- Marketing pages, brand-led surfaces, hero sections, blog index, about pages.
- Editorial content (long-form articles, design portfolios).
- Onboarding moments where personality earns the bandwidth.
- Brand-driven products from inception (a "fun" app where imperfection is core to identity).

## When NOT to apply

- Data-heavy product UI ([[data-is-content]]).
- Forms, tables, dashboards.
- Repeated UI patterns (lists, settings, etc.) — consistency wins inside the product.
- Anywhere users need to *parse* the layout quickly. Imperfection slows scanning.

## Gotcha

Don't confuse "imperfection" with "lazy alignment." A blog post with random margins on each paragraph is not imperfect-on-purpose; it's broken. The imperfection has to be deliberate, applied at specific decorative moments, and consistent in its inconsistency.

A test: would the imperfection survive being shown to a senior designer? If they'd flag it as a bug, it's a bug. If they'd nod, it's intentional.

## Sources

- guidelines.sh — Visual Imperfection category (optical alignment, texture/noise, imperfect shapes, asymmetric layouts).
- Related: [[viewport-custom-design]], [[typography-humanity]], [[marketing-vs-product-ui]], [[feeling-right]].
