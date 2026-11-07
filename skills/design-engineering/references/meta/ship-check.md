---
title: ship-check
summary: The last pass before launch sweeps the whole app, not one diff, against a ship bar — nine lanes, a four-question severity tree, a fix order that never masks a finding, and an honest split between what code proves and what only a phone or a person can.
tags: [meta, review, production, launch, checklist]
---

# Ship check

A review judges one diff against a craft bar and reports ([[change-scoped-review]]). A ship check sweeps the **whole app** against a ship bar and **fixes**: it asks what breaks in the first hour, not whether the work is good. Almost every finding is one attribute, one declaration or one meta tag, so a finding that could have been a diff is a wasted finding. It goes an inch deep on every lane and hands anything bigger to the node that owns it. The verb is [[cmd-ship]].

## Three ways to fail, worst first

1. **Calling it ready from the desktop.** Sticky hover, input zoom, safe areas, the software keyboard, screen-reader order and dropped frames never reproduce in emulation on a fast laptop with a seeded account. Say which checks code proved and which need hardware; never claim the second kind.
2. **A report where a diff belonged.** Sixty rows of advice is not production prep. Apply the mechanical fixes; keep the report for decisions and devices.
3. **Redesigning in launch week.** Palette swaps, re-timed motion and new layouts are taste. Fix defects; taste goes on the human list with its owner.

## The lanes and their owners

| Lane | Hunts for | Owner |
|---|---|---|
| Accessibility | unnamed icon buttons, div-buttons, removed rings, focus that escapes, colour-only errors | [[accessibility-baseline]], [[touch-and-focus]] |
| Performance | unsized media, unpreloaded fonts, layout-property animation, per-frame state | [[performance-discipline]] |
| Mobile | zoom disabled, sub-16px inputs, `100vh` shells, ungated hover, no safe areas | [[touch-and-focus]], [[production-baseline]] |
| Forms | double submit, no `<form>`, failed submit that clears fields | [[forms-behavior]], [[forms-validation]] |
| States | the four branches of every data view, flash on refresh, z-index strays | [[empty-loading-states]], [[z-index-strategy]] |
| Motion | `ease-in` entrances, `scale(0)`, over 300ms on product UI, animated keyboard actions | [[easing-curves]], [[duration-table]] |
| Theme | the theme nobody opened | [[dark-mode]], [[contrast-and-color-scheme]] |
| Content and leftovers | lorem, fake proof, dev tools, debug logs, secrets | [[leftovers-and-leaks]], [[content-authenticity]] |
| Marketing | titles, previews, crawl rules, the conversion path | [[share-and-crawl-metadata]], [[marketing-surface-rules]] |

The marketing lane runs only when marketing routes exist; say so when it is skipped. Theme sweep, briefly: decide first whether a second theme is reachable at all. If it is reachable and half-built (some components with dark styles, some without), finish it or make it unreachable, and treat that as a decision for the human list. Then hunt raw `bg-white`, `#fff` inside SVGs (use `currentColor`), shadows with no dark value (one ~8% white ring), and third-party embeds left on their default theme.

## Severity tree

Walk it top to bottom and stop at the first yes. Does it lock a group out (keyboard, screen reader, low vision, motion-sensitive, touch)? Blocker. Will a typical user hit it in their first session? Blocker. Does it leak secrets, debug output, dev tools or fake content? Blocker. Is it visible only on another device, theme, network or data state? Should fix. Otherwise, polish. Context overrides a lane's default: a missing `alt` on the only product shot is a blocker; `100vh` on a desktop-only admin tool is nothing.

## Fix order

Accessibility blockers, then leaks, then [[production-baseline]] (one change clears dozens of instances), then per-file fixes grouped by file, then polish while the diff is still reviewable in one sitting. Never restructure markup unless the markup *is* the finding. Anything bigger than a few lines (a hand-rolled modal that needs a focus trap, a list that needs virtualizing) goes on the human list with its owner. One root cause with forty instances is one row with a count, fixed at the root. Run typecheck and build afterwards; a ship check that breaks the build is worth less than none.

## Reference

The hand-over, adapted from Stageshow's `REHEARSAL.md` template, so what code proved and what needs a phone never blur:

```md
# Ship check: <app> at <commit>
Fixed (diff): 14 (6 a11y blockers, 1 leak, production-baseline, 6 per-file)
Proved by code: typecheck, build, review-checklist greps (counts pasted)
Seen on: desktop Chrome at 1440 and 390 wide (emulated, not touch)
Needs hardware: iOS Safari keyboard over the composer; VoiceOver order on /checkout
Human list: dark theme half-built (owner: design); hero re-timing (taste)
Skipped: marketing lane, no marketing routes
Not checked: Android Chrome, slow network
```

Gold example: `stageshow/references/verify.md` (Hand over) for the template, and `stageshow/references/rehearse.md` (What to watch): the playground's Phone changes width but not touch, and you say which browser and device you checked.

Check: every "ready" in the report names where it was seen. Benji's rule that an empty or gapped capture is inconclusive, not a pass, applies per lane: a lane with no evidence goes under Not checked, never under clean.

## Gotcha

Manufacturing findings to look thorough wastes trust. "Already in good shape, small diff" is a valid and good result, and a deliberate tradeoff recorded in a comment is noted, not "fixed".

## Sources

- Emil Kowalski's design-engineering practice, distilled by HKTITAN.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/verify.md` (Hand over), `stageshow/references/rehearse.md` (What to watch; The last pass).
- Related: [[review-format]], [[stress-scenarios]], [[states-are-the-work]].
