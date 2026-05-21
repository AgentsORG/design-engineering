---
title: morphing-icons
summary: Constraint-driven icon system — every icon = N SVG lines, unused lines collapse to invisible center points, same-shape icons rotate.
tags: [motion, icons, svg, benji]
---

# Morphing icons — the constraint-driven approach

Benji Taylor's icon system for the Claude app: every icon in the set is constructed from exactly **three SVG lines**. Icons with fewer visible elements collapse their unused lines to invisible center points. Icons sharing geometry differ only by rotation. The result: every icon can morph smoothly into any other icon in the set, because they all share the same data shape.

## The 3-line constraint

```ts
type IconLine = { x1: number; y1: number; x2: number; y2: number; opacity?: number };
type Icon = [IconLine, IconLine, IconLine]; // always 3 lines

const arrowUp: Icon = [
  { x1: 7, y1: 12, x2: 7, y2: 2 },   // vertical shaft
  { x1: 2, y1: 7,  x2: 7, y2: 2 },   // left wing
  { x1: 12, y1: 7, x2: 7, y2: 2 },   // right wing
];

const dotIcon: Icon = [
  { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 }, // collapsed
  { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 }, // collapsed
  { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 1 }, // visible single point
];
```

A collapsed line is `{ x1: 7, y1: 7, x2: 7, y2: 7 }` with `opacity: 0`. Visually it's a point at center; arithmetically it's still a "line" the morph can tween between.

## Two morph strategies

### 1. Coordinate interpolation (different shapes)

When morphing between two icons with *different* geometries, let Motion (or your animation library) interpolate each coordinate independently:

```tsx
<motion.line
  x1={current[0].x1} y1={current[0].y1}
  x2={current[0].x2} y2={current[0].y2}
  animate={{ x1: target[0].x1, y1: target[0].y1, x2: target[0].x2, y2: target[0].y2 }}
/>
```

Motion handles the tweening. The animation is smooth because the *count* of lines is constant (3 → 3); only the coordinates change.

### 2. Rotation morph (shared geometry)

When two icons share the same line *shape* (e.g., all four directional arrows), rotate the whole icon instead of tweening coordinates:

```tsx
<motion.svg
  animate={{ rotate: rotationFor(currentDirection) }}
  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
>
  {/* same SVG content for all four arrow directions */}
</motion.svg>
```

Rotation is cheaper, faster, and reads as more obviously "the same object turning" instead of "two different objects swapping."

Use rotation when the geometric difference is purely angular (arrows by 90°, plus → cross by 45°). Use coordinate interpolation when the geometry actually changes (arrow → checkmark).

## When to apply

- Toggle states: play/pause, expand/collapse, mute/unmute, follow/unfollow.
- Directional icons: chevron up/down/left/right.
- Status indicators that shift meaning: dot → ring → check.
- Toolbar icons that change mode.

## When NOT to apply

- Marketing/decorative icons where personality and detail matter more than morphability. Use a real icon pack like Phosphor or Hugeicons ([[icon-systems]]).
- Icons that need filled shapes (the constraint here is stroke-only).
- Icon sets larger than ~20 icons. The 3-line constraint gets restrictive past that.

## The metaphysical point

Constraints are the engine. By forcing every icon into a 3-line schema, every icon becomes *morph-compatible* with every other one. The constraint isn't a limitation; it's what enables the system to work at all.

You couldn't ship this with a heterogeneous icon set. The whole approach depends on uniformity at the data layer.

## Gotcha

3 lines is right for the Claude app icon vocabulary. Your product may need 4 (more complex icons) or 2 (simpler set). Pick the smallest N that covers your icon space. Larger N means more "collapsed" lines per icon, which is fine, but eventually you've defeated the purpose — pick judiciously.

Also: opacity-collapsed lines still render in the SVG. If you have hundreds of icons on a page, the DOM weight adds up. Use this pattern for ~5–20 icons in active use, not for an icon library.

## Sources

- Benji Taylor — *Morphing Icons with Claude*, [benji.org/morphing-icons-with-claude](https://benji.org/morphing-icons-with-claude).
- Related: [[icon-systems]], [[transform-mastery]], [[fly-not-teleport]], [[animations-dev-curriculum]].
