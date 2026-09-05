---
title: design-system-docs
summary: Docs define when to use what; write them for an engineer who joined yesterday and can never ask. Inventory the code first, size the structure, give every component when/alternative + closed variant set with a default + one correct and one incorrect example + a flowchart, ban hedge words, then verify by prompting and fix the docs, not the output.
tags: [meta, design-system, documentation, agents, design-md]
---

# Design system docs agents can follow

Tokens and components define what exists; docs define when to use what. Every decision the docs leave out gets replaced by a guess, and a guess looks exactly like a decision. This node is how to write a DESIGN.md or docs folder that stops an agent hardcoding colors, inventing variants, and picking the wrong component. [[using-design-md]] and [[using-design-file]] cover *consuming* such files; this is *authoring* them.

## 1. Inventory the code first

Never write from memory — that is how agents learn variants that don't exist.

- **Tokens**: the token files (globals.css, theme, Tailwind config). Every semantic token and the primitive behind it. Raw values with no token need a rule, not a mention.
- **Components**: every shared component, its variant and size unions, and the props that change appearance. The union type is the truth.
- **Usage**: two or three real call sites per component for the de facto default and the patterns to bless or ban.

Every name in the docs traces to a file and a line. If there is nothing to document — no tokens, ad-hoc styles — say so and offer to set up semantic tokens and base components first.

## 2. Size the structure

One token file and ≤ 5 components → a single root file. Bigger → a folder: a root file with the system's character in two or three sentences plus an index, and one file per topic (colors, typography, buttons, forms). Root under 100 lines, topic files under 150; split by topic rather than trim rules. Small files mean an agent loads only what the task needs. If the project uses a `.design` contract, the machine-readable half lives there and these docs become its `rationale`.

## 3. The component template

Four parts, always this order:

1. **When to use it, and when to use the alternative.** "Use for actions. Navigation styled as a button is a Link; actions in tight spaces use IconButton." Without the alternative the agent has a description; with it, a choice.
2. **Which variant applies where, and which is the default.** Close the set: "Variants: `primary`, `secondary`, `danger`. Nothing else exists — an unlisted variant is a bug." Most drift is an agent promoting everything to primary.
3. **One correct and one incorrect example**, real code from the codebase. Models follow examples better than prose, and the incorrect one inoculates against the exact mistake.
4. **A flowchart when a choice has three or more options.** A tree gets walked the same way every run; a paragraph gets interpreted.

For tokens, the load-bearing rule is the layer: components use semantic tokens, never primitives, never raw values — then a flowchart per role ("what background do I use").

## 4. Language rules

Numbers and absolutes, no hedges ("body 16px, captions 14px, never below 12px", not "use small text sparingly"). Every non-obvious rule carries its why so it generalizes ("one primary per view — two means the screen has no hierarchy"). Every line changes what the agent does; don't explain what a button is. See [[skill-writing-rules]].

## 5. Verify by prompting

Docs are a hypothesis until an agent runs against them. Ask for a real screen in one sentence, then read the drift:

| Drift | Hole | Fix |
|---|---|---|
| Hardcoded a color | Layer rule not findable or not strict | Move it into the root file |
| Invented a variant | Set not closed | Add "nothing else exists" (and tighten the union type) |
| Wrong component | No when-vs-alternative line | Add the comparison for that pair |

Fix the docs, never just the output — a corrected screen fixes one screen; a patched doc fixes every screen after it. Repeat until a fresh prompt drifts zero.

## When to apply

Creating or updating design docs; an agent keeps hardcoding colors, inventing variants, or picking the wrong component; a project adopting a contract for the first time.

## Gotcha

A documented variant that doesn't exist is worse than an undocumented one that does. The inventory step is the whole difference.

## Sources

- Emil Kowalski's design-engineering practice on documenting systems for agents, distilled by HKTITAN.
- Google Labs DESIGN.md spec; AgentsORG `.design` (`rationale`, `components.when` / `when_not`).
- Related: [[using-design-md]], [[using-design-file]], [[skill-writing-rules]], [[component-api-design]].
