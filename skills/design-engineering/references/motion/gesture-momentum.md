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

`0.11 px/ms` is roughly the threshold below which a release reads as "the user stopped" and above which it reads as "the user threw it." Tune for your context. Velocity is half of a dismiss test; distance travelled is the other half ([[gesture-phases]]).

Two samples make a noisy velocity: one late `pointermove` can halve or double it. Keep the last ~20 pointer samples and measure over the last ~100 ms before the release, timed from the event's `timeStamp`. On release the spring starts from that velocity toward its new destination, and the next press tests against that destination ([[animated-hit-testing]]).

The throw starts at the finger's speed. A pause at the hand-over, an ease-in from rest or a gap that snaps shut afterwards each turns one gesture into two motions.

## Damping at boundaries

When the user drags past the edge, don't stop hard. Resist more the further they go — Apple's rubber band:

```ts
// x = distance past the bound, d = the container's size along that axis
const rubberband = (x, d, c = 0.55) => (x * d * c) / (d + c * Math.abs(x));
```

Near the edge it follows at about `c` (55%) of the finger; far past it the offset levels off and never exceeds `d`, so no drag can throw the content off-screen. An unbounded power curve (`|x|^0.7`) keeps growing and is not what iOS ships. Without resistance, the boundary feels like hitting a wall.

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

Past a boundary, allow the drag with rising friction (the rubber band above) instead of blocking it; on release, spring back to the bound. At a normal target, **overshoot only when the gesture carried momentum**: a flicked card may bounce slightly (damping ratio ~0.8), a slow release or a programmatic move settles critically damped with no overshoot. Where it lands after a flick is [[momentum-projection]]; the spring itself is [[spring-animations]].

## When to apply

Any drag, swipe, dismiss, pull-to-refresh, slider, or carousel. If the interaction takes a real pointer input, all five rules above apply.

## Reference

```ts
// Adapted from stageshow/examples/swipe/index.tsx: a release curve whose first slope is the finger's speed.
const v = Math.abs(lastX - firstX) / Math.max(1, lastT - firstT); // px/ms at release
const left = row.width + dx;                                     // px still to travel
const ms = 300, x1 = 0.25;
const y1 = Math.min(0.95, (x1 * v * ms) / left);
row.style.transition = `transform ${ms}ms cubic-bezier(${x1}, ${y1.toFixed(3)}, 0.35, 1)`;
```

- Gold example: `stageshow/examples/swipe/` (swipe to archive: 1:1 under the finger, thrown off at release speed, then the gap closes in one ease) and the `detail-throw` pair in `stageshow/teaching/details.tsx`. The example reads its last four scripted samples; real input wants the ~100ms window above.
- Check: step the release at one frame apart; the row's displacement per frame neither drops (a pause) nor jumps (a step) across the release frame.

## Gotcha

Touch events and pointer events are different APIs and produce slightly different velocity numbers. Always normalize to `px/ms` and tune your thresholds against the slower of the two. iOS Safari's touch event timing is notably noisier than mouse pointer timing on macOS.

## Sources

- Cheng Lou, chenguini (MIT): `docs/Input.md` "Velocity Estimation" (the ~100 ms window over a sample buffer).

- Emil Kowalski — gesture and drag interactions (Sonner, Vaul).
- iOS Human Interface Guidelines — rubberband / damping behavior.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/apple-design/SKILL.md (the 0.55 rubber-band constant, overshoot only after momentum).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `examples/swipe/index.tsx` (velocity-matched release curve), `teaching/details.tsx` (`detail-throw`), `references/motion.md` (Phones in motion).
