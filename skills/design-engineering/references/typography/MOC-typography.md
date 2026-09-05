---
title: MOC-typography
summary: Humanizing text on screen. Font choice, line length, tracking.
tags: [moc, typography]
---

# MOC — Typography

Typography is where AI-generated UIs give themselves away first. Inter and SF Pro are tells.

## Nodes

- [[typography-humanity]] — Why Inter/SF Pro feel default. Indie foundries to know. Buying a single weight is fine.
- [[line-length-tracking]] — 45–75 characters per line. Tighten tracking as size increases. `text-wrap: pretty`. When uppercase is allowed.
- [[type-scale-and-rhythm]] — A closed scale named by role; unitless leading (~1.1 display, 1.5–1.6 body); tracking by size; woff2 only, `font-synthesis: none`, properties over raw tags, tabular figures on anything that updates.
- [[line-behavior]] — Measure near 65ch, wrap mode per role, overflow guards both ways, truncation with an escape hatch, casing by CSS, real punctuation, tuned underlines, logical properties, the 16px and contrast floors.

## Cross-cluster

- See [[ai-default-tells]] in [[MOC-anti-patterns]] for typography tells (default sans on landing pages, gradient text on hero).
- For the precise word behind a vague critique (kerning vs tracking, widow vs orphan, leading), see [[design-vocabulary]].
