---
title: interfaces-reconciliation
summary: Jakub Krehel's interfaces skills (better-* domain skills, interface-review, break, state-machine, variant, explain-interface, build-design, teardown) as companions — which job each owns when installed, what this graph distilled from them, and twelve value conflicts settled. Exact values and WCAG criteria are his; motion ratios, the default press, APCA for design and the installer's pov stay here.
tags: [meta, companion, interfaces, reconciliation, accessibility, review]
---

# interfaces, reconciled

Jakub Krehel's skills (`npx skills add jakubkrehel/skills`, or the `interfaces` Claude Code plugin) split interface craft into six domain skills — `better-accessibility`, `better-layout`, `better-writing`, `better-typography`, `better-colors`, `better-ui` — an orchestrator, `better-interface`, and seven verb skills. Every domain skill blocks on evidence (a WCAG criterion, a visible break, an exact value missed) and treats a deliberate project convention as a preference, which is the same bar as [[review-format]]. Most of its domain rules were already in this graph; what was new is distilled into [[screen-reader-announcements]], [[keyboard-patterns]], [[wcag-thresholds]], [[strings-and-locale]], [[destructive-actions]], [[color-token-tiers]], [[palette-step-roles]], [[gradient-interpolation]], [[logical-properties-rtl]], [[growth-and-overflow]], [[grouping-by-space]], [[change-scoped-review]], [[stress-scenarios]] and [[reading-others-interfaces]].

## Who owns what when it is installed

| Job | Companion | This graph keeps |
|---|---|---|
| Review a branch, PR or uncommitted change | `/interface-review` (user-invoked) | the table shape and [[pov]]; without it, [[change-scoped-review]] |
| Review a whole screen or flow across domains | `better-interface` | [[review-checklist]] rows still apply; [[ui-reviewer]] when not installed |
| Stress one component; walk its product states | `/break`, `/state-machine` (user-invoked) | [[stress-scenarios]] |
| Three variants of one piece behind a picker | `/variant` (user-invoked) | [[prototype-picker]]'s decision record |
| How another site or effect was built | `/explain-interface` (user-invoked) | [[reading-others-interfaces]] |
| Build from a Figma file or image | `build-design` (needs a Figma MCP) | the contract precedence in [[skill-router]] |
| A technical illustration, exploded view or teardown drawing | `teardown` | [[diagram-decision]] when it is really a diagram |

User-invoked skills cannot be started by another skill: when one owns the job, tell the user the command and stop. In an orchestrated review its severity and verdict replace this graph's; the [[pov]] overrides still apply on top.

## Conflicts, settled

| Topic | interfaces | This graph | Settled |
|---|---|---|---|
| Button and heading case | one policy per element type; sentence case when none | [[copy-voice]]: Title Case | Consistency is the rule; with no policy, sentence case. [[pov]] decides for this install |
| Validation timing | validate on submit, focus the first invalid field | [[forms-validation]]: hard check on blur | Both: blur for format errors on a field left, submit always re-runs, focuses and announces. Never disable submit (both agree) |
| Focus ring | prefer the browser's own; a custom one only as a verified token | [[accessibility-baseline]]: a brand ring beats default blue | A brand ring is fine **when** it clears 3:1 against every colour it crosses and survives forced colours ([[wcag-thresholds]]) |
| Contrast math | WCAG 2.2 ratios | APCA first ([[contrast-and-color-scheme]]) | Design with APCA; a finding cites the WCAG ratio |
| Press scale | 0.96, 150 ms ease-out, never when disabled | 0.96 in [[ui-polish-pass]]; 0.97 in [[responsive-feedback]] | 0.96, and disabled never scales |
| Stagger | 100 ms between semantic chunks (title, body, actions) | 30–80 ms per list item ([[stagger-choreography]]) | Different units: chunks of one entrance 100 ms, items in a list 30–80 ms |
| Exit | 150 ms, opacity + 4px blur + fixed −12px | 60–80 % of the enter ([[duration-table]]) | His values for the staged 300 ms entrance; the ratio for panels and overlays |
| Icon swap | cross-fade, scale 0.25 → 1, blur 4px → 0, bounce 0 | [[review-checklist]] row 5: transform one icon | Related geometry morphs or rotates ([[morphing-icons]]); unrelated glyphs (play/pause, copy/check) take his cross-fade |
| Variant host | the real page, `?__variant=` link | [[prototype-picker]]: `/proto/<slug>` | The real page when the piece lives on one; a proto route when no page exists yet |
| Hover gate | `(hover: hover)` | `(hover: hover) and (pointer: fine)` ([[touch-and-focus]]) | Either; Tailwind 4's `hover:` already compiles under `(hover: hover)` |
| Measure | 60–75 characters | 45–75, 65ch default ([[line-length-tracking]]) | 65ch default holds; under 45 or over 75 is the finding |
| Neutrals | pure grey is a fine default; tint optional | [[color-monochromatic]] | Tinting is a style, never a finding — unless warm and cool greys mix |

## Gotcha

His skills cap a review at 15 findings and forbid inventing a diff scope. Running `better-interface` on a request that names a PR yields an instruction to run `/interface-review`, not a review. That is correct behaviour, not a failure: pass the command on.

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, plugin `interfaces` 1.17.0, read 2026-10-25): `AGENTS.md` (rule ownership, invocation), every `skills/*/SKILL.md`, and the reference files cited in each distilled node. Values are his; the glosses and settlements are this graph's.
- Related: [[skill-router]], [[routing-table]], [[cinetic-reconciliation]] (the same pattern for a film companion).
