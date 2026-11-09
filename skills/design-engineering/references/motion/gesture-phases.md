---
title: gesture-phases
summary: Every gesture has two phases. While the pointer is down the element is the finger (1:1, no easing); once it lifts, a spring seeded with the release velocity finishes the move. Dismiss on distance or velocity, link the overlay to the drag, keep it catchable.
tags: [motion, gesture, drag, sheet, mobile]
---

# Gesture phases

A gesture is direct manipulation, and it splits in two. **Track:** while the pointer is down, the element's position is the pointer's, 1:1, with no easing, duration or spring. **Release:** once the pointer lifts, physics finishes the move, as a spring that starts at the speed the finger had. Most gestures that feel wrong mix the two up, most often a spring running during the track.

For a drawer or bottom sheet, use Vaul before you write one. Momentum, an overlay tied to drag progress, velocity-aware dismissal, focus trapping and Escape are weeks of edge cases. Hand-roll a gesture only when no library covers it (swipe cards, bespoke drags).

## Before the track: recognising the gesture

- **A tap lights up on press and commits on release.** Allow about 10px of slop past its edge; sliding off cancels it, sliding back restores it.
- **A drag picks its axis only after about 10px of travel**, then tracks 1:1 (the web form of RN's `activeOffsetX`, [[react-native-motion]]).
- **Start every recognizer that could apply on the first `pointermove`** and cancel the losers once intent is clear. Result-only events (`swipeleft` and the like) throw away the tracking that feedback needs.
- **Listening for a double tap delays every single tap.** Pay that only where a double tap does something.

## Track

- **Drive position from a motion value or a direct `transform` write.** A spring or a transition here makes the element trail the finger, as if dragged through syrup.
- **Write `transform` on the dragged element itself**, never a CSS variable on a parent ([[performance-discipline]] has the Vaul case). No React state per `pointermove`: a render each move drops frames.
- **Resist past the edge instead of stopping.** In Motion, `dragElastic` (~0.2) moves the element a fixed share of the overshoot. When you hand-roll, the Apple curve in [[gesture-momentum]] levels off and is what iOS ships; a linear share never levels off, so cap the travel on a long overscroll.
- **`touch-action` on the surface leaves only the other axis to the browser:** a vertical drag gets `pan-x`, a horizontal one `pan-y`. Use `none` only on a surface that owns both axes ([[touch-and-focus]]).

## Release

- **A spring seeded with the release velocity**, never a fixed-duration ease: with a fixed ease every fling lands the same way, and that reads as fake. Measure velocity over a window, as [[gesture-momentum]] describes.
- **Dismiss on distance *or* velocity.** Past about 40–50% of the travel dismisses, and so does a fast flick over a short distance. In Motion, `onDragEnd` gives both (`info.offset`, `info.velocity`). With a distance-only threshold, flicks are ignored. Mind the units: Motion's `info.velocity` is px/s, and a sheet dismisses on `info.offset.y > threshold || info.velocity.y > 500`. The 0.11 px/ms in [[gesture-momentum]] is 110 px/s, the line between letting go and throwing; a sheet asks for a firmer flick. Convert before comparing: px/ms × 1000 = px/s.
- **A snap-back is fast.** A slow return reads as the UI disagreeing in slow motion.
- **Bounce only after a drag.** A drag applies force, so a small overshoot on release is physical. The same sheet closed by a button gets none. Small elements need a little more bounce to read the same as large ones ([[spring-animations]]).
- **Lean toward the outcome.** In-between frames show where the gesture is going: a module that expands grows toward the finger that opened it, not evenly from its centre.

## Keep it catchable

The user must be able to catch a closing sheet and drag it back. A retargeted spring keeps its current velocity, so the change of direction is seamless. A `@keyframes` animation restarts from zero, so nothing a gesture can touch gets one ([[sonner-principles]]).

**Derive linked values from the drag; don't animate them separately.** The overlay's opacity and the page's scale behind the sheet come from the same motion value (`useTransform(y, [0, height], [1, 0])`). Two animations drift apart the first time a gesture reverses mid-way.

## Sheets, holds and direction

- **Vaul's CSS curve** is `cubic-bezier(0.32, 0.72, 0, 1)` over 500ms. It is steep at the start, so it still feels quick ([[easing-curves]] `--ease-drawer`). That timing suits a full-width sheet attached to the screen edge. A small floating drawer wants about 200ms: override `[vaul-drawer]` to `transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1)` and give `[vaul-overlay]` opacity the same 0.2s curve, so the scrim moves with the drawer. Its height change and content crossfade use the same timing family, or the component stops reading as one thing. Mark buttons inside it `data-vaul-no-drag`.
- **`dragMomentum`** is on by default in Motion. That suits a flung card. Turn it off when the element should stop where the finger stops.
- **Dismiss along the axis it entered on.** A toast that rises from the bottom swipes down to dismiss. A gesture that reverses the entrance needs no teaching.
- **Holds are asymmetric:** `linear` while held, because the fill shows time passing, then a fast ease-out snap back if the user lets go early ([[duration-table]], [[clip-path-tricks]]).

## Reduced motion

Tracking stays: the user makes that motion. Under `prefers-reduced-motion`, the momentum fling, the bounce and any decoration around the gesture go. Settle with a short position or opacity change ([[prefers-reduced-motion]]).

Check: record the drag on a real phone at 120fps (use the dev server's LAN IP; trackpads and 60Hz monitors hide this). While the pointer is down, the element sits under the finger on every frame. On release, the first frame's speed matches the last tracked frame's.

## Gotcha

A gesture that feels "weird" after release is usually under-damped. Raise `damping` before you touch stiffness. A gesture that stutters while tracking is a performance problem, not an easing problem: go through the track rules above, then the diagnosis order in [[performance-discipline]], then scrub a recording frame by frame ([[debugging-animations]]).

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09; unchanged in substance since `5206a95`, as `7cdf994` only removed links to skills that do not exist): `skills/gestures/SKILL.md` (the two phases, distance-or-velocity dismissal, linked values, Motion drag props, the Vaul curve and the floating-drawer override, spatial consistency, hold asymmetry, the touch checklist, the px/s velocity sample, the floating-drawer overlay curve). Paraphrased; the `touch-action` axis rule and the `dragElastic` cap are settled against this graph.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): `skills/apple-design/SKILL.md` §8 and §10 (recognising taps and drags, parallel recognizers, the double-tap cost, frames that lean toward the outcome). Paraphrased.
