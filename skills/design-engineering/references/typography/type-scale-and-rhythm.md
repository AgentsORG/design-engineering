---
title: type-scale-and-rhythm
summary: Every size comes from a closed scale named by role. Leading unitless — ~1.1 display, 1.5–1.6 body. Tracking follows size. woff2 only, font-synthesis none, high-level properties over raw tags, tabular figures on anything that updates.
tags: [typography, scale, leading, tracking, fonts]
---

# Type scale and rhythm

Size, leading, and tracking carry more of typography's quality than any flourish; get the three right and most text problems never appear. This node is the mechanics beneath [[typography-humanity]] (which face) and beside [[line-length-tracking]] (how lines run).

## Files and features

- **Ship `woff2` and nothing else.** Brotli-compressed and universally supported; `ttf`/`otf` in `public/fonts` is a bug. Load only the weights you use and subset to the characters you use.
- **`font-synthesis: none` at the root.** Ask for an unloaded bold or italic and the browser fakes one by thickening or slanting glyphs. Turn it off so a missing file fails visibly.
- **High-level property over raw tag.** `font-weight: 620`, not `font-variation-settings: "wght" 620`; `font-optical-sizing: auto`, not a hand-set `"opsz"`; `font-variant-numeric: tabular-nums`, not `"tnum" 1`. Properties still do something sensible on a fallback font; raw tags silently stop. Reserve `font-variation-settings` / `font-feature-settings` for custom axes and numbered stylistic sets, and comment what the numbered slot does in *this* font.
- **Tabular figures on anything that updates.** Timers, prices, counters nudge their neighbours on every tick without them.

## Build a scale, then obey it

A short closed list of sizes; departures need justification. Ratio-derived (1.2 on a 16px root) or Tailwind's stock steps are both fine. On a team, name steps by **role** — `text-caption`, `text-card-title` — because a role polices its own usage in a way `text-lg` cannot. Sizes in `rem` so the reader's settings hold; `px` is for hairlines, not text.

## Leading follows role

Body 1.5–1.6; display and headings around 1.1 (large sizes carry their own optical spacing). Always **unitless**: `line-height: 24px` detonates on the first size tweak or user zoom. Paragraph spacing ≈ 1× line-height, not an arbitrary px.

## Tracking follows size

Display sizes slightly negative (≈ −0.015em); small uppercase labels slightly positive (≈ +0.06em) so capitals get daylight; body zero. Track in `em` so it scales with the text. Kerning is the font's own pair data and stays on; `font-kerning: none` is a deliberate, rare act.

## Crop the built-in space

Every font reserves headroom above the cap height and legroom below the baseline, which is why a label never sits dead-centre in its button. `text-box: trim-both cap alphabetic` crops it. Ship as progressive enhancement; the layout must survive where the trim never happens.

## Pairing and count

Two faces cover most products; three is the ceiling. Pair across categories (serif display over sans text), never within. Two lookalike grotesques read as a version-control accident. Weights and sizes obey the same economy: each exists to mark hierarchy, and stacking too many erases the distinctions they were meant to draw. Two families at the same `font-size` rarely look the same size — x-height decides — so re-tune sizes when swapping faces and match the fallback stack's x-height to avoid a jolt on load.

## When to apply

Setting up a project's type; any "text feels cramped here, airy there" complaint (one-off sizes are the cause); any live number; any font-loading diff.

## Gotcha

Never change font weight on hover or selection. The text reflows by a pixel and the layout shifts. Hold weight constant and signal state with color; if emphasis must move, use a variable axis at the same advance width.

## Sources

- Emil Kowalski's design-engineering practice on typography, distilled by HKTITAN.
- CSS Fonts Level 4 (`font-synthesis`, `font-optical-sizing`), CSS Inline Layout (`text-box`).
- Related: [[typography-humanity]], [[line-length-tracking]], [[line-behavior]].
