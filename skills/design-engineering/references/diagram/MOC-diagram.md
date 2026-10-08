---
title: MOC-diagram
summary: Diagrams as a decision flow — whether a picture earns its place, which surface it lives on (an editorial figure, an editable tldraw canvas, docs-as-code, FigJam), the craft of a figure, the contract handoff into diagram-design, and canvases for agents.
tags: [moc, diagram, svg, canvas, companions]
---

# MOC — Diagrams

A diagram is the costliest way to say something, so the first decision is whether to draw at all. The second is which surface the picture lives on: a finished figure for readers, an editable canvas the team keeps working in, or docs-as-code beside the text. Two companions do the drawing. Cathryn Lavery's `diagram-design` draws editorial figures (44 visual types) as one self-contained HTML file with inline SVG. tldraw's agent surfaces edit live canvases: tldraw Desktop's `tldraw-offline` skill and the tldraw MCP app. This cluster decides; the companions draw.

## The decision flow

1. [[diagram-decision]] — prose, a table, or a picture; then the surface, chosen by who touches it next; the budget (9 nodes, 12 connectors, 2 accents) that says split it.
2. [[diagram-craft]] — the figure's rules for drawing without diagram-design or reviewing one made with it: delete first, focal accents, treatments, the six connector rules, the 4px grid, the bottom legend, an accessible SVG.
3. [[diagram-design-reconciliation]] — inside a diagram-design file: how a `.design` contract reaches its color roles and families, and which value wins on paper, small type, the motion clock, export and pov.
4. [[tldraw-canvas]] — an editable board: which tldraw surface, bound arrows, Mermaid for structure, one shape per card, lints before done, anchored comments, scripts and their trust.

## Who draws it

- **diagram-design** (MIT): `npx skills add cathrynlavery/diagram-design`, or its Claude Code / Codex / Copilot / Droid marketplaces, which also bring its export, import, profile and doctor commands. Its `self_check.py` checks accessibility and motion in any install; its geometry verifier runs from a repo checkout. Export is manual only.
- **tldraw Desktop**: the app's agent setup installs the `tldraw-offline` skill and subagent; the canvas runs locally. **tldraw MCP app**: one URL in any client that supports MCP apps. **tldraw SDK**: `tldraw-migrate` handles version upgrades. Routing lives in [[skill-router]].

## Cross-cluster

- [[svg-creation]] owns the markup under an exported figure: `viewBox`, prefixed ids, SVGO flags, `<title>` and `<desc>`.
- [[animation-decision-framework]] decides whether a figure moves; diagram-design's clock decides how ([[diagram-design-reconciliation]]).
- [[data-is-content]] and [[empty-loading-states]] own charts inside a live product, which are components, not figures.
- [[ai-default-tells]] lists the generated-diagram look [[diagram-craft]] removes.
- [[pointing-beats-describing]] and [[agentation-workflow]] are the review loop a canvas's anchored comments repeat.
