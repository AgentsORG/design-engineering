---
title: momentum-projection
summary: On release, project where the flick would come to rest (current + (v/1000)·d/(1−d), d ≈ 0.998), snap to the target nearest that point, hand the release velocity to the spring, decide by velocity sign, run X and Y on separate springs, and always start from the on-screen value.
tags: [motion, gesture, spring, velocity, interruptibility]
---

# Momentum projection

A flick is a small input that asks for a big output. Snapping to the target nearest the *release point* ignores what the finger was doing; project the resting point from the release velocity, the way scroll deceleration does, choose the target nearest that projection, and let the spring carry on at the finger's speed so there is no seam between drag and animation. [[gesture-momentum]] covers capture, sampling and boundaries; this node is what happens after the finger lifts.

## Project, then pick

```js
// d ≈ 0.998 feels like normal scroll; 0.99 stops sooner
const project = (v /* px/s */, d = 0.998) => (v / 1000) * d / (1 - d);

const resting = current + project(releaseVelocity);
const target = nearestSnapPoint(resting);
animateSpring(target, { velocity: releaseVelocity });
```

This is exponential decay, not the textbook `v²/(2a)`. At 0.998 a 1000 px/s release projects about 500px ahead; a gentle 200 px/s release projects about 100px and usually stays on its current snap.

## Hand the velocity over

- Pass the release velocity as the spring's initial velocity. Motion takes absolute px/s; an API that wants *relative* velocity needs `v / (target − current)`: 50 px/s with 100px left to go is `0.5`.
- **Commit or reverse by the velocity's sign**, not by which half of the track the element sits in. A sheet dragged 70% open and flicked down closes.
- Measure velocity over the last ~100 ms of samples ([[gesture-momentum]]), never from two events.

## Interruptible from the screen

- A new animation starts from the **presentation value**: read the live transform, never the logical target. Starting from the target jumps.
- Never lock input during a transition. A closing sheet the user grabs again follows the finger at once.
- On a reversal, re-target a spring that keeps its current velocity. Cancelling one animation and starting another at zero hits a velocity wall.
- **2D motion gets one spring per axis.** One spring on the combined distance desyncs when X and Y velocities differ (a thrown picture-in-picture window).
- Keep the grab offset: the element stays where the finger took it, never recentred under the pointer.

## When to apply

Sheets, drawers, carousels, snap-point lists, swipe-to-dismiss, draggable windows — any release that chooses between resting places.

## Reference

A 600px sheet is 180px from open when the finger lifts moving down at 900 px/s.

- Bad: it is past halfway open, so it snaps open from rest and the flick is ignored.
- Good: `180 + 0.9 * 0.998 / 0.002` rests near 629px, the nearest snap is closed (600), and the spring starts at 900 px/s.

The same rule in 2D: a picture-in-picture window is flicked up and to the right from the bottom-left corner.

- Bad: take the corner nearest the release point. That is still bottom-left, so the throw is lost.
- Good: `px = x + project(vx)`, `py = y + project(vy)`; pick the corner nearest (px, py); start an x spring at vx and a y spring at vy, on Apple's move pair (damping 1.0, response 0.4; [[spring-animations]]).
- Check: a gentle flick stays put; a hard diagonal flick crosses to the opposite corner without bending its path.

With no spring to hand the speed to (a CSS throw), give the curve a first slope equal to the finger's speed. Adapted from `stageshow/examples/swipe/index.tsx`, with `v` in px/ms from the last four drag samples:

```ts
const ms = 300, x1 = 0.25;
const y1 = Math.min(0.95, (x1 * v * ms) / remaining); // remaining px to travel
row.style.transition = `transform ${ms}ms cubic-bezier(${x1}, ${y1.toFixed(3)}, 0.35, 1)`;
```

- **Gold example:** `stageshow/examples/swipe/` (the row stays 1:1 under the finger, then carries on at the speed it left, with no step at the hand-over) and the interrupt pair in `stageshow/teaching/contrasts.tsx` (a second choice continues from the highlight's current position instead of restarting).
- **Check:** film the release at 40 to 80ms a frame: the row travels as far in the first frame after lift as in the last frame before it. Then grab it again mid-settle: it follows the finger from where it is, never from the target.

## Gotcha

Projection without velocity hand-off still looks wrong: the element picks the right target and then starts from rest, which reads as a stall right after release. Both halves, or neither.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/apple-design/SKILL.md (from Apple's *Designing Fluid Interfaces*, WWDC 2018); unchanged through `715c180`.
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG (the 2D corner-snap case).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/examples/swipe/index.tsx`, `stageshow/teaching/contrasts.tsx` (interrupt), `stageshow/references/verify.md` (beats filmed at 40 to 80ms).
- Related: [[gesture-momentum]], [[spring-animations]], [[frame-rate-independence]], [[animated-hit-testing]].
