---
title: MOC-surface
summary: Color, shadow, border-radius, dark mode. The "background" choices that decide feel.
tags: [moc, surface, color, shadow]
---

# MOC — Surface

The decisions that look invisible but determine whether the UI feels considered or generated. Monochromatic with restraint usually beats colorful.

## Nodes

- [[color-monochromatic]] — Monochromatic with one or two accents beats a five-color palette. Why bright/purple gradients scream AI.
- [[dark-mode]] — Never pure `#000`. Use `#18181b` or `#1a1a1a` with 90–93% opacity white text. Why pure-black breaks.
- [[shadows-whisper]] — Shadows should whisper, not announce. The default `0 2px 8px rgba(0,0,0,0.1)` is a tell. Concrete spec.
- [[border-radius]] — Uniform radius everywhere is lazy. Capsule buttons need full package. Nested-radius rules.
- [[visual-imperfection]] — Asymmetry in marketing only. Optical over mathematical alignment. Subtle texture/noise. Imperfect shapes — perfect geometry feels cold.
- [[contrast-and-color-scheme]] — APCA over WCAG 2 for contrast math. `<meta name="theme-color">` + `color-scheme: dark`. Interactions raise contrast. Avoid gradient banding.
- [[color-scales-oklch]] — Author in OKLCH: one hue per ramp, L anchored and evenly spaced, chroma as a clamped curve, siblings at the same fraction of their own ceiling, dark mode by remapping steps, contrast repaired by moving L only.
- [[depth-and-nesting]] — Inner radius = outer − padding; shadows elevate, borders separate; dark mode collapses shadows to a ring; 0.5px hairlines, pure black/white image outlines, mask fades, themes flip variables.

## Cross-cluster

- See [[ai-default-tells]] in [[MOC-anti-patterns]] for surface tells (purple gradients, neon glows on dark mode).
