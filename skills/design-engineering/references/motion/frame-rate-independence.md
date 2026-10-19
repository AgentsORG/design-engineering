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

## Gotcha

"Settled" is never exact: a spring oscillates forever inside a small band. End it when both the distance to the target and the velocity are under ~0.01, then set position to destination and velocity to 0. An "exactly at rest" check never fires, and a snap from a band that is too wide is a visible jump ([[spring-animations]]).

## Sources

- Cheng Lou, chenguini (MIT, HEAD 84fb27d): `docs/Animation.md` ("Closed-Form vs Numerical", "Springs", "Spiral of Death Prevention", "Exponential Decay").
- Cheng Lou, handwired (MIT, HEAD 257856e): `docs/behavior-choices.md` — event timestamps and the 359 px measurement, the 300-step cap and named fallbacks, "Store what the user placed", and "Read last frame's value" (the 533 px jump).
- Related: [[spring-animations]], [[gesture-momentum]], [[animated-hit-testing]], [[performance-discipline]].
