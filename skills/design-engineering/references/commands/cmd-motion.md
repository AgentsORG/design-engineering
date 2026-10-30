---
title: cmd-motion
summary: "/design-engineering motion [remove | opportunities | audit] [target]" — decide whether motion should exist, then judge or build timing, easing, springs, transitions, gestures and stagger with concrete values; subtract over-animation, find the few places that should move, or audit a codebase into executable plans.
tags: [command, motion, judge, decide, build, audit]
---

# /design-engineering motion

**Posture: decide first, then judge (code in hand) or build (greenfield).** The modes below change the posture; bare `motion` is judge or build.

## Steps

1. Read [[animation-decision-framework]]. If the motion should not exist, recommend removing it, name the frequency or purpose test it fails, and stop.
2. Classify the pattern and open only its nodes:
   - enter or exit → [[easing-curves]], [[duration-table]], [[never-scale-from-zero]], [[compose-subtract-asymmetry]]
   - hover or press → [[hover-states-subtle]], [[responsive-feedback]]
   - drag, swipe or momentum → [[gesture-momentum]], [[spring-animations]]
   - lists → [[stagger-choreography]]
   - a state change in place → [[fly-not-teleport]], [[cross-blur-transitions]]
   - jank → the jank branch below
   - React Native or Expo → [[react-native-motion]]
   - a canonical CSS transition → the transitions.dev catalog, values checked against [[duration-table]]
3. Apply [[prefers-reduced-motion]], [[gotchas]] and [[pov]].

## Build sequence (greenfield)

Run in order; steps 1–2 can end the job with zero code, which is a valid result.

1. **Frequency gate** — 100+/day or keyboard-triggered: stop.
2. **Purpose** — name one word from [[animation-decision-framework]], or stop.
3. **Tool** — the cheapest that works (CSS transition → `@starting-style` → CSS animation → WAAPI → Motion).
4. **Properties** — `transform`/`opacity`; origin at the trigger (modals exempt) ([[transform-opacity-only]]).
5. **Curve and duration, or a spring** — from [[easing-curves]], [[duration-table]], [[spring-animations]]; never invent a value.
6. **Interruption and exit** — transitions for anything fired twice a second; exit along the entry path, quieter.
7. **Reduced motion and hover gating** — ship with the animation, not after.

Output the code, then three lines: gate result, ingredients, and what to feel-check (2–5× slow motion, real device) ([[debugging-animations]]).

## Jank branch

Name the cause before changing code. Walk the diagnosis order in [[performance-discipline]]: property tier → busy main thread → per-frame React state → content-growth (inherited CSS variable) → animated CSS variable → blur over 20px → only then `will-change`. Report each finding as `file:line` · Cause · Before · After · Verified (from code / needs a device recording), ordered layout before paint, busy before idle.

## `motion remove`

Subtract only; never add or retune. Walk every animation through the gate (keyboard → 100+/day → functional data → purpose → tens/day → over budget), recording the deciding branch. Check [[animation-removal-hazards]] before each delete or reduce, edit, clean up orphans, grep removed names. Report: Removed and reduced (location · was · verdict · branch), **Kept** with the purpose that saved each, badly built survivors handed to `audit`, then a one-paragraph verdict. Propose, never perform, a dependency removal.

## `motion opportunities`

Read-only. Hunt feedback gaps, teleporting state, missing spatial story, all-at-once groups, physics-less gestures and flat rare moments. Every candidate passes four questions — frequency, purpose, speed (fits the budget), function (data being read doesn't move). Return at most 5–7 rows (location · today · purpose · frequency · exact motion values), a required **Rejected** list naming the question that killed each, and the single highest-leverage pick. "Nothing survives" is a good result.

## `motion audit`

Read-only on source; writes plans only, under `plans/`.

1. **Recon** — stack and motion libraries, existing easing and duration tokens, product personality, a frequency map.
2. **Audit** eight categories: purpose and frequency, easing and duration, origin and physicality, interruptibility, performance, accessibility, cohesion and tokens, missed opportunities. Fan out read-only subagents per category on large repos.
3. **Vet** every finding at its `file:line`; drop by-design and exempt cases. One table by leverage, severity HIGH (feel-breaking) / MEDIUM / LOW. Stop for the user to pick.
4. **Plan** one self-contained file per pick, `NNN-slug.md`, stamped with `git rev-parse --short HEAD`: problem with current code quoted, exact target values, repo conventions with an exemplar, ordered steps, boundaries (stop if the code drifted), mechanical checks and a feel-check. Update `plans/README.md` with order and status.

## Output

- Code in hand: the [[review-format]] table. Every After names its numbers: the duration in ms, the easing token or curve, the properties animated.
- Greenfield: the build-sequence output above, each value citing a `[[node]]`.

## Hand-offs

A launch film's motion → [[cmd-film]]; launch-film values do not transfer to UI ([[launch-video-motion]]). An SVG that moves → [[cmd-svg]] `animate`. Sonner setup or bugs → [[sonner-usage]]. You may delegate to the `motion-auditor` subagent where the host has it.
