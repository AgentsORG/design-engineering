---
title: page-frame
summary: The frame readers judge before any detail — one pair of equal margins, no half-empty sections, no holes, a first screen that says what this is, a heading on every section. Each rule is a measurement you can run on a render.
tags: [layout, marketing, margins, whitespace, hierarchy, review, measured]
---

# Page frame

Before a reader sees a typeface or a shadow they judge the frame: "no good margin", "everything is shifted to one side", "big random blank spaces", "no clear title". Each of those complaints is measurable on a rendered page. taste-skill's study of 97 Awwwards Sites of the Day (October 2026) measured them, and the strong pages agree on five things.

## The rules

| Rule | Measure | Fails when |
|---|---|---|
| **One pair of equal margins** | content's distance from the left and right edge at 1440, 768 and 390 | the sides differ (warn from 16 px of drift); the header sits on one inset and the page on another |
| **Text never touches the edge** | nearest text box to the viewport edge | under 16 px on desktop, under 12 px on a phone |
| **Use the width you set up** | a section with 12+ words, its content all on one side | about half the width is plain ground; in the study about 1 text section in 100 does this. The other half gets the section's picture, a second column, a list or a figure |
| **No holes** | the tallest run of the page with nothing in it | over about half a screen holds nothing; one empty block takes ≥ 28 % of the first screen; a gap between sections passes ~40 % of a screen |
| **Say what this is, first** | the first screen's `h1` | it is missing, it is only a name or slogan, or it is not readable on first paint. In the study 15 of 97 first screens never said what the thing was, and they lost usability marks, not design marks |
| **Title every section** | sections of 30+ words with no heading | 82 % of the studied sections open with one: median 57 px, about 3.5× body, the same left edge each time |
| **Few left edges** | the three most-used left edges' share of left-aligned text | under 60 %: text starts on too many lines |

Spacing that keeps the frame: sections 120–240 px apart on desktop and 72–112 px on a phone (the study's median gap is ~230–250 px), the gap between sections clearly larger than any gap inside one, and at least twice the space above a heading as below it ([[type-scale-and-rhythm]]).

## A rest is not a hole

Empty space is placed when something closes it: the picture with type docked at its edge, a headline big enough to span it, or the wordmark and one fact in the corners like a mount around a print. If nothing closes it, it is a hole. Holes come, in order, from section gaps stretched to 250–760 px, text in one half with nothing in the other, content waiting on a reveal, a footer padded to `100vh`, and a pinned scene holding nothing for several screens. One deliberate rest per page; two near-empty screens fail. When a section looks empty, make its main element bigger or cut it; adding a decoration is almost never the fix.

## When to apply

Reviewing any marketing page or landing page in a browser at 1440, 768 and 390, after [[marketing-surface-rules]] and before polish ([[unslop-pass]]). Asymmetry is fine *inside* the frame — an off-centre anchor line at a third or 42 % — never in the margins themselves.

## Gotcha

Reveals cause holes. A section that fades in on scroll is bare ground until it fires, and in the motion study about a third of award sites still showed a loader or nothing readable 4.5 s after load. Content is in place on first paint; an entrance moves what is already there ([[marketing-surface-rules]], [[prefers-reduced-motion]]).

## Sources

- Leonxlnx, taste-skill v2.1.1 (MIT, HEAD a9c73c3): `skills/taste-skill/references/layout.md` §4–5 (the 97-site October 2026 study: margins, the one-in-a-hundred half-empty section, holes and closers, 15 of 97 unsaid first screens, 82 % headed sections) and `scripts/lib/rules.mjs` (`off-centre`, `edge-text`, `lopsided`, `blank-gap`, `hero-void`, `untitled-section`, `ragged-edges`). Usability and design marks there are model-panel judgements of screenshots, not human jurors.
- Related: [[marketing-surface-rules]], [[viewport-custom-design]], [[type-scale-and-rhythm]], [[screenshot-critique]].
