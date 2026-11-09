---
title: cmd-motion
summary: "/design-engineering motion [remove | opportunities | audit] [target]" — decide whether motion should exist, then judge or build timing, easing, springs, transitions, gestures and stagger with concrete values; subtract over-animation, find the few places that should move, or audit a codebase into executable plans.
tags: [command, motion, judge, decide, build, audit]
---

# /design-engineering motion

**Posture: decide first, then judge (code in hand) or build (greenfield).** The modes below change the posture; bare `motion` is judge or build.

## Steps

1. Read [[animation-decision-framework]]. If the motion should not exist, recommend removing it, name the frequency or purpose test it fails, and stop.
2. Classify the pattern and open only its nodes:
   - enter or exit → [[easing-curves]], [[duration-table]], [[never-scale-from-zero]], [[compose-subtract-asymmetry]]
   - hover or press → [[hover-states-subtle]], [[responsive-feedback]]
   - drag, swipe, flick or momentum → [[gesture-phases]] (track vs release, dismissal), [[momentum-projection]] (where a release lands), [[gesture-momentum]], [[spring-animations]]
   - two or more elements moving on one event (a view swap, a removal while siblings reflow, a success sequence) → [[motion-choreography]] first, then [[stagger-choreography]] for the gaps
   - lists → [[stagger-choreography]]
   - a state change in place → [[fly-not-teleport]], [[cross-blur-transitions]]
   - jank → the jank branch below
   - React Native or Expo → [[react-native-motion]]
   - a canonical CSS transition → the transitions.dev catalog, values checked against [[duration-table]]
3. Apply [[prefers-reduced-motion]], [[gotchas]] and [[pov]].
4. If the target is a branch, a PR or uncommitted work, also read [[change-scoped-review]]: judge only the motion the diff touches, check removed lines for lost reduced-motion or hover gating, and give each row a status. Only Introduced and Regression rows can Block.

## Build sequence (greenfield)

Run in order; steps 1–2 can end the job with zero code, which is a valid result.

1. **Frequency gate** — 100+/day or keyboard-triggered: stop.
2. **Purpose** — name one word from [[animation-decision-framework]], or stop.
3. **Tool** — the cheapest that works (CSS transition → `@starting-style` → CSS animation → WAAPI → Motion).
4. **Properties** — `transform`/`opacity`; origin at the trigger (modals exempt) ([[transform-opacity-only]]).
5. **Curve and duration, or a spring** — from [[easing-curves]], [[duration-table]], [[spring-animations]]; never invent a value.
6. **Interruption and exit** — transitions for anything fired twice a second; exit along the entry path, quieter.
7. **Reduced motion and hover gating** — ship with the animation, not after.

If the user can't name the effect they want, settle the word with [[design-vocabulary]] before step 3. Once it is built, judge it in the [[review-format]] table.

Output the code, then three lines: gate result, ingredients, and what to feel-check (2–5× slow motion, real device) ([[debugging-animations]]).

## Jank branch

Inventory before you diagnose: one row per animation, `element · driver · properties really animated · plays during` (a route change, a fetch, a drag, a hover). Expand `transition: all`, a bare Tailwind `transition` and Motion's `x`/`y`/`layoutId` into what they actually move. The plays-during column is what exposes busy-main-thread jank.

Name the cause before changing code. Walk the diagnosis order in [[performance-discipline]]: property tier → busy main thread → per-frame React state → content-growth (inherited CSS variable) → animated CSS variable → blur over 20px → only then `will-change`. Report each finding as `file:line` · Cause · Before · After · Verified (from code / needs a device recording), ordered layout before paint, busy before idle.

## `motion remove`

Subtract only; never add or retune. Walk every animation through the gate (keyboard → 100+/day → functional data → purpose → tens/day → over budget), recording the deciding branch. Check [[animation-removal-hazards]] before each delete or reduce, edit, clean up orphans, grep removed names. Report: Removed and reduced (location · was · verdict · branch), **Kept** with the purpose that saved each, badly built survivors handed to `audit`, then a one-paragraph verdict. Propose, never perform, a dependency removal.

Here and in `audit`: when a comment or design doc explains why a motion exists or is tuned the way it is, note it and leave it alone. Settled decisions are not findings.

## `motion opportunities`

Read-only. Hunt feedback gaps, teleporting state, missing spatial story, all-at-once groups, physics-less gestures and flat rare moments. Every candidate passes four questions — frequency, purpose, speed (fits the budget), function (data being read doesn't move). Return at most 5–7 rows (location · today · purpose · frequency · exact motion values), a required **Rejected** list naming the question that killed each, and the single highest-leverage pick. "Nothing survives" is a good result. Never build a row from here: close by offering `motion audit` to turn a pick into a self-contained plan, or bare `motion` to build it through the build sequence. The opposite pass is `motion remove`.

## `motion audit`

Read-only on source; writes plans only, under `plans/` (or `animation-plans/` when `plans/` already holds something else).

Variants: `quick` covers high-traffic surfaces, HIGH only, about 5 rows; the default covers all interactive UI; `deep` covers the whole repo including marketing, plus LOW polish. A category word (`easing`, `performance`, `a11y`) narrows the audit and combines with `quick` or `deep`. `plan <description>` writes one plan with no audit. `execute <plan>` hands a plan to an executor in its own worktree, then reviews the diff with [[change-scoped-review]]. `reconcile` checks `plans/` against HEAD: marks finished plans DONE, refreshes stale `file:line`, retires fixed rows.

1. **Recon** — stack and motion libraries, existing easing and duration tokens, product personality, a frequency map.
2. **Audit** eight categories: purpose and frequency, easing and duration, origin and physicality, interruptibility, performance, accessibility, cohesion and tokens, missed opportunities. Fan out read-only subagents per category on large repos.
3. **Vet** every finding at its `file:line`; drop by-design and exempt cases. One table by leverage, severity HIGH (feel-breaking) / MEDIUM / LOW. Open it with the scope ("N surfaces audited, no source changed"); every row carries a count, a `file:line` and an exact value (ms, curve, scale). A row that only says "smoother" is not a finding. Stop for the user to pick.
4. **Plan** one self-contained file per pick, `NNN-slug.md`, stamped with `git rev-parse --short HEAD`: problem with current code quoted, exact target values, repo conventions with an exemplar, ordered steps, boundaries (stop if the code drifted), mechanical checks and a feel-check. Header: Status · Commit · Severity · Category · Scope. The feel-check includes the Animations panel at 10% and reduced-motion emulation in the Rendering panel (movement gone, opacity feedback kept; [[debugging-animations]]). Findings that share their files and the same fix (one class or token used by many components) merge into one plan listing every affected surface and the single edit. Update `plans/README.md` with order and status.

## Fix order

Propose the earliest move that works: delete → reduce (shorter, smaller, fewer properties) → easing → origin and scale floor ([[never-scale-from-zero]]) → interruptible ([[duration-table]]) → composite-only ([[transform-opacity-only]]) → asymmetric timing ([[compose-subtract-asymmetry]]) → polish ([[cross-blur-transitions]], [[stagger-choreography]]) → reduced motion and hover gating. Retuning the curve of a motion that shouldn't exist is the wrong fix.

## Output

- Code in hand: the [[review-format]] table. Every After names its numbers: the duration in ms, the easing token or curve, the properties animated. Order rows by tier: feel-breaking → should be removed → performance → interruptibility and timing → origin, physicality and cohesion → accessibility; leave out empty tiers.
- Close a review with **Block** or **Approve**, never a soft pass. Block on `ease-in` or `scale(0)` on UI, motion on a keyboard or 100+/day action, any other feel-breaking regression, or a layout-property animation with an obvious transform fix. Approve only when nothing should be deleted, timing and curves sit inside [[duration-table]] and [[easing-curves]], rapid or gesture-driven motion can be interrupted, and [[prefers-reduced-motion]] is honoured. Flagging is the default.
- Greenfield: the build-sequence output above, each value citing a `[[node]]`.

## Hand-offs

A launch film's motion → [[cmd-film]]; launch-film values do not transfer to UI ([[launch-video-motion]]). An SVG that moves → [[cmd-svg]] `animate`. Sonner setup or bugs → [[sonner-usage]]. You may delegate to the `motion-auditor` subagent where the host has it.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/animate/SKILL.md, skills/review-animations/SKILL.md (verdict, fix order, tiers), skills/animation-performance/SKILL.md (inventory), skills/improve-animations/SKILL.md, AUDIT.md and PLAN-TEMPLATE.md (variants, scope line, merge rule, plan header), skills/find-animation-opportunities/SKILL.md (hand-off).
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG: the choreography, drag and vocabulary pairings, and checkable audit rows.
