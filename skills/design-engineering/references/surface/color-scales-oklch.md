---
title: color-scales-oklch
summary: Author in OKLCH. One hue per ramp, L anchored 0.97→0.22 and spaced evenly, chroma as a curve clamped per step, siblings at the same fraction of their own ceiling, dark mode by remapping steps, contrast repaired by moving L only.
tags: [surface, color, oklch, palette, contrast, dark-mode]
---

# Color scales in OKLCH

An `oklch()` value is a measurement, not a recipe: L is how bright the color actually looks, C how vivid, H where it sits. Because the numbers track perception, palette math, contrast repair, and dark mode become arithmetic. Everything new is authored in OKLCH; hex survives only where a third-party consumer parses hex. This node builds the ramps that [[color-monochromatic]] asks for and feeds the checks in [[contrast-and-color-scheme]].

## Reading a value

`oklch(0.586 0.222 17.6)` — L 0–1, C from 0 (gray) to ~0.4 at the extreme, H 0–360 (≈20 red, 90 yellow, 145 green, 195 cyan, 260 blue, 330 pink). Alpha goes after a slash, never as a fourth comma argument. Three decimals is plenty.

## Building a ramp

1. **Anchor L and space evenly.** Step 50 ≈ L 0.97, step 950 ≈ L 0.22, linear between. Even L spacing is the point: every adjacent pair looks equally far apart. Never run to L 0 or 1; chroma collapses there and the ends stop reading as the hue.
2. **Shape chroma as a curve.** Express each step's C as a fraction of that step's sRGB ceiling: ~30% at the extremes rising to ~85% around 400–500. Tints stay airy, shades stay rich, nothing leaves the gamut.
3. **Clamp per step.** The ceiling `maxC(L, H)` moves with lightness, so a saturated base necessarily loses absolute chroma toward both ends. That is the gamut's geometry, not a defect.
4. **Hue is fixed for all eleven steps.** Converting an inherited scale and finding more than ~10° of hue spread end to end means it drifts visibly; rebuild it on the mid-tone hue.

```css
--berry-50:  oklch(0.97 0.007 330);
--berry-400: oklch(0.67 0.251 330);   /* chroma peaks where this hue's gamut is widest */
--berry-950: oklch(0.22 0.03 330);
```

## Families of hues

Brand + success + warning feel like one system when each `-500` sits at the **same L** and each hue takes the **same fraction of its own ceiling**, never the same absolute C. Cyan is cramped at every lightness; violet is roomy. One copied C value over-saturates the roomy hues and flattens the tight ones.

## Dark mode is a remap

Keep one scale and swap which steps the roles point at: `--surface` 50 ↔ 950, `--ink` 950 ↔ 50, 200 ↔ 800, 300 ↔ 700. Perceptually linear L keeps the pairs as distinct after the flip as before. Never hand-pick a second palette. Desaturate brand accents 20–30% if they vibrate on dark, and keep the top canvas the lightest dark surface — see [[dark-mode]].

## Contrast lives in the L gap

Chroma and hue barely move contrast. To repair a failing pair, push the foreground's L away from the background's L and leave C and H alone; raising saturation "to make it pop" does nothing. Fast triage: a surface with L > 0.6 wants dark text; near-white grounds (L ≥ 0.85) want foreground L ≤ 0.45; near-black grounds (L ≤ 0.25) want L ≥ 0.75. Then run the real check: APCA |Lc| ≥ 60 for body (75 comfortable), ≥ 45 large, ≥ 30 non-text; WCAG 2 4.5:1 body, 3:1 large, when compliance language names it.

## Gamut and P3

Syntactically valid values can exceed what sRGB shows. Clamp C holding L and H, and layer wide-gamut chroma behind `@media (color-gamut: p3)` on top of the sRGB-safe base. Tailwind v4 is authored in OKLCH; custom `@theme` scales should be too, and `/50` opacity suffixes compose out of the box.

## When to apply

Any new palette, any hex → OKLCH migration (swap values only; keep keywords, gradient shape, and hex-expecting config), any "is this readable" question, any dark theme.

## Gotcha

HSL's lightness is decorative — `hsl(55 100% 50%)` is nearly white-bright and `hsl(255 100% 50%)` is dark. A ramp spaced on HSL's L inherits that lie and its tints slide toward violet. Never generate scales in HSL.

## Sources

- Emil Kowalski's design-engineering practice on color, distilled by HKTITAN.
- APCA (Myndex) and WCAG 2 contrast thresholds; CSS Color Level 4 `oklch()`.
- Related: [[color-monochromatic]], [[contrast-and-color-scheme]], [[dark-mode]].
