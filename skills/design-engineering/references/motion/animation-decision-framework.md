---
title: animation-decision-framework
summary: Should this animate at all? Frequency-based decision tree. Most animations should be deleted.
tags: [motion, animation, decision]
---

# Animation decision framework

The most-skipped step in design engineering is asking "should this animate at all?" The default answer is *no*. Read this before reaching for keyframes.

## The decision tree

1. **How often does the user encounter this?** See [[delight-impact-curve]].

   | Frequency | Decision |
   |---|---|
   | 100+ times a day (shortcuts, command palette, tab switches) | No animation |
   | Tens of times a day (hover, list navigation) | Near-imperceptible, or nothing |
   | Occasional (modals, drawers, toasts) | Standard animation |
   | Rare or first-time (onboarding, success) | The delight budget lives here |

   **Keyboard-triggered actions never animate** — a disqualifier, not a judgment call; Raycast's menu has no open/close motion. **Data the user is reading or acting on** (charts, tables, numbers) doesn't move for style; animate only a real change in value.
2. **What is the purpose?** Name one, or don't build it:
   - **Feedback** — confirm the action happened (press, hold-to-confirm fill).
   - **Spatial consistency** — show where something came from or went (see [[fly-not-teleport]]).
   - **State indication** — make a state change legible.
   - **Preventing a jarring change** — bridge content that would otherwise teleport.
   - **Explanation** — show how something works (marketing and onboarding only).
   - **Delight** — only at the rare tier.

   Invalid purposes:
   - **Decoration** — animation as garnish.
   - **Filling time** — animation to mask slow code (fix the code).
   - **"Because we can"** — Framer Motion is installed and we should use it.

3. **Which tool?** The cheapest that works: CSS transition (state you toggle) → `@starting-style` (entry on mount) → CSS animation (predetermined motion while the page is busy) → WAAPI (JS control, CSS performance) → Motion (springs, layout, exits, gestures). If the job is a whole component (toast, drawer, menu), use a library ([[dependency-discipline]]).
4. **What easing curve?** Custom cubic-bezier almost always beats the built-in CSS easings. See [[easing-curves]].
5. **How long?** UI is sub-300ms. Buttons are 100–160ms. See [[duration-table]].
6. **What property?** Only `transform` and `opacity` are cheap. See [[transform-opacity-only]].

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
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/animate/SKILL.md (frequency tiers, purposes, tool ladder), skills/find-animation-opportunities/SKILL.md (function test).
- Related: removing what fails this gate → [[animation-removal-hazards]].
- Benji Taylor — "animation should serve architecture."
