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

## Cross-cluster

- For *component-level* layout (cards, modals), see [[MOC-components]].
- For the marketing-vs-product distinction that determines layout discipline, see [[marketing-vs-product-ui]].
- For when to break the grid, see [[visual-imperfection]].
