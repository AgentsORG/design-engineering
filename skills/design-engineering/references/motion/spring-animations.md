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

## Gotcha

Springs left on library defaults produce slow, floaty motion. Always set `duration` + `bounce`, or both `stiffness` and `damping`. And don't reach for a spring because something is "polished": Sonner, the usual example, animates with CSS transitions, not a spring.

## Hand-written springs

Step them on a fixed 4 ms clock or sample a closed form, cap the catch-up after a stall, and apply events at their timestamps, or the same gesture lands in different places at different frame rates ([[frame-rate-independence]]). A press on a spring still in flight goes to its destination ([[animated-hit-testing]]).

## Sources

- Emil Kowalski — interruptibility argument.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/animate/SKILL.md (spring forms, bounce range), skills/animate-expo/SKILL.md (dampingRatio 1 settle, bounce only after momentum).
- Emil Kowalski's design-engineering practice, distilled by HKTITAN (bounce 0 default).
- Apple Human Interface Guidelines — spring parameter ranges.
- guidelines.sh — "Spring physics over bezier" for interactive motion.
