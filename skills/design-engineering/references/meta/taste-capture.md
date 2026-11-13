---
title: taste-capture
summary: At the end of a session, turn the design corrections the user made into written rules. Read for five signals (a stated correction, a silent edit, a repeated nudge, a revert, a confirmed odd choice), keep only what a fresh agent would get wrong on a different component, write each at the class level with its reason, prefer a check to a sentence, propose and stop, and write only what the user approves.
tags: [meta, taste, design-contract, session]
---

# Taste capture

Every correction a user makes is taste the agent did not have. Unwritten, it is lost when the session ends, and the next session earns the same correction again. This pass finds the corrections, turns each into a rule with its reason, and files it where the next agent reads first. It writes rules and nothing else: no component code changes, and no rule the user did not express.

## Five signals

Stated corrections are the minority. Read the whole session for all five, and keep the user's exact words or the diff for each.

| Signal | What it looks like | What to record |
|---|---|---|
| Stated correction | "no, a soft shadow, not a border" | The rule, often with its reason |
| Silent edit | The user changed `400` to `200` in a file you wrote | Their value; your default was wrong |
| Repeated nudge | "smaller", "still too big", "ok" | Where they landed, not the steps |
| Revert or rejection | "undo that", picking B over A | What not to do; the reason usually has to be asked for |
| Confirmed odd choice | "yes, keep the icon outside the button" | Only if a fresh agent would plausibly do otherwise |

Bugs, copy for one screen and misread tasks are not taste. Skip them, and say so in the report.

## Filter, then pick the level

Ask of each: would a fresh agent building a different component in this repo make the same mistake? If not, it is a one-off and is skipped. If an existing rule already covers it, that rule failed: rewrite it stricter (a number, a token, "never") instead of adding a second one. If an existing rule contradicts it, show both and let the user choose.

Then write it at the narrowest level that would have prevented the mistake next time:

- Instance, too narrow: "the pricing card gets a shadow, not a border".
- Class, write this: "raised surfaces (cards, popovers, menus) separate from the page with `shadow-raised`, never a solid border".
- Universal, too broad: "never use borders" breaks inputs, dividers and tables.

The same correction on two different components is evidence for the class. Use this codebase's values and token names and say "always" or "never"; soften only when the user framed it as a preference ([[skill-writing-rules]]).

## The reason is the user's

Use their reason in their words. When they gave none, write your best guess, mark it *inferred*, and ask before it is written: a wrong reason is worse than none, because the next agent stretches it over cases it does not fit. Before proposing, read only the rule and its reason and picture the original task. If an agent that knows nothing else could still produce the wrong version, add the value, the token or the exception.

## Where it goes

1. **A check, when a violation can be found by matching code**: a banned value, a raw hex where a token exists, a forbidden property. A lint rule, token restriction or test runs every time; a sentence in a long file gets skipped when the context is full. Keep a one-line rule beside it so the reason is on record.
2. **The project's contract.** A `.design` file takes it as a rule or token ([[using-design-file]]); a DESIGN.md takes it under the matching section ([[using-design-md]]); a repo with neither gets a DESIGN.md with Surfaces, Color, Typography, Spacing and layout, Motion, Interaction and Copy. If no agent instruction file points at the contract, propose the one line that makes agents read it before building UI.
3. **[[pov]] only when the user says it holds across their projects**, and [[gotchas]] only for an agent failure, not a preference.
4. A section past about 40 lines that only some tasks need moves into a project skill, with a one-line pointer left behind.

Each entry carries the rule, the reason, and a dated comment with the user's words, so a later conflict shows which is newer and what was actually said.

## Propose, then stop

Report in five parts: rules to add (what the user said, the rule, the reason, the destination), questions that need an answer (each inferred reason, each unclear level, project or everywhere), conflicts, check candidates with their exact implementation and what they would flag today, and what was skipped and why. Then stop. Write only what the user approves, and show the diff. A new check that flags existing code is reported with its count; fixing those is a separate decision, because it changes component code. A session with no taste corrections gets one line saying so.

## Reference

```md
## Surfaces

- **Raised surfaces (cards, popovers, menus) use `shadow-raised`, never a solid border.**
  Why: a solid border reads flat and heavy; a soft shadow separates the surface and holds in both themes.
  <!-- 2026-11-12: "no, a soft shadow, not a border" -->
```

## Gotcha

The tempting failure is tidying up: adding rules that "seem like good practice" while you are in the file. Those are the agent's taste, and the agent's taste is what the user spent the session correcting. Every written rule traces to something the user said, edited or confirmed. The counter-case is a preference the user states with no correction behind it ("I always want tabular figures in tables"): that is theirs, so it is written, with the quote.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `0f2e23b`, read 2026-11-13): `skills/learn-taste/SKILL.md` (the five signals, the filter, the three levels, inferred reasons, checks over sentences, the entry format, propose then stop). Paraphrased; the `.design`, [[pov]] and [[gotchas]] destinations are this graph's own.
- Related: [[directing-agents]], [[change-scoped-review]].
