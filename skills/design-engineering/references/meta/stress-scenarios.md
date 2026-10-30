---
title: stress-scenarios
summary: Render one component under every scenario that can actually reach it — content length and shape, quantity, container width, state — each axis kept only when its cue matches, side by side on a throwaway harness page that is itself the report. Product states (data, account, feature) come from branches the code already has, fed at the data boundary. Viewing modes are named for the user to toggle, never simulated.
tags: [meta, testing, states, harness, robustness]
---

# Stress scenarios

A component looks finished with the mockup's copy, three rows and a 1280px container. Production sends it an empty string, a German label, 400 rows and a 320px sidebar. Render the hostile cases before users do, and keep only the ones the component can actually receive — stress what varies, nothing else. [[states-are-the-work]] says why states matter; this node is how to make them all visible at once.

## Axes and their cues

| Axis | Keep it when… | Scenarios |
|---|---|---|
| Content length | it renders text it doesn't author (user input, CMS, API, translations) | empty · one word · typical · several sentences · one unbreakable string (a long URL, `Donaudampfschiffahrtsgesellschaft`) |
| Content shape | text can come from users or locales the team doesn't write in | emoji alone and mixed · RTL · mixed direction · diacritics and tall scripts · figures that must align |
| Quantity | it repeats over items | zero · one · the realistic count · ten times that |
| Container | always | a 320px container · squeezed by a flex or grid sibling · very wide |
| State | it receives the state as a prop | loading · error · disabled |

Write the kept scenarios down first, one line each, and the dropped axes with a reason in one line, so a wrong inference is cheap to catch. A static icon button with a fixed label gets container and environment, never long text. Add any value the component's own data makes worse — the longest real option, copied into a fixture.

**Every hostile value is realistic or the real limit.** A hyphenated, accented two-part surname, a 60-character corporate email, a two-letter first name, a workspace of 1,284 — or the exact cap from the validation schema, the column type, or the form's `maxLength`. Random strings get dismissed as "never happens" and end the conversation. No limit anywhere is a finding ("unbounded"); so is a 50-character input saving to a 255-character column, because imports and the API will send the longer value. Spread the failures across the first rows the way real data does, rather than stacking them in row 1.

## Failure signatures

| What you see | Cause | Fix |
|---|---|---|
| Avatar or icon squished into an oval | flex child shrinking | `flex-shrink: 0` on fixed-size boxes |
| Text pushes past its box; trailing ••• off-screen | `min-width: auto` on the text column | `min-width: 0` (grid: `minmax(0, 1fr)`); `flex-shrink: 0` on the action |
| Email or URL runs off the edge | no break opportunity | `overflow-wrap: anywhere` ([[line-behavior]]) |
| Badge wraps to two lines | badge allowed to shrink | `white-space: nowrap; flex-shrink: 0`, and decide what yields |
| Avatar adrift beside a three-line name | `align-items: center` on wrapping rows | top-align once text can wrap |
| Diacritics or tall scripts clipped | tight `line-height` + `overflow: hidden` | looser leading, no clip on text boxes |
| Orphaned `—` where an optional field was | placeholder for missing data | omit the line, or reserve its height on purpose |
| "1 members", `1284`, `NaN` | hardcoded plural, raw number | `Intl.PluralRules`, `Intl.NumberFormat`, guard null ([[strings-and-locale]]) |
| Broken-image icon, wrong initials | no `onError`, naive `split(' ')[0][0]` | fallback chain in [[avatar-systems]] |
| 1,000 rows stutter | every row rendered | virtualize or paginate ([[performance-discipline]]) |

## Product states come from the code

For a component you'll keep working on, render its product states one at a time behind a switcher instead of stacked:

| Kind | States |
|---|---|
| Data | loading · empty · error · one item · a typical set · long enough to scroll or paginate · some resolved, some pending · stale while refetching |
| Account | plan tier · role and permission checks · owner vs member |
| Feature | flags · trials · limits reached · locked |

A state the code cannot reach is not a state: never add a branch to render one; list a designed-but-missing state as missing. Feed fixtures at the **data boundary** — the hook, the fetch, the store — never by editing the component.

## The harness

A throwaway route, scenarios side by side, each in a fixed container (a box on the page, not a resized viewport), the breaks marked. The page is the deliverable: build, look once, report what visibly broke, and name the node that owns each fix ([[line-behavior]], [[growth-and-overflow]], [[logical-properties-rtl]], [[empty-loading-states]], [[wcag-thresholds]]). Afterwards, delete the route and toggle in one step and grep for them, but **keep the worst-case fixture** beside the demo data: it is the regression test for the next person who touches the component. The harness rules match [[prototype-picker]]'s: visibly outside the design system, never imported by product code.

**Viewing modes are the user's to toggle** — dark mode, browser zoom, reduced motion, keyboard focus. Name them in the report; re-declaring dark tokens under a class on the page observes a different component. Direction is content, not a viewing mode: wrapping a scenario in `dir="rtl"` is fair. The full run, toggle and report is [[cmd-break]].

## Gotcha

Isolation is the point here and the trap in [[prototype-picker]]: stress tests run in a bare harness because the question is whether the component defends itself; design variants run on the real page because the question is how it looks in context. Don't swap them.

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, read 2026-10-25): `skills/break/SKILL.md`, `break/scenarios.md`; `skills/state-machine/SKILL.md`, `state-machine/switcher.md`. With the companion installed, `/break` and `/state-machine` own the run ([[interfaces-reconciliation]]).
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/break-ui/SKILL.md, skills/break-ui/CATALOG.md (realistic values, failure signatures, keeping the fixture).
- Related: [[states-are-the-work]], [[content-authenticity]], [[skill-router]].
