---
title: upstream-skill-lifecycle
summary: Emil Kowalski's public skills mapped by stage of the work (before building, building, refining, the whole app) to the graph verb or node that owns the same job, with the two or three skills to move to next. Answers "which skill after this one" and settles a typed slash command against a plain request.
tags: [meta, routing, ecosystem, skills, lifecycle]
---

# Upstream skills by lifecycle stage

Pick a skill by the stage the work is in first, and by its neighbour second. Emil Kowalski's skills (emilkowalski/skills) split one job into narrow passes, and this graph carries the same values behind its verbs. So every upstream skill has an owner here and a short list of next steps. When the user asks "what do I run after this?", find the row, name the next stage and stop ([[cmd-small]] `which`).

## The map

| Stage | Upstream skill | Owner in this graph | Next |
|---|---|---|---|
| Before building | `animation-vocabulary` | `name` · [[design-vocabulary]] | `animate` to build what you named; `choreograph` if several things move |
| Before building | `pick-ui-library` | `pick` · [[library-picks]] | `ask-sonner` once Sonner is chosen; `prototype` to try a few |
| Before building | `prototype` | `options` · [[prototype-picker]] | the generalist for each version's bar; `review-animations` on the winner |
| Building | `emil-design-eng` | the router's polish phase · [[ui-polish-pass]] | `animate` for one motion; `review-animations`; `apple-design` for springs |
| Building | `animate` | [[cmd-motion]] build sequence | `choreograph`; `animation-vocabulary` first if unnamed; `review-animations` |
| Building | `choreograph` | [[motion-choreography]] | `animate` per element; `remove-animations` to ask if the group must move |
| Building | `gestures` | [[gesture-phases]] | `apple-design` for momentum; `animation-performance` so the drag stays smooth |
| Building | `mobile-native` | `mobile` · [[cmd-mobile]] | `apple-design` for native gestures; `break-ui` for narrow screens |
| Building | `apple-design` | companion; digest in [[apple-design-principles]] | the generalist for the rest; `animation-performance` for drags |
| Refining | `animation-performance` | [[performance-discipline]] | `apple-design` for smooth gestures; `review-animations` before ship |
| Refining | `break-ui` | `break` · [[cmd-break]] | `mobile-native` for phones; `review-animations` for the motion half |
| Refining | `review-animations` | [[cmd-motion]] review, closed Block or Approve | `animate` to rebuild what it flags; `improve-animations` for the whole codebase |
| Whole app | `remove-animations` | `motion remove` · [[animation-removal-hazards]] | `improve-animations` for what stays; `find-animation-opportunities` |
| Whole app | `improve-animations` | `motion audit` (plans only) | `find-animation-opportunities`; `review-animations` on the plans |
| Whole app | `find-animation-opportunities` | `motion opportunities` · [[delight-impact-curve]] | `animate` to build a pick; `remove-animations` the other way |
| Other | `animate-expo` | companion; digest in [[react-native-motion]], [[expo-tool-ladder]] | `apple-design` for the reasoning |
| Other | `ask-sonner` | companion; [[sonner-usage]], [[sonner-api-surface]] | `pick-ui-library` for the rest of the stack |
| Other | `write-swift` | companion only; Swift language is not design | none here |

The whole-app row order is the point: remove, then improve what stays, then add the few missing moments. Retuning a motion you are about to delete wastes the pass, and an addition is only judged fairly once the noise is gone ([[stacking-chains]]).

## Precedence

1. **A slash command the user typed wins.** `/animate` or `/break-ui` with the repo installed: name the command and stop, as with any user-invoked companion ([[skill-router]] §4).
2. **A plain request stays in the graph.** The verbs carry the same values, with the contract and [[pov]] applied on top.
3. **A focused skill beats the generalist** inside its topic: `animate` over `emil-design-eng` for one dialog's motion.
4. `pick-ui-library`, `prototype` and `review-animations` are user-invoked only upstream; never start them unasked. Suggest them by name, or run the graph's own verb.

## Gotcha

Almost every row ends at a review. A lifecycle that stops at "built" skips the stage that catches `ease-in` and `scale(0)`. If a user asks what comes after building one motion, the answer is the review ([[review-format]], Block or Approve), not another build skill.

## Sources

- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG: the stage grouping and each skill's pairings.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): `README.md` and each `skills/<name>/SKILL.md` (invocation flags, scope).
