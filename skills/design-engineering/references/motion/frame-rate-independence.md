---
title: frame-rate-independence
summary: Animation state should depend on time and events, never on which frames happened to run. Step springs on a fixed clock or sample a closed form, cap the catch-up after a stall, apply events at their timestamps, store what the user placed and derive what fits, and never let last frame's value make a decision.
tags: [motion, springs, performance, state, animation-engineering, measured]
---

# Frame-rate independence

The same gesture should end in the same place at 30, 60 and 120 fps, and after the tab stalls. It usually doesn't. Code written as "per frame" (`velocity *= 0.99`, a spring stepped once per `requestAnimationFrame`, a value stored every frame) ties state to the frame rate. `0.99` per frame decays to 0.55 over a second at 60 fps and to 0.74 at 30. Cheng Lou measured the worst case in handwired: with the usual render order, the same input differed by up to 359 px between 10 fps and 120 fps at shared timestamps.

## The rules

1. **Step on a fixed clock, or don't step.** Run springs in fixed 4 ms steps (4 per frame at 60 fps, 2 at 120). An 8 ms step can miss a 120 Hz frame entirely. Or sample a **closed form**: an exponential decay `x0 · e^(−kt)`, or an analytic spring, gives the exact value at any timestamp with no loop and no drift. Closed forms stop working once moving elements push on each other; then you are stepping again.
2. **Cap the catch-up.** After a stall, `steps = floor(elapsed / 4 ms)` can reach thousands, and running them all makes the next frame late too: a spiral. Cap it at about 300 steps (1.2 s of simulation). Then pick a named fallback: *carry* the rest into later frames, or *snap* every object onto its destination. Either is fine, as long as you chose it.
3. **Apply events at their timestamps.** Step springs up to the event's time, then apply the event. The new target starts pulling within one step of the press at any frame rate, instead of from the previous frame's time. Recorded input then replays to the identical screen, which is what makes screenshot tests stable.
4. **Store what the user placed; derive what fits.** Keep a window's or panel's rectangle as the user left it, and compute the clamped-to-viewport version every frame without storing it. Store the clamp instead, and a phone turned sideways and back leaves every window squashed into the smallest viewport it ever saw.
5. **Last frame's value is for display, never for decisions.** Reading a value one frame late can smooth a chain of dependencies, but a grid that picks its column count from last frame's width jumped a thumbnail by up to 533 px while a drawer sprang open. The lag is harmless on a position and wrong on a choice.

## When to apply

Any spring or decay you write by hand, drag-and-throw physics, window managers, resizable panels, anything with a screenshot test. Library springs (Motion, react-spring) handle rule 1 for you; rules 3–5 are yours.

## Reference

```ts
// Bad: x += (target - x) * 0.08 on every rAF; tuned at 60fps, it runs twice as fast at 120.
// Good: the same 60fps feel from elapsed time, with a stall capped.
let last = performance.now();
function tick(now: number) {
  const dt = Math.min(100, now - last); last = now;
  x += (target - x) * (1 - Math.pow(1 - 0.08, dt / (1000 / 60)));
  requestAnimationFrame(tick);
}
```

- Gold example: `stageshow/kit/motion/Follow.tsx`, a spring that keeps its 60Hz trajectory at any refresh rate: it accumulates elapsed time (capped at 100ms a frame), steps in fixed 1000/60 ms steps, interpolates the partial step, and retargets from the rendered position and velocity. Benji's call differs on the numbers: 16.7ms steps plus interpolation instead of 4ms steps, and a settle band of 0.05 instead of 0.01.
- Check: log rAF timestamps against the transform on a 60Hz and a 120Hz screen; poses match at shared timestamps, and repeated poses followed by a jump mean a clock bug.

## Gotcha

"Settled" is never exact: a spring oscillates forever inside a small band. End it when both the distance to the target and the velocity are under ~0.01, then set position to destination and velocity to 0. An "exactly at rest" check never fires, and a snap from a band that is too wide is a visible jump ([[spring-animations]]).

A high frame rate alone is not smoothness either. An element that jumps far between frames strobes at 120 fps. For a very fast UI move (a flung card, a long snap), add a slight directional blur or stretch at peak speed and drop it at rest, as [[launch-video-cuts]] does in film.

## Sources

- Cheng Lou, chenguini (MIT, HEAD 84fb27d): `docs/Animation.md` ("Closed-Form vs Numerical", "Springs", "Spiral of Death Prevention", "Exponential Decay").
- Cheng Lou, handwired (MIT, HEAD 257856e): `docs/behavior-choices.md` — event timestamps and the 359 px measurement, the 300-step cap and named fallbacks, "Store what the user placed", and "Read last frame's value" (the 533 px jump).
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/apple-design/SKILL.md §11 (per-frame displacement, blur or stretch on very fast motion).
- Related: [[spring-animations]], [[gesture-momentum]], [[animated-hit-testing]], [[performance-discipline]].
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `kit/motion/Follow.tsx` (fixed-step spring, 100ms cap, interpolation, settle band), `references/rehearse.md` (Live pacing), `references/choreography.md` (virtual-clock export vs live playback).
- Benji Taylor, benji.org/liveline (read 2026-11-07): the 0.08-per-frame lerp at 60fps used in the example.
