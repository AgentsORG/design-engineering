---
title: reduced-motion-by-pointer
summary: Under prefers-reduced-motion nothing travels, scales, resizes or springs, and the replacement depends on the pointer — on a coarse (touch) pointer the change cross-fades in 200ms or less, as iOS does; with a mouse, trackpad or keyboard it is immediate. In-place values and hover or selection colours apply at once everywhere. Content under the finger keeps tracking, and a throw's momentum keeps coasting. From Meta's Astryx.
tags: [motion, accessibility, reduced-motion, touch, astryx]
---

# Reduced motion, by pointer

[[prefers-reduced-motion]] says what to strip. Astryx answers the next question, *what replaces it*, with one rule split by input, which removes the guesswork that leaves most reduced-motion modes either jarring or still moving.

## The rule

While `prefers-reduced-motion: reduce` matches, an entrance, exit, presentation switch or state change **must not move, scale, resize or spring** its content. Then:

| Context | Replacement |
|---|---|
| Coarse primary pointer (`pointer: coarse`), or the transition was started by a touch release | **Opacity-only cross-fade, ≤ 200 ms.** The entering element appears in its final place and fades in; the leaving one fades out where it is (iOS *Reduce Motion* with *Prefer Cross-Fade*) |
| Any other pointer (mouse, trackpad, keyboard) | **Immediate.** No animated property at all |
| An in-place value (a progress fill's length, a meter, a counter) | Applies at once on every pointer; no cross-fade, no added element |
| A hover or selection colour, and the onset of a press colour | At once on every pointer. A touch press's release keeps its ≤ 200 ms fade |
| A colour that changes *with* a part that cross-fades (a switch track with its thumb) | Follows that cross-fade |

## What is not a transition

- **Direct manipulation.** Content following a finger or pointer during a drag keeps following it ([[gesture-phases]]).
- **Momentum.** The coast after a throw, and its settle at an edge, keeps decelerating, as native scrolling does under iOS Reduce Motion. A move the component *starts* on release (snap to a detent, dismiss, page to a target) still cross-fades.
- **Native scrolling** belongs to the browser.

## Overrides only tighten

A theme may force the reduced path for everyone (Astryx: `reducedMotion: 'always'`); nothing may loosen it. No component prop or theme value keeps travel, springs or a longer animation under reduced motion.

## Gotcha

A blanket 120 ms opacity fade under reduced motion is right on a phone and wrong on a desktop, where the same fade on every hover-revealed panel reads as lag. Branch on `pointer: coarse`.

## Sources

- Meta, Astryx (MIT, github.com/meta/astryx, HEAD `9f55320`, read 2026-11-09): `docs/design/reduced-motion.md` DR1–DR4 (current) and `docs/design/motion.md` DR5. Paraphrased.
- Related: [[animation-decision-framework]], [[astryx-reconciliation]].
