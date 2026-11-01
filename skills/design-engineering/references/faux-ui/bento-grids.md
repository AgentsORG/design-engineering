---
title: bento-grids
summary: A bento grid is one picture made of tiles, planned before any tile is built — a third to a half of the tiles show UI, one hero, each UI tile one component not a window, chrome at most once, neighbours of different kinds, stat tiles at display size on one line, copy outside the picture at page size, one Stage per tile at 1:1, and each width its own design.
tags: [faux-ui, bento, grid, marketing, layout, composition]
---

# Bento grids

A grid where every tile is a cropped window reads as generated however well each window is made: the same signal four times. Most of the quality is decided in the tile list, before anything is drawn ([[unslop-pass]] names the three-cards-with-better-kerning failure; this node is the cure).

## The rules

1. **Not every tile is UI.** About a third to a half show product UI; the rest are other kinds (below).
2. **One hero:** two columns or two rows, the richest picture or the main idea. Equal tiles need a clear difference in content and weight.
3. **A UI tile shows one thing, not a window:** crop to the single component (the button, the stepper, the fee picker) at real size or larger. Window chrome appears at most once in a grid, on the hero.
4. **Neighbours contrast,** across and down like a checkerboard: a picture beside a number, dense beside calm. Two window crops never sit side by side.
5. **A stat tile is one real number at display size** (48–72px as shown), a short lead ("Up to"), a one-line label, at most one coloured glyph. The number and its unit sit on one line (`white-space: nowrap`, or move the unit into the lead). Real figures, never "10x".
6. **Copy is short and outside the picture:** one to four words or one sentence, at page size (17–24px), never the 12px of the UI inside. A run-in works: a bold lead and a grey continuation at the same size.
7. **One frame, varied contents:** shared radius, gap, padding and copy position; the gap equals the tiles' inner padding or a clear fraction of it. Pick one family — rounded tiles on a gap, or a ruled grid with 1px lines and no gap.
8. **Say each thing once across the set.** No real string, avatar, colour mark or chrome repeats from tile to tile.
9. **Compose the grounds together:** a quiet grid shares one surface with one photo, accent or inverted tile as punctuation; an expressive one may use several grounds if their lightness, temperature and saturation make a rhythm.
10. **Motion has one place to lead.** A supporting tile does one small thing once as the grid scrolls in (staggered 80–120ms in reading order) or on hover; at most the hero tells a short cursor story. Several competing loops leave the eye nowhere to land.
11. **One Stage per tile at 1:1,** copy as page HTML beside it. One Stage around the whole grid scales every tile's type with it: a 1000px grid in a 630px column draws 15px titles at 9.5px.
12. **The tile edge owns the bleed.** An inner fixed-width picture must not slice a window halfway across a wider tile and leave a blank strip; match the picture slot's width at every breakpoint.
13. **Every width is its own design.** Two columns only while each tile stays readable (an article column around 550px may hold two); a phone column stacks, hero first. Important text stays at least 10px at a 320px host.

## Kinds of tile

| Kind | Holds |
|---|---|
| One component | A single control or panel at real size or larger, cropped by the tile |
| Hero UI | The one tile with a real screen, framed by [[product-shot-framing]] |
| Stat | One big number, a lead, a label, maybe one coloured glyph |
| Statement | One sentence in large type |
| Object | A card, chip, keycap or device, one light source, a real material |
| Diagram | A grid, heatmap or nodes and lines in one stroke weight, holding still |
| Collection | Logos, app icons, file tiles, bleeding off an edge |
| Photo | A licensed photograph; never a scene drawn in CSS or SVG passed off as one |

A grid of five usually wants one hero UI, one or two components, one stat or statement, and one object, diagram or collection. Layouts: hero and strip (2/3 + 1/3, then three), staggered pair, big square (a 2×2 hero in four columns), ruled (one container, 1px rules) for technical pages; an even 3×2 only when every neighbour is a different kind.

## Plan it as a table

| Tile | Span | Kind | The one thing | Words |
|---|---|---|---|---|
| Inbox | 2×1 | Hero UI | One conversation arriving, selected | "Shared inbox" + a sentence |
| SLAs | 1×1 | Stat | "14m" left, in the warning colour | "Never miss a reply." |
| Assign | 1×1 | Component | The assignee menu, one person checked | "Assignments" |

Then check the plan against rules 1–4 and 8 before building: how many tiles are UI, which is the hero, does any tile touch the same kind, does any string repeat.

## Objects

A drawn object gets one light source and the shadow of the tiles around it. A payment card keeps its real anatomy at any size: the chip about an eighth of the card's width, a third of the way down, contactless arcs beside it at half the chip's height, name and number along the bottom, the network mark bottom-right. A chip the size of an icon on a tile-sized card is the giveaway.

## When to apply

Any feature grid, bento section or set of feature cards on one page. [[viewport-custom-design]] owns the page grid around it; [[cards-design]] owns product cards.

## Gotcha

One conversation threaded through five tiles ("Refund for order #4821" three times) feels like a story to its builder and reads as one signal repeated. Each tile gets its own specific moment.

## Sources

- Benji Taylor, Stageshow (MIT, HEAD `8020574`, read 2026-11-01): `references/bento.md` (rules, tile kinds, layouts, the planning table), `references/backgrounds.md` (grounds, objects and drawings). Paraphrased and condensed.
- Related: [[MOC-faux-ui]], [[marketing-surface-rules]].
