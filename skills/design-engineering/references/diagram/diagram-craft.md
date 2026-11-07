---
title: diagram-craft
summary: What makes a figure read as designed — delete first, one or two focal accents, treatment over size, orthogonal connectors with masked labels and their own attach points, arrows drawn before boxes, a 4px grid, a bottom legend, mono only for technical text, and an accessible SVG. Distilled from diagram-design for drawing without it and for reviewing a figure made with it.
tags: [diagram, svg, craft, review]
---

# Diagram craft

A designed diagram is mostly deletion. Every node is a distinct idea, every line carries information the layout doesn't already show, and the accent marks the one or two things the reader must see first. The figure is done when nothing can be removed. When `diagram-design` is installed it owns these rules and checks the geometry with its own scripts. Without it, draw from this node; with or without it, review against this node.

## Remove before you add

Run four tests before drawing. Can a node go? Can two nodes merge, because they always travel together? Can an arrow go, because the layout already implies it? Can a label go, because shape or color already says it? Then hold the budget from [[diagram-decision]]: 9 nodes, 12 connectors, 2 accents, 2 callouts.

## Signal

- **One accent, on one or two elements.** An accent on five nodes is no accent ([[color-monochromatic]]). Everything else is ink, muted or soft.
- **Hierarchy by treatment, not by size alone.** Focal: accent tint fill, accent stroke. Service: white fill, ink stroke. Store: ink at 5 %. External: ink at 3 % with a 30 % stroke. Optional: dashed `4,3`. Trust boundary: dashed accent at 50 %. Identical boxes for every node erase the hierarchy.
- **Borders, not shadows.** Nodes at radius 6, type tags at 2, never a pill or a soft 16px card. A figure is print, so [[shadows-whisper]] does not apply here.

## Connectors: the six rules a figure fails on

1. Orthogonal only. Off-axis links are right-angle elbows rounded at r=8 (r=6 in tight layouts); a straight line only when both ends share an x or a y.
2. Every arrow label sits on an opaque paper mask, 6–10px clear of its stroke, beside a vertical segment, never on the line. 14 characters at most.
3. No shared or stacked strokes. Offset parallel routes by 12px or more; hop at a single crossing.
4. Connectors on one edge each get their own attach point at `L·k/(N+1)`, at least 12px apart.
5. No line passes behind a box it doesn't end at. Reroute it.
6. No label mask overlaps a node drawn after it. Draw arrows before boxes, so lines sit behind nodes.

Strokes are muted by default, accent on the headline path, a link color on HTTP and external calls, and dashed `5,4` for async or return paths.

- **A fan-out draws its shared trunk once**, then branches from a junction; copies of one path laid over each other darken and knot (Benji Taylor, Stageshow `references/annotations.md`).
- **A reply is its own line from the recipient.** A two-headed line can't say who asked; a solid request and a dashed return can.

## Grid, type, legend

Node origins, sizes, gaps and padding divide by 4. Names go in a sans at 600; technical sublabels (ports, commands, URLs, field types) go in mono. Never use mono as a blanket "dev" font ([[typography-humanity]]). The legend is a horizontal strip under the figure, never floating among the nodes; widen the `viewBox` by about 60px to hold it. On a phone, keep the SVG's `min-width` at its viewBox width inside a local `overflow-x: auto` wrapper, so the figure scrolls and the page doesn't.

## Accessible SVG

`role="img"` with `aria-labelledby` naming a `<title>` and a `<desc>`. `<title>` is the first child, before `<defs>`. Prefix both ids with the figure's slug, never bare `title`, because figures get inlined side by side. `<desc>` is one sentence about the content, not the geometry. The general markup rules are [[svg-creation]]'s.

## Reference

Bad: three usage sources each run a full line into the invoice box, `POST` sits on its stroke, and client and API share one two-headed arrow.
Good: the three routes meet at one junction and a single delivery leaves it; the request is solid, the reply dashed and starting at the API; `POST` and `200 OK` sit on paper masks 8px clear of their strokes.

```svg
<path d="M96 64 H216" class="edge accent" marker-end="url(#fig-arrow)"/>
<path d="M216 88 H96" class="edge muted" stroke-dasharray="5 4" marker-end="url(#fig-arrow)"/>
<circle cx="272" cy="160" r="3" fill="var(--accent)" stroke="var(--paper)" stroke-width="2"/>
```

Gold example: `stageshow/examples/annotations/index.tsx`, the "A request and its reply" and "A shared processing graph" studies (trunk, junction, branches); node treatments from diagram-design's `references/style-guide.md`. The junction dot copies Stageshow's `Connector` endpoint (3px radius per `references/kit.md`, 2px white rim in `kit/motion/Connector.css`).
Benji's call differs: Stageshow's `Connector` offers `route="curve"`, one soft S, for a looser diagram; in an editorial figure the orthogonal rule above stands.
Check: cover each connector in turn and ask what the reader loses; a line that loses nothing goes. Then zoom to 400%: every end has its own attach point and no two strokes share a pixel at a node's edge.

## Gotcha

AI-default diagrams have a look: dark mode with a cyan or purple glow, identical rounded boxes, a legend floating among the nodes, labels sitting on their lines, diagonal connectors, and Mermaid's auto-layout passed off as a design ([[ai-default-tells]]). A redraw keeps the content (components, relationships, grouping, direction) and throws away the source's coordinates, colors and fonts.

## Sources

- Cathryn Lavery, `diagram-design` (MIT; HEAD `f4547ee`, read 2026-10-08): SKILL.md §1, §4, §6, §7, §9, §12; `references/style-guide.md` (node treatments, stroke, radius), `references/primitives-core.md` (connector rules), `references/output-spec.md` (holding the canvas on a narrow screen).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/annotations.md` (shared trunk, request and reply), `stageshow/references/kit.md` (`Connector` extras, `route="curve"`), `stageshow/kit/motion/Connector.css` (endpoint dot), `stageshow/examples/annotations/index.tsx`.
- HKTITAN — distillation and cross-links.
