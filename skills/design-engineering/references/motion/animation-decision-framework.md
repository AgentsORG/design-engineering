---
title: animation-decision-framework
summary: Should this animate at all? Frequency-based decision tree. Most animations should be deleted.
tags: [motion, animation, decision]
---

# Animation decision framework

The most-skipped step in design engineering is asking "should this animate at all?" The default answer is *no*. Read this before reaching for keyframes.

## The decision tree

1. **How often does the user encounter this?** If it's every keystroke, every scroll, or every primary action — strong default to **no animation**. See [[delight-impact-curve]].
2. **What is the purpose?** Valid purposes:
   - **Continuity** — show that two states are the same component (see [[fly-not-teleport]]).
   - **Affordance** — show the user can interact (button press, hover).
   - **Feedback** — confirm the action happened.
   - **Hierarchy** — direct attention to one thing over another.
   - **Spatial** — clarify where something came from or went to.

   Invalid purposes:
   - **Decoration** — animation as garnish.
   - **Filling time** — animation to mask slow code (fix the code).
   - **"Because we can"** — Framer Motion is installed and we should use it.

3. **What easing curve?** Custom cubic-bezier almost always beats the built-in CSS easings. See [[easing-curves]].
4. **How long?** UI is sub-300ms. Buttons are 100–160ms. See [[duration-table]].
5. **What property?** Only `transform` and `opacity` are cheap. See [[transform-opacity-only]].

## Quick checks before adding any animation

- Would the UI feel broken without it? If no, delete it.
- Does it survive [[prefers-reduced-motion]]? If not, fix it.
- Will it look right at 25% playback speed? If not, the timing is off.
- Would it still feel right on the 50th encounter? See [[delight-impact-curve]].

## Application heuristics

- **Persistent elements:** if a component is present before and after a state change, animate the change — don't crossfade. See [[fly-not-teleport]].
- **Symmetric vs asymmetric timing:** enter and exit often want different durations. Exits can be faster. See [[duration-table]].
- **Stagger only when grouping helps comprehension.** Random stagger reads as noise.

## Gotcha

The bug is almost never "this needs more animation." The bug is almost always "this animation is doing the wrong thing." Adding motion to fix bad UI compounds the problem. Fix the UI first.

## Sources

- Emil Kowalski — animation decision tree (frequency-first).
- Benji Taylor — "animation should serve architecture."
