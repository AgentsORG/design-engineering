---
title: cmd-grade
summary: "/design-engineering grade [episode]" — grade a design episode (brief, diff or output, rendered evidence, optional transcript) for a human or an agent on one scale. scripts/grade.mjs runs the deterministic checks first (they only cap), the gaming check, then optional model judges via council.mjs; cached by input hash; local, secret-scrubbed, with a dry run. Returns a report card per axis.
tags: [command, grading, evals, judges, report-card]
---

# /design-engineering grade

Judge posture: grade and report, never fix. The same procedure grades a person's pull request, an agent run with this skill and one without it, so all three land on one scale ([[grading-rubric]]).

## Steps

1. **Assemble the episode.** The brief (a file or the user's words), the changed files or a unified diff, the rendered evidence (screenshots, films, contact sheets) and, if there is one, the transcript (`.jsonl` from Claude Code, or plain text).
2. **Checks only, first.** `node scripts/grade.mjs --checks-only <files|dirs> [--diff change.diff] [--evidence ...]`. Each finding is a Before / After / Why fact with `file:line` that caps one axis: a blocker at 4, a should at 6, a nit at 8, three shoulds at 5. No rendered evidence caps Verification.
3. **The gaming check.** Add `--transcript session.jsonl` or `--claims "passes AA, respects reduced motion"`. A claim the checks contradict caps Verification at 3 and is listed.
4. **Dry run before any model.** `--dry-run` writes secret-scrubbed copies of the episode and prints exactly what a judge would receive (tool output in a transcript is dropped; only human and agent turns travel). Nothing is sent.
5. **Judges, if asked.** `--judges claude,codex` hands the scrubbed episode to `scripts/council.mjs`. Only a judge's score lifts an axis; the axis score is the judges' median for its categories, clamped to the ceiling. An axis nobody scored reads `unjudged`.
6. **Read the card.** `.design-grade/<hash>/REPORT.md` and `grade.json`. The same inputs return the cached card; `--reroll` runs again and the card records it.
7. **Add what a script cannot see:** the moves the diff shows ([[design-moves]]), never the ones the narration claims, and a counterweight per axis.

## Output

Per axis (Craft, Motion, Restraint, Access, Verification, and Direction only when a human steered an agent): title with score or ceiling and band, facts as a [[review-format]] table, interpretation in band words, counterweight, confidence. Then the gaming check and what was not checked. Bands are the only quality words: generated, passable, crafted, refined, reference-grade.

## Comparing runs

To compare a human, an agent with the skill and one without, grade each episode with the same `--judges` and reference panel, then compare per axis. A gap smaller than the spread between judges is noise ([[design-benchmarks]]). Keep a few holdout briefs outside the repo and grade on them before believing a gain.

## Hand-offs

- Push the score up rather than report it → [[cmd-council]], which fixes and re-judges in rounds.
- One diff to judge and fix in the same pass → [[cmd-review]].
- You may delegate this to the `design-grader` subagent where the host has it.

## Sources

- AgentsORG — the procedure and `scripts/grade.mjs`, written for this skill (2026-11-07).
- Episode grading with facts, a counterweight and a confidence per result is a common pattern in agent-session review tools; the axes, bands, checks and wording here are this graph's own.
- Benji Taylor, Stageshow (MIT): checks catch mistakes, not dull ideas.
