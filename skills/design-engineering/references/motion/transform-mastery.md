---
title: transform-mastery
summary: translateY with percentages, scale() scales children, 3D transforms, transform-origin fundamentals.
tags: [motion, transform, css]
---

# CSS transform mastery

`transform` is one of the two GPU-accelerated animatable properties (the other is `opacity` — see [[transform-opacity-only]]). Mastering its mechanics unlocks effects that look impossible to people who only know `translate(10px, 0)`.

## translate with percentages

`translateY(100%)` translates by the element's own height. This is enormous for layout-aware motion:

```css
/* Slide a panel up by its own height to hide it */
.panel { transform: translateY(100%); transition: transform 250ms var(--ease-out-quart); }
.panel.open { transform: translateY(0); }
```

No magic numbers tied to specific dimensions. The same code works whether the panel is 200px or 800px tall.

Percentage translates also nest correctly: a child's `translateY(100%)` is its *own* height, not the parent's. This is the right behavior for most UI animations.

## scale() scales children

Setting `transform: scale(1.05)` scales the entire DOM subtree, including text. This is usually NOT what you want:

```css
/* Wrong — the text inside also scales */
.card:hover { transform: scale(1.05); }
```

The fix: scale the wrapper, counter-scale the child.

```css
.card { transform: scale(1); transition: transform 200ms; }
.card:hover { transform: scale(1.05); }
.card-content { transform: scale(0.952); /* 1 / 1.05 */ }
```

- Or let the surface take the scale and the words only fade: text that ends a scale is redrawn snapped to the pixel grid and wobbles as it lands, so Benji Taylor's Stageshow popover scales a `::before` that holds the background and shadow (`kit/motion/Popover.css`, see [[responsive-feedback]]).

Or scale only specific elements (icons, illustrations) without text:

```css
.card:hover .card-icon { transform: scale(1.1); }
```

## transform-origin — the rotation/scale pivot

By default, transforms originate from the center of the element. To rotate or scale from a corner, set `transform-origin`:

```css
/* Scale from top-left corner */
.popover { transform-origin: top left; transform: scale(0.96); }
.popover.open { transform: scale(1); }
```

For [[responsive-feedback]] popover origin awareness, dynamically set `transform-origin` based on where the popover sits relative to its trigger.

```css
.popover { transform-origin: var(--popover-origin, top center); }
```

```ts
popover.style.setProperty('--popover-origin', `${anchor.x}px ${anchor.y}px`);
```

## 3D transforms — depth without WebGL

`rotateX`, `rotateY`, `rotateZ`, and `perspective` give you depth in pure CSS. The trick is to set `perspective` on the parent:

```css
.scene { perspective: 800px; }
.card { transform-style: preserve-3d; transition: transform 400ms; }
.card.flipped { transform: rotateY(180deg); }
```

Flip-card pattern, in 4 lines. The `preserve-3d` on the inner element is what makes children participate in 3D space.

For an orbit/parallax effect:

```css
.orbit-container { perspective: 1200px; }
.planet {
  transform: rotateY(0deg) translateZ(200px) rotateY(0deg);
  animation: orbit 8s linear infinite;
}
@keyframes orbit {
  to { transform: rotateY(360deg) translateZ(200px) rotateY(-360deg); }
}
```

The counter-rotation at the end keeps the planet facing the camera while it orbits.

## When to apply

- **translateY percentages:** any slide-in/out where the element's own height defines the offset.
- **scale() children:** check for unintended text scaling in any `:hover { transform: scale }` rule.
- **transform-origin:** popovers, dropdowns, context menus, anything that opens from a known anchor.
- **3D transforms:** flip cards, sub-window depth (modal hierarchies), parallax, intentional skeuomorphism. Use sparingly — easy to overdo.

## Reference

Two nested transforms on two curves carry an element along a soft arc, adapted from `stageshow/kit/motion/Fly.tsx`:

```tsx
<div style={{ transform: `translateX(${to.x - from.x}px)`,
  transition: 'transform 750ms cubic-bezier(0.35, 0, 0.2, 1)' }}>
  <div style={{ transform: `translateY(${to.y - from.y}px) scale(${to.width / from.width})`,
    transformOrigin: '0 0', transition: 'transform 750ms cubic-bezier(0.3, 0.6, 0.15, 1)' }}>
    {children /* drawn at the start size */}
  </div>
</div>
```

Gold example: `stageshow/kit/motion/Fly.tsx` with `Fly.css`. Both ends are fixed at take-off, a small lift (scale 1.12 at 30%) is gone by 85%, and it decelerates into place with no bounce; far-apart curves on x and y read as a skid sideways, then a drop.
Check: step the landing at 40ms. On the last frame the flyer's rect matches the real element's within 1px (Stageshow's `fly size` film line), so nothing jumps on the hand-over.

## Gotcha

Stacking transforms is not commutative. `translate(10px, 0) rotate(45deg)` is different from `rotate(45deg) translate(10px, 0)`. The second one translates *along the rotated axis*. When in doubt, do all `translate`s before all `rotate`s.

Also: `transform` is a single property. If you write `transform: scale(1.05)` to override a `transform: translateY(100%)`, the translate is gone. Use CSS custom properties or `transform: translateY(100%) scale(1.05)` explicitly.

## Sources

- Emil Kowalski — CSS Transform Mastery section of [emilkowalski/skill](https://github.com/emilkowalski/skill).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/motion/Fly.tsx`, `stageshow/kit/motion/Fly.css`, `stageshow/kit/motion/Popover.css`, `stageshow/scripts/motion-watch.mjs` (`fly size`).
- Related: [[transform-opacity-only]], [[responsive-feedback]], [[fly-not-teleport]].
