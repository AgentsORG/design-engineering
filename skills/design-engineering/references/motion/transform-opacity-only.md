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

## Framer Motion / Motion gotcha

Motion's `x`, `y`, `scale` and `rotate` shorthands are driven through CSS variables, and an animated CSS variable can't be hardware-accelerated, so the animation runs on the main thread. That only hurts when the page is busy while it plays (navigation, fetching, hydration). Keep the readable shorthand by default and switch to the full `transform` string for motion that must survive a busy main thread:

```tsx
// Hardware-accelerated — use when the page is busy during the animation
<motion.div animate={{ transform: "translateY(0px)" }} />

// Main thread — fine when nothing else is happening
<motion.div animate={{ y: 0 }} />
```

## When this breaks

- **`clip-path`** is GPU-accelerated in modern browsers and is the right tool for reveals — see [[clip-path-tricks]] for usage.
- **`box-shadow`** repaints every frame. Animate `filter: drop-shadow()` instead, or the opacity of a pre-shadowed layer.
- **`filter: blur()`** is GPU-accelerated but expensive on large surfaces. Use sparingly.
- **`background-color`** is fine for hover, but don't try to animate a gradient — animate opacity of an overlay instead.

## Gotcha

A `will-change: transform` on every element is *worse* than none. The browser pre-allocates GPU layers, exhausting memory on mobile. Apply `will-change` only on the element about to animate, and remove it after. Or skip it entirely — modern browsers detect transform animations automatically.

## Sources

- Emil Kowalski — performance rules, Sonner internals.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/animation-performance/SKILL.md (shorthands and CSS variables, drop-shadow swap).
- web.dev — "High performance animations" reference table.
