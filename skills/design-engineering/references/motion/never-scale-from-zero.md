---
title: never-scale-from-zero
summary: Never animate from scale(0). Use scale(0.95) + opacity, or @starting-style for modern CSS entry.
tags: [motion, gotcha, css, starting-style]
---

# Never animate from scale(0)

The single most common amateur mistake in entry animations is starting at `scale(0)` and animating to `scale(1)`. It looks like a balloon being inflated. UI is not a balloon.

## Why scale(0) is wrong

- The element is *invisible* during the first ~30ms of the transition, then suddenly becomes visible at scale(0.05) or so.
- The visual mass appears from a single point, which reads as theatrical and toy-like.
- Tiny scale values render to subpixel positions, causing blur and shimmer on the first frames.

## The right pattern: 0.95 + opacity

```css
.modal {
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity 200ms var(--ease-out-quart),
    transform 200ms var(--ease-out-quart);
}
.modal[data-state="open"] {
  opacity: 1;
  transform: scale(1);
}
```

- Start at `scale(0.95)`, not `scale(0)`. The 5% size difference is enough to read as motion.
- Pair with `opacity: 0 → 1`. The opacity does most of the visibility work.
- Both transitions on the same duration and curve — they should feel like a single move.

For more theatrical entries (rare moments, see [[delight-impact-curve]]), `scale(0.85)` or even `scale(0.5)` can work if paired with a spring curve. But `scale(0)` is almost never right.

## @starting-style — the modern CSS way

Chrome 117+ and Safari 17.5+ support `@starting-style`, which lets you define the "before" state for an element that's just been added to the DOM:

```css
.modal {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 200ms,
    transform 200ms,
    display 200ms;
}
@starting-style {
  .modal {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

No `data-state` toggle, no JavaScript. The element animates in the moment it's added to the DOM (or becomes `display: block` from `display: none`).

For the *exit* in the same model, use `transition-behavior: allow-discrete` and animate the `display` property — modern browsers support this.

## Fallback for browsers without @starting-style

Use a `data-mounted` attribute set in JS one frame after mount:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => {
  requestAnimationFrame(() => setMounted(true));
}, []);

return <div data-mounted={mounted} className="modal">…</div>;
```

```css
.modal {
  opacity: 0;
  transform: scale(0.95);
  transition: all 200ms;
}
.modal[data-mounted="true"] {
  opacity: 1;
  transform: scale(1);
}
```

This is the React pattern most production apps use today.

## When to apply

Every entrance animation. Modals, popovers, tooltips, toasts, dropdowns, drawers — anywhere an element appears on screen.

## Gotcha

`@starting-style` only fires on the *first* render of an element. For elements that mount and unmount repeatedly (e.g. dropdowns opened multiple times), the pattern still works if you `display: none` between opens and rely on the transition-behavior trick. But on rapid open/close, you may see flicker — at that point switch to the `data-mounted` fallback or use a library like Radix that handles this for you.

## Sources

- Emil Kowalski — Component Building Principles, [emilkowalski/skill](https://github.com/emilkowalski/skill).
- web.dev — `@starting-style` and `transition-behavior` references.
- Related: [[responsive-feedback]], [[transform-mastery]], [[easing-curves]].
