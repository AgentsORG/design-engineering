---
title: articulate-precisely
summary: Name the phenomenon exactly, and say why it works. Precise vocabulary is what converts taste into a spec — for a teammate or for an agent.
tags: [philosophy, taste, vocabulary, articulation]
---

# Articulate precisely

Two people look at the same screen. One says "it feels off." The other says "the leading is too tight and the uppercase labels need more tracking." Only the second can fix it, hand it off, or teach it. The gap between them is not taste — it is vocabulary.

"Say precisely what you mean" is the thesis of *Index*, Emil Kowalski and Glenn Carstens-Peters' design-vocabulary project. Naming a thing exactly is the precondition for discussing it, critiquing it, and instructing it. "Make it pop" is a wish; "raise the contrast to 4.5:1," "use tabular nums so the column stops jittering" is a spec.

## Why this matters for an agent

Emil's argument in *Agents with Taste*: almost every taste decision has a logical reason if you look closely enough — and a reason can be written as a rule an agent follows instead of guessing. `scale(0.95)` beats `scale(0)` on enter not by feel but because a real object never deflates to nothing; name that and it becomes [[never-scale-from-zero]]. The more of your taste you can articulate, the more an agent can carry.

So precision runs both directions:

- **Input** — when you describe what is wrong, the exact word ("widow," "optical centre," "layout shift") tells the agent precisely what to change. Vague input earns vague output.
- **Output** — when the agent critiques a UI, it should name the phenomenon, not gesture at it. "The play icon looks left-heavy because it is mathematically centred, not optically centred" is reviewable. "The icon looks weird" is not.

## In practice

- Reach for the exact term. [[design-vocabulary]] is the lexicon — the precise word for each phenomenon, and where this skill goes deeper on it.
- Pair every critique with its reason. "Don't" without "because" does not transfer to the next person or the next prompt.
- Hold the confusable pairs apart, because vague language collapses them: kerning vs tracking, opacity vs visibility, chroma vs saturation, a widow vs an orphan, a tag vs a badge. Reaching for the wrong one quietly signals you cannot see the difference.

## Relation to pointing

[[pointing-beats-describing]] is the sibling principle: a precise *selector* — file, line, coordinate — beats prose when feedback goes to a machine. This node is about the *word*; that one is about the *target*. Together: point at the exact element, and name exactly what is wrong with it.

## Gotcha

Precision is not jargon for its own sake. The goal is the shortest unambiguous description, not the most technical one. If a plainer word is exact, use it — "the button has no hover state" beats "the affordance lacks a mouseover transition." Both are precise; the first is also clear. Naming is in service of [[feeling-right]], not a substitute for it.

## Sources

- *Index — Say Precisely What You Mean*, Emil Kowalski & Glenn Carstens-Peters — [index.how/to/articulate](https://index.how/to/articulate). The vocabulary project this node and [[design-vocabulary]] are seeded from.
- Emil Kowalski, *Agents with Taste* — [emilkowal.ski/ui/agents-with-taste](https://emilkowal.ski/ui/agents-with-taste). Articulating *why* a choice works is what makes it packageable into a skill.
- Related: [[taste-is-trained]], [[pointing-beats-describing]], [[design-vocabulary]].
