---
title: review-checklist
summary: Audit table — eleven common UI issues with the fix for each. Scan against this before signing off.
tags: [meta, review, checklist]
---

# Review checklist

A pre-flight checklist for UI code review. Scan the user's code against each row. If any row applies, write it up using [[review-format]].

## The checklist

| # | Issue | Quick check | Fix | Node |
|---|---|---|---|---|
| 1 | `transition: all` | Grep for `transition: all` | Specify `transform, opacity` (or other GPU-safe properties) | [[transform-opacity-only]] |
| 2 | `scale(0)` entrance | Grep for `scale(0)`, `scale: 0` | Use `scale(0.95)` + opacity | [[never-scale-from-zero]] |
| 3 | `ease-in` on UI | Grep for `ease-in` (not `ease-in-out`) | Use `ease-out` or custom cubic-bezier | [[easing-curves]] |
| 4 | Animation duration > 400ms | Search durations | Most UI is <300ms; reserve longer for rare moments | [[duration-table]] |
| 5 | Crossfade between two icons | Two icons in same slot with opacity transitions | Transform a single icon (rotate, morph) | [[fly-not-teleport]] |
| 6 | No `prefers-reduced-motion` guard | Grep for `@media (prefers-reduced-motion` | Add for any translate/scale animation | [[prefers-reduced-motion]] |
| 7 | `:hover` on touch | Grep for `:hover` without media query gate | Wrap in `@media (hover: hover)` | [[hover-states-subtle]] |
| 8 | Default Bootstrap shadow | Grep for `box-shadow: 0 2px` (or similar) | Layered shadows at 4–6% opacity | [[shadows-whisper]] |
| 9 | Pure `#000` dark mode | Grep for `background: #000` (or `black`) | Use `#18181b` or `#1a1a1a` | [[dark-mode]] |
| 10 | Spinner under 800ms expected wait | Look for `<Spinner />` on quick async calls | Skip the spinner; or use skeleton | [[empty-loading-states]] |
| 11 | Inter / SF Pro on marketing page | Check font-family on landing/marketing routes | Use a less-default sans (Geist, Pangram, Displaay) | [[typography-humanity]] |

## Workflow

1. Read the code top to bottom once for context.
2. Run through the checklist row by row, noting which apply.
3. Open [[ai-default-tells]] for any visible defaults beyond this checklist.
4. Write the review using [[review-format]] (Before / After / Why table), one row per applicable issue.
5. If nothing applies — say so. "Looks good, nothing to change" is a valid review.

## When to use

Every UI code review. This is the systematic pass *before* the taste-driven pass.

## Gotcha

Don't run the checklist mechanically without context. Item 4 ("duration > 400ms") is fine for rare-moment animations (see [[delight-impact-curve]]) — it's a flag, not a rule. Always check the context before writing the row.

Also: the checklist is not exhaustive. The most valuable reviews catch what's *not* on this list. Use it as a floor, not a ceiling.

## Sources

- Emil Kowalski — Review Checklist section of [emilkowalski/skill](https://github.com/emilkowalski/skill).
- Related: [[review-format]] for the output format, [[ai-default-tells]] for broader visual audit.
