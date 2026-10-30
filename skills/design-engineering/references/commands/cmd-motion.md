---
title: cmd-motion
summary: "/design-engineering motion [target]" — decide whether motion should exist, then audit or plan timing, easing, springs, transitions, gestures and stagger with concrete values.
tags: [command, motion, judge, decide]
---

# /design-engineering motion

**Posture: decide first, then judge (code in hand) or build (greenfield).**

## Steps

1. Read [[animation-decision-framework]]. If the motion should not exist, recommend removing it, name the frequency or purpose test it fails, and stop.
2. Classify the pattern and open only its nodes:
   - enter or exit → [[easing-curves]], [[duration-table]], [[never-scale-from-zero]], [[compose-subtract-asymmetry]]
   - hover or press → [[hover-states-subtle]], [[responsive-feedback]]
   - drag, swipe or momentum → [[gesture-momentum]], [[spring-animations]]
   - lists → [[stagger-choreography]]
   - a state change in place → [[fly-not-teleport]], [[cross-blur-transitions]]
   - jank → [[transform-opacity-only]], then [[debugging-animations]]
   - a canonical CSS transition → the transitions.dev catalog, values checked against [[duration-table]]
3. Apply [[prefers-reduced-motion]], [[gotchas]] and [[pov]].

## Output

- Code in hand: the [[review-format]] table. Every After names its numbers: the duration in ms, the easing token or curve, the properties animated.
- Greenfield: a short motion plan (trigger · property · duration · easing · reduced-motion path), with each value citing a `[[node]]`.

## Hand-offs

A launch film's motion → [[cmd-film]]; launch-film values do not transfer to UI ([[launch-video-motion]]). An SVG that moves → [[cmd-svg]] `animate`. You may delegate to the `motion-auditor` subagent where the host has it.
