---
title: skill-writing-rules
summary: A skill fights probabilistic output by forcing the same process, not the same output — encode decision trees, write the why, be strict, make every line earn its place, keep one skill per aspect, and test by running with and without a line.
tags: [meta, skills, authoring, pov]
---

# Writing skills that change behavior

Agents are probabilistic: ask twice and you get two answers. A skill prevents that not by forcing the same *output* but the same *process* — the outputs still differ, every context is different, but the reasoning becomes yours and stays the same every run. Write like you are guiding a less experienced designer who happens to be very fast. These rules govern every node in this graph and the installer's [[pov]]; [[pov-curator]] applies them.

## 1. Encode process, not output

Give a decision procedure the agent walks every time. Decision trees are ideal:

```text
Entering or exiting the viewport? → ease-out
Moving or morphing on screen?     → ease-in-out
A hover change?                   → ease
Constant motion?                  → linear
Default                           → ease-out
```

Without it the agent picks whatever feels right that day; with it, every run walks the same tree. You narrow the array of answers it chooses from.

## 2. Write down the why

Bad: "Start scale animations from 0.95." Good: "Start from 0.95, not 0. Elements appearing from nothing feel unnatural — real objects always have a visible shape. The higher the initial value, the gentler the entrance." A rule without reasoning is applied blindly, including where it shouldn't be; a rule with reasoning is extended to cases you never wrote down.

## 3. Be strict

"Reasonably short", "tasteful", "where appropriate", "try to avoid" change nothing — the agent can't act on them and falls back to its defaults. "UI animations stay under 300ms. Exits are ~20% faster than entrances. Larger elements animate slower than smaller ones." Words carry weight: *never*, *always*, *strict* anchor behavior. The strictness can feel like it leaves no room for creativity; the creative part is still yours — the skill stops the agent guessing at the parts you've already figured out.

## 4. Every line must earn its place

Go through the file sentence by sentence and ask: does this line change what the agent does? It already knows what a transform is, what a modal is. Explaining these doesn't just waste space; it dilutes the lines that matter, because attention is spread across everything you wrote. A great skill, like a great animation, is defined by what you leave out.

## 5. Keep skills focused

One skill per aspect of the interface — and narrower is better: building animations and reviewing them are different skills. This graph does the same with nodes: one node, one complete thought, 40–80 lines.

## 6. Test by running

Unsure whether a line matters? Run the skill with it and without it and compare the output. It is the loop that built taste in the first place — create, notice what feels off, articulate why, refine — except the thing being refined is the document that carries the taste, and every improvement compounds across everything the agents build after.

- **Every correction becomes a rule.** When an output needs a hand-fix, write the rule with its reason and rerun from scratch; a hand-fixed output teaches the next run nothing (Benji Taylor, benji.org).
- **Caption a published comparison with numbers.** Each side states its values, `scale 0.95→1 · ease-out · 300ms in / 150ms out` against the failing side's, or its per-frame cost. "Smoother" is a hedge word, banned by §3. The page shape is in [[skill-docs-pages]].

## Common mistakes

Describing outcomes ("animations should feel smooth"); rules without reasoning; hedge words; explaining what the agent already knows; one giant skill; shipping untested. And the meta-mistake: dumping knowledge into a skill *before* running it on a brain dump — the better order is notes first, then extraction into a strict, focused, reasoned file.

## When to apply

Authoring or fixing any SKILL.md, this graph's nodes, [[pov]], a project's `AGENTS.md` design section, or [[design-system-docs]]; diagnosing "the agent ignores my skill".

## Reference

One rule, hedged and then strict, in the shape Stageshow writes its rules (the value, the reason, the check that catches it):

- Bad: "Give text enough breathing room inside cards."
- Good: "Words keep a 12px inset from the edge of a window, card or row; under 8px reads as touching, and the film flags it `tight inset:`."

A correction, turned into a rule: "the status dot is touching the avatar" becomes "a dot sits 6px clear of avatar and text, inside the row's inset", and the run starts again from scratch.

Gold example: `stageshow/SKILL.md`, "Faults that come back every round": each recurring fault is one bold phrase pointing at the file and section that hold its rule, so the reason lives in one place. For the test, `stageshow/references/teaching.md` (Making a comparison): change one thing, same content and timing on both sides.

Check: run one brief with the line and without it, changing nothing else, and put the outputs side by side (Benji compares skill against no-skill this way). If you can't point at the difference, delete the line.

## Gotcha

Strict is not long. A strict skill is usually shorter than the hedged version it replaces, because every hedge was a sentence that did nothing.

## Sources

- Emil Kowalski, *Agents with Taste*, and his practice on writing skills, distilled by AgentsORG.
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG: numeric captions on each side of a comparison.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/SKILL.md` (Faults that come back every round), `stageshow/references/craft.md` (Spacing and alignment), `stageshow/references/rehearse.md` (Lines that are never intentional), `stageshow/references/teaching.md` (Making a comparison).
- Benji Taylor, benji.org (read 2026-11-07): every rule carries its reason; every correction becomes a permanent rule, rerun from scratch; skill against no-skill, side by side.
- Related: [[pov]], [[gotchas]], [[taste-is-trained]], [[design-system-docs]].
