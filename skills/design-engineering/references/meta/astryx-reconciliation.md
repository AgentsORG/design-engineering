---
title: astryx-reconciliation
summary: Meta's Astryx design system as a companion — in a project that depends on @astryxdesign/core, its CLI and MCP server pick the template, components and props, and its theme owns the values; this graph keeps the review, the contract precedence and pov. What was distilled (press, hover-intent, reduced-motion, dismissal, mobile type, reorder), which of its records are current versus draft, its on-system rules, and five conflicts settled.
tags: [meta, companion, astryx, design-system, reconciliation]
---

# Astryx, reconciled

Astryx is the design system that grew inside Meta for eight years and was opened under MIT: 150+ accessible React 19 components styled with StyleX (invisible to consumers), seven themes as CSS custom-property overrides, templates, and a CLI and MCP server built so that a person and an agent build from the same reference (astryx.atmeta.com). Its design and family records are written as numbered requirements (DR, FR, INV), each marked `draft`, `current` or `archived`, and only `current` ones govern. This graph distilled the current ones that were new to it: [[press-and-pending-states]], [[hover-intent-timing]] (from a draft motion record, adopted on its own merits), [[reduced-motion-by-pointer]], [[overlay-dismissal-stack]], [[mobile-type-pin]] and [[reorder-insertion-cue]].

## Who owns what in an Astryx project

A project is an Astryx project when `@astryxdesign/core` is a dependency.

| Job | Owner | This graph keeps |
|---|---|---|
| Which page template, blocks and components to start from | `astryx build "<request>"`, then `astryx template <name> <path>` and `astryx component <Name>`; or the MCP server (`https://astryx.atmeta.com/mcp`, tools `search` and `get`) | [[page-frame]] as the check on the result |
| Props, slots, composition | the component's own docs (`astryx docs`, `{Name}.doc.mjs`). Read them before inventing a prop | [[component-api-design]] for components the app writes itself |
| Colours, spacing, radii, motion values | the active theme's tokens (`--color-*`, `--spacing-*` in rem) | [[skill-router]] precedence: a `.design` contract still outranks both |
| Agent setup | `astryx init` writes the project's agent docs; `npm i -g @astryxdesign/cli` adds one global skill | — |
| Review | its *is my code good* rubric (context first, compare sibling surfaces, an app convention is not a finding) | [[review-format]], [[pov]], [[gotchas]] on top |
| shadcn users | its shadcn registry items (draft) install compositions and CSS imports, never component source | [[shadcn-reconciliation]] |

Its on-system rules, which agree with this graph and are worth enforcing in any Astryx app: start every page from a template (frame first, region budgets before content); dense data in rows (Table, List), not cards ([[dashboard-tells]]); status as a status dot or token, never a decorative badge; semantic tokens only, no hard-coded colour or spacing; no inline `style` on raw elements; navigation through the app's link component, never a bare `<a>`; controlled form inputs.

## Draft records that confirm, not add

Its draft records on spatial hierarchy, shape, elevation and control rhythm restate rules already here: gaps grow from local to group to section and space comes before another card ([[grouping-by-space]]); nested curves stay concentric and an accent edge follows the corner instead of a side stripe colliding with it ([[depth-and-nesting]]); one edge language leads, a border or a soft shadow, not both at full strength, and a focus ring is never elevation ([[shadows-whisper]]); mixed controls in one row share an apparent height and baseline while the hit target may be larger ([[touch-and-focus]]). Its agentic-states record is a list of open questions, not answers; [[agent-trace-states]] uses them as a review checklist.

## Conflicts, settled

| Topic | Astryx | This graph | Settled |
|---|---|---|---|
| Overshoot | a theme's expressive character may overshoot on entrances and moves | bounce only after a drag ([[gesture-phases]]) | Inside an Astryx app the theme wins; elsewhere this graph's rule holds |
| Reduced-motion replacement | ≤ 200 ms cross-fade on touch, immediate otherwise | a ~120 ms opacity fade ([[prefers-reduced-motion]]) | Astryx's split, recorded in [[reduced-motion-by-pointer]] |
| Values passed by the caller | guidance over enforcement: pass a value and the component renders it | review flags off-scale values | The component renders it; the review still flags it as a finding |
| Tooltip first-open delay | owner's choice, may be zero with a reason | 400–700 ms ([[duration-table]]) | 400–700 ms unless the owner wrote down why not |
| Card use | widgets, galleries, settings groups only | [[cards-design]] | Same rule; Astryx's list is the tie-breaker |

## Sources

- Meta, Astryx (MIT, github.com/meta/astryx, HEAD `9f55320`, read 2026-11-09; astryx.atmeta.com): `README.md`, `AGENTS.md`, `docs/design/`, `docs/families/`, `docs/architecture/theme-tokens.md`, `packages/cli/assets/docs/` (`working-with-ai`, `principles.doc.dense`, `is-my-code-good`, `shadcn-compatibility.doc.draft`). Paraphrased; no source text copied.
- AgentsORG — the ownership split and settlements.
