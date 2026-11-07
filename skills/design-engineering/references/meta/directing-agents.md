---
title: directing-agents
summary: How a person steers an agent toward good UI — friction where judgment matters, a named concept instead of an adjective, one or two passes with a look between them, fixing the system rather than the screen, and a papercut pipeline that hands the agent evidence.
tags: [meta, workflow, agents, prompting, review]
---

# Directing agents

An agent reliably produces the average of what it has seen, so where the output lands depends on how it is steered. Spend judgment where your opinion changes the result: what to build, which direction to keep, and when to stop. Hand the agent work where your opinion adds nothing, such as research, summarising feedback or a known pattern with a lot of code.

## Friction where your opinion matters

- **Before building, get interrogated.** For a new feature or flow, have the agent ask you questions, not propose answers, until the goal, the user and the "why" are written down. Skip this for research and summaries.
- **Delegate known patterns; hand-tune the fabric.** A command menu, a chart or a data grid is a pattern the agent knows: delegate it. Page layout, the type scale and spacing tweaks are often faster by hand, or with one precise prompt each.

## Name it; don't describe the feeling

- "Make it smoother" leaves the agent guessing. "Origin from the trigger, 200ms, the strong ease-out, transform and opacity only" does not. Precise names are in [[design-vocabulary]], and why they matter is in [[articulate-precisely]].
- You don't need every number, only the concept: *tabular figures*, not "the numbers jump"; *inner radius = outer − padding*, not "the corners look off".
- A screenshot with arrows, or a link to an interface that does it right, often beats any word.

## One or two passes, then look

Each pass is a bar the work must clear. Five at once give you a muddle that half-satisfies each. Run one or two, look at the screen, then run the next. The order for a screen is in [[stacking-chains]] ("Screen loop"). The whole-app pass before launch is the exception: `ship` crosses every cluster on purpose ([[ship-check]]).

## Fix the system, not the screen

Probe the system with a one-sentence request for a real screen ("a dialog that publishes pending changes, using our components"). Every mistake in the result points at a hole:

| Mistake | Hole to patch |
|---|---|
| a raw hex or a one-off spacing value | a semantic token is missing or poorly named ([[color-token-tiers]]) |
| an invented `ghost` or `destructive` variant | the variant union isn't closed or documented ([[component-api-design]]) |
| a hand-rolled select instead of `Select` | the component has no "when to use" doc ([[design-system-docs]]) |
| `className` overrides fixing spacing | an escape hatch is open ([[component-api-design]]) |

If you correct only the output, you fix one screen. Patch the hole and the next screen comes out right.

- When you make the same correction twice, write it as a permanent rule with its reason and rerun the work from scratch rather than hand-fixing the output (Benji Taylor, benji.org/stageshow).

## The papercut pipeline

Spot → document → delegate. Write the issue with the evidence: a screenshot with arrows, or for motion a recording scrubbed to the wrong frame together with the state at that frame. Name the cause if you know it, for example "the select renders in a portal, so the modal treats a click on it as outside". Then let the agent fix it while you keep working. It takes about two minutes to write up and saves a context switch.

## Reference

The same steer as an adjective and as a direction:

- Bad: "The feature card looks fake, make it feel like a real product."
- Good: "Start from a copy of `examples/static-card`. Keep its 400 × 300 stage, crop and row sizes, then swap in our product. Real words only on the selected invoice and its total; everything else stays placeholder. Show me the still at 400 and at 390 beside the gold's."

The good one hands over a gold to copy, names what to keep, sets the word budget and asks for evidence the agent can't fake.

Gold example: `stageshow/SKILL.md`, Workflow step 4: film the closest gold example, copy its folder, keep its structure, then replace the look and content. A copy that only changes the name is not done.

Check: after each pass, watch it yourself at speed and at phone width before the next prompt. The agent checks that it works; you judge whether it feels right. If you can picture the one screenshot an exacting designer would send back, that screenshot is your next direction.

## Gotcha

When the agent keeps missing after two rounds, rephrasing a third time is the casino. Build a tool instead, either a generator or an inspector ([[build-a-tool]]). The opposite failure is real too: tooling up for a problem you hit once is procrastination with extra steps.

## Sources

- Emil Kowalski's design-engineering practice, distilled by AgentsORG.
- Related: [[skill-router]], [[prototype-picker]], [[vibe-to-generator]], [[review-format]].
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/SKILL.md` (Workflow step 4, How hard to press; `static-card` 400 × 300).
- Benji Taylor, benji.org/stageshow (read 2026-11-07): corrections become permanent rules; the agent optimises for working, the human judges feel.
