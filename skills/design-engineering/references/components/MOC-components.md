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
- [[forms-behavior]] — Everything a form does besides validating: label wiring, input types, 16px, focus-visible, decorations over the input, autofocus rules, Enter and Cmd+Enter, buttons that disable while submitting, no dead zones, confirmed destruction, prefill.
- [[touch-and-focus]] — Hover enhances, never enables; 44px hit areas; `touch-action`; `playsinline`; labelled icon buttons; hidden content out of the tab order; focus moved and restored; the mobile-native fixes table.
- [[ui-polish-pass]] — The finishing pass after it works: antialiasing, constant weight, tabular numbers, no layout shift, real characters, states that stay put, a z-index scale, optical alignment, designed empty states, no flash on refresh.
- [[component-api-design]] — Composition over configuration, compound parts with context, variants → size → className → asChild, platform prop names, controlled and uncontrolled, refs forwarded and props spread.
- [[dashboard-tells]] — An app screen is not a landing page: KPIs with no icon circles or sparklines at 16–40 px, deltas coloured good or bad (not up or down), zero change in grey, tabular right-aligned figures.
- [[screen-reader-announcements]] — The four-step ladder (focus move → `aria-describedby` → `role="status"` → `role="alert"`), live regions rendered empty first, `aria-busy`, alt text by purpose, 1px `sr-only`, `aria-hidden` never above focusable.
- [[keyboard-patterns]] — The APG key maps a custom widget owes: tabindex 0 or −1 only, roving tabindex, `aria-activedescendant`, `showModal()` or `inert`, Escape closes the last thing opened, focus on route change.
- [[wcag-thresholds]] — The WCAG 2.2 A/AA numbers that make a finding: 4.5:1 / 3:1, 24×24 targets, a single-pointer path for drags, focus never hidden under sticky chrome, 320px reflow, a pause past 5 s.
- [[strings-and-locale]] — Inventory the strings first, build sentences whole in ICU, format through `Intl`, verb-first buttons, links that name the destination, toggles for the ON state, parallel status copy.
- [[destructive-actions]] — Undo for frequent reversible actions; confirm the irreversible with action-and-object titles, verb-plus-object buttons, focus on the safe button, type-to-confirm for accounts.

## Cross-cluster

- For button *motion*, see [[responsive-feedback]] in [[MOC-motion]].
- For icon *animation*, see [[animations-dev-curriculum]] (Emil's course) and [[transform-opacity-only]].
- For *tray* / sheet UI, see [[tray-rules]] (Benji's six rules).
- For *page-level* layout (grids, viewports), see [[MOC-layout]].
