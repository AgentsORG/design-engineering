---
title: clip-path-tricks
summary: clip-path is animatable, GPU-accelerated, and unlocks 5+ patterns that would otherwise require canvas or SVG.
tags: [motion, clip-path, css]
---

# clip-path tricks

`clip-path` is the most underrated animatable CSS property. It's GPU-accelerated, interpolatable when both states use the same shape function, and unlocks effects that would otherwise need canvas, SVG, or complex JS.

## The inset shape — primary tool

```css
clip-path: inset(top right bottom left);
clip-path: inset(0 0 0 0);      /* fully visible */
clip-path: inset(0 100% 0 0);   /* clipped from the right */
clip-path: inset(0 0 50% 0);    /* bottom half hidden */
```

`inset()` is the workhorse. It clips from each edge. Both ends of a transition must use the same `inset()` for interpolation to work.

## Pattern 1 — tabs with perfect color transition

The classic. A tab pill background that slides between tabs *and* the text inside flips color correctly during the transition (not before, not after).

```css
.tab-pill {
  background: var(--accent);
  clip-path: inset(0 0 0 0 round 9999px);
  transition: clip-path 250ms var(--ease-out-quart);
}
/* Position the pill behind the active tab; clip everything except active region */
```

The text uses `color: var(--text-primary)` on transparent regions and `color: var(--text-on-accent)` on the clipped region — `mix-blend-mode` or two layered text layers gives the perfect color flip.

## Pattern 2 — hold-to-delete

Press and hold a button; the destructive action fills from one side over ~1.5s, releasing aborts.

```css
.confirm-fill {
  position: absolute; inset: 0;
  background: var(--danger);
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1500ms linear;
}
.confirm-button:active .confirm-fill {
  clip-path: inset(0 0 0 0);
}
```

If the user releases before completion, `clip-path` snaps back. The animation is interruptible because it's a CSS transition, not a JS-driven keyframe.

## Pattern 3 — image reveal on scroll

```css
img {
  clip-path: inset(20% 0 20% 0);
  transition: clip-path 800ms var(--ease-out-quart);
}
img.in-view {
  clip-path: inset(0 0 0 0);
}
```

Triggered by `IntersectionObserver` adding `.in-view`. Reveals from horizontal letterbox to full image. Feels cinematic.

## Pattern 4 — comparison slider

The "before/after" image slider. The "after" image is clipped to the right of the slider position.

```css
.after-image {
  clip-path: inset(0 var(--slider-x) 0 0);
}
```

`--slider-x` is updated by JS on pointer move. Because `clip-path` updates are GPU-cheap, the slider is silky even on 60Hz constrained devices.

## Pattern 5 — directional content swap

Two pieces of content stacked; one clips in from the right, the other clips out to the left.

```css
.panel-in { clip-path: inset(0 100% 0 0); }
.panel-in.active { clip-path: inset(0 0 0 0); }
.panel-out.exiting { clip-path: inset(0 0 0 100%); }
```

Gives a directional feel ([[fly-not-teleport]]) without `transform: translate` and without layout shift.

## Browser support

`clip-path: inset()` is universal. `clip-path: polygon()`, `circle()`, `ellipse()`, `path()` are all supported in modern browsers. Both endpoints of a transition must use the *same* shape function — you can't transition from `inset()` to `circle()`.

## When to apply

- Any "reveal" or "cover" effect.
- Color-flipping text under a sliding pill.
- Hold-to-confirm interactions.
- Comparison sliders.
- Scroll-driven reveals.

## Gotcha

`clip-path` with `border-radius` is finicky — combine via `clip-path: inset(... round Xpx)` instead of using both properties. Mixing them produces strange double-clipping on Safari.

Also: `clip-path` on a parent affects all children. Want only one child clipped? Apply it to that child directly.

## Sources

- Emil Kowalski — clip-path section of [emilkowalski/skill](https://github.com/emilkowalski/skill).
- MDN — `clip-path` reference.
- Related: [[transform-opacity-only]] for the GPU-acceleration baseline.
