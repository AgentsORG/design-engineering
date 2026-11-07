---
title: feeling-right
summary: Optimize for "feeling right," not just "working." This is the part the model cannot infer from training data.
tags: [philosophy, taste, feel]
---

# Feeling right

A UI can be technically correct, accessible, performant, and consistent — and still feel cheap. "Feeling right" is the residual quality that's left after every other box is ticked. It's also the part of design engineering that LLMs are weakest at.

Benji Taylor: *"Claude got morphing icons technically correct, but couldn't tell when something looked wrong. That judgment is human."*

## What feeling right means

- Motion clarifies intent rather than decorates.
- The first frame and the last frame both look intentional, not accidental.
- Persistent elements stay continuous (see [[fly-not-teleport]]).
- A lifeless product feels uncared for; a lifeless product *is* uncared for.
- The thing the user notices last, after using it for a week, is the thing the designer worked hardest on.

## How to test for "feels right"

You cannot test this with automated checks. You can only test it with:

- **The next-day review.** Build it, sleep, look again. If you still like it, ship it. Emil's principle.
- **The phone-call test.** Demo to a friend on a phone call. If they say "wait, what?" the timing is off.
- **The slow-motion playback.** Record the interaction, slow it to 25%, watch each frame. Almost every motion bug shows up here.
- **The cold-eyes test.** Hand it to someone who has never seen the product. Their first reaction is the truth.
- **The contact sheet.** Film the loop instead of reading the code back, at the shown width and at 390, and step through every press and the loop seam; a still can't show a pop (Benji Taylor, Stageshow `SKILL.md`, Rehearse).

## When to apply

- Use this as the **final** check, after correctness, accessibility, performance, and consistency.
- If the user says "it works but something's off," this is the cluster to load. The fix is rarely a single property; usually it's the rhythm and timing across several elements.
- See [[delight-impact-curve]] for *where* feeling-right is most worth chasing.

## Reference

The slow-motion test, made repeatable with Stageshow's filming script:

```sh
node scripts/film.mjs <url> --slow 6 --every 40 --out shots/press.png   # a press or landing, sampled close
node scripts/film.mjs <url> --width 390 --every 2500 --count 6 --out shots/phone.png
```

- Bad: one screenshot of the end state, judged "looks fine".
- Good: one full loop plus the start of the next on a contact sheet, read frame by frame; then the still held beside the closest gold, asking what the eye lands on first and whether it is the result.

Gold example: `stageshow/references/rehearse.md` (what to film, and the named faults) with `stageshow/scripts/film.mjs`.

Check: Stageshow treats a passing gate as necessary, not sufficient. Clear every film line first, then judge the feel by eye.

## Gotcha

"Feeling right" is not a synonym for "fancy." A static screen with the right hierarchy, type, and color feels more right than a busy screen with five animations. Restraint reads as confidence; over-design reads as anxiety.

## Sources

- Benji Taylor — [benji.org/agentation](https://benji.org/agentation), [benji.org/morphing-icons-with-claude](https://benji.org/morphing-icons-with-claude).
- Emil Kowalski — Sonner principles, "review work the next day."
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): stageshow/SKILL.md (Workflow step 7, Rehearse), stageshow/references/rehearse.md, stageshow/scripts/film.mjs.
