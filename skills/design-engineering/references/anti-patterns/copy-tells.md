---
title: copy-tells
summary: The statistical habits that mark prose as generated — model vocabulary, "not just X but Y", the rule of three, false ranges, stacked hedges, em dashes, bold inflation, generic conclusions, chatbot residue — and the two tests every product sentence must pass.
tags: [anti-patterns, copy, writing, microcopy, marketing]
---

# Copy tells

Nobody spots generated prose from one mistake; they spot an accumulation of statistical habits. Each is defensible alone; together they are a watermark. [[copy-voice]] says how UI copy should sound. This node is what to strip from any text a person will read — microcopy, marketing pages, docs, release notes, README — in order: words, sentences, punctuation, claims. Then put a voice back, because clean-but-voiceless is its own tell.

## Words

| Slop | Write instead |
|---|---|
| delve into | look at |
| crucial, pivotal | important, or name the consequence |
| leverage, utilize | use |
| facilitate | help |
| enhance | improve, or the specific change |
| showcase, underscore | show |
| landscape, tapestry | field, mix, or delete the sentence |
| additionally | also |
| in the event that | if |
| serves as, boasts, offers | is, has |

Delete filler on sight ("in order to", "it is important to note that"). Cut adverbs or fix the verb they prop up ("runs quickly" → the number). Promotional adjectives (seamless, robust, stunning, vibrant) get neutral replacements — describe the thing and let the reader supply the adjective. Metaphor jargon (substrate, wedge, north star, flywheel, paradigm) costs credibility when the plain word exists.

## Sentences

- **"Not just X, but Y"** — state Y. If Y can't stand without the runway, Y is the problem.
- **Break the rule of three.** Count the real items; write two or five.
- **Kill false ranges** ("from startups to enterprises") — list the things or name the one that matters.
- **Repeat the word.** Cycling synonyms for one thing is a school-essay habit; the right word repeated is how a reader tracks the subject.
- **One idea per sentence; name the actor.** Passive voice is grammatically safe and hides who does what.
- **Hedge once at most.** "Could potentially possibly" is a model avoiding commitment.

## Punctuation and formatting

No em dashes (a period or a comma, not a different interrupter that keeps the rhythm). Colons introduce lists, not connect clauses. Bold is for scanning, not emphasis inflation — and the bold-label-plus-colon list that restates its own line is the strongest formatting tell there is. Sentence case headings. No decorative emoji. Straight quotes in source prose; curly quotes belong in rendered UI copy ([[line-behavior]]).

## Claims

Puffery ("a testament to", "sets the stage for") gets replaced by what happened. Name the source or cut the claim. Delete the trailing "-ing" clause that bolts a conclusion onto a fact ("…, ensuring reliability"). No generic conclusions ("exciting times ahead"). No chatbot residue ("I hope this helps!"). And the two tests for any product sentence: *can it be restated as a concrete instruction, fact, or number?* and *could it appear unchanged in another product's docs?* Fail either, cut it.

## Putting a voice back

Have a reaction (real reactions are mixed). Vary the rhythm. Use "I" when it fits. Be specific over evocative — the specific image can't be produced by averaging. Let a little mess in: a tangent, an admission of uncertainty.

## When to apply

Any generated text a person will read; any marketing headline (the competitor paste test); every [[unslop-pass]]; error messages and empty states alongside [[copy-voice]].

## Reference

Three strings from one screen, before and after:

- Button: wand, "Ask AI", sparkle → `Explain failure`. Name what happens (Stageshow `teaching/style.tsx`, style-sparkle).
- Heading: `RECENT DEPLOYS` → `Recent deploys` (style-caps).
- Answer: "It's crucial to note that several factors could potentially be impacting conversion." → "Conversion fell from 3.4% to 2.7% after the new address step went live on Tuesday." A number, a date, a cause, no hedge.

Gold example: `stageshow/examples/ai-chat/index.tsx`. Its answer gives the drop, the cause (a postcode field that rejects spaces) and the fix in three sentences with no closing line, and the file lists its real strings at the top.
Check: run the two tests on every string, then read each one in place at 390 wide. A label that truncates, wraps or sits ragged beside its neighbors fails even when the words pass (`stageshow/teaching/details.tsx`, detail-copy).

## Gotcha

The pass is not "shorter". A sentence stripped to nothing but nouns reads as generated too. The target is a sentence a specific person would say about this specific product.

## Sources

- Emil Kowalski's design-engineering practice on writing, distilled by HKTITAN.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/teaching/style.tsx` (style-sparkle, style-caps), `stageshow/teaching/details.tsx` (detail-copy), `stageshow/examples/ai-chat/index.tsx`.
- Related: [[copy-voice]], [[content-authenticity]], [[unslop-pass]].
