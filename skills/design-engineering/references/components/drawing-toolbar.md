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
- **The picked tool eases in.** Its fill and colour fade in over about 150ms and back out the same, never switching on in one frame (Benji Taylor, Stageshow `references/motion.md`).

## Defaults are the shipping version

Opinionated defaults that feel right untouched; every prop exists to turn something off or move it, not to make it good. The canvas can be transparent so the page's own paper shows through, and export (`toSvg`, `toPng` at 2–3× for print) returns exactly what is on screen, erasing included. Strokes are plain data, saved as they are and restored as they were.

## Narrow screens

The bar is as wide as its tools, so on a phone it runs off both sides. Under about 680px stand it up as a rail on the left edge and trim the toolset; drop the controls that would stack taller than the canvas (keep size, drop opacity). A control whose contents are all switched off removes its button too ([[viewport-custom-design]]).

## When to apply

Adding drawing, markup or annotation to a product. To assemble a full whiteboard, a canvas SDK suits better ([[tldraw-canvas]]); for annotating a UI for an agent, see [[agentation-workflow]].

## Reference

Bad: the pen tray pops open as a second panel beside the bar in one frame, and the picked pen turns blue instantly.
Good: a 36px disc widens into a 200px bar over 0.4s; its glyph fades out in 0.12s and the 28px tools fade in 0.16s after a 0.22s wait, so the bar is one object changing shape.

```css
.bar { width: 36px; border-radius: 18px; overflow: hidden;
  transition: width .4s cubic-bezier(0.19, 1, 0.22, 1), border-radius .4s cubic-bezier(0.19, 1, 0.22, 1); }
.bar[data-open] { width: 200px; border-radius: 20px; padding: 0 6px; }
.bar__glyph { transition: opacity .16s ease .22s; }
.bar[data-open] .bar__glyph { opacity: 0; transition: opacity .12s ease; }
.bar__tools { opacity: 0; transition: opacity .12s ease; }
.bar[data-open] .bar__tools { opacity: 1; transition: opacity .16s ease .22s; }
```

Gold example: `stageshow/examples/hero-demo/hero.css` (the annotation toolbar's disc-to-bar morph, round 28px tools 3px apart, a 1px by 12px divider); `stageshow/examples/figma/index.tsx` for a docked tool row (26px tools, 14px icons at one stroke).
Check: film the open and the close at 40 to 80ms steps: no frame shows the disc glyph and the tools both at full opacity, and over the canvas the pointer is already a crosshair as it crosses the edge, not after it lands.

## Gotcha

A drawn stroke at constant width with a hard round cap reads as a vector tool, not a pen. If the tool is called a pen, the width must answer speed; if it must not, call it a fineliner.

## Sources

- Benji Taylor, *Drawesome*, [benji.org/drawesome](https://benji.org/drawesome) and the `drawesome` npm package (read 2026-11-01). Paraphrased.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/examples/hero-demo/hero.css`, `stageshow/examples/hero-demo/HeroDemo.tsx` (crosshair while the toolbar is on), `stageshow/examples/figma/index.tsx`, `stageshow/examples/figma/figma.css`, `stageshow/references/motion.md` (the cursor's kind; a state the click sets).
- Related: [[morphing-icons]], [[tray-rules]], [[keyboard-patterns]].
