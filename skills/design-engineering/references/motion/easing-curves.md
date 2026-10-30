---
title: easing-curves
summary: Custom cubic-bezier beats built-in CSS easings. Never use ease-in for UI.
tags: [motion, easing, css]
---

# Easing curves

The default CSS easings (`ease`, `ease-in`, `ease-out`, `ease-in-out`) are blunt instruments. They were good defaults in 2010. They are a tell now.

## The rules

- **Never `ease-in` on UI, exits included.** Its slow start delays the exact frame the user is watching; the same 200ms feels slower with `ease-in` than with `ease-out`. An exit that should feel quiet gets fewer properties and less time ([[compose-subtract-asymmetry]]), not an ease-in.
- **Decision order:** entering or exiting → ease-out; moving or morphing on screen → ease-in-out; hover and color change → `ease`; constant motion (marquee, progress, a hold-to-confirm fill) → `linear`; unsure → ease-out.
- **Custom `cubic-bezier()` beats the built-ins** for anything deliberate. A small variation on the curve communicates personality without anyone noticing why.

## House tokens

```css
/* out-quart — sharp start, smooth tail. Default for hover and menus. */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

/* out-expo — steeper start, long tail. For taps, presses. */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* In-out — symmetric, for elements that travel between states. */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* Back-out overshoot (y > 1). Playful moments only, never a dialog. */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

## The strong set

Stronger than the house tokens, for motion that should feel decisive:

```css
--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);    /* quint-strength enter/exit */
--ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1); /* on-screen travel, clip reveals */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);        /* iOS-like sheet and drawer */
```

Use the first for dropdowns, popovers, toasts and modals; the second for a tab indicator or anything moving A→B across the screen; the third for drawers and sheets that slide from an edge. Need another curve? Take it from easing.dev or easings.co rather than hand-rolling one.

## How to choose

- **Will the element overshoot?** Use `--ease-spring` (has values > 1 in the curve).
- **Is it primarily an entrance?** Use `--ease-out-quart`, `--ease-out-expo` or `--ease-out-strong`.
- **Is it a two-way transition (open/close, expand/collapse)?** Use `--ease-in-out`.
- **Is it a spring physics scenario (drag, dismiss, gesture)?** Don't use curves — use [[spring-animations]] instead.

## When to apply

Every CSS transition you write should pick a curve deliberately. The browser's default `ease` is rarely the right choice. Add `--ease-*` variables to your token set and reference them everywhere.

## Gotcha

A pretty cubic-bezier on the wrong duration looks worse than `ease-out` on the right duration. Curve and duration are coupled. Tune them together, never separately. See [[duration-table]].

## Sources

- Emil Kowalski — easing curve guidance, custom > built-in.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/animate/SKILL.md (easing decision order, strong curves), skills/review-animations/STANDARDS.md.
- Emil Kowalski's design-engineering practice, distilled by HKTITAN (weak-to-strong curve library).
- guidelines.sh — "Spring physics over bezier" for gestures (see [[spring-animations]]).
