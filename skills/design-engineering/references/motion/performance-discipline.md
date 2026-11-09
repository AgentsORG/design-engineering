---
title: performance-discipline
summary: Fast UI is work you don't do. Name transition properties (bare Tailwind `transition` is `all`), composite-only animation, will-change as a targeted fix, virtualize past ~50 rows, keep frames out of React state, reserve space for everything async, preload critical and lazy the rest, pause off-screen, pre-render content, mute transitions during theme swaps.
tags: [motion, performance, jank, virtualization, layout-shift]
---

# Performance discipline

Most jank is self-inflicted: DOM nodes nobody can see, properties the browser has to watch that never change, animation the GPU can't composite, content fetched at request time that could have been built, layout that moves after the user started reading. The fix is usually deleting or deferring work, not adding cleverness. [[transform-opacity-only]] states the property rule; this node is the rest of the discipline.

## The budget and the tiers

60fps leaves 16.7ms per frame; a 120Hz screen leaves 8ms — design against 8. One layout pass on a complex page can exceed 100ms, a dozen dropped frames at once.

| Tier | Properties | Cost |
|---|---|---|
| Composite | `transform`, `opacity` (and, in current Chrome/Firefox, `filter`, `clip-path`, `background-color`) | Cheapest |
| Paint | `box-shadow`, `border-radius`, `color` | A redraw every frame |
| Layout | `width`, `height`, `padding`, `margin`, `top`/`left`, `border-width` | Re-measures, and moves the neighbours |

Swap down a tier: size → `scale()`, position → `translate()`, `display`/`visibility` → `opacity`, `box-shadow` → `filter: drop-shadow()`. Acceleration is something the browser may grant; property choice is what you control, so keep `translateY(100%)` for unknown-size elements even where a browser declines to accelerate percentages. Looking fine on your machine doesn't exempt a layout property: an absolutely positioned box with few children may get away with `padding`, but `scale()` draws the same thing and can't regress on a slower phone. When two properties look the same, take the cheaper tier.

Worked case, a sidebar: `margin-left: -92px → 0` reflows the dashboard beside it on every frame, through all three tiers. Overlay the panel and slide it with `transform: translateX(-100%) → none` (in Motion, the string `transform` form) so only compositing runs. If the content must make room, move it once at the end, never per frame.

## Transitions and compositing

- **Name the properties.** `transition: all` makes every style change a candidate animation and forfeits the engine's optimizations. Tailwind's bare `transition` class compiles to `transition-property: all` — the same bug in disguise; use `transition-transform` or `transition-[opacity,scale]`.
- **Composite-only.** `transform`, `opacity`, `filter`, `clip-path`. Never `height`, `width`, `padding`, `margin`, `top`/`left`. Keep animated `blur()` under 20px (Safari suffers most).
- **`will-change` is a targeted fix.** Browsers promote layers just in time, and that occasionally eats the opening frame — a 1px hitch as motion starts. Apply `will-change: transform` (or `transform, opacity`) to the *animating element* after you observe the hitch. It does nothing for layout or paint properties, `will-change: all` defeats the hint, and every promoted layer holds GPU memory. The one up-front use is an element whose paint is costly, such as a big blurred or filtered panel: promote that element, not its wrapper, and keep the layer as small as the effect allows, since a viewport-sized layer can cost more to composite than it saves.
- **Never animate a CSS variable on a shared parent** — every descendant recalculates style. Set the property on the moving element. Vaul's drag, written as a `--swipe-amount` variable read by `translateY()`, turned laggy once a drawer held ~20 items. Suspect this whenever a `transform` animation degrades as content grows.

## Rendering work

- **Virtualize any list that can pass ~50 items** or grow unbounded (TanStack Virtual or equivalent). Render only what is visible.
- **Frames never go through React state.** A per-frame `setState` is a re-render storm. Write transforms through refs, WAAPI, or the library's own loop. In Motion the string form `animate={{ transform: "translateX(100px)" }}` is hardware-accelerated in every version, and from `motion` 14.2 so is the `x: 100` shorthand; layout animations, `onUpdate` and motion-value-driven values stay on the main thread.
- **CSS/WAAPI for predetermined motion** (stays smooth under load); a JS loop only for dynamic, gesture-driven, or spring values. Vercel's dashboard tab indicator, a Motion shared-layout animation, dropped frames because the next page was loading at that moment; a CSS animation fixed it.

## Diagnosis order

Name the cause before changing code. In order of likelihood: (1) a non-composite property animates (layout first, then `box-shadow`, `border-radius`); (2) the jank coincides with navigation, fetching or hydration; (3) React re-renders per frame; (4) it worsens as content grows; (5) a CSS variable animates, directly or through Motion shorthands before `motion` 14.2; (6) animated `blur()` above 20px; (7) only then `will-change`. Confirm with a Performance recording on a mid-range phone over remote debugging; desktop CPU throttling doesn't model a weak GPU or a small memory budget.
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

## Reference

A rAF loop for something that has settled is work nobody sees. Run it only while something moves, write through a ref, and let a new target wake it. The shape of `stageshow/kit/motion/Follow.tsx`:

```ts
function step() {
  integrate(cur, vel, target); // fixed 60Hz steps, interpolated on faster screens
  if (Math.abs(target - cur) < 0.05 && Math.abs(vel) < 0.05) { cur = target; vel = 0; }
  el.style.transform = `translateX(${cur}px)`; // a ref write, never setState
  running = cur !== target || vel !== 0;
  if (running) id = requestAnimationFrame(step);
}
const wake = () => { if (!running) { running = true; id = requestAnimationFrame(step); } };
```

- **Gold example:** `stageshow/kit/motion/Follow.tsx`, and `stageshow/kit/motion/Collapse.css` for `will-change` used the way this node asks: one lasting layer on the gliding content, with its reason written beside it (text moved by layout steps whole pixels, and text that ends a transform without a layer of its own hops as it lands).
- **Check:** once the motion settles, a Performance recording shows no more rAF callbacks; scroll it offscreen or hide the tab and its work stops, and on return it resumes without skipping a beat (`stageshow/references/rehearse.md`, Live pacing).

## Gotcha

`will-change` sprinkled on every card "for performance" is the most common cargo cult in generated CSS. It costs a compositor layer per card and fixes stutters the cards never had. Remove it and add it back only where a first-frame hitch is reproducible.

## Sources

- Emil Kowalski's design-engineering practice on performance, distilled by AgentsORG.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/animation-performance/SKILL.md (frame budget, tiers, swaps, Vaul and Vercel cases, diagnosis order); unchanged through `715c180`.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/animation-performance/SKILL.md (no exemption for layout that looks fine locally, up-front `will-change` on costly paint).
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG (the margin-to-transform sidebar case).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/motion/Follow.tsx`, `stageshow/kit/motion/Collapse.css` (drop glide layer), `stageshow/references/rehearse.md` (Live pacing).
- Related: [[transform-opacity-only]], [[debugging-animations]], [[empty-loading-states]], [[marketing-surface-rules]].
