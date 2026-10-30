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

## Gotcha

Projection without velocity hand-off still looks wrong: the element picks the right target and then starts from rest, which reads as a stall right after release. Both halves, or neither.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/apple-design/SKILL.md (from Apple's *Designing Fluid Interfaces*, WWDC 2018).
- Related: [[gesture-momentum]], [[spring-animations]], [[frame-rate-independence]], [[animated-hit-testing]].
