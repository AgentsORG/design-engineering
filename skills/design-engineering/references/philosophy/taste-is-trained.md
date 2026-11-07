---
title: taste-is-trained
summary: Taste is a trained instinct, not innate. Reference libraries, constraints, and time spent looking are the inputs.
tags: [philosophy, taste]
---

# Taste is trained

Taste is not innate. It is a trained instinct built from exposure, constraint, and time spent paying attention to things most people skip past.

The people whose work feels "obviously right" — Emil Kowalski, Benji Taylor, the Vercel design team — all share a habit: they collect references obsessively. Screenshots, recordings, products opened just to feel them. The library is the training set.

## What this means in practice

- **Build a reference library.** Save the interactions, animations, and screens that stop you. Re-watch them when stuck.
- **Constraints breed taste.** Limiting yourself to two fonts and three colors forces decisions. Unlimited choice is paralyzing and tends to produce average work.
- **Imitate before deviating.** The first hundred buttons should look like buttons. Originality earned after fluency lasts. Originality before fluency reads as confusion.
- **Every correction becomes a rule.** When a review catches a fault, write it down with its reason and rerun the work from scratch instead of hand-patching the output (Benji Taylor, benji.org/stageshow).
- **Taste compounds with care.** The first version of a thing should be ugly. The third version starts to feel inevitable.

## When to use this knowledge

- When the user says "I don't know why this feels off" — the answer is usually that they haven't looked at enough reference yet. Ask what they've been studying.
- When choosing between two valid approaches — usually one is closer to what the user's reference set looks like. That one wins.
- When justifying time spent on polish that "doesn't matter" — see [[feeling-right]] and [[delight-impact-curve]].

## Reference

Training the eye means starting from a filmed reference, not a blank file or a glance. Benji Taylor's Stageshow makes this the workflow:

| Keep from the closest gold | Replace with the brief's |
| --- | --- |
| stage size, crop and bleed | the product's own tokens (step 2) |
| row and type sizes, spacing | the product's own icons and chrome |
| the script's beats, the kit parts | the product's words, usually 3 to 7 real strings |

- Bad: look at a reference once, rebuild from memory, then hand-fix each fault a reviewer screenshots.
- Good: film the gold as a still, copy its folder, swap look and content; a copy that only changes the name is not done.

Gold example: the Gold table in `stageshow/SKILL.md` (step 4) for what to copy; `stageshow/teaching/scenes.tsx` for whole-scene bad/good pairs that train the eye (the bad halves are never starting points).

Check: put your still beside the gold's at the same width. If yours is the emptier, flatter or more boxed one, that is the first fix, before any polish.

## Gotcha

Don't confuse taste with novelty. A button that looks exactly like Linear's is more tasteful than a button that "innovates" with a gradient and a custom shape. Imitation of considered work is taste; reinvention of solved problems is not.

## Sources

- Emil Kowalski, [emilkowal.ski](https://emilkowal.ski) — "Taste is trained, not innate."
- Benji Taylor, [benji.org](https://benji.org) — collecting references as a daily habit.
- guidelines.sh — "Taste is opinions; collect references obsessively."
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/SKILL.md` (How hard to press, step 4, Gold table), `stageshow/references/craft.md` (Restraint), `stageshow/teaching/scenes.tsx`.
- Benji Taylor, benji.org/stageshow (read 2026-11-07).
