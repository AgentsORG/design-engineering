---
title: cmd-council
summary: "/design-engineering council [target]" — push a UI, page, faux UI or film until three judges on different providers agree it is good. One judge brief, fanned out by scripts/council.mjs; reference products in the panel; a hidden threshold; staged judges; fix and re-judge in rounds; a missing provider reported, never substituted; the Council review table in the PR.
tags: [command, council, judges, loop, review]
---

# /design-engineering council

Build posture with a judge panel: you fix, the judges only score. The target is a screen, a component, a page, a faux UI or a film; without one, use the change in front of you.

## Before round 1

1. Read [[gotchas]], [[pov]] and [[grading-rubric]]. Resolve the contract ([[using-design-file]]).
2. Fix what is already known: open review comments, failing checks, and the findings of `node scripts/grade.mjs --checks-only <files>`. The council judges the updated work. If the user wants to throw the work away and explore, skip fixes to code being replaced.
3. Set the panel: the categories the job touches (default the first eight in [[grading-rubric]]) and two or three **reference products**, each with a screenshot. A screen judged alone scores high; beside a strong reference it finds its level.
4. Capture evidence: BEFORE and AFTER screenshots at desktop and 375 px; a film or contact sheet for anything that moves ([[demo-rehearsal]], [[cmd-stage]], [[cmd-film]]).
5. Pick the threshold (default 9) and the budget (default 3 rounds). Keep the threshold to yourself: a judge that knows the target inflates.

## A round

1. `node scripts/council.mjs --list` once. A member whose CLI is missing is reported in the table, never replaced by another.
2. Run it, staged so the cheapest judge goes first and the next joins only once it clears:

   ```bash
   node scripts/council.mjs --target "Billing settings" --files src/billing/*.tsx \
     --before shots/before.png --after shots/after.png \
     --reference "Linear=refs/linear-settings.png" --reference "Stripe=refs/stripe.png" \
     --stage --threshold 9
   ```

   Default members: Claude (`claude -p --json-schema`, read-only tools), GPT (`codex exec -s read-only --output-schema`) and Gemini (`gemini -p`) as an unscored **jester**: same brief, its score never enters the table. Name a third scored provider with `--members claude:opus,codex,cursor:<model>` or `grok`. In Claude Code the `design-judge` subagent can sit in the Claude seat with the same brief file.
3. Act on findings two judges agree on and on every blocker; decline the rest in one line each. Read the jester for ideas only.
4. Fix, re-capture AFTER, re-run the checks, and start the next round with the open finding ids in `--context-file`.

## Loop rules

- **Stop** when every scored judge's lowest category clears the threshold, when the budget ends, or on a plateau (two rounds with no score moving more than 0.5). On a plateau, offer to fork a fresh branch or worktree and push further from there.
- A timeout, an error or an unparsable reply is `no score`, never approval. An ended budget is not a pass.
- The user may add **one taste note** mid-climb; fold it into the next round's context.
- **Scope guard.** Repeated reviews breed scope. Prefer the fix that deletes or narrows; refuse features a judge invents.
- Prefer a deterministic check where one exists: contrast, durations, reduced motion and focus are measured by `grade.mjs`, not argued.

## Output

The table `council.mjs` prints, then the last round by category, the `Missing:` line, and the ledger of findings with their outcome:

```markdown
## Council review

Rounds: 2

| Delegate | Round 1 | Round 2 |
| --- | --- | --- |
| Claude (opus) | 7.2/10 | 9.1/10 |
| Codex (gpt-6.1-sol) | 6.8/10 | no score |
```

If the work is a pull request, put the section in its description before the model and harness line (edit the description; do not comment). Without a PR, it goes in the final reply only.

## Hand-offs

- One opinion on one diff, no rounds → [[cmd-review]].
- A report card on an episode already finished, no fixing → [[cmd-grade]].
- No evidence for something that moves yet → [[cmd-stage]] or [[cmd-film]] first; judges score frames, not promises.
- You may delegate the whole loop to the `design-council` subagent where the host has it.

## Sources

- Theo Browne, tstack `council` skill (MIT, github.com/t3dotgg/tstack, HEAD `1085050`), adapted and paraphrased; and "Agents Sucked At UI (Until Today)" (2026-11-03): reference products, hidden target, staged judges, forking to push further.
- Emil Kowalski's design-engineering practice, distilled by AgentsORG: the council paired with design and animation skills as the judges' rubric.
