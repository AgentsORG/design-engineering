---
title: fly-not-teleport
summary: When a component persists between two states, animate the change. Don't crossfade what should travel.
tags: [motion, continuity, philosophy]
---

# Fly, don't teleport

Benji Taylor: *"Avoid static transitions… we fly instead of teleport."*

When an element exists in state A and also in state B — but in a different position, size, or shape — the right answer is almost never to crossfade. Crossfading reads as two separate elements. The right answer is to *move* the element from its A position to its B position, so the user can see it's the same thing.

## The principle

> If a component occupies a space and will persist in the next phase, it should remain consistent.

Three corollaries:

1. **Persistent elements travel, they don't restart.** No re-animation of an element that was already on screen.
2. **Identity is communicated by motion.** A label that morphs from "Continue" to "Confirm" (sharing the letters "Con") tells the user it's still the same button. A button that crossfades is two buttons.
3. **Direction carries meaning.** A modal opening from the bottom should close to the bottom. A tab content that slid in from the right should slide out to the left only if the user navigated *back* — otherwise it should match the entrance direction.

## In practice

- **Tabs:** the underline (or background) of the active tab should *slide* between tabs, not disappear and reappear. React Aria's `LayoutGroup` pattern handles this.
- **List reorder:** Use `view-transition` or `FLIP` to animate items to new positions instead of jumping.
- **Modal hierarchy:** When stacking modals, the underlying modal recedes slightly (scale 0.96, blur 4px) — it doesn't disappear, because it will return.
- **Tray heights:** Successive trays in a multi-step flow should *vary in height* to make each transition unmistakable. Same-height trays look broken.
- **Ends fixed at take-off, landing on the element itself:** measure the landing avatar, not its padded slot, and freeze both rects when the flight starts. A live-measured end restarts the transition every frame and jumps on arrival.

## The FLIP technique (vanilla)

```ts
// First — measure the starting position
const first = el.getBoundingClientRect();

// Last — measure the ending position (after layout change)
const last = el.getBoundingClientRect();

// Invert — calculate delta and apply transform
const dx = first.left - last.left;
const dy = first.top - last.top;
el.style.transform = `translate(${dx}px, ${dy}px)`;

// Play — transition to no-transform
requestAnimationFrame(() => {
  el.style.transition = "transform 250ms var(--ease-out-quart)";
  el.style.transform = "";
});
```

## When to apply

Any time a component changes position, size, or hierarchy between two states *and* exists in both. Especially: tabs, navigation, list reorder, modal stack, drawer-to-fullscreen, carousel.

## When NOT to apply

When the elements are conceptually different things. Two unrelated cards changing content should crossfade or just swap. Forcing motion between unrelated content is just decoration.

## Reference

```tsx
// Adapted from stageshow/kit/motion/Fly.tsx: two tracks on close curves make a gentle arc.
<div style={{ transform: `translateX(${dx}px)`,
  transition: 'transform 750ms cubic-bezier(0.35, 0, 0.2, 1)' }}>
  <div style={{ transform: `translateY(${dy}px) scale(${sx})`, transformOrigin: '0 0',
    transition: 'transform 750ms cubic-bezier(0.3, 0.6, 0.15, 1)' }}>{children}</div>
</div>
```

- Gold example: `stageshow/examples/subscriptions/` (a price chip rides from the checkout into the new billing row, then MRR rolls up), and the handoff pair in `stageshow/teaching/contrasts.tsx`, where landing on the padded slot puts the avatar 4px off before it jumps inward. Benji's call differs on length: a demo flight takes 750ms, and 600ms or more when it grows on the way (`stageshow/references/motion.md`); the FLIP's 250ms suits product UI.
- Check: step the last frames of the flight; on the swap frame the flyer and the real element match in size and place to the pixel, with no bounce or ring pulse on arrival.

## Gotcha

The View Transitions API makes this easy on the modern web but has spotty support and is hard to debug. For production, hand-rolled FLIP or Framer Motion's `layoutId` is more reliable.

## Sources

- Benji Taylor — Family Values, "we fly instead of teleport."
- Emil Kowalski — Sonner, popover hierarchy.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `kit/motion/Fly.tsx`, `kit/motion/Fly.css`, `teaching/contrasts.tsx` (handoff), `examples/subscriptions/`, `references/motion.md` (Things that appear, travel and leave), `scripts/motion-watch.mjs` (`fly size`, `handoff shift`).
