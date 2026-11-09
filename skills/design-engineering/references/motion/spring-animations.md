---
title: spring-animations
summary: When springs beat curves — interactive/draggable elements. Apple's critically damped default (bounce 0, ~0.35s), the 380/30 drawer spring, bounce only after momentum. Interruptibility.
tags: [motion, spring, physics]
---

# Spring animations

Curves animate to a fixed duration. Springs animate to a target value with physics. The difference matters when the user is *driving* the animation.

## Use springs when

- The animation is **interruptible** mid-flight (drag, gesture, scroll).
- The animation responds to **velocity** from a real input.
- The target value can change while the animation is running.
- The element should feel **physical** rather than mechanical.

## Use curves when

- The animation is triggered by a discrete event (button click, route change).
- You want **exact timing** (e.g., choreograph multiple animations to land together).
- The element is small and the difference is invisible.

## Apple's default: critically damped

```ts
// Motion — duration + bounce is the form to reason in
const settle = { type: "spring", duration: 0.35, bounce: 0 }
```

Bounce 0, a perceived duration of about 0.3–0.4s, no overshoot. Bounce (0.1–0.3, never more) is earned only when the gesture carried momentum — a flicked card, a drag-to-dismiss release. Overshoot on a menu that simply opened feels wrong.

Apple tunes a spring with two numbers: a damping ratio (1.0 settles with no overshoot; lower overshoots more) and a response, roughly the seconds it takes to reach the target. Settle time falls out of both, so response is not a duration. Shipped pairs: move or reposition (PiP) 1.0/0.4, rotation 0.8/0.4, sheet or drawer 0.8/0.3. In Motion a move is `bounce: 0, duration: 0.4`; the drawer pair's overshoot belongs only after a flick ([[gesture-phases]]), and the RN forms are in [[react-native-motion]].

## The drawer / momentum spring

```ts
const momentum = { type: "spring", stiffness: 380, damping: 30, mass: 1 }
```

- **Stiffness:** how hard it pulls toward the target. Higher = snappier.
- **Damping:** friction. ~30 keeps a released drawer or sheet from oscillating. Lower = bouncy.
- **Mass:** rarely change from 1.

Use it for drawers, sheets and anything settling after a drag, with the release velocity passed in ([[gesture-momentum]]).

## Interruptibility — the real reason to use springs

When a gesture reverses mid-flight, a spring carries its current velocity into the new target; a keyframe restarts from zero and looks broken. A two-state press doesn't need that: a CSS transition already retargets from the current value.

```tsx
// Press: a transition is enough
<motion.button
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
/>

// Curve (good for one-shot reveal)
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
/>
```

## When to apply

Pretty much anywhere the user's input drives motion: drag handles, dismissible cards, sliders, pinch-zoom, scroll-snap. For *triggered* motion (modals, toasts, page transitions), curves are simpler and usually better.

## Reference

A hand-written follow spring, adapted from `stageshow/kit/motion/Follow.tsx` (stepped at a fixed 60Hz):

```ts
const k = 0.25                        // stiffness: a quick, settled follow
const damp = 2 * Math.sqrt(k) * 0.95  // damping ratio 0.95, just under critical
function step(c: Rect, v: Rect, t: Rect) {
  for (const key of ['x', 'y', 'width', 'height'] as const) {
    v[key] += (t[key] - c[key]) * k - v[key] * damp
    c[key] += v[key]
  }
} // a new target keeps c and v; never reset v to 0
```

Gold example: `stageshow/kit/motion/Follow.tsx`, for selection rings, drop targets and hover highlights; a CSS transition restarts from rest on every change and stutters cell by cell on a drag. The interrupt pair is in `stageshow/teaching/contrasts.tsx` (interrupt).
Benji's call differs on bounce: the Stageshow cursor morph springs between outlines underdamped (damping ratio 0.62, angular frequency 15) with no gesture behind it, clamping color and stroke so only the geometry overshoots (`stageshow/examples/cursor-morph/README.md`).
Check: pick Month, then Week before the highlight lands, stepped at 40ms. The second move starts where the highlight is, at its current speed, and the same input lands in the same place at 60Hz and 120Hz.

## Gotcha

Springs left on library defaults produce slow, floaty motion. Always set `duration` + `bounce`, or both `stiffness` and `damping`. And don't reach for a spring because something is "polished": Sonner, the usual example, animates with CSS transitions, not a spring.

## Hand-written springs

Step them on a fixed 4 ms clock or sample a closed form, cap the catch-up after a stall, and apply events at their timestamps, or the same gesture lands in different places at different frame rates ([[frame-rate-independence]]). A press on a spring still in flight goes to its destination ([[animated-hit-testing]]).

## Sources

- Emil Kowalski — interruptibility argument.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/animate/SKILL.md (spring forms, bounce range), skills/animate-expo/SKILL.md (dampingRatio 1 settle, bounce only after momentum); unchanged through `715c180`.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/apple-design/SKILL.md (damping ratio and response, the three shipped pairs).
- Emil Kowalski's design-engineering practice, distilled by AgentsORG (bounce 0 default).
- Apple Human Interface Guidelines — spring parameter ranges.
- guidelines.sh — "Spring physics over bezier" for interactive motion.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/motion/Follow.tsx`, `stageshow/examples/cursor-morph/README.md`, `stageshow/teaching/contrasts.tsx` (interrupt).
