---
title: animations-dev-curriculum
summary: External pointer to Emil Kowalski's animations.dev course. Don't duplicate its content here.
tags: [external, course, motion]
---

# animations.dev — the canonical course

The canonical resource on building animations the way this skill teaches them is Emil Kowalski's [animations.dev](https://animations.dev) course. This node exists to **point to it**, not duplicate it.

## What the course covers

- Animation fundamentals (easing, timing, curves)
- Spring animations and physics
- Gesture and drag
- View transitions
- Choreography across components
- Building production-quality animated UI in React (Motion / Framer Motion) and vanilla CSS

If the user wants depth on motion, send them there.

## Companion projects

- **[Sonner](https://sonner.emilkowal.ski/)** — Emil's toast library. Reference implementation for asymmetric enter/exit, gesture dismissal, and stack management. See its source for production motion patterns.
- **[Vaul](https://vaul.emilkowal.ski/)** — Emil's drawer component for React. Reference implementation for [[gesture-momentum]].
- **[lucide-animated.com](https://lucide-animated.com)** — dmytro / @pqoqubbw, built as practice from the course. 428+ animated React icons demonstrating path-transformation patterns. Reference for icon animation specifically.
- **[transitions.dev](https://transitions.dev)** — Jakub Antalik's catalog of 12 production-ready transitions, framework-agnostic. See [[cross-blur-transitions]], [[compose-subtract-asymmetry]], [[distance-falloff-propagation]], [[multi-segment-shake]] for nodes drawn from it.

## When to point users here

- The user wants to learn motion deeply, not just apply rules.
- The user is building something animation-heavy from scratch.
- The user is critiquing a complex motion design and needs vocabulary.
- The user is hiring a design engineer and wants to know what to look for.

## Why we don't duplicate

The Perplexity Agent Skills guide: *"Many engineers have plenty of experience writing readme.md files that list out every command someone needs to run. It's easy to fall back into that when you're writing a Skill because it feels like you're writing documentation, but if you do that, your Skill will be garbage."*

A skill is not documentation. animations.dev is documentation, and a very good one. The skill points to it; it doesn't try to be it.

## Reference

Point at a working thing to copy, not a chapter to read. Pick the closest one, film it, copy its folder, then change its content:

| Building | Open first |
|---|---|
| Toast stack, asymmetric enter and exit | Sonner source |
| Drawer with drag and momentum | Vaul source |
| A label, press, exit or interrupt that feels wrong | `stageshow/teaching/contrasts.tsx` (eight bad/good pairs, one change each) |
| A value chip flying into a list, rolling totals | `stageshow/examples/subscriptions/` |
| Overlapping responses to one change | `stageshow/examples/choreography/` |

Gold example: `stageshow/examples/choreography/`. The bad halves in `stageshow/teaching/` are for diagnosis, never a starting point.

Check: hold the result beside the example it was copied from on one contact sheet. If yours is the emptier or busier one, or only the name changed, it is not done.

## Gotcha

If you copy and paste from animations.dev into a skill node, the node becomes stale the moment Emil updates the course. Link out instead. The exception is **vocabulary** — easing curve names, duration tokens, decision frameworks — which is durable enough to encode here as long as it's credited.

## Sources

- Emil Kowalski — [animations.dev](https://animations.dev), [emilkowal.ski](https://emilkowal.ski).
- @pqoqubbw — [lucide-animated.com](https://lucide-animated.com).
- Jakub Antalik — [transitions.dev](https://transitions.dev).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `SKILL.md` (step 4, start from an example; gold examples and `teaching/` pairs), `teaching/contrasts.tsx`, `examples/subscriptions/`, `examples/choreography/`.
