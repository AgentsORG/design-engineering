---
title: design-moves
summary: The catalog of moves a grader looks for in a design episode, human or agent — subtract before adding, crop first, film it, point don't describe, use the kit part, say it once, kill the animation, one accent, reduced motion has a still, and the rest — each a named decision with the node that owns it and the anti-move it replaces.
tags: [meta, grading, moves, judges, directing]
---

# Design moves

A move is a decision you can see in the diff or the transcript. Naming them lets a grader say *what* someone did well instead of "nice polish", and lets a judge's Why point at a node. A move counts when the evidence shows it; intending it does not. The grader ([[cmd-grade]]) lists the moves it saw per axis of the [[grading-rubric]].

## The catalog

| Move | What you see | Instead of | Axis | Node |
|---|---|---|---|---|
| **Subtract before adding** | The first change deletes: a gradient, a badge, a second accent | A new component bolted on to fix a feeling | Restraint | [[unslop-pass]] |
| **Crop first** | The stage size and crop are set before the screen is built | A full screenshot shrunk into a box | Craft | [[product-shot-framing]] |
| **Film it** | A recording or frame strip checked before calling it done | "Looks right in my head" | Verification | [[demo-rehearsal]] |
| **Point, don't describe** | Annotations, arrows or a screenshot with a circle in the feedback | Paragraphs of adjectives | Direction | [[pointing-beats-describing]] |
| **Use the kit part** | The library's or kit's component, configured | A hand-rolled lookalike | Craft | [[stageshow-reconciliation]] |
| **Say it once** | One label per idea; the heading does not repeat the button | The same promise in title, subtitle and toast | Restraint | [[copy-tells]] |
| **Kill the animation** | A motion removed because it fired 100 times a day | Tuning the curve of motion nobody needed | Motion | [[animation-decision-framework]] |
| **One accent** | A single brand colour carries action; the rest is the neutral ramp | Status colours and a gradient competing | Restraint | [[color-monochromatic]] |
| **Reduced motion has a still** | A `prefers-reduced-motion` branch that keeps opacity and a resting frame | Motion deleted to nothing, or left running | Access | [[prefers-reduced-motion]] |
| **Name the value** | `200ms cubic-bezier(0.23, 1, 0.32, 1)`, not "snappier" | Vague taste words | Direction | [[articulate-precisely]] |
| **States before polish** | Empty, loading, error and long content exist before shadows are tuned | Polishing the happy path only | Craft | [[states-are-the-work]] |
| **Real content** | Believable names, amounts that add up | `John Doe`, lorem ipsum, `$1,234` | Craft | [[content-authenticity]] |
| **Contract first** | Tokens read from `.design` or DESIGN.md before any value is chosen | Values picked from memory | Craft | [[using-design-file]] |
| **Measure the pair** | A contrast ratio quoted with its threshold | "Contrast looks fine" | Access | [[wcag-thresholds]] |
| **Exit faster than enter** | The exit is shorter than the entrance | Symmetric timing everywhere | Motion | [[duration-table]] |
| **Break it on purpose** | Worst-case data rendered before sign-off | Only the demo account ever seen | Verification | [[stress-scenarios]] |
| **Options behind a picker** | Undecided? Three different versions, one live switcher | Arguing one version into shape | Direction | [[prototype-picker]] |
| **Build the tool** | After two "closer, but not quite" rounds, a small generator | A third re-prompt | Direction | [[build-a-tool]] |
| **Fix the system, not the screen** | The token, the component or the skill note changed | The same fix pasted into five screens | Direction | [[directing-agents]] |
| **Review the diff, not the app** | Findings statused Introduced, Regression or Pre-existing | Every old problem relitigated | Verification | [[change-scoped-review]] |

## How the grader uses it

1. Deterministic signals first: some moves leave fingerprints a script can see (a `prefers-reduced-motion` block, a film in the evidence, `--gate` in the transcript, a deleted gradient in the removed lines).
2. Judges second: the rest need eyes. A judge may name a move in a Why; a move it names with no evidence is ignored.
3. A move raises nothing on its own. It is a fact in the axis write-up, and the counterweight says when a move was the wrong one (killing an animation that carried state, cropping away the payoff).

## Gotcha

A catalog invites box-ticking: an agent that knows the list can *mention* "subtract before adding" while adding three components. Count the move from the diff and the evidence, never from the narration. A narrated move the diff contradicts is a gaming finding ([[grading-rubric]]).

## Sources

- HKTITAN — the catalog, written from this graph's nodes for the grader (2026-11-07).
- Benji Taylor, Stageshow (MIT): crop first, the word budget, filming every demo.
- Emil Kowalski's design-engineering practice, distilled by HKTITAN.
- Naming the decisions in an episode is a common pattern in agent-session review tools; every move, name and link here is this graph's own.
- Related: [[grading-rubric]], [[directing-agents]], [[review-format]].
