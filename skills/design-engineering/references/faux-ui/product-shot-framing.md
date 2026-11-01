---
title: product-shot-framing
summary: How a faux UI sits in its space — decided before the screen is built. Design at the shown size, one hero and at most two satellites of different kinds, 10–40% of the hero off stage, crop only filler, one gutter, the page is the ground, a compact second design at 358 wide, and a layout table from corner bleed to tilted stack.
tags: [faux-ui, framing, crop, layout, marketing, product-shot]
---

# Product-shot framing

Framing decides whether the picture reads as a product shot or a screenshot pasted into a box. Decide it before building anything: a crop needs nothing past the crop, and it sets how big the type must be.

## Size first

Design at the size it will be seen and show it at 1:1. About 720 × 340 for a hero beside copy, 900–1100 wide for a full-width hero, 400 × 300 for a feature card; never under about 320 wide for a demo (a bento tile or satellite card may be smaller). A lone card in a 680px column wants 500–560 wide so its text reads at 15–20px. Small formats crop harder: a 400px card holds a third of a dashboard at full size, not all of it at a third.

## The rules

1. **One hero, at most one or two satellites** (a receipt, a phone, a detail card) that carry the point. Two satellites are two kinds and two sizes — a card and a small system object — never two equal cards on one edge, which read as a pile.
2. **Keep what identifies the product:** a title, the real chrome, the rows that give the action a reason. Logo and nav are optional.
3. **Crop 10–40% of the hero off stage.** The window or phone fills at least two thirds of the stage width and runs off an edge. Shapes that read when cut (a card, a slider track, a row of avatars) run off by a third or more.
4. **Crop only filler.** The payoff, the action, what the cursor touches and every real word stay whole; a list or terminal may run one line off a bled bottom. A placeholder button the crop would slice is removed, not sliced. If the story does not fit, change the stage size or the layout.
5. **The stage masks everything** (`overflow: hidden`), one rounded corner per edge. Fades only for sliding tracks, stacks, charts, and one crop: a window fading out at its foot, by mask, over filler.
6. **Satellites straddle the hero's edge about half outside**, over chrome or margin, never content; fully outside, tie them back with a 1px leader ending in a dot. Anchored UI (a popover, menu, toast) is not a satellite: it sits where the product puts it.
7. **One gutter**, measured in the final crop: the hero's inset sets every other edge distance. An edge either sits a full gutter in or runs well past; crossing by under 24px or stopping a few px short reads as a mistake.
8. **A window keeps its device's shape:** whole, 1.25:1 or wider; bled, what shows is at least square. Fix by crop, never by squashing.
9. **What the story opens stays in frame**, a gutter from every edge on every frame; place the trigger so the overlay has room.
10. **No dead corners**, at rest or anywhere in the loop.
11. **Start flat and frontal.** Depth from shadow, z-order, scale and opacity; a tilt has to beat the straight version at final size.

## The page is the ground

"White page" means a transparent stage: no plate (a tinted field the window floats on) behind the device on a white or dark page. A whole, centred window with air on four sides floats; bleed it off two edges or fill the slot. Unframed — whole, centred, margin at least the shadow's depth — only when the developer asks for it. The stage is the shot: a tile is cut to the stage's shape, never a stage boxed inside another ground.

## Layouts

| Layout | Hero | Satellite | Use for |
|---|---|---|---|
| Corner bleed | Inset ~10% top and left, 15–35% past right and bottom | Straddling left or bottom | Hero beside copy |
| Pinned, bottom bleed | Inset 8–12% left, right, top; 15–35% past the bottom | Optional, straddling a side | Feature card, bento tile |
| Stage with gutters | Inset 8–20% each side on a coloured stage, off the bottom | One side | Brand moment |
| Satellite focus | Cropped hard, mostly context | Large, 30–40% of hero width, carries the story | A notification, receipt, diff |
| Wide hero | 900–1100px at 1:1, realistic fidelity, off the bottom | A card on its lower edge | Full-width homepage hero |
| Device pair | Desktop ~75–80% wide, off the bottom | Phone straddling right, a third outside, present from frame one | Cross-device story |
| Close-up | Whole window at 1.3–1.6×, chrome and all | None | A card about one control |
| Many of one | A grid of one small thing off every edge, one in focus by depth | None | Templates, previews, sessions |
| Tilted stack | Three cards at −6°, 4°, −2°, offset 12–20px; only the top one has words | None | Paper: receipts, tickets — the one place tilt earns its keep |
| Corner chip | Window inset top-left | A pill centred on its corner, half outside | One live fact about the whole product |

The layouts are recipes, not a mandate: a whole window with even gutters is valid when its contents read and the brief asks for it.

## Phones

A satellite phone starts at 40% of the window's visible width and at least 220px; let it run off rather than shrink. Notifications stay at true iOS size and native width (the screen minus 18pt a side) — size the phone around the banner, never the banner to the phone. A phone cropped at the top loses its status bar and nav bar together. In a 400px host a phone is always cropped: a gutter from one edge, off the other, screen at 1:1.

## Compact is a second design

Every demo that can sit in a phone column ships a second composition at the column's width (358 in a 390 viewport): crop closer, drop or stack the satellite, keep action and payoff whole. A desktop scene scaled down passes an overflow check while its 13px text renders at 8px ([[viewport-custom-design]]).

## When to apply

Before any code for a hero illustration, feature card, docs plate or bento tile; again after anything moves.

## Gotcha

Told to "run the window off the edge", agents barely do it — a few px past, which is the worst of both. Copy an example that does it, then check the final crop: is the hero's top-left visible, is the bleed a deliberate fraction and not a sliver?

## Sources

- Benji Taylor, Stageshow (MIT, github.com/benjitaylor/skills, HEAD `8020574`, read 2026-11-01): `stageshow/SKILL.md` (workflow step 1, the five failures), `references/framing.md` (rules, layouts, phones, small formats). Paraphrased; the layout table is condensed.
- Related: [[faux-ui-restraint]], [[bento-grids]], [[page-frame]], [[stageshow-reconciliation]].
