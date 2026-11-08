---
title: text-morph-engine
summary: Morphing whole strings and numbers, not just two button labels. Diff by word first and by character only inside similar words; a run of six or more replaced characters recedes as one shape; numbers morph by place value, digits sliding in from above; an interrupted morph keeps its speed; the value stays readable to screen readers. From Lochie Axon's torph.
tags: [motion, text, morph, numbers, flip, lochie]
---

# Text and number morphs, engine rules

[[shared-letter-morph]] covers the two-label case: Continue → Confirm keeps "Con". A status line, a price, a counter or a sentence that changes needs more than a shared head and tail. Torph is a dependency-free engine for that, built on the method Benji Taylor described in *Family Values*, and its rules are the ones worth copying whether or not you use it.

## Matching

1. **Split with `Intl.Segmenter`** in the content's locale, so emoji, combining marks and scripts without spaces segment correctly. Never `split('')`.
2. **Align words first** (longest common subsequence over the word list). A word present in both strings moves as a unit to its new place, even when the words around it changed.
3. **Morph characters only inside a word that is similar enough**: at least 40% of its characters shared. Below that, the old word leaves and the new one arrives; per-character morphing between unrelated words looks like noise.
4. **Every segment has one stable id**, and that id is the only identity used for the FLIP measurement and the DOM. Two segments sharing an id lose a character on screen.

## Motion, as shares of the duration

The defaults are 400ms on `cubic-bezier(0.19, 1, 0.22, 1)`, a strong ease-out, or a spring whose duration is computed from its physics.

| Segment | Transform | Opacity |
|---|---|---|
| Persisting | FLIP from its old position to its new one | stays at 1 |
| Leaving | travels with its nearest surviving neighbour, scales to 0.95 | out over the first 25% |
| Arriving | from its nearest neighbour's old offset, scale 0.95 → 1 | in over 50%, starting at 25% |
| A run of 6+ adjacent characters all replaced | the run shrinks to 0.8 around its own centre, as one shape | out in 45%; the new run grows from 0.8, in over 35% |

Fades are fractions of the duration, never fixed milliseconds, so a long morph doesn't leave a character opaque and motionless for most of its run. The group rule exists because past about six characters nothing nearby survived to move relative to, and character-by-character the run smears.

## Numbers by place value

A value that contains a number morphs by place, on by default: `1,204 → 1,318` rolls the hundreds and tens and leaves the thousands alone. Each digit sits in a slot clipped on the block axis only (`clip-path: inset(0 -100vw)`, so glyph overhang isn't shaved; `overflow: hidden` would move an inline-block's baseline). The slot takes the FLIP move; the glyph inside takes a slide of one line height and the fade. **Digits arrive from above, separators and symbols from below**, so each reads as its own event, and the outgoing fade (45%) is longer than the incoming (25%) because a digit already gone is a hole in the number.

Detection is strict: a token counts as a quantity only when it starts and ends with a digit inside optional currency, sign or percent affixes. "COVID-19" and "2024-01-01" are not numbers and morph as text. For a field someone is typing in, pass the caret position: typing `1` before `20` should insert a digit, not renumber every place.

## Interruption, size and access

- **An interrupted morph keeps its momentum.** The container's width and height animate with the box's current velocity added to the new curve's start (bounded to avoid overshoot), and a morph whose target didn't change resumes where it was instead of restarting. Without this, a value updating faster than the morph only ever plays each curve's slow opening and the box crawls behind the text.
- **The container eases to its new width** over the same duration, so a neighbour beside it travels instead of jumping.
- **Screen readers get the plain value** in a visually hidden node; the animated fragments are `aria-hidden`. That node is `user-select: none`, or a copy pastes the value twice.
- **Reduced motion is read live**, not once at mount: with it set, the text swaps without animating.

## Gotcha

Don't rebuild this with a key of `index + char` on a long string: inserting one word at the start re-keys every character after it, and the whole line animates. Identity has to come from the alignment, not the position. And happy-dom has no layout, so test that a transform was applied or an animation cancelled, never a measured distance.

## Sources

- Lochie Axon, torph 0.1.3 (MIT, github.com/lochie/torph, HEAD `d79a5aa`, read 2026-11-08; torph.lochie.me): `packages/torph/README.md`, `AGENTS.md`, `src/lib/text-morph/index.ts`, `utils/diff.ts` (`MIN_SIMILARITY`), `utils/animate.ts`, `utils/replace-animate.ts` (`GROUP_MIN`, `GROUP_SCALE`), `utils/number.ts`, `utils/number-animate.ts`, `src/lib/utils/animate.ts` (the velocity carry), `src/lib/utils/styles.ts`. Paraphrased; values cited.
- Benji Taylor, *Family Values* (benji.org/family-values) — the method torph credits.
- Related: [[shared-letter-morph]], [[fly-not-teleport]], [[cross-blur-transitions]], [[prefers-reduced-motion]], [[screen-reader-announcements]]. For number-only counters, Maxwell Barvian's number-flow is the alternative torph itself points to ([[dependency-discipline]]).
