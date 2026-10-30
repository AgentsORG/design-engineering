---
title: cmd-review
summary: "/design-engineering review [file | selection | diff | PR]" — a judge-posture UI code review returned as the Before | After | Why table, scanned against the checklist; change-scoped when the target is a diff.
tags: [command, review, judge]
---

# /design-engineering review

**Posture: judge.** Read and report. Never edit code unless the user asks after the table.

## Target

The selection, the files named, or the current diff. A branch, pull request or uncommitted change is a **diff**, not a screen. With no target and no selection, ask for one in a single line.

## Steps

1. Read [[review-format]], [[review-checklist]], [[gotchas]] and [[pov]], in that order. The installer's files outrank the checklist.
2. For a diff, also read [[change-scoped-review]]. Review only the surfaces the diff touches, read the removed lines, add a Status column (Introduced / Regression / Pre-existing), and list at most three pre-existing findings.
3. Quote the real lines into Before, and never paraphrase them. Run every checklist row against them. Each failing row becomes a table row.
4. End each Why with the `[[node]]` that owns the principle. If you cannot name the node, drop the row.
5. Order the rows by impact and stop at three to five. Twelve rows are not actionable.

## Output

1. **A verdict on the first line**, which is one of:
   - **Blocked**: at least one interaction or accessibility-floor failure.
   - **Approve with changes**
   - **Ship it**
2. **The table.** Rank rows in this order: interaction, accessibility floor, layout stability, motion, spacing, type, surface, component API, performance, polish. Group them under **Blocking**, **Should fix** and **Nits** when there are more than three.
3. **A one-line lede** if the issues share a theme.

Every row names its owning node, so "fix it" can route to that node. If nothing fails, the verdict is "Ship it" with one sentence of reason; nothing to change is a valid review.

## Hand-offs

- Motion is most of the problem → run [[cmd-motion]] instead.
- "Does this look AI-made?" → [[cmd-tells]].
- A rendered film → [[cmd-film]] `review`.
- The whole app before launch, not one diff → [[cmd-ship]]. Review judges a change; ship checks every lane and fixes as it goes.
- Where the host has the `ui-reviewer` subagent (Claude Code plugin install), you may delegate to it with this file as the brief. Otherwise do it inline: this file is the whole procedure.
