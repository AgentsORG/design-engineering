---
title: oklch-gamut-and-migration
summary: Chroma ceilings swing with hue and lightness — clamp C holding L and H, layer P3 behind a media query over an sRGB base, add a hex floor only for pre-2023 browsers, and migrate hex/rgb/hsl to OKLCH value-for-value, reporting every change.
tags: [surface, color, oklch, gamut, p3, migration]
---

# OKLCH gamut and migration

OKLCH can name colors no screen shows. Whether a value renders faithfully depends on its lightness, its hue and the display's gamut, so high chroma is checked, clamped and progressively enhanced rather than trusted. Migration to OKLCH is a value-for-value substitution that changes nothing else in the file. [[color-scales-oklch]] builds ramps on top of this.

## Ceilings move

Approximate sRGB chroma ceilings:

| L | Roomiest | Tightest |
|---|---|---|
| 0.5 | violet H 285 ≈ 0.29; red H 25 ≈ 0.20 | cyan H 195 ≈ 0.09 |
| 0.7 | pink H 330 ≈ 0.31 | cyan, still cramped |
| 0.9 | spring green H 130 ≈ 0.24 | — |

A threefold spread at one lightness is why two hues never share an absolute C. Plan for muted teals in sRGB.

## Clamp, don't let the browser map

An out-of-gamut value gets mapped by the browser in a way you didn't pick. Keep L and H, lower C to the boundary: `oklch(0.6 0.31 20)` becomes `oklch(0.6 0.241 20)`.

## P3 as enhancement

Display P3 is a superset of sRGB, roughly a quarter larger, mostly in greens, reds and pinks. Ship the safe value, then override:

```css
.cta { background: oklch(0.66 0.2 330); }
@media (color-gamut: p3) { .cta { background: oklch(0.66 0.32 330); } }
```

At L 0.66, H 330 sRGB tops out near 0.30 and P3 near 0.33. Only for browsers older than 2023, put a hex value first and wrap both layers in `@supports (color: oklch(1 0 0))`.

## Migrating a file

1. Hex first (easy to spot), then `rgb()`/`rgba()`, then `hsl()`/`hsla()`.
2. Alpha moves behind a slash: `rgba(255,255,255,.12)` → `oklch(1 0 0 / 0.12)`. Opaque values carry no `/ 1`.
3. Never convert keywords (`currentColor`, `transparent`, `inherit`), gradient interpolation hints (`in oklab`), or config a third-party library parses as hex.
4. Keep comments, order and indentation; the diff shows only color values.
5. Re-run contrast on any pair that mattered ([[contrast-and-color-scheme]]): the conversion is exact, but colors picked by eye in hex often measure slightly off.

In Tailwind v4, re-express every `@theme` color, then hunt the `theme()` calls and hardcoded hex that duplicated them.

## Reporting

Group changes by file; list each declaration's old value beside its new one with a short clause naming the rule (out of gamut, hue drift, too little L gap). Every touched line, not a highlight reel.

## Gotcha

Raising the base token's chroma to get "more punch" breaks on sRGB screens. The punch belongs in the P3 layer; the base stays inside sRGB.

## Sources

- Emil Kowalski's design-engineering practice, distilled by HKTITAN.
- CSS Color Level 4 (`oklch()`, `color-gamut`).
- Related: [[color-scales-oklch]], [[contrast-and-color-scheme]], [[gradient-interpolation]], [[color-token-tiers]].
