---
title: sonner-principles
summary: Ten principles for building loved components, distilled from Emil Kowalski's Sonner library.
tags: [motion, components, library-design, sonner]
---

# Sonner principles

[Sonner](https://sonner.emilkowal.ski/) is Emil Kowalski's toast library. It's one of the most copied production components on the modern web. The principles behind it are transferable to any small, opinionated library or component.

## 1. Developer experience is the product

The API a developer types is the user surface. A library used 1000 times a year by 1000 developers compounds. One unnecessary required prop = millions of keystrokes wasted. Default everything you can.

```ts
// Good
toast("Saved")

// Bad
toast({ message: "Saved", type: "info", duration: 4000 })
```

## 2. Good defaults beat configuration options

Every config option is a tax: docs surface area, decision fatigue, bug surface. Pick the *right* default; let users override only when they need to. Most users will never override; design for them first.

> "What happens if I don't pass anything?" should always produce a good outcome.

- Ship optional features off. Benji Taylor's Liveline chart starts with its features off by default: a line that moves when a number changes is already a complete component.

## 3. Naming creates identity

`toast("Saved")` is recognizable. `notify({ kind: "success" })` is forgettable. Pick a verb that reads like a sentence; don't make users learn vocabulary. Sonner is named so people would *want* to say its name.

## 4. Handle edge cases invisibly

Multiple toasts: stack them. Identical toasts: dedupe. Rapid open/close: throttle. The library handles these without an API. The developer shouldn't think about them.

This is the opposite of "give the user knobs for everything." The library has opinions and enforces them.

## 5. Use transitions, not keyframes — for interruptible UI

CSS transitions interpolate from the *current* state, even mid-animation. CSS keyframes restart from frame 0. For UI that the user can interrupt (rapid clicks, drag-to-dismiss), transitions feel right; keyframes look broken.

```css
/* Good — interruptible */
.toast { transform: translateY(0); transition: transform 200ms; }
.toast.dismissing { transform: translateY(100%); }

/* Bad — restarts if interrupted */
.toast.dismissing { animation: slideOut 200ms; }
```

This is the technical foundation behind Sonner feeling responsive even when you spam-dismiss.

## 6. Build great documentation

The docs site for a library *is* the marketing. If the demo at the top doesn't immediately work and look right, no one installs. Sonner's docs site is itself a polished product (live demo, copy-paste examples, dark/light themes). Same for Vaul, Cmdk, Radix.

Treat docs as a first-class deliverable, not an afterthought.

## 7. Cohesion matters — match motion to component personality

A "spring-bouncy" component and a "crisp-fast" component shouldn't share an easing curve. Once you've picked a personality, every animation in the library should feel like it came from the same hand.

Sonner is *quiet*: its toasts use a slightly slow ~400ms `ease` transition rather than the generic ease-out budget. Vaul is *physical*. Cmdk is *snappy*. Each is consistent within itself.

## 8. Opacity + height is trial-and-error

There's no formula for the perfect collapse animation of a height-changing element. It's: try, watch, tune, repeat. Some combos:

- Animate `opacity` alone, height shifts instantly (often good enough).
- Animate `max-height` from large to 0 (works for known-height content).
- Use `grid-template-rows: 0fr → 1fr` (modern collapse pattern, works without knowing height).
- WAAPI with measured height (most flexible, most code).

Pick by trial. There's no single right answer.

## 9. Review work the next day

Build the animation today. Sleep. Look again. If you still like it, ship. If you don't, you've saved yourself from shipping something the first day's enthusiasm masked.

This is the cheapest QA step in design engineering. Builds in a 24-hour cooling period that catches 80% of "what was I thinking" mistakes.

## 10. Asymmetric enter/exit timing

Covered in [[duration-table]] and [[compose-subtract-asymmetry]]. Exit along the same path it entered — a toast in from the bottom leaves through the bottom, which is what makes swipe-to-dismiss obvious — but with fewer properties and at ~60–80% of the enter duration.

## When to apply

When building any reusable component, especially:
- Toasts, snackbars, alerts.
- Drawers, sheets, dialogs.
- Command palettes (cmdk-style).
- Date pickers, comboboxes.
- Any small library you intend others to install.

## Reference

| Toast | What good looks like |
| --- | --- |
| Copy | "Link copied", "Snoozed until 8:00 AM": one line, the result, no "Success!" |
| Action | one quiet word after the message ("Undo"), never a second button row |
| Enter | rises about 10px while it fades in; never pops in whole |
| Exit | leaves the way it came, faster, and stays mounted until the exit ends |
| Look | dark pill on a light theme, raised surface on dark; `role="status"` |

Gold example: `stageshow/examples/gmail/index.tsx` with `stageshow/kit/parts/Toast.tsx`. Archive raises the toast, and its Undo brings the row back, so the reset has a cause the viewer saw.
Benji's call differs: Stageshow's `Toast` rises over 0.6s `cubic-bezier(0.22, 1, 0.36, 1)` with a 0.35s fade, a demo kit's pace; Sonner's ~400ms `ease` stays the product default.
Check: fire five toasts 50ms apart and dismiss the third mid-enter, stepped at 40ms. None restarts from its first frame, none appears or vanishes in one frame, and each message fits one line at 390px wide.

## Gotcha

These principles are for components you ship to others. For one-off internal UI, several rules relax (defaults matter less, naming matters less, docs aren't needed). Don't apply them with equal force in both contexts.

## Sources

- Emil Kowalski — The Sonner Principles section of [emilkowalski/skill](https://github.com/emilkowalski/skill).
- [sonner.emilkowal.ski](https://sonner.emilkowal.ski/) — reference implementation.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/animate/RECIPES.md (toast timing, same-edge exit).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/parts/Toast.tsx`, `stageshow/kit/parts/Toast.css`, `stageshow/examples/gmail/index.tsx`.
- Benji Taylor, benji.org/liveline (read 2026-11-07).
- Related: [[duration-table]], [[compose-subtract-asymmetry]], [[responsive-feedback]], [[sonner-usage]] (setup and troubleshooting).
