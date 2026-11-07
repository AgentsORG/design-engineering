---
title: pov
summary: Installer's opinions and taste calls. Ships with a restrained default distilled from the graph plus AgentsORG's launch-film and diagram calls; fork it for your taste (examples in pov-examples/).
tags: [pov, opinion, customizable, launch-video, diagram]
---

# Point of View

This file is **meant to be edited by you**. The rest of the skill is mostly canonical — Emil, Benji, Jakub, guidelines.sh — and this file is your override layer. It ships with a **generalized default POV distilled from the skill itself**, not one person's aesthetic. Nothing here locks you into a look. When you install this skill, fork it for your own taste.

## How to use this file

Add opinions that override or extend the defaults in the rest of the skill. Two types are useful:

1. **Hard overrides** — "I never use X." or "I always prefer Y over Z."
2. **Taste calls** — "When in doubt, lean toward A because B."

Be specific. Vague taste statements ("I like clean UI") don't help the agent. Concrete taste statements ("I prefer 1px borders to 2px in all cases; if a border needs more visual weight, increase color contrast not width") do.

A taste call should *orient* a decision, not *amputate* a possibility. "Default to a restrained palette" trains better work than "never use color" — the first sharpens judgment, the second narrows the design before the problem is even seen.

## Default POV — distilled, not prescriptive

The skill ships with no personal aesthetic locked in. These are generalized taste calls distilled from the rest of the graph — they raise the floor without dictating a style. They tell the agent *how to decide*, not *what to pick*.

- **Default to no motion; make it earn its place.** Animate only for continuity, affordance, feedback, hierarchy, or spatial sense — never decoration. If the UI wouldn't feel broken without it, delete it. Per [[animation-decision-framework]].
- **Match delight to frequency.** The more often a user hits a moment, the less it can carry; keystrokes get nothing, rare milestones earn the big budget. Per [[delight-impact-curve]].
- **Constraints breed taste — derive them from the brand, not from habit.** Limit the palette and the type scale, but choose the limits from the product's content and audience, not a default. A tight, intentional system beats unlimited choice. Per [[taste-is-trained]].
- **Treat every color scheme as first-class.** Design light, dark, and high-contrast as peers; let the content and audience pick the default — not a workflow preference. Per [[contrast-and-color-scheme]] and [[dark-mode]].
- **States are the work.** Design empty, loading, error, partial, and permission-denied before the happy path — they're 80% of the product. Per [[states-are-the-work]].
- **Data is content.** Tables, charts, and dashboards earn the same typography, alignment, and whitespace care as marketing prose. Per [[data-is-content]].
- **Every dependency is a tax.** Replicate simple utilities, draw shapes in CSS, prefer native browser APIs. The bundle is part of the design. Per [[dependency-discipline]].
- **Imitate considered work before deviating.** Fluency first; originality is earned after the hundredth button, not before it. Per [[taste-is-trained]].
- **Optimize for "feeling right," not just "working."** Restraint reads as confidence; over-design reads as anxiety. The next-day review is the final gate. Per [[feeling-right]].

These are starting points, not walls. Override any of them in your own section below.

## Example forks

Five full forks ship in `pov-examples/`. Copy one over this file to adopt it, or borrow sections:

- `pov-examples/duolingo.md`: physical buttons, meaning-bearing colour, rounded lowercase type, celebration on the reward beat.
- `pov-examples/campus-binge.md`: calm, green and type-led; one gradient word per headline, light only, isometric stickers that play once, a peer-to-peer Hinglish voice.
- `pov-examples/smash-and-clash.md`: a toy you can press; tilted candy slabs on hard navy lips, one sun-yellow primary per screen, locked game colours, squash-and-pop springs, sound with a visual twin.
- `pov-examples/swiggy.md`: one orange pin across a family of businesses, Gilroy, everything in a rounded bento panel, a lead colour per business (Instamart blue, Dineout green).
- `pov-examples/cursor.md`: warm paper and warm ink, one orange accent, ink in opacity steps, a grotesk with a monospace for machine output.

A fork changes everything this skill produces. In the 2026-11-07 benchmark, the Duolingo fork (then the default) is why a plain settings modal came back with uppercase buttons and a loud green Save. Pick a fork on purpose, per product.

## Your POV (add yours below)

> The narrow, opinionated calls the defaults above deliberately leave open. Examples:
>
> - I always prefer ____ over ____.
> - In my products, ____ is non-negotiable.
> - Skip ____, even if the rest of the skill recommends it. The reason is ____.

### Launch films (AgentsORG)

The defaults above govern product UI. A rendered launch film follows these calls instead:

- **Default register.** An unspecified "make a launch video" gets Skale's UI-motion register ([[launch-video-registers]]): rebuilt UI on a light ground with one accent, type as the script, the newest word in the accent before it settles, holds that creep on their entry vector (still share near 10 %), and hard cuts hidden on a cause, a constant ground or inside a fill ([[launch-video-cuts]]). HeyGen's bouncy sting (zeta 1/3) only when someone asks for bounce.
- **"Lively" and "crazy" mean density and causality, not bounce.** Camera creep under every hold, rhythm that accelerates into a snap, a click that starts its consequence on the same frame, a glyph the camera dives through ([[launch-video-motion]], [[launch-video-seams]]).
- **Sound is OpenAI's register B, derived from the motion:** a bed in one key, clicks on the stamps, thuds on the landings, something taken away just before the name ([[launch-video-sound]], [[sound-from-motion]]). A licensed beat track only when its drop and breakdowns can be placed on picture events ([[launch-video-music]]). Never library blips dropped on frames.
- **Every film ships with its numbers** (cuts a minute, still share, loudness), measured on the render before it goes out ([[launch-video-review]]).

### Diagrams (AgentsORG)

The defaults above govern product UI. A diagram follows these calls instead. A project's `.design` or DESIGN.md still outranks all three ([[diagram-design-reconciliation]]).

- **The default skin is diagram-design's.** With no contract, a figure keeps diagram-design's shipped editorial skin: off-white paper, ink strokes, one tangerine accent, Instrument Serif titles, Geist names and Geist Mono labels. A fork's product palette, display type and button treatment never reach a figure. Answer diagram-design's first-run gate with "keep default", and offer the `profile: default` marker, writing it only with consent.
- **Ask who edits it next; with no answer, make a figure.** "Make a diagram" that names no reader or editor gets one question ([[diagram-decision]]). If nobody can answer it, as in a run with no one to reply, draw a finished diagram-design figure and note the assumption beside it. Open a tldraw board only when someone names one or says the team will keep editing it ([[tldraw-canvas]]).
- **Static by default; `step` when the order is the point.** A flow, a lifecycle or a policy trace whose meaning is the sequence gets diagram-design's `step` mode, where the reader clicks through. Everything else is static. No `reveal`, no `loop` and no autoplay unless someone asks. The launch-film "lively" taste does not carry over, because a figure is read, not watched ([[animation-decision-framework]]).

## Gotcha

Do not confuse POV with [[gotchas]]:

- **gotchas** = "the agent did this wrong, here's the right answer." Negative examples.
- **pov** = "I prefer this default over the canonical default." Taste overrides.

Both files grow over time. Both override the canonical content. But the framing is different.

## When the agent should consult this file

Always. Before producing UI code or a review, the agent should load this file alongside [[gotchas]] to know what the installer's tastes are. Treat the default POV as orientation, not constraint — it raises the floor; it does not cap the ceiling.

If the user explicitly says "ignore my pov" or "use canonical defaults," the agent should skip this file for that response only.

## Sources

- Perplexity Agent Skills team — the "inject your opinion" principle.
- Henry Modisett (Perplexity head of design) — design Skills written for personal taste.
- Distilled from this skill's own [[MOC-philosophy]], [[MOC-motion]], and [[MOC-surface]] clusters.
