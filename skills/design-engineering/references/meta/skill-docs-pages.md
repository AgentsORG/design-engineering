---
title: skill-docs-pages
summary: How to document a skill or verb for people — purpose, the decisions it makes, when to use it, two or three pairings with a reason, one before/after of the same UI with numeric captions and a slow replay, three teammate-phrased prompts that are also dispatch rows, install line and updated date.
tags: [meta, skills, docs, authoring, evals]
---

# Skill docs pages for people

A skill page proves the skill by showing one change it makes, not by listing features. A reader decides in a few seconds whether to install it, and the evidence that decides is the same UI built twice, once without the skill and once with it. Everything else on the page is there to say when to reach for it and where to go after. This is documentation for humans choosing a skill. Docs that teach an agent a component library are [[design-system-docs]].

## The template, in order

1. **Purpose.** One sentence naming the job, phrased as the decisions it takes in order ("whether to animate, with what, which properties, curve and duration").
2. **The decisions it makes.** Three to five bullets, each a choice the agent would otherwise guess at. No feature names.
3. **When.** One or two sentences, in the user's words.
4. **Pairs with.** Two or three neighbours. Each gets a reason under six words that says when to move on ("when several things move", "reviewing what was built"). Read them from the command file's Hand-offs ([[MOC-commands]]), never a second copy; stage order lives in [[upstream-skill-lifecycle]].
5. **Before / after.** One prompt, both arms rendered.
6. **Example prompts.** Three, phrased the way you would ask a teammate.
7. **Install and updated date.** The exact install line, and the date of the last commit that touched the skill.

## The demo rules

- **Same content, same size, same timing.** The two sides differ in one parameter set: the one the skill changed. A demo that also changes copy, colour and layout proves nothing ([[skill-writing-rules]] §6).
- **Captions carry numbers.** Each side names its property, easing and duration, in and out: `scale 0 → 1 · ease-in · 400ms in / 400ms out` against `scale 0.95 → 1 · ease-out · 300ms in / 150ms out`. For a performance demo, name the cost instead (`margin-left · layout every frame` against `transform · composite only`). "Smoother" is not a caption.
- **Offer a slow replay.** The difference often sits in the first 100ms, which nobody sees at full speed. A 4–10× slow toggle makes the case ([[debugging-animations]]).
- **A review skill shows two reviews.** Same branch, two verdicts: the generic one that says merge, the strict one that blocks with values and reasons ([[review-format]]).

## Prompts are tests

Every example prompt on a page is also a row in `evals/dispatch.jsonl`, so the page never promises a trigger the router misses. Write at least one verb-less row per verb ("the drawer jumps when I let go halfway", `expected_command: "router"`), because most users never type the verb. The plain-request path then gets tested as well as the verb path.

## Reference

A verb's page entry, read straight from [[cmd-film]]'s Hand-offs and its dispatch rows:

```text
film — plans a launch film from its register, or measures a render against it
Pairs with  motion · product UI, not the film
            sound  · once picture is locked
Prompts     "plan a 45s launch film for the new editor"
            "is this render cut too fast for a product launch"   (verb-less → router)
```

## Gotcha

A before/after where the "before" is a strawman nobody would write (no easing at all, a 2s duration) flatters the skill and teaches nothing. Use what an agent actually produces without the skill on that prompt, which is the default arm of the bench ([[design-benchmarks]]). If the honest "before" already looks fine, the page has picked the wrong prompt.

## Sources

- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG: page order, pairing reasons, numeric captions, slow replay, prompts phrased for a teammate.
- AgentsORG: prompts as dispatch rows and the verb-less row per verb, from the eval suite in `evals/`.
