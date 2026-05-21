---
title: spring-animations
summary: When springs beat curves — interactive/draggable elements. Apple's spring config. Interruptibility.
tags: [motion, spring, physics]
---

# Spring animations

Curves animate to a fixed duration. Springs animate to a target value with physics. The difference matters when the user is *driving* the animation.

## Use springs when

- The animation is **interruptible** mid-flight (drag, gesture, scroll).
- The animation responds to **velocity** from a real input.
- The target value can change while the animation is running.
- The element should feel **physical** rather than mechanical.

## Use curves when

- The animation is triggered by a discrete event (button click, route change).
- You want **exact timing** (e.g., choreograph multiple animations to land together).
- The element is small and the difference is invisible.

## The Apple-style spring

```ts
// Framer Motion / Motion
const spring = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 1,
}
```

- **Stiffness:** how aggressive the spring pulls toward target. ~380 feels Apple-like; higher = snappier.
- **Damping:** how much friction. ~30 prevents oscillation. Lower = bouncy.
- **Mass:** rarely change from 1.

## Interruptibility — the real reason to use springs

A button that scales on press, then the user clicks rapidly again — a curve-driven animation restarts and looks jittery. A spring continues from current velocity and feels right.

```tsx
// Spring (good for press states)
<motion.button
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 500, damping: 30 }}
/>

// Curve (good for one-shot reveal)
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
/>
```

## When to apply

Pretty much anywhere the user's input drives motion: drag handles, dismissible cards, sliders, pinch-zoom, scroll-snap. For *triggered* motion (modals, toasts, page transitions), curves are simpler and usually better.

## Gotcha

Springs without a `stiffness` and `damping` set produce slow, floaty defaults. Always set both. The Apple feel comes from a relatively *high* stiffness and *high* damping — not the other way around.

## Sources

- Emil Kowalski — Sonner spring config, interruptibility argument.
- Apple Human Interface Guidelines — spring parameter ranges.
- guidelines.sh — "Spring physics over bezier" for interactive motion.
