---
title: opentype-features-and-axes
summary: What lives inside a font file and how to reach it — static vs variable, the five registered axes, custom axes, OpenType features through font-variant-* first, numbered sets commented, real small caps and superiors, optical cuts by size, ornament and caret/placeholder details.
tags: [typography, fonts, variable-fonts, opentype]
---

# OpenType features and axes

A production font carries far more than one set of letters: alternate figures, true small caps, ligatures, and in a variable file a whole range of weights or widths. Reach all of it through the dedicated CSS property first and the raw tag only when no property exists, because properties degrade sensibly on a fallback font and raw tags silently do nothing. [[type-scale-and-rhythm]] states that rule; this node is the inventory behind it.

## Static or variable

A static family is one file per weight and style; a variable file holds a continuous range, so `font-weight: 473` is real. One or two weights usually ship lighter as static files. Many weights, an `opsz` axis or a custom axis usually favour the variable file. Measure; don't assume.

## Axes

| Tag | Varies | Property |
|---|---|---|
| `wght` | weight | `font-weight` |
| `wdth` | width | `font-stretch` |
| `opsz` | optical size | `font-optical-sizing: auto` |
| `slnt` / `ital` | slant / true italic | `font-style` |
| uppercase tags | designer-defined, e.g. Fraunces `SOFT`, `WONK` | `font-variation-settings` only |

A font exposes only the axes it was built with; check before writing them.

## Features

- Figures: `tabular-nums` for anything that updates, `lining-nums` vs `oldstyle-nums` for running text, `slashed-zero` wherever 0 and O can be confused (codes, serials).
- A lone figure centered in a shape (a number in a progress ring) takes proportional figures and a cap-height trim, because fixed-width digits leave a 1 visibly off center.
- `diagonal-fractions` for 1/2 sequences; `font-variant-ligatures` to switch ligatures off in code-like strings.
- **Real small caps** via `font-variant-caps: small-caps`, never shrunken uppercase, which comes out too light.
- **Real superiors and inferiors** via `font-variant-position: super | sub` (m², CO₂), instead of the scaled, shifted `<sup>` default.
- Stylistic sets `ss01`–`ss20` and character variants `cv01`–`cv99` are numbered slots whose content differs per family. Read the specimen, then comment what the slot does in this font: `font-feature-settings: "ss02" 1; /* single-storey a */`.

All of these depend on the glyphs existing; a missing feature fails silently.

## Optical cuts

Families such as Freight ship Text, Display and Big cuts of one design: sturdier and looser for paragraphs, high-contrast hairlines for poster sizes. Pick the cut for the size you set, not for the vibe of its name.

## Ornament and editing details

- `::first-letter` works everywhere; `initial-letter` sizes a drop cap in lines but is missing in Firefox, so treat it as enhancement.
- `::target-text` styles a text-fragment jump; the Custom Highlight API paints search hits without wrapper elements.
- `caret-color` is the whole safe caret API; replacing the caret means rebuilding editing.
- `::placeholder` sits visibly lighter than typed text and still passes contrast.

## Reference

Figures are the feature most often wrong on screen. One block for the three number jobs a product has:

```css
.ticker   { font-variant-numeric: tabular-nums; white-space: nowrap; } /* ticks in place */
.ticker .unit { margin-left: 0.08em; }        /* "240ms": a hair, not a word space */
.ring-val { font-variant-numeric: proportional-nums;
            text-box: trim-both cap alphabetic; } /* a lone 1 sits dead center */
.serial   { font-variant-numeric: tabular-nums slashed-zero; } /* 0 vs O */
```

- Bad: a ring reading `1` in tabular figures, its glyph sitting left of the ring's center. Good: proportional figures, trimmed to cap height.

Gold example: `stageshow/kit/motion/Count.css` (tabular digits, the unit's 0.08em hair or 0.28em word space) and the progress-ring rule in `stageshow/references/craft.md`.

Check: film a counter stepping 9, 10, 11 and a ring going 1 to 7, stepped at 40 to 80ms. Neighbours never shift, and the 1 looks centered at 2x zoom.

## Gotcha

Stroked or outlined text (`-webkit-text-stroke`) on a variable font often shows seams inside the letters. They are overlapping contours left unmerged in the font, and no CSS removes them; switch to a static instance for that use.

## Sources

- Emil Kowalski's design-engineering practice, distilled by AgentsORG.
- CSS Fonts Level 4; OpenType feature registry.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/motion/Count.css`, `stageshow/references/craft.md` (progress ring, centering a label on its letters).
- Related: [[type-scale-and-rhythm]], [[line-behavior]], [[typography-humanity]].
