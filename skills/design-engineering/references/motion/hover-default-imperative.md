---
title: hover-default-imperative
summary: Icon-animation components animate on :hover by default. Expose an imperative trigger() for touch and programmatic use.
tags: [motion, icon, hover, touch, api-design]
---

# Hover by default, imperative for everything else

The lucide-animated.com pattern (and the standard for any animated-icon component): the icon plays its animation on `:hover` by default. For touch devices and programmatic use, expose an imperative `trigger()` API alongside.

## Why hover-by-default

Animated icons in a toolbar should *just work* without setup. The developer drops `<AnimatedHeart />` into a hover-aware UI (button, link, card) and the icon animates on hover. Zero config.

```tsx
<button>
  <AnimatedHeart /> {/* animates when button is hovered */}
  Like
</button>
```

```css
.button:hover .icon-svg path {
  /* hover state — animation plays */
}
```

The CSS-only `:hover` trigger is performant (no JS state), accessible (focus styles can fire it too), and matches user intent.

## Why imperative API too

`:hover` doesn't exist on touch. For:
- A "save successful" celebration that fires on a discrete event.
- A heart that fills when the user taps a button.
- An onboarding tour that plays icons in sequence.
- A multi-element choreography across the page.

…you need to *trigger* the animation programmatically. Hover alone isn't enough.

```tsx
import { useRef } from 'react';
import { AnimatedHeart, type AnimatedIconHandle } from '@/icons';

function LikeButton() {
  const ref = useRef<AnimatedIconHandle>(null);
  
  return (
    <button onClick={() => ref.current?.trigger()}>
      <AnimatedHeart ref={ref} />
      Like
    </button>
  );
}
```

The imperative handle exposes (at minimum) `trigger()` and optionally `reset()`, `pause()`, `play()`.

## The pattern (TypeScript)

```tsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

export type AnimatedIconHandle = {
  trigger: () => void;
  reset: () => void;
};

export const AnimatedHeart = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (props, ref) => {
    const internalRef = useRef<SVGSVGElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    
    useImperativeHandle(ref, () => ({
      trigger: () => setIsAnimating(true),
      reset: () => setIsAnimating(false),
    }));
    
    return (
      <svg ref={internalRef} data-animated={isAnimating} {...props}>
        {/* paths that respond to data-animated and :hover via CSS */}
      </svg>
    );
  }
);
```

The CSS responds to both `:hover` and `[data-animated="true"]`:

```css
.icon-svg path {
  transition: all 200ms var(--ease-out-quart);
}
button:hover .icon-svg path,
.icon-svg[data-animated="true"] path {
  /* shared animated state */
}
```

## Touch detection considerations

`@media (hover: hover)` gates `:hover` to devices with a real pointer. On touch-only devices, the `:hover` rules don't apply — fall back to the imperative path.

```css
@media (hover: hover) {
  button:hover .icon-svg path {
    /* hover animation only on pointer devices */
  }
}
```

For touch, animations fire either on tap (via `onClick` → `ref.trigger()`) or on a focus event (keyboard nav). This avoids the "hover state stuck on tap" problem touch users hit with naive `:hover`-only icons.

## When to apply

- Any animated icon library you ship.
- Icon components in a design system.
- Reusable components where users might want both default and programmatic control.

## When NOT to apply

- Static icons that don't animate. Don't add `trigger()` for icons that have nothing to trigger.
- Pure-CSS animations that don't need state at all (e.g., a permanently-spinning loader). Don't ref-wrap them.
- One-off animations in a specific feature. Inline the animation; don't build a reusable icon component for it.

## Gotcha

Don't expose `trigger()` *without* `:hover` default. Forcing all users to manually wire up triggers defeats the zero-config promise. The hover-default + imperative-handle combination is what makes this pattern useful.

Also: don't use `forwardRef` if your component is functional only. Use it only when you genuinely need the parent to call methods on the child.

## Sources

- [lucide-animated.com](https://lucide-animated.com) — pqoqubbw/icons collection.
- React docs — `useImperativeHandle`, `forwardRef`.
- Related: [[icon-systems]], [[morphing-icons]], [[responsive-feedback]], [[animations-dev-curriculum]].
