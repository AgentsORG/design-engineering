---
title: diagram-decision
summary: Whether a picture earns its place, and which surface it lives on — a finished editorial figure (diagram-design), an editable canvas (tldraw), docs-as-code (Mermaid) or FigJam — with one owner per surface, chosen by who touches the picture next.
tags: [diagram, decision, companions, routing]
---

# Should this be a diagram, and where does it live?

Draw only when a reader learns more from the picture than from a paragraph or a table. A diagram is the most expensive way to say something: it costs layout, labels, a legend and a review, and a wrong one teaches the wrong structure faster than prose would. Ask that question before choosing a diagram type, then choose the surface by who will touch the picture next.

## Picture, table, or sentence

| The content is… | Use |
|---|---|
| A list of things, or attributes compared side by side | a table or bullets |
| One relationship ("the API calls the queue") | the sentence |
| A before / after that changes attributes only | a table; a change of topology is a diagram (an architecture delta) |
| Flow, containment, order in time, dependency, position on two axes | a diagram |
| Live numbers inside a product | a chart component with states, not a figure ([[data-is-content]]) |

If a three-column table carries the same meaning, the table wins.

## Who touches it next decides the surface

| Next touch | Surface | Owner |
|---|---|---|
| Readers of a doc, post, README, deck or PR | a finished editorial figure: one self-contained HTML file with inline SVG; PNG or SVG only on request | `diagram-design`; [[diagram-craft]] when it is not installed; [[diagram-design-reconciliation]] when the project ships a contract |
| A team that keeps moving boxes: whiteboarding, planning, review in comments | an editable tldraw canvas | tldraw's agent surfaces ([[tldraw-canvas]]) |
| The code: versioned beside the text it explains | a Mermaid block in Markdown | the docs renderer; redraw it in diagram-design when it ships to readers |
| A team that lives in Figma | FigJam | Figma's `figma-generate-diagram` |

One picture, one surface. When a canvas becomes a published figure, redraw it: diagram-design imports Mermaid, draw.io and Excalidraw sources and lays them out again. From a tldraw board, take the structure from its shapes and bindings, not from a screenshot. Never screenshot a canvas into a doc and call it the figure.

## The budget

A figure holds about 9 nodes, 12 connectors and 2 accents. Past that it is two diagrams, an overview and a detail. diagram-design aims at a density of 4/10: complete enough to be correct, sparse enough to need no guide. An import set to `faithful` may run to 24 nodes in zones, and splits above that. A canvas has no hard budget. If a board needs a legend to get around, it needs frames instead ([[tldraw-canvas]]).

## When to apply

Before drawing any architecture, flow, sequence, state, ER, timeline, org, journey or chart figure. Also before opening a canvas, and whenever someone asks "can you diagram this?".

## Gotcha

"Make a diagram" from someone who will edit it tomorrow is a canvas job, not a figure job. A diagram-design file is finished output, and changing it means running the skill again. When the request doesn't say who touches it next, ask. And a chart inside a live product is a component with loading, empty and error states ([[empty-loading-states]]), not a figure exported once.

## Sources

- Cathryn Lavery, `diagram-design` (MIT; plugin 2.6.68, HEAD `f4547ee`, read 2026-10-08): SKILL.md §1 (deletion, density 4/10), §2 (when not to draw), §3 (type selection), §7 (budget), §11 (import dials).
- tldraw: the `tldraw-offline` agent skill that tldraw Desktop installs (the app is not open source; cited, not copied), and the tldraw MCP app (`tldraw/tldraw`, `apps/mcp-app`).
- Figma: the `figma-generate-diagram` skill (Mermaid → editable FigJam).
- HKTITAN — choosing the surface by who touches it next.
