---
title: routing-table
summary: Intent → entry-node router. Name the job first, then open exactly one node — most questions have one canonical entry point into the graph.
tags: [meta, routing, navigation]
---

# Routing table — intent → entry node

Most wasted context comes from opening the wrong cluster. Before reading anything, classify the user's intent into one of four postures, then jump straight to the entry node for that job. One good entry beats scanning three MOCs.

## The four postures

| Posture | The user wants… | Output shape |
|---|---|---|
| **Build** | UI produced or changed | Code, using the cluster's values |
| **Judge** | Existing work assessed | A table or list — never unsolicited edits |
| **Decide** | A call made *before* building | A yes/no or a pick, with the trade named |
| **Name** | The precise word for a thing | The term, one line, stop |

Judge-posture outputs are read-only: return the [[review-format]] table or a deletion list, don't rewrite the code unless asked. Decide-posture nodes (like [[animation-decision-framework]]) must be consulted *before* writing code, not cited after. Name-posture lookups ([[design-vocabulary]]) answer and stop — no implementation.

## The router

| You want to… | Open first |
|---|---|
| Understand why a screen feels flat or assembled | [[feeling-right]] |
| Decide whether something should animate at all | [[animation-decision-framework]] |
| Pick easing / duration for one animation | [[easing-curves]], then [[duration-table]] |
| Build drag / swipe / momentum interactions | [[gesture-momentum]], [[spring-animations]] |
| Fix jank, stutter, or layout thrash | [[transform-opacity-only]], then [[debugging-animations]] |
| Pick or fix a typeface, wrapping, tracking | [[typography-humanity]], [[line-length-tracking]] |
| Build a palette, fix contrast, derive dark mode | [[color-monochromatic]], [[contrast-and-color-scheme]], [[dark-mode]] |
| Add depth — shadows, borders, radii | [[shadows-whisper]], [[border-radius]] |
| Build a form that behaves | [[forms-validation]] |
| Write empty / loading / error states | [[empty-loading-states]], [[states-are-the-work]] |
| Write UI copy or error messages | [[copy-voice]] |
| Review a UI diff before shipping | [[review-format]] + [[review-checklist]] (or spawn [[ui-reviewer]]) |
| Review a diff that is *specifically* motion | [[motion-auditor]] |
| Audit "does this look AI-generated?" | [[ai-default-tells]] (or spawn [[anti-pattern-scanner]]) |
| Build a marketing / landing surface | [[marketing-vs-product-ui]] |
| Consume a project's DESIGN.md tokens | [[using-design-md]] (or spawn [[design-md-consumer]]) |
| Put the right word to a design idea | [[design-vocabulary]] |

## Rules

1. **Route before reading.** Classify posture, pick the entry node, open it. Only widen to the MOC when the entry node's outbound links don't cover the question.
2. **One entry node per question.** If you find yourself opening four nodes up front, you skipped classification.
3. **Judge posture never writes.** A review request gets a table; a fix request gets code. Don't convert one into the other silently.
4. **Always end with the overrides.** Whatever the route, load [[gotchas]] and [[pov]] before producing output — installer taste wins over canonical defaults.

## Gotcha

The router is for *entry*, not *coverage*. Landing on [[easing-curves]] doesn't exempt you from [[prefers-reduced-motion]] — follow the entry node's own outbound links for the mandatory companions.

## Sources

- HKTITAN — routing patterns distilled from operating this graph across real sessions.
- Related: [[disambiguation]] for the intents that blur together, [[stacking-chains]] for multi-step jobs.
