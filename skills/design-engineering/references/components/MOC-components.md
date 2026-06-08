---
title: MOC-components
summary: The atoms users actually touch — hover states, empty/loading states, icons.
tags: [moc, components]
---

# MOC — Components

Components are where craft lives because users *touch* them. Their states are where most UIs get lazy.

## Nodes

- [[hover-states-subtle]] — Hover is not lift-and-shadow. 1px shifts. Pressed states are for B2C. How to layer disabled.
- [[empty-loading-states]] — Empty states must direct action, not just say "nothing here." Skeletons hint at structure; spinners under 3s; progress bars over 3s.
- [[icon-systems]] — Never mix icon packs. 10–32px range. Match icon stroke to font weight. Lucide is overused; consider Phosphor, Hugeicons.
- [[cards-design]] — Don't nest cards. Design card interiors intentionally — whitespace, hover-only actions, subtle icons.
- [[forms-validation]] — Validate at input, not on submit. Soft validation while typing, hard validation on blur. Inline beats summaries.
- [[avatar-systems]] — Procedural avatars (DiceBear), uploaded photos, initials. All 31 DiceBear v9.x styles with previews. Seeding strategy.
- [[interaction-personality]] — Unique microinteractions, contextual feedback, easter eggs, audio when intentional. Personality is *how* the product responds.
- [[accessibility-baseline]] — Keyboard-everywhere, `:focus-visible`, hit targets, ARIA names on icon buttons, polite aria-live. The floor below taste.
- [[optimistic-updates]] — Update UI immediately on likely-success actions, reconcile or undo on failure. The largest perceived-latency win.
- [[copy-voice]] — Active voice, Title Case for headings/buttons, numerals for counts, error messages that guide the exit.
- [[component-confusables]] — Pick by behaviour, not looks: tooltip vs popover (can it hold a link?), badge vs tag (attached/read-only vs standalone/interactive), sheet vs drawer vs dialog.

## Cross-cluster

- For button *motion*, see [[responsive-feedback]] in [[MOC-motion]].
- For icon *animation*, see [[animations-dev-curriculum]] (Emil's course) and [[transform-opacity-only]].
- For *tray* / sheet UI, see [[tray-rules]] (Benji's six rules).
- For *page-level* layout (grids, viewports), see [[MOC-layout]].
