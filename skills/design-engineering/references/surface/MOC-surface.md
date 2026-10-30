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
- [[z-index-strategy]] — DOM order first, then one global file of sequential layers, local values inside `isolation: isolate`; no magic numbers; what creates a stacking context or escapes a clip.
- [[color-token-tiers]] — Primitives by hue and step, semantics by role (the only tier components use), a full role inventory, one word per concept, `accent` for the brand so `primary` stays free.
- [[palette-step-roles]] — One neutral, one accent, only the status ramps you render; every step has a role (Tailwind by lightness, Radix by role); fills on 600; status ≥ 15° from the accent; audit before restructuring.
- [[gradient-interpolation]] — `in oklab` by default, `in oklch` to stay vivid (shorter or longer hue), the grey dead zone, banding, text measured at its worst region.

- [[translucent-materials]] — Glass by hierarchy: heavier for structure, never light on light, scrim only for modal tasks, legible text on glass, solid fallbacks for reduced transparency.
- [[oklch-gamut-and-migration]] — Chroma ceilings by hue and lightness, clamping that holds L and H, P3 behind a media query, the hex floor, what never to convert.

## Cross-cluster

- See [[ai-default-tells]] in [[MOC-anti-patterns]] for surface tells (purple gradients, neon glows on dark mode).
