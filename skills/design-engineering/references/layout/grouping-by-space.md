---
title: grouping-by-space
summary: Group with space first, a background shape second, a separator line last; the gap between groups is at least twice the gap inside one. Controls look like controls, everything sits on a few shared edges, borderless controls get 24px between glyphs (bordered ones 12px), buttons inset 16px from the screen edge, content bleeds while controls float, one primary action per view.
tags: [layout, spacing, grouping, alignment, gestalt]
---

# Grouping by space

Proximity is the cheapest structure there is. A divider line, a card and a background tint all say "these belong together"; space says it without adding a single pixel of ink. Reach for the others only where space can't carry the structure. These are starting points for a project with no spacing scale — where it has one, use its steps, and only a visible failure (a misread group, a clip, an overlap) is a finding.

## Space, then shape, then line

1. **Space.** The gap *between* groups is at least 2× the gap *within* one: `8px` inside means `16px` or more between.
2. **A background shape** when space alone is ambiguous — a sunken well, a raised surface ([[depth-and-nesting]]).
3. **A separator line**, last, where neither works: a dense table, a settings list. A separator that space would carry is a deletion ([[cards-design]] for the nested-card version of the same mistake).

## Controls distinct from content

Every interactive element carries a background shape, a border, an underline or a consistent placement zone such as a toolbar. A control styled like the static text beside it does not read as a control, however clean the screen looks ([[hover-states-subtle]] covers what the shape does on hover).

## Shared edges

Pick a small set of alignment edges and put everything on them; use one spacing step per level of nesting (`16px` is a useful default). The page-level version — equal margins, few left edges — is [[page-frame]]. Optical nudges where geometric centring looks wrong are [[ui-polish-pass]]'s.

## Clearance between controls

| Between | Starting point |
|---|---|
| Adjacent bordered or filled controls (buttons, inputs) | `12px` |
| The visible glyphs of borderless text or icon buttons, counting their padding | `24px` |
| Unrelated control groups | `24px` or more |

Nothing marks where one borderless target ends, so the space is the boundary. Expanded hit areas never overlap ([[wcag-thresholds]]); a compact tool may go tighter as long as that holds and the controls stay distinct.

## Edges and bleeds

- **Inset buttons from the edge.** A full-width button sits inside the layout margins, ~`16px` inline on mobile, with `calc(16px + env(safe-area-inset-bottom))` below it. One glued to three edges reads as system chrome and clips on curved corners.
- **Content bleeds, controls float.** Backgrounds and media run to the viewport edge; text and controls stay inside the margins and safe areas. Full-bleed inside an article: `grid-template-columns: 1fr min(65ch, calc(100% - 48px)) 1fr`, children in column 2, `.full-bleed` across `1 / -1`.

## One primary action per view

One primary; past three secondaries, the rest go behind a menu. Prefer a short view that links deeper over one long view that shows everything at the top level. How colour marks the primary is [[palette-step-roles]]'s.

## Reference

Three appointments in a 284px card, each a title over its people line (Benji Taylor's `content-density` pair):

- Bad: `.appt { padding-block: 5px } .appt small { margin-top: 10px }`. The people line sits 10px under its title and 10px above the next appointment, so the card reads as six equal lines.
- Good: `.appt { padding-block: 8px } .appt small { margin-top: 1px }`. Title and people line read as one item, 16px parts the appointments, and no rule or card is needed between them.
- Row anatomy to copy: words 12px from any card edge; a 1.3 line height plus about 2px between title and subtitle (4 to 6px of ink); neighbours held apart by a fixed `gap` of 8 to 12px, never by leftover `space-between`.

Gold example: `stageshow/teaching/composition.tsx` (`content-density`, values in `teaching/composition.css`); for a whole list, the `Row` anatomy in `stageshow/examples/gmail/`.

Check: shrink the screenshot to thumbnail size and count the blobs. There is one per record, not one per line. Then measure the render: the gap between groups divided by the gap inside one is 2 or more.

## Gotcha

"Add more padding" is not grouping. Uniform generous padding everywhere makes every gap equal, and equal gaps say nothing belongs together — the 2× ratio is the point, not the size.

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, read 2026-10-25): `skills/better-layout/SKILL.md` (**Group with space, not lines**, **Keep controls distinct from content**, **Align to shared edges**, **One primary action per view**, **Borderless controls need more clearance**, **Inset buttons from the edges**, **Content bleeds, controls float**), `grouping-and-alignment.md`, `spacing-and-adaptivity.md`.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/teaching/composition.tsx` and `teaching/composition.css` (`content-density`), `references/craft.md` (Spacing and alignment), `examples/gmail/index.tsx` (`Row`).
- Related: [[growth-and-overflow]], [[logical-properties-rtl]], [[feeling-right]], [[interfaces-reconciliation]].
