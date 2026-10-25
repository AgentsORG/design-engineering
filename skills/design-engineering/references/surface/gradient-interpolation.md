---
title: gradient-interpolation
summary: A gradient's interpolation space is a look, not a correctness setting. `in oklab` is the default (even brightness), `in oklch` arcs round the hue wheel and stays vivid (pick shorter or longer hue), sRGB muddies the middle. Opposite hues go grey in a rectangular space; big low-contrast gradients band; text on a gradient is measured at its worst region.
tags: [surface, color, gradient, oklch, oklab]
---

# Gradient interpolation

The same two stops make three different gradients depending on the space they are mixed in, and the difference lives in the middle. Choosing the space is a look decision, so it is never a review finding by itself — a gradient that goes grey, bands, or puts text on an unmeasured region is.

## Three spaces

```css
background: linear-gradient(#3b82f6, #ec4899);          /* sRGB: the default — midpoint darkens and mutes */
background: linear-gradient(in oklab, #3b82f6, #ec4899); /* even brightness across: the best default */
background: linear-gradient(in oklch, #3b82f6, #ec4899); /* round the hue wheel: vivid throughout */
```

sRGB and OKLab are **rectangular**: they mix along a straight line through the colour space. OKLCH is **polar**: it interpolates the hue angle, so it arcs through every hue between the stops — which is why it stays saturated and why it can produce a hue nobody asked for. Blue to pink in OKLCH routes through purple; that is either the look or a surprise.

## The grey dead zone

Two hues on opposite sides of the wheel sit either side of the neutral axis. A straight line between them passes near grey and the middle goes lifeless. Two fixes: switch to a polar space, which routes round the axis, or add a third stop between them and keep the space. In a polar space you also choose the direction: `in oklch shorter hue` (usually right) or `longer hue` (sweeps most of the spectrum).

## Banding and text

- **Banding** shows on large areas with little contrast between stops on 8-bit displays: a hero-wide gradient steps visibly. Widen the stops' contrast, shrink the area, or add a faint noise layer ([[contrast-and-color-scheme]]; a rendered film bands too — see [[gotchas]]).
- **Text on a gradient** has a different contrast at every pixel, so one number describes nothing. Measure the worst region, not the average, or put a scrim behind the text ([[wcag-thresholds]]).

## When to apply

Any `linear-`, `radial-` or `conic-gradient`, a mesh-style hero, a chart fill, a hex → OKLCH migration of a gradient (keep its shape and stops; only add a space if the look should change).

## Gotcha

A violet-to-blue gradient across a hero is still the generated-page tell however well it interpolates ([[ai-default-tells]]). The space decides how a gradient mixes, not whether the page should have one.

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, read 2026-10-25): `skills/better-colors/SKILL.md` (**Pick a gradient's interpolation space**), `color-usage.md` (Gradients).
- CSS Color Module Level 4 — interpolation colour spaces and hue-interpolation methods.
- Related: [[color-scales-oklch]], [[palette-step-roles]], [[interfaces-reconciliation]].
