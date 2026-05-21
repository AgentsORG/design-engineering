---
title: pov
summary: Author/installer's opinions and taste calls. Edit this file to make this skill yours.
tags: [pov, opinion, customizable]
---

# Point of View

This file is **meant to be edited by you**. The rest of the skill is mostly canonical — Emil, Benji, Jakub, guidelines.sh — but this file is your override layer. When you install this skill, fork it for your own taste.

## How to use this file

Add opinions that override or extend the defaults in the rest of the skill. Two types are useful:

1. **Hard overrides** — "I never use X." or "I always prefer Y over Z."
2. **Taste calls** — "When in doubt, lean toward A because B."

Be specific. Vague taste statements ("I like clean UI") don't help the agent. Concrete taste statements ("I prefer 1px borders to 2px in all cases; if a border needs more visual weight, increase color contrast not width") do.

## HKTITAN's POV (starter)

The author of this skill (HKTITAN, harshitkhemani@gmail.com) leans:

- **Monochromatic with a single warm accent.** Default to zinc-based neutrals; reach for a single warm accent (amber, peach, terracotta) before any cool one.
- **Geist over Inter.** When choosing between system defaults, Vercel Geist wins.
- **2.5px stroke icons.** I match icon stroke to a 500-weight font. If using Phosphor, "bold" weight.
- **No purple gradients. Ever.** Even on marketing pages. Use solid color or texture instead.
- **No Lottie animations.** The file size and complexity cost is rarely worth it. CSS or Motion with code-defined animations beat hand-tuned After Effects exports for product UI.
- **Dark mode is the default.** Build dark first; light mode is the variant. This reverses a common workflow but produces tighter dark-mode polish.
- **Asymmetric durations always.** Exit at 60% of enter. Non-negotiable per [[duration-table]].
- **`text-wrap: pretty` everywhere except labels.** It's free quality.

## Your POV (delete the above and fill in yours)

> Replace this block when you install this skill. Examples:
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

Always. Before producing UI code or a review, the agent should load this file alongside [[gotchas]] to know what the installer's tastes are.

If the user explicitly says "ignore my pov" or "use canonical defaults," the agent should skip this file for that response only.

## Sources

- Perplexity Agent Skills team — the "inject your opinion" principle.
- Henry Modisett (Perplexity head of design) — design Skills written for personal taste.
