---
title: motion-choreography
summary: When several things move on one event, cast each a role (lead, support, decoration, still), relate each pair (together, overlap, sequence, carry), hook secondary motion to a moment of the lead, and test the group mid-flight. Most groups get smaller, not slower.
tags: [motion, choreography, sequence, orchestration, stagger]
---

# Motion choreography

One animation is a curve and a duration ([[easing-curves]], [[duration-table]]). Two or more on the same event are a relationship, and that is where generated UI goes wrong: each part is smooth, the sum is a queue the user waits through. The fix is almost always fewer moving parts running at the same time, with a sequence only where order means something.

## 1. Cast before timing

List everything that moves on the event, then give each one role:

| Role | What | Treatment |
|---|---|---|
| Lead | the one thing to notice: the new view, the title, the acted-on item | starts first, travels furthest |
| Support | the rest of the content | shorter, smaller moves after the lead |
| Decoration | badges, pills, dividers, accents | fades in place, or nothing |
| Still | containers whose content moves, everything else | does not animate |

Two candidates for lead is a hierarchy problem; motion will not settle it. A drawer with eight items is one move: the drawer slides and the items are simply inside it.

## 2. Relate each pair

- **Together** when both belong to one object or one moment (a drawer's height and its content; a chip leaving and its siblings closing the gap). Also when order would carry no meaning: order without meaning is delay.
- **Overlap** (a stagger) when order means something and both can be visible: [[stagger-choreography]] has the gaps.
- **Sequence** only when overlap would look broken: two dense views morphing in a container that changes both width and height, one element passing through another, a box drawing before its check. Start the second just before the first ends, so it reads as one gesture.
- **Carry** when a child's motion can't be controlled (shared-layout children): move the parent and let the children ride.

## 3. Rules that hold across the group

- One entrance per container. A panel that slides in does not also stagger its children.
- No stagger on surfaces opened many times a day or from the keyboard: menus, palettes, tab panels, list rows ([[animation-decision-framework]]).
- No uniform stagger. Equal delay, distance and curve on every item reads like `linear` on one element; vary by role.
- Nothing waits for choreography. Every visible control takes input at once.
- A leaving element gives up its space the moment it leaves, so siblings close the gap while it fades (`AnimatePresence mode="popLayout"`, or `position: absolute` at its current box). A same-container view swap is a crossfade, not out-then-in.
- One timing family per component: sub-animations share the container's duration and easing family; an inner fade may be lighter, never a different family. Set it once (`MotionConfig`, or one custom property).

## 4. Hook secondary motion to a moment

Each support move is pinned to the lead's start, impact or settle, not to a delay that looked right. Pulse on the click, not the hover before it. Accents around an icon land in the last fifth of its move, most important first. A repeat action skips the build-up and plays early with the same internal proportions.

## 5. Scale timing to the change

A resize that jumps far gets the full fade; a tiny jump with the same fade flickers, so derive duration from the distance and clamp it (about 150–270 ms). Small elements take more bounce than large ones. With a handful of known states, hand-tune each transition rather than fitting a formula.

## 6. Direction and exits

Forward moves content left and Back moves it right. Pass the direction to exits explicitly (`custom` on both `AnimatePresence` and the child), because an exit reads its props when it starts. Exits are simultaneous, shorter and simpler than entries, leave the way they came, and are never reverse-staggered in product UI.

## Interruption, idling, reduced motion

Re-trigger mid-flight (hover out halfway, Next twice fast, switch menus mid-open): in-flight animations stop before new ones start, a resumed idle loop waits for every reset to finish, and rapid swaps never leave two children mounted (stable `key`s). Gate "only after the build-up" on a ref, not state. An idle hint waits a few seconds, repeats rarely and stops while the user interacts. Under `prefers-reduced-motion` the group appears together with opacity only; if the sequence is the explanation, step between its frames ([[prefers-reduced-motion]]).

## Check

Write the timeline before code: one row per element with role, start, duration, motion and relationship, plus 2–5 elements deliberately left still and why. Then film the interaction and step it frame by frame ([[debugging-animations]]): a wave and a queue look alike at full speed. Imagine the fiftieth use of the day; if you would skip it, cut it.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): `skills/choreograph/SKILL.md` and `RECIPES.md` (casting, the four relationships and carry, the hard rules, moment sync, distance-scaled timing, direction, interruption, attention loops, the timeline format). Paraphrased.
- Related: [[stagger-choreography]], [[animation-removal-hazards]], [[fly-not-teleport]], [[compose-subtract-asymmetry]], [[sound-motion-sync]].
