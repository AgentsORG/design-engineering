---
title: dashboard-tells
summary: An app screen is not a landing page. Headline numbers without icon circles or sparklines, at 16–40 px; deltas coloured by good or bad rather than up or down; zero change in grey; numbers right-aligned in tabular figures; one grotesk, 4–9 sizes.
tags: [components, dashboard, kpi, data, tables, app-screens, measured]
---

# Dashboard tells

The generated dashboard is a landing page with numbers on it: four tinted tiles, an icon in a coloured circle on each, a 48 px figure, a green "+100 %" pill and a sparkline nobody reads. taste-skill measured 23 real product screens (17 products, 1440–1512 px) and they share none of it. The data is the content ([[data-is-content]]), and on a real screen the chrome gets out of its way.

## Headline numbers

- **No icon circles, no sparklines** on KPIs: 0 of 23 screens use either. An info icon beside the label is fine.
- **Often no tile at all.** 11 of the 20 screens with headline numbers give a KPI no tile of its own: bare text, or one container split by 1 px dividers. 7 put each number inside the card that explains it, which is often better.
- **Size.** Values 16–40 px, median 26; nothing at 48 px or over. Labels 12–16 px, label above the value, sentence case, in grey. When one figure *is* the screen's answer (a balance, net worth), it runs 30–36 px and at least 1.3× its siblings, and no other number on the screen is larger.
- **1–6 per row**, median 3–4, matching the grid's columns.

## Deltas

- Optional: 9 of the 20 show one. 10–15 px, never larger than the label, with the window in words ("vs prior 30 days").
- **Colour says good or bad, not up or down.** Latency, error rate, cost and churn are better when they fall. A rise in errors in the same green as a rise in visits hides the screen's only bad news.
- **Zero or undefined change is grey.** The commonest failure in the study is a change grown from zero shown as a signal: green "up 100 %" pills, ">999 %", a bold red "0.00 %". Write "+4 (new)" when the prior period was zero, and a grey dash when there is nothing to compare.

## Tables and figures

Numbers right-aligned in tabular figures, with `font-variant-numeric: tabular-nums` checked to actually change the digit widths. Fixed decimals per metric (money 2, counts 0), a sign on every change, and the sign in the text rather than red on every negative. Only the identity and the key number get the primary ink; the rest is grey. A missing value is a grey dash, a real zero is printed. No zebra rows, no uppercase headers. 17 of 23 put no shadow on resting cards ([[depth-and-nesting]]).

## Type

All 23 use one neo-grotesk, 14 of them alone; a second face has one job (monospace for numbers or IDs). 4–9 sizes per screen, median 6, as a scale like 12/14/16/24. The page title runs 18–32 px. A 50 px title and a 76 px balance make a budgeting screen read as a landing page ([[marketing-vs-product-ui]]).

## Reference

```css
.kpi { font-size: 26px; font-variant-numeric: tabular-nums; white-space: nowrap; } /* the unit stays on the figure's line */
td.num { text-align: right; font-variant-numeric: tabular-nums; }
.delta[data-tone="bad"] { color: var(--danger); }
.delta[data-tone="none"] { color: var(--text-faint); } /* zero, or nothing to compare */
```

- **Bad → good:** on refresh "1,284" fades out and "1,291" fades in → only the changed digits roll, last digit first, the rest still (Stageshow's `Count`: 700ms, 45ms stagger, tabular figures, the unit in its own box a hair off the last digit); a total that depends on an edited row changes a beat after the commit, not with each key.
- **Gold example:** `stageshow/examples/linear/` (grayscale chrome, colour only on the product's own content marks: status circles, label dots, avatars) and `stageshow/examples/table-edit/` (right-aligned tabular amounts, no toast: the table is the confirmation). Benji's "one number gets to be big; the rest are lines" (`stageshow/references/craft.md`) is this node's single-answer rule.
- **Check:** film a refresh and step it at 40 to 80ms: no column changes width as digits change, no unit wraps onto its own line at 390px, and every coloured delta means good or bad, not up or down.

## Gotcha

These numbers come from 23 screens the skill's owner chose, and the screenshots are private, so the medians cannot be checked and the sample has a taste. The two delta rules don't need the sample: they are logic, and they are the ones to enforce first.

## Sources

- Leonxlnx, taste-skill v2.1.1 (MIT, HEAD a9c73c3): `skills/taste-skill/references/app-screens.md` §5 (KPIs and deltas), §7.4–7.5 (figures, ink in rows), §9.1 (type); `references/research.md` §13 (the 23-screen study and its limits).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/motion/Count.tsx`, `stageshow/kit/motion/Count.css`, `stageshow/examples/linear/index.tsx`, `stageshow/examples/table-edit/index.tsx`, `stageshow/examples/table-edit/table.css`, `stageshow/references/craft.md` (Restraint: one number gets to be big; Color and looks: status colors mean status).
- Related: [[data-is-content]], [[cards-design]], [[empty-loading-states]], [[type-scale-and-rhythm]].
