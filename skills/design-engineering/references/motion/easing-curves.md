---
title: easing-curves
summary: Custom cubic-bezier beats built-in CSS easings. Never use ease-in for UI.
tags: [motion, easing, css]
---

# Easing curves

The default CSS easings (`ease`, `ease-in`, `ease-out`, `ease-in-out`) are blunt instruments. They were good defaults in 2010. They are a tell now.

## The rules

- **Never `ease-in` for UI.** It looks like the UI is hesitating. Reserve `ease-in` for elements *leaving* the viewport — and even then, prefer custom.
- **`ease-out` is the safer default** for entrances and primary motion. The action starts fast and settles.
- **Custom `cubic-bezier()` beats both.** A small variation on the curve communicates personality without anyone noticing why.

## Curves worth memorizing

```css
/* Linear's "out-quart" — sharp start, smooth tail. Default for hover/menus. */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

/* Snappy out — bouncy without overshoot. For taps, presses. */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* In-out — symmetric, for elements that travel between states. */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* The "Apple" feel — slight anticipation, soft landing. */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

## How to choose

- **Will the element overshoot?** Use `--ease-spring` (has values > 1 in the curve).
- **Is it primarily an entrance?** Use `--ease-out-quart` or `--ease-out-expo`.
- **Is it a two-way transition (open/close, expand/collapse)?** Use `--ease-in-out`.
- **Is it a spring physics scenario (drag, dismiss, gesture)?** Don't use curves — use [[spring-animations]] instead.

## When to apply

Every CSS transition you write should pick a curve deliberately. The browser's default `ease` is rarely the right choice. Add `--ease-*` variables to your token set and reference them everywhere.

## Gotcha

A pretty cubic-bezier on the wrong duration looks worse than `ease-out` on the right duration. Curve and duration are coupled. Tune them together, never separately. See [[duration-table]].

## Sources

- Emil Kowalski — easing curve guidance, custom > built-in.
- guidelines.sh — "Spring physics over bezier" for gestures (see [[spring-animations]]).
