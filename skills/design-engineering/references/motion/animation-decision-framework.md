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
- Cover it. Hide each moving element in turn; if the screen reads clearer without one, cut that one.
- Feedback starts on the input and stays as quick as the real product; only explanation (marketing, onboarding) slows down.

## Application heuristics

- **Persistent elements:** if a component is present before and after a state change, animate the change — don't crossfade. See [[fly-not-teleport]].
- **Symmetric vs asymmetric timing:** enter and exit often want different durations. Exits can be faster. See [[duration-table]].
- **Stagger only when grouping helps comprehension.** Random stagger reads as noise.

## Reference

The tree run on three real elements of one screen, every column filled before any code:

| Element | Frequency | Purpose | Tool | Verdict |
|---|---|---|---|---|
| Command palette on Cmd+K | 100+ a day, keyboard | none | none | No motion: opens on the frame the key lands |
| Row hover in a list | tens a day | state | CSS transition | `background-color 120ms ease`, nothing moves |
| "Link copied" toast | occasional | feedback + spatial | CSS transition | Enters and exits; stays mounted until its fade ends |
| Account menu, opened all day | tens a day, pointer | spatial | CSS transition | One ~150ms scale from the trigger; items arrive together, no stagger |

Gold example: `stageshow/teaching/contrasts.tsx`, the press and exit pairs: each changes one thing with the same endpoints, which is how to argue a row.

Check: cover test on a filmed contact sheet. Mask each moving element in turn; any row whose verdict is "animate" must make the frame harder to read when hidden, or it moves to "No motion".

## Gotcha

The bug is almost never "this needs more animation." The bug is almost always "this animation is doing the wrong thing." Adding motion to fix bad UI compounds the problem. Fix the UI first.

## Sources

- Emil Kowalski — animation decision tree (frequency-first); skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/animate/SKILL.md (frequency tiers, purposes, tool ladder), skills/find-animation-opportunities/SKILL.md (function test).
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG: the account-menu row. Related: [[animation-removal-hazards]].
- Benji Taylor — "animation should serve architecture."
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `references/motion.md` (Story: motion without hierarchy; Pace and easing: feedback stays quick), `teaching/contrasts.tsx` (press, exit).
