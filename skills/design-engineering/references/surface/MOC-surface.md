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

## Cross-cluster

- See [[ai-default-tells]] in [[MOC-anti-patterns]] for surface tells (purple gradients, neon glows on dark mode).
