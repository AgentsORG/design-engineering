---
title: gesture-momentum
summary: Velocity-based dismissal, damping at boundaries, pointer capture. The mobile-feel rules.
tags: [motion, gesture, mobile]
---

# Gesture momentum

If a drag interaction "feels off," 90% of the time the cause is one of three things: no velocity tracking on release, no damping at boundaries, or no pointer capture. Fix those three, the gesture starts feeling native.

## Velocity-based dismissal

When the user releases a draggable element, don't just snap to the closest position. Check the velocity:

```ts
const onPointerUp = (e) => {
  const velocity = (currentY - prevY) / (now - prevTime); // px/ms
  if (Math.abs(velocity) > 0.11) {
    // user flung — dismiss in direction of velocity
    dismiss(velocity > 0 ? "down" : "up");
  } else {
    // user released slowly — snap to threshold
    snapToThreshold();
  }
};
```

`0.11 px/ms` is roughly the threshold below which a release reads as "the user stopped" and above which it reads as "the user threw it." Tune for your context.

## Damping at boundaries

When the user drags past the edge, don't stop hard. Apply diminishing returns:

```ts
// pull-to-refresh / overscroll
const damped = (delta) => Math.sign(delta) * Math.pow(Math.abs(delta), 0.7);
```

The `0.7` exponent makes each pixel of drag input produce diminishing pixels of motion. iOS uses something close to this. Without it, the boundary feels like hitting a wall.

## Pointer capture

```ts
onPointerDown(e) {
  e.currentTarget.setPointerCapture(e.pointerId);
}
```

Without pointer capture, fast drags lose tracking when the pointer leaves the element. With it, the drag continues until release no matter where the pointer goes.

## Multi-touch protection

A common bug: user starts dragging with one finger, lands a second finger on the element, and the gesture breaks. Guard:

```ts
onPointerDown(e) {
  if (e.isPrimary === false) return; // ignore secondary pointers
  // ...
}
```

## Friction instead of hard stops

When a draggable element reaches its target, don't hard-stop at the target value. Let it overshoot slightly and settle. This is what springs are for — see [[spring-animations]].

## When to apply

Any drag, swipe, dismiss, pull-to-refresh, slider, or carousel. If the interaction takes a real pointer input, all five rules above apply.

## Gotcha

Touch events and pointer events are different APIs and produce slightly different velocity numbers. Always normalize to `px/ms` and tune your thresholds against the slower of the two. iOS Safari's touch event timing is notably noisier than mouse pointer timing on macOS.

## Sources

- Emil Kowalski — gesture and drag interactions (Sonner, Vaul).
- iOS Human Interface Guidelines — rubberband / damping behavior.
