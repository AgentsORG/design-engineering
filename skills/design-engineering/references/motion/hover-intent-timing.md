---
title: hover-intent-timing
summary: Anything a hover reveals waits a short entry delay and leaves through a short exit guard, so a brushing pointer neither flashes it in nor flickers it out. Moving between open triggers in one group hands off at once; keyboard focus reveals immediately; touch is never delayed by the gate. Callers get delay and hideDelay props and change them only for a stated reason. From Meta's Astryx.
tags: [motion, hover, tooltip, menu, timing, astryx]
---

# Hover-intent timing

A hover is weak evidence of intent. A pointer crossing a toolbar on its way somewhere else touches five triggers; if each one renders on contact, the screen strobes and the app does five renders' worth of work. Astryx makes every **hover-to-display** surface (tooltip, hover card, hover-opened menu or flyout, a container that reveals on hover, a preview) follow one timing contract. [[duration-table]] has the numbers for tooltips; this node is the contract that makes them behave.

## The contract

| Part | Rule |
|---|---|
| **Entry delay** | Wait a short delay before rendering or updating. The surface's owner picks the default (tooltips 400–700 ms per [[duration-table]]); zero only with a written reason |
| **Exit guard** | Leaving the trigger does not remove the content at once: it stays until a short exit delay, or for a container reveal until its fade ends, so out-and-back-in reads as one hover |
| **Group hand-off** | While one trigger in a group is open, moving to the next shows it immediately. The entry delay applies to the first open only |
| **Keyboard** | Focus reveals at once, no dwell |
| **Touch / coarse pointer** | The hover gate never delays touch. Whether a tap opens the surface is the component's decision, not the gate's |
| **API** | Timer-driven surfaces expose `delay` and `hideDelay` in ms; callers shorten or remove them only for a stated use case |

Under `prefers-reduced-motion: reduce` a container reveal's fade is instant, so its content leaves at once ([[reduced-motion-by-pointer]]).

## Where hand-built menus fail

Astryx's audit of its own components found the gaps a hand-built nav usually has: a submenu with the delay hard-coded and no prop, and a nav-heading menu whose **first** open had no entry delay at all. Check both when reviewing a mega-menu or sidebar flyout: the missing first-open delay is the one that makes a page feel twitchy.

## Gotcha

An exit guard without a hover bridge still loses the pointer on its way across the gap between trigger and panel. Keep the guard long enough to cross the gap, or make the gap part of the hit area ([[animated-hit-testing]]).

## Sources

- Meta, Astryx (MIT, github.com/meta/astryx, HEAD `9f55320`, read 2026-11-09): `docs/design/motion.md` "Hover-to-display delay" and its inventory (draft record), `docs/architecture/interaction-modality.md` INV4, INV11 (current). Paraphrased.
- Related: [[touch-and-focus]], [[keyboard-patterns]], [[astryx-reconciliation]].
