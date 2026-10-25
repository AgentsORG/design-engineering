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

## Product states come from the code

For a component you'll keep working on, render its product states one at a time behind a switcher instead of stacked:

| Kind | States |
|---|---|
| Data | loading · empty · error · one item · a typical set · long enough to scroll or paginate · some resolved, some pending · stale while refetching |
| Account | plan tier · role and permission checks · owner vs member |
| Feature | flags · trials · limits reached · locked |

A state the code cannot reach is not a state: never add a branch to render one; list a designed-but-missing state as missing. Feed fixtures at the **data boundary** — the hook, the fetch, the store — never by editing the component.

## The harness

A throwaway route, scenarios side by side, each in a fixed container (a box on the page, not a resized viewport), the breaks marked. The page is the deliverable: build, look once, report what visibly broke, and name the node that owns each fix ([[line-behavior]], [[growth-and-overflow]], [[logical-properties-rtl]], [[empty-loading-states]], [[wcag-thresholds]]). Delete it in one step afterwards and grep for its route. The harness rules match [[prototype-picker]]'s: visibly outside the design system, never imported by product code.

**Viewing modes are the user's to toggle** — dark mode, browser zoom, reduced motion, keyboard focus. Name them in the report; re-declaring dark tokens under a class on the page observes a different component.

## Gotcha

Isolation is the point here and the trap in [[prototype-picker]]: stress tests run in a bare harness because the question is whether the component defends itself; design variants run on the real page because the question is how it looks in context. Don't swap them.

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, read 2026-10-25): `skills/break/SKILL.md`, `break/scenarios.md`; `skills/state-machine/SKILL.md`, `state-machine/switcher.md`. With the companion installed, `/break` and `/state-machine` own the run ([[interfaces-reconciliation]]).
- Related: [[states-are-the-work]], [[content-authenticity]], [[skill-router]].
