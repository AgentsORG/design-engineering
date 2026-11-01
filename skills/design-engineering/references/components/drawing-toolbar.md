---
title: drawing-toolbar
summary: A drawing or markup tool inside a product — a toolbar that changes shape instead of swapping panels, pens in a tray rather than a row of icons, strokes whose width answers speed or direction, an eraser that removes area, export that matches the screen exactly, defaults that are the shipping version, and a bar that stands up on the side of a phone. From Benji Taylor's Drawesome.
tags: [components, toolbar, drawing, annotation, morph, canvas]
---

# Drawing toolbar

Annotating a screenshot, marking up a frame, circling the bit that is wrong: many creative tools need a little drawing, and most bolt on a row of icons over a canvas. Drawesome is the version worth copying.

## The bar morphs, it does not swap

One bar, many shapes. Pick a colour and the row of pens becomes the palette; open size and it becomes two sliders; minimise it and it rolls into a disc that still shows the tool in hand. Each state morphs into the next as one object ([[fly-not-teleport]], [[shared-letter-morph]]); no panel pops open beside it. The minimised disc keeps the current tool visible, so collapsing it loses no context.

## Tools behave like the thing they are named after

- **Pens in a tray beat a row of icons:** drawn as objects with light on them (Apple's markup tools are the reference), so the tool in hand is obvious at a glance.
- **Width answers the hand.** Pencil, pen and brush thin as the stroke speeds up; fineliner and highlighter keep a constant width; a fountain pen answers direction, thick one way and a hairline the other.
- **The eraser removes area, not whole strokes**, so part of a line can go and the rest stay.
- **Shift locks a stroke to the nearest of eight directions.** Each pen has a single-key shortcut shown in its tooltip; `E` erases, `[` and `]` resize, ⌘Z and ⇧⌘Z undo and redo. Single-key shortcuts switch off where the page has its own.

## Defaults are the shipping version

Opinionated defaults that feel right untouched; every prop exists to turn something off or move it, not to make it good. The canvas can be transparent so the page's own paper shows through, and export (`toSvg`, `toPng` at 2–3× for print) returns exactly what is on screen, erasing included. Strokes are plain data, saved as they are and restored as they were.

## Narrow screens

The bar is as wide as its tools, so on a phone it runs off both sides. Under about 680px stand it up as a rail on the left edge and trim the toolset; drop the controls that would stack taller than the canvas (keep size, drop opacity). A control whose contents are all switched off removes its button too ([[viewport-custom-design]]).

## When to apply

Adding drawing, markup or annotation to a product. To assemble a full whiteboard, a canvas SDK suits better ([[tldraw-canvas]]); for annotating a UI for an agent, see [[agentation-workflow]].

## Gotcha

A drawn stroke at constant width with a hard round cap reads as a vector tool, not a pen. If the tool is called a pen, the width must answer speed; if it must not, call it a fineliner.

## Sources

- Benji Taylor, *Drawesome*, [benji.org/drawesome](https://benji.org/drawesome) and the `drawesome` npm package (read 2026-11-01). Paraphrased.
- Related: [[morphing-icons]], [[tray-rules]], [[keyboard-patterns]].
