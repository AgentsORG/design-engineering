---
title: data-is-content
summary: Tables, charts, lists, dashboards deserve the same typography, alignment, and whitespace care as marketing pages.
tags: [philosophy, data, dashboards, tables]
---

# Data is content

Designers will spend a week on a hero image and 30 minutes on the table that users actually look at every day. That's backwards. Tabular data, charts, and lists are the most-viewed surfaces in most B2B and prosumer products — and they are usually under-designed.

The principle: data display IS content. Apply the same craft you'd apply to a marketing page.

## What "treating data as content" means

### Tables

- **Right-align numbers, left-align text, center icons.** Numbers compare easier when their decimal points line up.
- **Use tabular figures** (`font-variant-numeric: tabular-nums`). Without this, "$1,234" and "$987" don't align column-wise because proportional fonts size digits differently.
- **Borders are subtle or absent.** Heavy grid lines are an Excel tell. Use whitespace and very-low-opacity row dividers (e.g., `border-bottom: 1px solid rgba(0,0,0,0.05)`).
- **Sticky header.** Long tables need the column labels to stay visible. Subtle — no shadow, just a background.
- **Density toggles.** Power users want compact (rows 28px). Casual users want comfortable (rows 44px). Both, with a toggle.
- **Zebra striping is dated.** Most modern tables don't use it. White space between rows reads cleaner.

### Charts

- **One color per series, picked deliberately.** Most chart libraries default to a rainbow. Pick 2–4 colors from your palette.
- **Remove chartjunk.** Default axes, default tooltips, default legends are usually noise. Customize everything.
- **Tooltips are content.** A line chart tooltip should show the value precisely + context (date, comparison to prev period). Not just "Y: 47."
- **Label the axes meaningfully.** "Date" is not a label. "Revenue, last 30 days" is.
- **Animate on first render only.** The chart drawing in is a one-time delight ([[delight-impact-curve]]). Updates should be instant.

### Lists

- **Item hierarchy uses size, weight, color — not just spacing.** Title heavier and bigger. Subtitle lighter and smaller.
- **Hover state on every interactive row.** Subtle ([[hover-states-subtle]]).
- **Empty states matter most here.** See [[empty-loading-states]] and [[states-are-the-work]].

## Specifically for B2B / data-heavy UIs

- **Density wins consistency.** Power users will toggle to dense and never go back. Default to dense if the product is for analysts.
- **Inline editing.** Click cell → edit → blur to save. Beats modal-based edit by ~10x in flow.
- **Keyboard navigation.** Arrows to move, Enter to edit, Esc to cancel. Every spreadsheet user expects this.

## When to apply

- Any product that surfaces data the user *reads* (not just receives).
- Dashboards, admin panels, analytics tools, finance apps, productivity apps, CRMs, log viewers.
- Even consumer apps with rich content lists (Notion, Linear, Things) — these are "data" in disguise.

## Reference

An invoice table that reads as content, adapted from `stageshow/examples/table-edit/table.css`:

```css
.row  { display: grid; grid-template-columns: minmax(0, 1fr) 112px 92px 64px; gap: 16px; align-items: center;
        height: 44px; font-size: 13px; white-space: nowrap; border-bottom: 1px solid var(--line-faint); }
.head { height: 36px; font-size: 12px; font-weight: 500; color: var(--text); }
.num  { text-align: right; font-variant-numeric: tabular-nums; }
```

Every row is a real string, and the table stays short (five rows) instead of being padded with placeholder bars. An edited cell keeps its value exactly where it was (the field ring is drawn inside the cell), and the total rolls 250ms after the commit, not on every key. Benji's call differs on updates: a derived total animates a beat after its cause instead of changing instantly; keep this node's instant rule for live chart data.

Gold example: `stageshow/examples/table-edit/`; for a chart, the `detail-chart` pair in `stageshow/teaching/details.tsx` (the line draws left to right, the area follows, the end dot lands last).

Check: edit one amount and film it close (`--slow 6 --every 40`): no digit in the column shifts sideways, and the total moves only after the cell commits.

## Gotcha

Don't apply marketing-page rules to data. Asymmetric layouts and "imperfect" alignment ([[visual-imperfection]]) are wrong here — data needs predictability. See [[marketing-vs-product-ui]].

The exception: data *visualizations* (charts, diagrams) can have personality. Tables and lists should not.

## Sources

- guidelines.sh — "Data display is content."
- Edward Tufte — *The Visual Display of Quantitative Information* (chartjunk, data-ink ratio).
- Linear, Notion, Pipedrive — modern data-as-content table design.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): stageshow/examples/table-edit/ (index.tsx, table.css), stageshow/teaching/details.tsx (detail-chart), stageshow/references/rehearse.md.
- Related: [[marketing-vs-product-ui]], [[states-are-the-work]], [[empty-loading-states]].
