---
title: debugging-animations
summary: Slow-motion playback, frame-by-frame inspection, real-device testing. The three tools.
tags: [motion, debugging, devtools]
---

# Debugging animations

An animation that "looks off" is hard to diagnose at 60fps. Three techniques expose what's actually happening.

## 1. Slow-motion playback

The single most useful debugging tool. Slow the animation to 25% or 10% speed and watch each frame:

### In code (one-line)

```css
/* Temporarily multiply all durations */
* { transition-duration: 2000ms !important; animation-duration: 2000ms !important; }
```

Or in Framer Motion / Motion:

```tsx
<MotionConfig transition={{ duration: 2 }}>
  <App />
</MotionConfig>
```

### In Chrome DevTools

DevTools → ⋮ menu → More tools → Animations panel. There's a playback speed slider (10%, 25%, 50%, 100%). Doesn't require code changes.

When animations look "twitchy" or "off," 9 times out of 10 the bug is visible at 25% speed and invisible at 100%. Examples:
- A `scale` and `opacity` transition that don't share a curve, so they desync visibly when slow.
- An element flashing to its end state for one frame before the animation starts.
- A jitter caused by `transform-origin` mismatch.

## 2. Frame-by-frame inspection

Chrome DevTools → Performance → Record → Run the animation → Stop. The flame chart shows every frame. Look for:

- **Long frames (>16ms)** — the animation drops below 60fps. Causes are usually layout, paint, or non-GPU properties.
- **Layout/paint events during the animation** — means you're animating a property that's not `transform` or `opacity` ([[transform-opacity-only]]).
- **Style recalculation cost** — large when CSS custom properties on the root are being updated mid-animation. See gotcha below.

The Animations panel also lets you scrub the animation timeline like a video editor, with keyframes marked.

## 3. Test on real devices

What looks smooth on a MacBook Pro can be unusable on a 3-year-old Android. Real devices reveal:

- GPU memory pressure (animations skip frames or stutter).
- `will-change` over-application (browser pre-allocates layers, exhausts memory).
- Network-heavy pages where main-thread JS blocks the animation start.

Workflow:
- iPhone: connect via USB → Safari → Develop menu → [device name] → page. Full DevTools attached.
- Android: connect via USB → `chrome://inspect` → Inspect. Full Chrome DevTools attached.
- Use the device's real power profile, not "throttled to 4x slowdown" simulation — they behave differently.

A common shock: an animation that's flawless in desktop dev becomes choppy on a real mid-tier phone. The fix is usually reducing `filter: blur()` radius, removing `box-shadow` animations, or simplifying gradients.

## When to apply

- Any animation that "feels off" but you can't articulate why.
- Before shipping a new component to production.
- When a user reports "the modal is choppy" but it looks fine locally.
- Reviewing animation PRs — slow them to 25% in your browser before approving.

## Gotcha

`transition-duration: !important` on `*` will affect things you didn't expect (focus rings, scrollbar animations on Safari). Apply it scoped to the component you're debugging, then remove. Don't ship the `!important` hack.

Also: the Performance recording is heavy and changes the page's own behavior slightly (it's adding instrumentation). If you can't reproduce a bug with recording on, try recording for a shorter window (just before/during/after the animation).

## Sources

- Emil Kowalski — Debugging Animations section of [emilkowalski/skill](https://github.com/emilkowalski/skill).
- Chrome DevTools — Animation inspector docs.
- Related: [[transform-opacity-only]], [[stagger-choreography]], [[gesture-momentum]].
