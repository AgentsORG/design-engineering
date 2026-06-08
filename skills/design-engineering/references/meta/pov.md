---
title: pov
summary: Author/installer's opinions and taste calls. Edit this file to make this skill yours.
tags: [pov, opinion, customizable]
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

## Your POV (add yours below)

> This is where personal taste goes — the narrow, opinionated calls the generalized defaults above deliberately leave open. Examples:
>
> - I always prefer ____ over ____.
> - In my products, ____ is non-negotiable.
> - Skip ____, even if the rest of the skill recommends it. The reason is ____.

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
