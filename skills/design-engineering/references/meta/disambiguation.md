---
title: disambiguation
summary: The intents that blur together — four motion questions, three dark-mode owners, two layout-shift owners — and which node owns each.
tags: [meta, routing, disambiguation]
---

# Disambiguation — the questions that blur together

Some questions sound identical but route to different nodes. Misrouting here is the most common navigation failure in this graph: the answer you get is *plausible* but from the wrong altitude. This node lists the known confusable pairs and the tiebreaker for each.

## The four motion questions

"Something about animation" is four different jobs:

| Question | Owner |
|---|---|
| How should *this one thing* animate? | [[animation-decision-framework]] → [[easing-curves]], [[duration-table]] |
| Is *this diff's* animation good? | [[motion-auditor]] (motion-only, deeper) or motion rows in a [[review-format]] table |
| What's wrong with motion across the *whole app*? | [[motion-auditor]] in audit mode — output is a prioritized plan, not a table |
| Where is motion *missing*? | [[delight-impact-curve]] + [[responsive-feedback]] — propose few, reject most |

Tiebreaker: scope. One element → decide/build nodes. One diff → judge posture. Whole codebase → audit plan. Absence of motion → the delight nodes, and the burden of proof is on *adding*.

## Looks right vs. feels finished vs. should ship

- **Looks right** — hierarchy, spacing, restraint, while designing → [[feeling-right]], [[unseen-details-compound]].
- **Feels finished** — press states, tabular numbers, no layout shift, after it works → [[ui-polish-pass]] as the finishing pass, [[review-checklist]] as the audit.
- **Should ship** — a verdict on a diff, at the gate → [[review-format]] table, checklist-scoped.

Two more that blur: **feels wrong vs. drops frames** — judged motion goes to [[easing-curves]] and [[duration-table]]; measured slowness goes to [[performance-discipline]]. **Broken for someone vs. merely unpolished** — a failure in [[touch-and-focus]] is blocking; polish is not.

Same screen, three altitudes. Don't give a gate verdict when the user is still designing.

## Layout shift has two owners

- Shift because things are **slow to arrive** — skeletons that don't match loaded dimensions, unreserved space → [[empty-loading-states]].
- Shift because things are **animated wrong** — layout-property transitions, `width`/`top` animation → [[transform-opacity-only]].

Tiebreaker: does it happen once (loading) or on every interaction (animation)?

## Dark mode has three owners

- The **palette** — how colors derive, desaturation, preserved layering → [[dark-mode]].
- The **treatment** — shadows lose their job in dark; borders take over → [[shadows-whisper]].
- The **principle** — dark mode is a redesign, not an inversion → [[color-monochromatic]].

A dark-mode question that names a hex value routes to palette; one that says "looks flat in dark" routes to treatment.

## Hit areas: craft vs. floor

[[hover-states-subtle]] treats target sizing and feedback as craft. [[accessibility-baseline]] treats the same numbers as a floor you cannot trade away. An a11y audit routes to the floor; a polish pass routes to the craft node — but the floor still applies.

## Sound has three owners

- **Should it make a sound at all** — frequency and purpose, before any file exists → [[sound-decision-framework]]. The burden of proof is on adding.
- **It has sounds and something is off** — stock, late, too long, too loud, no toggle → [[sound-palette]] for character, [[sound-motion-sync]] for timing, [[sound-spec]] for numbers, [[sound-playback-web]] for wiring.
- **It is a video, not a product** → [[launch-video-sound]]. Opposite defaults: silence is placed, sound is the medium.

Tiebreaker: is there a user who can mute it? If yes, product rules. If no (video), the launch register.

## Component look-alikes

Tooltip vs. popover, badge vs. tag, sheet vs. drawer vs. dialog → [[component-confusables]] owns these. Don't adjudicate them from memory.

## Gotcha

When two owners both seem right, answer from the *narrower* one and link the other — a specific node's values with a pointer beats a blended answer from both.

## Sources

- HKTITAN — confusable pairs collected from real misroutes; see [[routing-table]] for the forward map.
