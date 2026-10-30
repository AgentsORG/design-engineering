---
title: cmd-break
summary: "/design-engineering break [component | screen]" — feed one piece of UI the realistic worst case behind a dev-only toggle, report every break as Broken / Ugly / Fragile with the fix, then stop; fixes only on `fix all` or `fix 1,3`.
tags: [command, testing, worst-case, judge]
---

# /design-engineering break

Aliases: `worst-case`, `break-ui`. **Posture: adversary, then judge.** Build the worst-case data and the toggle, report, and stop. Never fix the component until the user names which breaks to fix.

## Target

One component or screen. A whole app is narrowed to the piece with the most user-authored data; say which and offer the rest as follow-ups. With no target, ask for one in a single line.

## Steps

1. **Map.** Read [[stress-scenarios]] and the component. List every value it renders — counts, timestamps, badges, labels from data, avatars, the list's own length — with its source, its limit from the schema, migration, API type or `maxLength`, and whether it's optional. No limit is written as "unbounded", and that's already a finding.
2. **Build the worst case.** One fixture shaped like the existing demo data, failures spread across the first rows rather than piled into row 1. Every value plausible or at the real limit, never keyboard mash. Add Empty, One (every count at 1) and a 1,000-row state if the list is unpaginated.
3. **Wire the toggle.** Swap fixtures at the data boundary, never by editing markup. A dev-only segmented control (`Demo / Worst case / Empty / One / 1,000`), bottom-centre, plain harness chrome, selection in the URL (`?data=worst`). No project → one self-contained HTML file.
4. **Break it.** Check at the real container width, 320px and the widest layout; at 200% zoom; under `dir="rtl"` and in dark mode if the product ships them. Match each break against the failure-signature table in [[stress-scenarios]] and the truncation rules in [[line-behavior]]. Say which findings were seen in a screenshot and which were inferred from CSS.
5. **Report and stop.** Use the output below, leave the toggle running, and wait. On `fix all` or `fix 1,3`, apply only those fixes using the project's conventions, then flip through *every* state again, Demo included, so a worst-case fix can't regress the happy path. Keep the fixture; remove only the toggle when asked.

## Output

1. **What broke** — a table: # · Severity (Broken = unreadable, unreachable or wrong data; Ugly = readable but visibly off; Fragile = fine until one realistic step more) · Field · Worst-case value · What happens · Fix with `file:line`. Worst first.
2. **Decisions for you** — breaks with more than one right answer (wrap or truncate, what an empty role shows, paginate or virtualize), one line each with a recommendation.
3. **What held up** — the cases already handled, so the test reads as real.

Close with the toggle's URL or path, its states, and "Say `fix all` or `fix 1, 3`."

## Hand-offs

- Taste and polish rather than robustness → [[cmd-review]] or [[cmd-polish]].
- Overflow or layout root causes → [[growth-and-overflow]]; RTL → [[logical-properties-rtl]]; copy, plurals and dates → [[strings-and-locale]]; missing empty or loading states → [[empty-loading-states]].
- Undecided between directions, not stress-testing one → [[prototype-picker]].
