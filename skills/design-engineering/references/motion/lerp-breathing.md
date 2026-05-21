---
title: lerp-breathing
summary: Update multiple visual elements with the same lerp rate so they breathe as one organism, not as desynced parts.
tags: [motion, lerp, real-time, chart, benji]
---

# Lerp breathing — one update, many elements

Benji Taylor's Liveline technique. When you have a real-time visualization (chart, gauge, score) with multiple visual elements that depend on the same underlying data, lerp them all toward target with the *same* rate so they read as one breathing organism instead of N independently-jittering parts.

## The formula

```ts
const lerpSpeed = 0.08; // 8% toward target per frame at 60fps

function tick() {
  // Y-axis range, badge value, grid labels — all lerp at the same rate
  yMin.current += (yMin.target - yMin.current) * lerpSpeed;
  yMax.current += (yMax.target - yMax.current) * lerpSpeed;
  badgeValue.current += (badgeValue.target - badgeValue.current) * lerpSpeed;
  
  redraw();
  requestAnimationFrame(tick);
}
```

8% per frame translates to a settle time of ~12 frames (200ms). It's tuned to feel like breathing — fast enough to feel responsive, slow enough to feel alive.

## The breathing rule

> Apply the same lerp mechanism uniformly across every visual element that shares the data. If three things are derived from the same number, they update together at the same rate.

This is what makes Benji's Liveline chart feel cohesive: when new data arrives, the line, the badge showing current value, the Y-axis labels, and the highlighted point all approach their new positions in lockstep. The whole chart "inhales" toward the new state.

## The range-snap exception

When new data exceeds the visible range, **snap the range outward instantly** (no lerp), then lerp the data into the now-correct range:

```ts
// If new value exceeds current range, expand range immediately
if (newValue > yMax.target) yMax.current = yMax.target = newValue * 1.05;
if (newValue < yMin.target) yMin.current = yMin.target = newValue * 0.95;

// Then lerp the badge and line toward new value normally
badgeValue.target = newValue;
```

This prevents the line from being momentarily clipped during the lerp. The range is allowed to "snap" because the user perceives the *line* as the primary content; the range is scaffolding.

## Direct DOM updates for 60fps

React re-renders are not free. For value overlays that update at 60fps, bypass React and update DOM directly via refs:

```ts
useEffect(() => {
  const el = badgeRef.current;
  let raf: number;
  
  function tick() {
    current += (target - current) * 0.08;
    el.textContent = current.toFixed(0); // direct DOM, no setState
    raf = requestAnimationFrame(tick);
  }
  tick();
  
  return () => cancelAnimationFrame(raf);
}, []);
```

This pattern is standard for finance charts, dashboards, multiplayer cursors — anywhere React's render cycle would stutter at 60fps.

## When to apply

- Real-time charts and dashboards.
- Multiplayer presence (live cursors, collaborator avatars).
- Animated counters and badges.
- Anywhere multiple visual elements derive from the same changing value.

## When NOT to apply

- Discrete UI transitions (button press, modal open). Use curves or springs ([[easing-curves]], [[spring-animations]]).
- One-shot animations triggered by a discrete event. Lerp is for continuous tracking.

## Gotcha

The lerp rate (8% here) must be tuned to your refresh rate. If you're updating at 30fps or running on a low-end device, 8% feels slower; bump to 12–15%. If you're tracking sub-millisecond price data, 8% may feel sluggish — try 15–20%.

Also: lerping multiple elements requires synchronizing them on the same `requestAnimationFrame` loop. Two separate `setInterval`s won't stay in sync; they drift. One RAF loop, all updates inside.

## Sources

- Benji Taylor — *Liveline*, [benji.org/liveline](https://benji.org/liveline).
- Related: [[spring-animations]], [[stagger-choreography]], [[fly-not-teleport]].
