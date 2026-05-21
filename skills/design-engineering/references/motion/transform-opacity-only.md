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

When using Motion's `x` and `y` props, it splits them into separate `translateX` and `translateY` style declarations, which can break hardware acceleration in some browsers. Prefer the full `transform` string when in doubt:

```tsx
// Better for GPU stability
<motion.div animate={{ transform: "translateY(0px)" }} />

// Convenient but can fragment the transform
<motion.div animate={{ y: 0 }} />
```

## When this breaks

- **`clip-path`** is GPU-accelerated in modern browsers and is the right tool for reveals — see [[stagger-choreography]] for usage.
- **`filter: blur()`** is GPU-accelerated but expensive on large surfaces. Use sparingly.
- **`background-color`** is fine for hover, but don't try to animate a gradient — animate opacity of an overlay instead.

## Gotcha

A `will-change: transform` on every element is *worse* than none. The browser pre-allocates GPU layers, exhausting memory on mobile. Apply `will-change` only on the element about to animate, and remove it after. Or skip it entirely — modern browsers detect transform animations automatically.

## Sources

- Emil Kowalski — performance rules, Sonner internals.
- web.dev — "High performance animations" reference table.
