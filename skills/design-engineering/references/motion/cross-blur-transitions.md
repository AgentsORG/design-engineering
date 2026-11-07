---
title: cross-blur-transitions
summary: Pair opacity 0↔1 with `filter: blur(2px) ↔ 0` over the same timing. Masks imperfect crossfades.
tags: [motion, transition, blur]
---

# Cross-blur transitions

Jakub Antalik's most reused technique on transitions.dev. Pair an opacity transition with a synchronized blur transition. The blur masks the moment of imperfect overlap between two states, so what would have looked like a janky crossfade reads as a smooth transformation.

## The technique

```css
.element {
  opacity: 0;
  filter: blur(2px);
  transition:
    opacity 250ms var(--ease-out-quart),
    filter 250ms var(--ease-out-quart);
}
.element[data-state="visible"] {
  opacity: 1;
  filter: blur(0);
}
```

The blur is small — 2px on desktop, **4px on mobile** to compensate for phone backing-buffer downsampling.

```css
@media (max-width: 640px) {
  .element {
    filter: blur(4px);
  }
}
```

## When it works

- Crossfading between two images or icons of similar size.
- Page transitions in single-page apps (see [[fly-not-teleport]] for when motion is better).
- Number transitions (a counter ticking up).
- Tab content swaps.
- Modal opens (paired with scale).

## When NOT to use

- For text content. Blur on text reads as broken focus, not motion.
- For high-frequency micro-interactions (hover). Blur is too expensive.
- For elements larger than ~400px square. The GPU cost rises with surface area.

## Why this beats plain crossfade

A plain crossfade — `opacity: 0 → 1` — produces a moment where both elements are at ~50% opacity. The eye sees two ghost images. Cross-blur replaces that ghost moment with a soft, out-of-focus blob that "resolves" into the new element. The brain accepts blur-resolve as a single object; it doesn't accept double-ghost as a single object.

## Reference

Swapping a word in place (a label, a short value), 450ms. The outgoing copy blurs out over half the time; the incoming one waits out the first 30% so the two are never both at 50%:

```css
/* adapted from stageshow/kit/motion/Swap.css */
.out { animation: swap-out 225ms ease forwards; }
.in  { animation: swap-in 450ms cubic-bezier(0.25, 0.8, 0.25, 1) both; }
@keyframes swap-out { to { opacity: 0; filter: blur(2px); } }
@keyframes swap-in  { 0%, 30% { opacity: 0; filter: blur(2px); } 100% { opacity: 1; filter: none; } }
```

Benji's call differs on text: Stageshow does cross-blur short labels that change in place (2px in `Swap` and `States`), and drops blur only for text that travels a line, where it reads as flicker (removed from `Roll` in 1.1).

Gold example: `stageshow/kit/motion/Swap.css` with `stageshow/kit/motion/Swap.tsx` (the 450ms default, the outgoing copy at half).

Check: step the swap at 40ms. No frame shows both words legible at once, and a rolled status word shows no blurred frame.

## Gotcha

`filter: blur()` is GPU-accelerated but expensive on large surfaces. If you're applying it to a full-page hero image (>1000px on a side), test on a low-end Android. If FPS drops, reduce blur to 1px or skip the technique for that element.

Also: blur breaks `position: sticky` children in some browsers when applied to a parent. If you have sticky elements inside the blurred container, the technique may not work as-is.

## Sources

- Jakub Antalik — transitions.dev, prototypes P1, P3, P5, P6, P9, P10.
- Emil Kowalski — "use blur to mask imperfect transitions."
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `kit/motion/Swap.css`, `kit/motion/Swap.tsx`, `kit/motion/States.css`, `kit/motion/Roll.css` (no blur on rolling text).
