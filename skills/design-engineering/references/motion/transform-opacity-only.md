---
title: transform-opacity-only
summary: Only animate transform and opacity. They are GPU-accelerated. Everything else forces layout.
tags: [motion, performance, css]
---

# Animate only transform and opacity

The browser can animate `transform` and `opacity` on the GPU without going through layout or paint. Every other animatable property triggers layout, paint, or both — and you'll feel it on a low-end Android.

## The rule

```css
/* Yes */
transition: transform 200ms, opacity 200ms;

/* No */
transition: width 200ms, height 200ms, top 200ms, left 200ms, margin 200ms;
```

If you find yourself animating `width`, `height`, `top`, `left`, or `margin`, rewrite the animation using `transform: translate()` and `transform: scale()`.

## The compose-with-translate pattern

To animate position without `top` / `left`:

```css
.menu {
  transform: translateY(0);
  transition: transform 200ms var(--ease-out-quart);
}
.menu[data-state="closed"] {
  transform: translateY(8px);
  opacity: 0;
}
```

To animate size without `width` / `height`:

```css
.button {
  transform: scale(1);
  transition: transform 120ms;
}
.button:active {
  transform: scale(0.97);
}
```

Be aware: `scale()` scales children too. If you don't want that, use a wrapper with `transform: scale()` and counter-scale inside, or animate `padding`/`gap` with caution (slower, sometimes necessary).

## Motion gotcha

Motion hands `opacity`, `transform`, `clip-path` and `filter` to the Web Animations API, so they can run off the main thread. The `x`, `y`, `scale` and `rotate` shorthands depend on the version. From `motion` 14.2 they are combined into one accelerated `transform` animation on HTML elements, so keep them. Before 14.2 they were driven through CSS variables, which can't be accelerated, so upgrade, or switch to the full `transform` string for motion that must survive a busy main thread (navigation, fetching, hydration):

```tsx
// motion 14.2+: hardware-accelerated. Before 14.2: main thread, drops frames under load
<motion.div animate={{ y: 0 }} />

// Hardware-accelerated in every version
<motion.div animate={{ transform: "translateY(0px)" }} />
```

In every version these stay on the main thread: layout animations (`layout`, `layoutId`), `onUpdate`, `transformTemplate`, inertia, and values a motion value drives every frame (drag, `useTransform`).

## When this breaks

- **`clip-path`** is GPU-accelerated in modern browsers and is the right tool for reveals — see [[clip-path-tricks]] for usage.
- **`box-shadow`** repaints every frame. Animate `filter: drop-shadow()` instead, or the opacity of a pre-shadowed layer.
- **`filter: blur()`** is GPU-accelerated but expensive on large surfaces. Use sparingly.
- **`background-color`** is fine for hover, but don't try to animate a gradient — animate opacity of an overlay instead.

## Reference

```css
/* Bad: layout and paint on every frame of the rise */
.toast { bottom: -40px; transition: bottom 300ms, box-shadow 300ms; }
/* Good: compositor only; the shadow is drawn once and never animates */
.toast { transform: translateY(10px); opacity: 0;
  transition: transform 300ms var(--ease-out-quart), opacity 200ms; }
.toast[data-show] { transform: none; opacity: 1; }
```

Gold example: `stageshow/kit/motion/Collapse.css`, for the case where space really has to open: the height moves on `grid-template-rows` while the content glides on a transform layer it keeps for good, so box and text move as one picture.
Benji's call differs: Stageshow animates layout where room must open (`grid-template-rows` over 0.46s in `Collapse`, a 10px margin rise over 0.6s in `Toast`) and pays for it with a lasting `will-change: transform` on boxes with text, never over the whole scene.
Check: film at 390px with Paint flashing on and 4x CPU throttle. Only the moving layer repaints, and stepped at 40ms no text steps a whole pixel inside its box (Stageshow's `steps in its box` line).

## Gotcha

A `will-change: transform` on every element is *worse* than none. The browser pre-allocates GPU layers, exhausting memory on mobile. Apply `will-change` only on the element about to animate, and remove it after. Or skip it entirely — modern browsers detect transform animations automatically.

## Sources

- Emil Kowalski — performance rules, Sonner internals.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/animation-performance/SKILL.md (the motion 14.2 shorthand change, what stays on the main thread, drop-shadow swap).
- web.dev — "High performance animations" reference table.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/motion/Collapse.css`, `stageshow/kit/parts/Toast.css`, `stageshow/references/motion.md` (Changing text and values), `stageshow/scripts/motion-watch.mjs` (`steps in its box`).
