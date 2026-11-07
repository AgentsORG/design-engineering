---
title: z-index-strategy
summary: Prefer DOM order to z-index; where you need it, one global file of sequential layer constants for app-wide layers and local values inside an isolated stacking context. No magic numbers, never mix the two, and know which properties create a stacking context or a clip.
tags: [surface, z-index, stacking-context, depth, layers, css]
---

# Z-index strategy

`z-index: 9999` is a confession that nobody knows the order. Depth has three tools, in order of preference:

1. **No z-index.** DOM order is paint order; a later sibling draws over an earlier one. Arrange the markup so source order matches stacking order, and most layers need nothing.
2. **One global file for app-wide layers.** Navigation, popovers, modals and toasts compete across components, so give them sequential constants in a single file, in order:

   ```ts
   let d = 1
   export const nav = d++, contextMenu = d++, tooltip = d++, modal = d++, toast = d++
   ```

   Adding a layer means inserting a line in the right place; the order stays readable.
3. **Local values inside an isolated context.** When a component's parts must overlap against their DOM order (tab order or semantics fix it), wrap them in `isolation: isolate` and use 1 and 2 inside. Nothing escapes the wrapper, so local numbers can't collide with global ones.

## Don't

- **Hard-code magic numbers**: `9999`, Tailwind's `z-10` / `z-50` sprinkled by feel. One or two escape-hatch constants in the global file at most.
- **Mix global and local**: `modal + 1` in a component file either silently equals `toast`, or, inside a stacking context, means nothing at all.

## What creates what

- `position: fixed` and `sticky` create a stacking context, but stay bounded by any ancestor that has one. A fixed element inside a nav with `z-index` set competes only inside that nav.
- An element that creates a stacking context paints like a positioned element at `z-index: 0`, so an unpositioned later sibling paints *below* it. Give the sibling `position: relative`.
- `overflow: hidden` doesn't create a stacking context, and no z-index lets a child out of its clip. An absolutely positioned child escapes the clip only when its containing block is outside the overflow element. `transform`, `filter`, `will-change: transform` and `contain: paint` all create a containing block, and `isolation` doesn't.

## When to apply

Setting up a project's layers; any "the dropdown is under the header" bug; reviewing a diff that adds a `z-index` ([[ui-polish-pass]] has the review line). During a drag, depth is local and three-banded: dragged, just released, the rest ([[animated-hit-testing]]).

## Reference

Benji Taylor's demo-layer order, rewritten as the one global ladder. Each line says why it sits above the line before:

```ts
let d = 1
export const connector = d++ // lines between objects sit under anything that floats
export const popover = d++   // an open menu covers the connectors it opened over
export const flight = d++    // a chip leaving a menu flies above the menu
export const cursor = d++    // the pointer is above everything it acts on
```

- Bad: `overflow: hidden` on a popover whose surface and shadow live on `::before`, so the clip cuts its own shadow off. Good: `isolation: isolate` on the popover, the surface on `::before` at a local `z-index: -1` (under the menu's text, nowhere else), `overflow: visible`, and a sliding submenu clips an inner track instead.
- Benji's call differs: Stageshow keeps raw numbers in each part's own CSS file (20, 25, 30, 100), each with its reason, inside a stage that is its own stacking context. It doesn't use one constants file.
- Gold example: `stageshow/kit/motion/Popover.css`, `stageshow/kit/motion/Fly.css`.
- Check: film a chip flying out of an open popover over a connector while the cursor moves, then step through the frames. No lower rung should ever paint over a higher one.

## Gotcha

A `transform` added for an animation, or `will-change: transform` added "for performance", quietly creates a stacking context and a containing block. A tooltip that used to escape its card's `overflow: hidden` is clipped, and a modal inside a transformed parent can't rise above the page. Check depth after adding any animation to a container ([[depth-and-nesting]], [[performance-discipline]]).

## Sources

- Cheng Lou, chenguini (MIT, HEAD 84fb27d): `docs/z-index-depth-management.md` (the three strategies, the don'ts, the stacking and clipping gotchas) and `docs/Animation.md` "Pitfalls" (no `will-change` by default).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): layer values and their comments in `stageshow/kit/motion/Connector.css`, `stageshow/kit/motion/Popover.css` (`isolation: isolate`, surface on `::before`), `stageshow/kit/motion/Fly.css`, `stageshow/kit/cursor.css` and `stageshow/kit/stage.css` (ground at -1, stage as its own stacking context).
- Related: [[ui-polish-pass]], [[depth-and-nesting]], [[animated-hit-testing]].
