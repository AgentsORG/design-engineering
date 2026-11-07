---
title: review-format
summary: Mandatory format for UI code reviews — Before | After | Why markdown table.
tags: [meta, review, format]
---

# Review format (required)

When the user asks for a UI code review, output a markdown table with three columns: **Before**, **After**, **Why**. This is non-negotiable — it forces concrete diffs instead of vague advice.

## The required format

```markdown
| Before | After | Why |
|---|---|---|
| `transition: all 200ms` | `transition: transform 200ms, opacity 200ms` | Animating `all` triggers layout/paint on properties the browser doesn't know are safe. Specify the GPU-cheap ones explicitly. See [[transform-opacity-only]]. |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Scale-from-zero looks like an inflating balloon and renders blurry sub-pixel during the first frames. See [[never-scale-from-zero]]. |
| `transition: all 0.3s ease-in` | `transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)` | `ease-in` makes UI feel hesitant. Use `ease-out-quart` or similar for entrances. See [[easing-curves]]. |
```

## What each column does

- **Before** — the actual line(s) from the user's code. Quote in inline code or fenced if multi-line. Don't paraphrase.
- **After** — the suggested replacement. Equivalent function, better feel.
- **Why** — one short sentence on the rationale, plus a wikilink to the relevant skill node for depth.

## Rules

1. **One issue per row.** Don't combine multiple changes into a single Before/After. If a snippet has three issues, write three rows quoting overlapping sections.
2. **No row without a Why.** "Just better" is not a Why. If you can't articulate why in one sentence, you're probably reaching.
3. **Link to nodes.** The Why should end with a `[[node-name]]` wikilink. This is how the agent invites the user to learn more without bloating the response.
4. **Don't fix in prose around the table.** All actionable items go in the table. Prose around it is for high-level context only (e.g., "Three issues in the modal entrance:").
5. **Order by impact.** Most-impactful issue first. Don't bury the lede.
6. **Say what you didn't check.** End with one line naming what the review could not see (a theme, a device, the frames between states); a review that found nothing lists what it looked at (Benji Taylor's fresh-eye brief).

## When this format applies

- "Review this component."
- "Critique this animation."
- "What's wrong with this hover state?"
- "Is this UI well-built?"
- Any code review where the user shares CSS, motion, or component code.

## When this format does NOT apply

- High-level design questions ("should this animate at all?") — prose answer pointing at [[animation-decision-framework]].
- API/architecture questions — prose answer.
- Bug diagnostics ("why isn't this working?") — investigation in prose, table only if there are multiple actionable fixes.
- "Build me X" requests — produce the code, then optionally a table of *choices made* (Before: alternative approach, After: chosen approach, Why: rationale).

## Counter-example

**Wrong — vague prose review:**

> Your modal animation could be smoother. The transition is a bit too long and the scale starts too small. Consider using a different easing curve.

**Right — Before/After/Why table:**

```markdown
| Before | After | Why |
|---|---|---|
| `transition: transform 0.6s ease` | `transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)` | UI animations under 300ms feel responsive; 600ms feels theatrical. See [[duration-table]]. |
| `transform: scale(0)` | `transform: scale(0.95)` | Scale-from-zero is inflating-balloon energy and renders blurry. See [[never-scale-from-zero]]. |
```

The wrong version is unactionable. The right version tells the user exactly what to type.

## Reference

A visual finding keeps the table and names the frame it was seen in; the review closes on what it couldn't see:

```markdown
| Before | After | Why |
|---|---|---|
| `.toast { padding: 6px 8px }` (shot-390.png: text 6px from the edge) | `.toast { padding: 12px }` | Words under 8px from an edge read cramped; one value all round. See [[ui-polish-pass]]. |
| `{saved ? <Badge>Saved</Badge> : <Badge>Draft</Badge>}` | `<Badge>{saved ? 'Saved' : 'Draft'}</Badge>` | Two elements remount and pop; one badge changing its label reads as one object. See [[cross-blur-transitions]]. |

Not checked: dark theme, iOS Safari.
```

Gold example: `stageshow/references/review.md`: a ranked list (framing, then hierarchy and density, then motion, then polish), each item what you'd screenshot, the frame that shows it and a one-line fix.

Check: read the first row alone. It should be the fault that spoils the most of the screen; Benji ranks by that, never by how easy the fix is. Then grep each Before in the code: one you can't find is a paraphrase.

## Gotcha

Don't include the table if there are no issues. "This looks great — nothing to change" is a valid review and better than inventing nitpicks to fill rows.

## Sources

- Emil Kowalski — Review Format (Required) section of [emilkowalski/skill](https://github.com/emilkowalski/skill).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/review.md` (ranking, items, saying what you couldn't check), `stageshow/references/craft.md` (Spacing and alignment: 12px inset), `stageshow/references/motion.md` (a label that changes changes on itself).
- Related: [[review-checklist]] for the audit categories to scan against.
