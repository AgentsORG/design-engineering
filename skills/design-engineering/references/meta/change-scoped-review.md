---
title: change-scoped-review
summary: Reviewing a diff, not a screen. Resolve the scope (commits ahead of the merge base plus uncommitted work), expand changed files to the surfaces they render in, read the removed side of every hunk for lost signals, and status each finding Introduced, Regression or Pre-existing by cause, not by location. Only the first two block; three pre-existing findings is a courtesy, thirty is another review.
tags: [meta, review, diff, pull-request, regression]
---

# Change-scoped review

The author of a pull request is asking "did I make this worse?". A review that answers "here is everything wrong with this codebase" answers a question nobody asked and buries the two lines that matter. Scope the review to the change, then report in [[review-format]]'s table with one extra column: status.

## 1. Resolve the scope

With no target named: if `HEAD` is ahead of `git merge-base origin/<default> HEAD`, review that range **plus** any uncommitted changes, and say how many commits and how many uncommitted files. Else, if the tree is dirty, review the uncommitted changes. Else there is no change — ask what to review rather than inventing a scope. Read the whole diff before forming an opinion; a skimmed diff produces findings the next hunk already fixed.

## 2. Expand to the blast radius

A changed file is evidence, not the subject. Its **blast radius** is the set of surfaces it renders in — every screen using a changed component, every consumer of a changed token. Review those surfaces, not just the hunk.

## 3. Read the removed side

Regressions are invisible in the after state. Search the `-` lines (`git diff -U0 … | grep '^-'`) for signals that left:

| Removed | Check |
|---|---|
| `aria-*`, `role=`, `alt=`, `<label`, `htmlFor`, `scope=` | Lost name, description, announcement or association ([[screen-reader-announcements]]) |
| `<button>`, `<a>`, `<nav>`, `<main>` turned `div` / `span` | Keyboard and assistive behaviour traded for styling ([[keyboard-patterns]]) |
| `:focus-visible`, `outline`, `tabindex` | The focus indicator or the tab stop is gone |
| `prefers-reduced-motion`, `prefers-contrast` | The user's system preference is now ignored |
| Logical properties swapped for `left` / `right`; `lang=`, `dir=` | Direction handling dropped ([[logical-properties-rtl]]) |
| `text-wrap`, `line-clamp`, `tabular-nums` | Wrapping or figure alignment silently changed ([[line-behavior]]) |
| A token swapped for a literal or a lighter token | The rendered pair may now fail — measure it |
| A user-facing string deleted or shortened | A label, error or empty state lost its information |

A signal is a lead, not a finding. **Equivalent replacements clear it:** `aria-label` → `aria-labelledby` on visible text; a `role` dropped because the element became native; `outline` → a `box-shadow` ring on the same `:focus-visible`; a literal → a token of the same value; physical → logical (that is the fix); a string moved into the catalogue. Read the hunk around each removal before deciding — `-U0` hides the element it came from.

## 4. Status by cause

- **Introduced** — the change created it.
- **Regression** — the change weakened something previously correct.
- **Pre-existing** — present before, not made worse.

Status follows cause, not location. An untouched consumer of a changed token that now fails contrast is **Introduced**; a bug three lines from a hunk that the change did not touch is **Pre-existing**. Only Introduced and Regression findings count toward severity and the verdict, so a change whose only findings are pre-existing is an approve.

## Reporting

`| Severity | Status | Location | Before | After | Why |`, Introduced and Regression only, ranked by severity then reach. Then at most **three** pre-existing findings, plainly marked not this change's responsibility. With nothing caused by the change: "No actionable interface findings in this change." Correctness, tests, security and performance belong to the general code review — name such a concern once and drop it.

- End with **Not checked:** the widths, looks and states you did not look at. A predicted pass is not a pass (Benji Taylor, Stageshow `references/review.md`).

## Reference

One regression row, then the close:

| Severity | Status | Location | Before | After | Why |
|---|---|---|---|---|---|
| High | Regression | `Toolbar.tsx:42` | `<button onClick={save}>` | `<div className="btn" onClick={save}>` | Tab skips it and Enter does nothing; the after screenshot is identical, only the `-` line shows it |

Below it: "Pre-existing (not this change): `Menu.tsx:88` delete is hover-only." Then "Not checked: dark theme, 390px." A review that says nothing about a width reads as a pass at that width.

Gold example: Jakub's `removed-signals.md` for the `-` side; `stageshow/references/review.md` for the close, which ends every review with what could not be checked and treats a predicted pass as no pass.

Check: reproduce each Introduced or Regression row on the running surface: a before-and-after frame at its shipping widths for a visual finding, a Tab press for a keyboard one. A row with nothing behind it is a prediction, so drop it or go get the evidence.

## Gotcha

The most-missed regression is a `<button>` that became a styled `<div>` in a "refactor to the new design system" PR. The after state looks identical, so only the `-` side shows it.

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, read 2026-10-25): `skills/interface-review/SKILL.md`, `scope-resolution.md`, `removed-signals.md`. With the companion installed, route a diff review to `/interface-review` ([[interfaces-reconciliation]]).
- Related: [[review-checklist]], [[ui-reviewer]], [[skill-router]].
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/review.md` (say what you could not check; a predicted failure or pass is not a finding).
