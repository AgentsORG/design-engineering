---
title: MOC-layout
summary: Page-level layout, grids, viewports, sticky and scroll tells.
tags: [moc, layout]
---

# MOC — Layout

The page-level container, not the component level. When designing a screen — especially marketing screens — start here.

## Nodes

- [[viewport-custom-design]] — Each viewport gets its own design, not just a scaled version of desktop. The "narrow central column on blog content" pattern.
- [[sticky-and-scroll-tells]] — Background-blur on sticky sections is an AI giveaway. Scroll hijacking is almost always wrong. What to do instead.
- [[url-as-state]] — Filters, tabs, pagination, panels — all live in the URL. Back/forward restores scroll. Deep-link everything.
- [[marketing-surface-rules]] — The landing / docs / blog / changelog checklist: motion maps to input, intros once per session, pre-render, preload, nav content in the DOM, auth-aware CTAs, copy buttons and `.md` URLs, RSS.
- [[page-frame]] — The frame readers judge first, measured on 97 award sites: equal margins, no half-empty section, no holes, a first screen that says what this is, a heading on every section.
- [[scroll-anchoring]] — Keep the row the reader is on in place when content above it changes: anchor by value, restore the screen offset, store the read-back scrollTop, one owner with `overflow-anchor: none`.
- [[grouping-by-space]] — Space, then a shape, then a line; between-group gaps ≥ 2× within-group; controls look like controls; 12px between bordered controls, 24px between borderless glyphs; inset buttons; one primary action.
- [[growth-and-overflow]] — Content grows: `max-width` and `min-height`, wrapping rows, pseudo-localization, `minmax(0, 1fr)`, `100%` not `100vw`, container queries and their collapse, breakpoints from content, peeks and `scroll-padding`.
- [[logical-properties-rtl]] — Leading and trailing, not left and right; physical only for safe areas, with an RTL override; visual order is DOM order; mirror only direction-bearing icons; `<bdi>` for mixed direction.

- [[information-architecture]] — Grouping long settings, tabs for views of one thing, flattening deep menus, search logs as navigation feedback, the primary action in reach.
- [[mobile-platform-layer]] — The phone platform layer: viewport tag, `dvh`/`svh`, safe areas in landscape, the Android keyboard, scroll lock, overscroll, testing by LAN on a real device.
- [[share-and-crawl-metadata]] — Titles, OG images with `metadataBase`, crawl rules left over from staging, icons, a conversion path that works end to end, analytics loaded once.

## Cross-cluster

- For *component-level* layout (cards, modals), see [[MOC-components]].
- For the marketing-vs-product distinction that determines layout discipline, see [[marketing-vs-product-ui]].
- For when to break the grid, see [[visual-imperfection]].
