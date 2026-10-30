---
title: line-behavior
summary: Cap the measure near 65ch, pick a wrap mode per role, guard overflow both ways, never truncate without a route to the full text, case with CSS, type real punctuation, tune underlines, write direction-neutral CSS, and hold the size and contrast floors.
tags: [typography, measure, wrapping, truncation, underline, accessibility]
---

# Line behavior

How lines get their length, where they break, how they end when space runs out, and which characters belong in them. [[line-length-tracking]] argues the measure; this node is the full set of mechanical rules.

## Measure and wrap

- **Cap reading columns near 65ch** (45–75). `max-width: 65ch` counts characters natively; Tailwind's `max-w-prose` is exactly that. Re-check when the family changes — the same width holds a different count in a different font.
- **Wrap mode per role.** `text-wrap: balance` on headings; `text-wrap: pretty` on standfirsts, card blurbs, empty-state copy (kills the stranded last word). Neither on long-form paragraphs: browsers cap `balance` at a few lines and a fully balanced paragraph spends width reading needs. A three-line headline can still come out with a short first line — sometimes a manual break wins.
- **Overflow guards, both ways.** `overflow-wrap: anywhere` (not `break-word`, which leaves the min-content width alone, so a flex item still overflows) wherever a URL, hash, or user token could punch out of its box; `white-space: nowrap` on badges, buttons, and key-value labels where a mid-phrase break reads as a bug. `hyphens: auto` needs a correct `lang`.
- **Left-aligned by default.** The ragged right edge is the eye's landmark; justification without hyphenation opens rivers. Centering works for short display text and fails past two wrapped lines.

## Cutting text off

One line: `nowrap` + `overflow: hidden` + `text-overflow: ellipsis`. Several: `line-clamp`. Truncation deletes information, so it is allowed only with a route to the whole string — tooltip, `title`, expand, detail view. A clipped ID with no escape hatch is data loss wearing CSS. Choose per field, never globally:

- **Wrap** what identifies the thing (a name, a detail-view title). Two lines is fine; four means the column is too narrow.
- **End-truncate** secondary metadata whose start carries the meaning: role, description, message preview.
- **Middle-truncate** when items differ at the end — file names (`Q3-report…v12.pdf`), emails on one long domain, paths, hashes. End-truncation makes them identical. CSS can't do it; split the string and keep the tail.
- **Clamp** card previews at 2 lines (`line-clamp: 2`) so card heights stay predictable.
- **Values people compare stay whole.** Prices, counts, dates and IDs are never cut. Widen the column, or truncate the label next to them instead.

## Casing and characters

- **Casing is presentation.** Store copy in sentence case and shout with `text-transform`; ALL-CAPS strings in source get rewritten at the next redesign and confuse screen readers.
- **Type real punctuation.** Curly quotes in prose, an en dash for spans (`Mon–Fri`), an em dash for asides, the single `…` character, `&nbsp;` between a value and its unit, `&shy;` inside long words. Code keeps straight quotes.

## Finish

- **Underlines** take their metrics from the font (`text-decoration-thickness: from-font`, `text-underline-position: from-font`) or are tuned by hand in `em` with `text-decoration-skip-ink: auto`. Dotted means "there's more here" (abbreviations, defined terms). Only the *color* of a native underline animates reliably; a growing or sliding underline is its own element. Never underline non-links.
- **Selection is a design surface.** A tinted `::selection` that stays legible; `user-select: none` on control labels and chrome; check what select-all actually grabs.
- **Smooth once at the root**: `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`, never per component.
- **Direction-neutral CSS.** Logical properties (`padding-inline-start`, `text-align: start`), `lang` on the document, `dir="rtl"` where it applies.

## The floors

- Inputs never below **16px** on phones — Safari zooms the page. Never patch it with `maximum-scale=1`, which strips zoom for everyone else (a WCAG 1.4.4 failure).
- Body **16px**; dense controls 14px; captions 13px; below 12px needs an unusual excuse. Layouts must survive user zoom and enlarged root sizes.
- Contrast **4.5:1** body, **3:1** from ~24px (or bold ~18.5px) under WCAG AA — checked in both themes; see [[color-scales-oklch]] for the OKLCH repair.

## When to apply

Any component that renders text a user reads; any truncation; any link styling; any i18n or RTL work; every review of a text-heavy diff. Fix with the smallest diff — a typography fix never restructures markup unless an animated underline or an expandable truncation needs the element.

## Gotcha

`text-wrap: balance` on body paragraphs is the most common misuse: it looks tidy in a two-line demo and quietly narrows every real paragraph. Headings balance; paragraphs don't.

## Sources

- Emil Kowalski's design-engineering practice on typography, distilled by HKTITAN.
- CSS Text Level 4 (`text-wrap`), WCAG 2.2 1.4.3 / 1.4.4.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/break-ui/SKILL.md (wrap, truncate or clamp per field).
- Related: [[line-length-tracking]], [[type-scale-and-rhythm]], [[accessibility-baseline]].
