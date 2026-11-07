---
title: grading-rubric
summary: The one scale for judging design work, by a council of model judges or by the grader — twelve council categories scored 1–10 against reference products, six grader axes (Craft, Motion, Restraint, Access, Verification, Direction), five bands with fixed words, checks that can only cap, judges that alone can raise, and the anti-gaming rules (no re-rolls, hidden target, hidden holdouts).
tags: [meta, evals, grading, council, rubric, judges]
---

# Grading rubric

One scale for every design episode: a human's pull request, an agent with this skill, an agent without it. The council ([[cmd-council]]) and the grader ([[cmd-grade]]) both read this node, and `scripts/council.mjs` and `scripts/grade.mjs` carry the same category ids, so a score means the same thing wherever it was made.

## The unit: a design episode

An episode is the **brief**, the **diff or output**, the **rendered evidence** (screenshots, a filmed demo, a render) and, when there is one, the **transcript**. Grade the episode, never the code alone: a diff that was never rendered cannot earn a Verification score above the cap, and a beautiful screenshot of code that ships `outline: none` still loses on Access.

## Council categories (judges score these, 1–10)

A judge scores each category it can see, relative to the reference products in the panel, and writes `no score` for one it cannot. Pick the categories the job touches; the default panel is the first eight.

| Id | Category | A 9 looks like |
|---|---|---|
| `typography` | Typography | One family doing several jobs, a scale with real steps, tracking and leading set per size ([[type-scale-and-rhythm]]) |
| `hierarchy` | Hierarchy | The eye lands on the one thing that matters; labels recede ([[grouping-by-space]]) |
| `color-contrast` | Colour and contrast | One accent from the contract, every text pair measured and passing ([[wcag-thresholds]]) |
| `spacing-layout` | Spacing and layout | One gutter, grouping by space, nothing pushed to one side ([[page-frame]]) |
| `motion` | Motion | Only what earns it moves; ease-out entrances under 300 ms; a still for reduced motion ([[animation-decision-framework]]) |
| `states` | States | Empty, loading, error, long and hostile content all designed ([[states-are-the-work]]) |
| `accessibility` | Accessibility | Keyboard, focus, names and announcements work without a mouse ([[accessibility-baseline]]) |
| `copy` | Copy | Says it once, in the product's voice, with real content ([[copy-voice]]) |
| `iconography` | Iconography | One set, one stroke, sized to the type ([[icon-systems]]) |
| `restraint` | Restraint | Nothing a reviewer would delete: no AI-default tells, no decoration without a job ([[ai-default-tells]]) |
| `verification` | Verification | The author looked: rendered it, filmed it, ran the checks, at phone width too ([[demo-rehearsal]]) |
| `direction` | Direction | Only when a human steered an agent: named concepts over adjectives, one or two passes, the system fixed instead of the screen ([[directing-agents]]) |

## Grader axes (the report card, 1–10)

The grader folds the categories into six axes so humans and agents land on one card.

| Axis | Built from | Deterministic checks that cap it |
|---|---|---|
| **Craft** | typography, hierarchy, spacing-layout, iconography, states, color-contrast | input text under 16px, `100vh`, arbitrary z-index, weight change on hover, placeholder data, disabled-until-valid submit |
| **Motion** | motion | `transition: all`, `scale(0)`, `ease-in` on an entrance, UI durations over 300 ms, layout properties animated, ungated hover motion |
| **Restraint** | restraint, copy | gradient text, the generated-page purple, framework status colours, emoji as UI, looping attention animation, tracked-caps eyebrows, em-dash habit, a faux UI over its word budget ([[faux-ui-restraint]]) |
| **Access** | accessibility, color-contrast | `outline: none` with no `:focus-visible`, computable contrast under 4.5:1, movement with no `prefers-reduced-motion`, icon-only buttons with no name, `<div onClick>` |
| **Verification** | verification | no rendered evidence; claims the checks contradict (the gaming check) |
| **Direction** | direction | none; scored only when the episode records a human steering an agent |

The checks come from [[review-checklist]] rows, the code tells in [[code-tells]] and the numbers in [[wcag-thresholds]] and [[duration-table]]. Each finding becomes a Before / After / Why fact in the shape of [[review-format]].

## Checks cap, judges raise

A clean run of checks proves the absence of known mistakes, not the presence of an idea. So a check can only lower an axis's **ceiling**, and only a judge's score can lift an axis off the floor:

- a blocker finding caps its axis at 4, a should at 6, a nit at 8; three or more shoulds on one axis cap it at 5;
- an axis no judge scored has a ceiling and no score, and its band reads `unjudged`;
- an axis's score is the judges' median for its categories, clamped to the ceiling.

## Bands and their words

The band is the only vocabulary a report may use for quality; no "stunning", no "world-class".

| Score | Band | Says |
|---|---|---|
| under 4 | **generated** | reads as a default; a reviewer would start by deleting |
| 4 to under 6 | **passable** | works, nothing to be proud of |
| 6 to under 8 | **crafted** | someone made decisions and most of them hold |
| 8 to under 9 | **refined** | the details compound; a peer would ship it |
| 9 to 10 | **reference-grade** | you would put it in the judging panel as a reference |

Confidence under 0.7 softens the wording only ("leans crafted"); it never moves the number.

## Every axis is written the same way

1. **Title**: the axis, its score or ceiling, and its band.
2. **Facts**: Before / After / Why rows, each ending in the owning `[[node]]`.
3. **Interpretation**: one or two sentences in band words.
4. **Counterweight**: the strongest case against the score (a match that is by design, a judge that saw no motion, a reference that flatters).
5. **Confidence**: 0–1, from the number of judges, their spread and whether rendered evidence exists.

## Anti-gaming

- **Hide the target.** A judge never sees the threshold the loop is climbing to; telling it inflates scores.
- **Judge relative, not alone.** Put reference products in the panel. A screen judged in isolation scores high; beside a strong reference it deflates to its real level.
- **No re-rolls.** Results are cached by a hash of the inputs; the same episode gets the same grade, and forcing a fresh run is recorded as a re-roll.
- **The gaming check.** A claim in the transcript or summary ("respects reduced motion", "passes AA") that a check contradicts caps Verification at 3 and is listed.
- **Holdouts.** Keep a few briefs outside the repo, never shown to the agent being climbed, and grade on them before believing a gain.
- **Calibration anchors.** Stageshow's gold examples should land refined or better and the teaching "bad" pairs in [[review-checklist]] should land generated; if they do not, the judges drifted, not the work.

## Privacy

Grading is local. Secrets are scrubbed before any model call, tool output from a transcript is dropped (only the human and agent turns travel), and `--dry-run` prints exactly what would be sent without sending it.

## Gotcha

The same screenshot gets different scores on different calls, and reference products drift upward as the target improves even though their pictures never change. Read a single round as noise; read the trend across rounds and judges, and keep the deterministic checks as the floor nobody can argue with.

## Sources

- AgentsORG — the axes, bands, caps and the episode unit, written for this skill (2026-11-07).
- Theo Browne, tstack `council` skill (MIT, github.com/t3dotgg/tstack, HEAD `1085050`) and the video "Agents Sucked At UI (Until Today)" (2026-11-03): cross-provider judges, per-category scores, reference products in the panel, a hidden threshold, staged judges.
- Benji Taylor, Stageshow (MIT): checks catch mistakes, not dull ideas.
- Emil Kowalski's design-engineering practice, distilled by AgentsORG; emilkowalski/skills (MIT, commit `c8a7962`) `review-animations`: approval is earned, not assumed.
- Episode grading with facts, a counterweight and a confidence per result is a common pattern in agent-session review tools; the axes, bands, checks and wording here are this graph's own.
- Related: [[design-moves]], [[design-benchmarks]], [[review-checklist]], [[review-format]].
