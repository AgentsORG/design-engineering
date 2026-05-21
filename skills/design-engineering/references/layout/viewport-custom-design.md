---
title: viewport-custom-design
summary: Each viewport gets its own design, not just a scaled version of desktop. Narrow columns are valid. Break the grid for delight.
tags: [layout, responsive, viewport]
---

# Viewport-custom design

"Responsive" doesn't mean scaling desktop. It means designing each viewport with intent.

## What this means

The default workflow:
1. Designer builds desktop in Figma.
2. Engineer "makes it responsive" by setting flex/grid breakpoints.
3. Mobile looks like a thinner version of desktop.

This produces *technically* responsive UI that feels designed for one viewport and bent to fit others. The fix is designing each major viewport (mobile, tablet, desktop, ultra-wide) with its own layout intent.

For mobile, this often means a *completely different* layout — not a single-column stack of desktop elements. For example:

| Desktop | Mobile |
|---|---|
| Sidebar + main content | Bottom tab bar + full-width content |
| 3-column grid of cards | Horizontal-scroll carousel or vertical stack with different priority |
| Wide hero with image right | Stacked hero with image full-width below |
| Dense table | Card-per-row with key fields prioritized |

## Narrow columns are valid

A common mistake: making content full-width because the viewport allows it. A 2400px-wide article is unreadable; 65 characters per line is the sweet spot for prose ([[line-length-tracking]]).

```css
.article {
  max-width: 65ch; /* or 720px */
  margin: 0 auto;
  padding: 0 24px;
}
```

Blog content, documentation, long-form reading — these often benefit from a narrow central column even on a 4K monitor. Don't fill space just because it's there.

## 12-column grids as foundation

The 12-column grid is the most flexible base because 12 divides into 1, 2, 3, 4, 6, 12. You can have a one-third / two-thirds split, a quarter / three-quarters, a six-column gallery, etc.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
.hero { grid-column: span 12; }
.feature { grid-column: span 4; }
.sidebar { grid-column: span 3; }
.main { grid-column: span 9; }
```

Use this as the foundation. *Then* break it intentionally for delight.

## Break the grid (deliberately)

Small graphical elements that escape the grid signal craft — a quote with a hanging punctuation mark in the left margin, an illustration that overlaps a section divider, a callout that bleeds outside the column.

This is a marketing-page move ([[visual-imperfection]]). In-product, hold the grid.

## Bento layouts (the modern landing-page pattern)

Bento boxes — irregular grid layouts where tiles vary in size and feature their own micro-content — are a 2024–2026 landing-page staple:

```
[ tall feature ] [ wide visual    ]
                 [ wide visual    ]
[ small ] [ small ] [ small      ]
[ wide quote that bridges 3 cols  ]
```

When done well, each tile is self-contained, hierarchy is clear from size alone, and the overall layout reads as composed (not random). When done poorly, it reads as a Bootstrap grid that someone broke.

## When to apply

- Designing any new screen — start with the viewport-specific layouts, not a single desktop comp.
- Reviewing a "responsive" PR — ask whether mobile was designed or just scaled.
- Landing pages and marketing pages — bento and break-the-grid live here.

## When NOT to apply

- Forms — single-column, top-to-bottom, no exceptions.
- Dashboards with comparable widgets — symmetric grid wins for scannability.
- Content the user reads (long articles, docs) — narrow central column.

## Gotcha

Don't apply marketing-grade asymmetry to product UI. Asymmetric grids in a settings page look broken; in a hero, they look intentional. See [[marketing-vs-product-ui]].

Also: viewport-custom design isn't an excuse to ship inconsistency. The *components* should be consistent across viewports; the *composition* of components varies. A button looks the same on mobile and desktop; the screen they're on differs.

## Sources

- guidelines.sh — "Design for each viewport" + "Narrow columns are valid" + "12-column grids" + "Break the grid for delight."
- Bento Grids (bentogrids.com) — modern landing-page bento examples.
- Related: [[sticky-and-scroll-tells]], [[marketing-vs-product-ui]], [[visual-imperfection]].
