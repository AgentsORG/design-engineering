---
title: performance-discipline
summary: Fast UI is work you don't do. Name transition properties (bare Tailwind `transition` is `all`), composite-only animation, will-change as a targeted fix, virtualize past ~50 rows, keep frames out of React state, reserve space for everything async, preload critical and lazy the rest, pause off-screen, pre-render content, mute transitions during theme swaps.
tags: [motion, performance, jank, virtualization, layout-shift]
---

# Performance discipline

Most jank is self-inflicted: DOM nodes nobody can see, properties the browser has to watch that never change, animation the GPU can't composite, content fetched at request time that could have been built, layout that moves after the user started reading. The fix is usually deleting or deferring work, not adding cleverness. [[transform-opacity-only]] states the property rule; this node is the rest of the discipline.

## Transitions and compositing

- **Name the properties.** `transition: all` makes every style change a candidate animation and forfeits the engine's optimizations. Tailwind's bare `transition` class compiles to `transition-property: all` — the same bug in disguise; use `transition-transform` or `transition-[opacity,scale]`.
- **Composite-only.** `transform`, `opacity`, `filter`, `clip-path`. Never `height`, `width`, `padding`, `margin`, `top`/`left`. Keep animated `blur()` under 20px (Safari suffers most).
- **`will-change` is a targeted fix.** Browsers promote layers just in time, and that occasionally eats the opening frame — a 1px hitch as motion starts. Apply `will-change: transform` (or `transform, opacity`) to the *animating element* after you observe the hitch. It does nothing for layout or paint properties, `will-change: all` defeats the hint, and every promoted layer holds GPU memory.
- **Never animate a CSS variable on a shared parent** — every descendant recalculates style. Set the property on the moving element.

## Rendering work

- **Virtualize any list that can pass ~50 items** or grow unbounded (TanStack Virtual or equivalent). Render only what is visible.
- **Frames never go through React state.** A per-frame `setState` is a re-render storm. Write transforms through refs, WAAPI, or the library's own loop. In Motion the string form `animate={{ transform: "translateX(100px)" }}` is hardware-accelerated; the `x: 100` shorthand runs on the main thread.
- **CSS/WAAPI for predetermined motion** (stays smooth under load); a JS loop only for dynamic, gesture-driven, or spring values.
- **Pause off-screen work**: looping animations, video, timers — `IntersectionObserver` or `animation-play-state`, plus `visibilitychange` for hidden tabs.

## Loading and layout

- **Reserve space for everything asynchronous.** Images and video declare dimensions or `aspect-ratio`; skeletons match the loaded box; empty states are sized to the filled state; changing numbers use `tabular-nums`; hover never changes font weight.
- **Preload fonts and above-the-fold images**; lazy-load below the fold. A font without preload is a visible reflow on every cold load.
- **Pre-render content surfaces** (blog, docs, changelog) at build time with revalidation. Never fetch them at request time.
- **Mute transitions during a theme switch**: add a `no-transitions` class, swap the theme, remove the class after a double `requestAnimationFrame`. Otherwise every color on the page tweens independently in a ragged cascade.

## Expanding panels

Animating `height` triggers layout every frame. Use `grid-template-rows: 0fr → 1fr`, a clip, or measure once and animate `transform` — see [[clip-path-tricks]].

## When to apply

"It's slow", "it stutters", "it jumps", any list over ~50 rows, any diff that adds a transition, a font, a hero image, or a theme toggle. Slowness is measured, not judged: if the complaint is "feels wrong" rather than "drops frames", route to [[easing-curves]] and [[duration-table]] instead.

## Gotcha

`will-change` sprinkled on every card "for performance" is the most common cargo cult in generated CSS. It costs a compositor layer per card and fixes stutters the cards never had. Remove it and add it back only where a first-frame hitch is reproducible.

## Sources

- Emil Kowalski's design-engineering practice on performance, distilled by HKTITAN.
- Related: [[transform-opacity-only]], [[debugging-animations]], [[empty-loading-states]], [[marketing-surface-rules]].
