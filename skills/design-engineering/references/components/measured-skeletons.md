---
title: measured-skeletons
summary: Draw a skeleton from the content itself, not by hand. Lay a sample render out unseen, measure it, and paint one bar per line of text between the font's own ascender and descender lines, one block per image or control. The shape comes from the best source on hand, the reveal is decided when the data lands, and every skeleton shimmers on one page clock. From Lochie Axon's skullet.
tags: [components, loading, skeleton, states, reveal, lochie]
---

# Measured skeletons

A hand-drawn skeleton is a second layout that drifts from the real one: a bar 20px too short, a list of three when five arrive, and the page jumps when data lands. Skullet takes the opposite route. It renders the content from sample data where no one can see it, measures every element, and paints a skeleton in exactly that shape. The skeleton and the content then hold the same space by construction, which is the rule [[empty-loading-states]] can only ask for.

## What gets drawn

- **Text: one bar per rendered line**, however many lines a string wraps to. The bar runs between two of the typeface's own lines, read from the font with canvas `measureText`: a top of ascender, cap height or x-height, and a bottom of baseline or descender. The default, ascender to descender, covers the tails of g, p and y. A bar centred in the line box looks too fat on loose leading and too thin on tight.
- **Media and controls: one block at their box.** `img`, `video`, `svg`, `canvas`, `input`, `select`, `textarea`, `iframe`.
- **A painted box around one label** (a button, a chip) fills as a block; a card keeps its own surface and gets bars inside it. Media clipped by a rounded parent of the same size, like an avatar, takes the parent's corners.
- **Visually hidden text draws nothing**, and a box that clips its children clips their bars too.
- Escape hatches: mark an element to draw it as one block, or to draw nothing; a component can ship its own static skeleton.

## Where the shape comes from, best first

1. The data already on screen, when a refetch forces loading over it.
2. The data last shown under the same id, so a reload is exact.
3. A shape remembered from a previous visit.
4. The `sample` the author passed.
5. The children rendered without their data.
6. A few generic lines, with a development warning.

Remembered shapes keep layout and never content: text becomes filler, media sources and form values are dropped, and the store is cleared on sign-out. In development the library warns when a skeleton and its content differ in size, and logs a ready-to-paste `sample` with the data's keys and string lengths and every value replaced.

## The reveal is decided when the data lands

| Situation | Reveal |
|---|---|
| Loaded in under 150ms, or the user scrolled, swiped or typed in the last 400ms | At once. The skeleton was held back 150ms, so a fast load never shows one |
| A refetch over data already on screen | A quick 120ms crossfade |
| Small: under 72px tall, or 3 pieces or fewer | One crossfade for the whole thing |
| Anything larger | By row: each row or card arrives whole, in screen order across a 320ms spread, smaller text 60ms behind the text above it, off-screen rows at once |

A "row" is the nearest ancestor with at least three siblings of the same tag and class. Reveals landing within 150ms of each other share one top-to-bottom order, so three widgets loading together read as one page. A custom entrance may set only filter, transform and clip-path on top of the fade, never layout, so no reveal moves the page; a skeleton that guessed the height wrong eases to the real height over 280ms.

## Motion and the page clock

Every skeleton on the page shimmers in one stream, timed off the document clock, so one mounting late joins the sweep already running instead of starting its own. The highlight is a 20° diagonal at most 320px wide, and the loop time is set per 1280px of screen (4s slow, 2s fast), so a wide monitor doesn't make it race. Pulse loops at 2.4s or 1.2s down to 45% opacity. Both stop under `prefers-reduced-motion`.

## Images and accessibility

An image never holds the rest back: each one still loading keeps its own block until it has loaded and decoded, then crossfades, with a 10s ceiling. Give images a size, or they move once they arrive. A loading region is `aria-busy`, its skeleton is `inert` and hidden from assistive tech, and an optional label is read in its place ("Loading profile"). Server-rendered skeletons are measured by a small inline script before first paint, so hydration changes nothing.

## Gotcha

Tests run in jsdom or happy-dom have no layout, so every reveal there is instant and the sample's text sits inside an `aria-hidden` skeleton. Query by role, which skips it; a query by text finds the sample. And the measured shape is only as good as the sample: a sample name of "A" draws a one-letter bar where "Alexandra Whitfield" will land.

## Sources

- Lochie Axon, skullet 0.0.3 (MIT, github.com/lochie/skullet, HEAD `770cba4`, read 2026-11-08; skullet.lochie.me): `packages/skullet/README.md`, `src/lib/measure.ts` (font metrics, bars), `src/lib/plan.ts` (the `smart` reveal and its constants), `src/lib/shimmer.ts`, `src/lib/constants.ts`, `src/lib/memory.ts`, `src/lib/dev.ts`. Paraphrased; values cited.
- Related: [[empty-loading-states]] (when a skeleton is the right state at all), [[scroll-anchoring]], [[growth-and-overflow]].
