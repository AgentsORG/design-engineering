---
title: pointing-beats-describing
summary: Precise machine-readable selection (selectors, file paths, coordinates) outperforms natural-language description when feedback goes to an AI agent.
tags: [philosophy, feedback, agentation, agents]
---

# Pointing beats describing

Benji Taylor's framing from [agentation.com](https://www.agentation.com) and [benji.org/annotating](https://benji.org/annotating): when feedback is destined for an AI coding agent, **precise selection beats prose every time**.

A user saying "the blue button in the sidebar looks misaligned" sends the agent on a search through the codebase. A user clicking on that button and producing `.sidebar > button.primary { class="cta is-large" }` sends the agent directly to the right line.

## The principle

| Prose feedback | Pointing feedback |
|---|---|
| "the blue button in the sidebar" | `.sidebar > button.primary` |
| "the spacing on the card feels off" | annotation on `.product-card`, file `src/components/ProductCard.tsx:42`, computed style `padding: 16px 12px` |
| "make this section more interesting" | annotation on `<section id="hero">`, with reference: "like Stripe's homepage hero" |
| "the dark mode is wrong" | annotation on `body.dark`, computed style `background: #000`, fix link to [[dark-mode]] |

The right-column versions cost the user marginally more effort but cost the agent **much less context to act on correctly**.

## Why this matters now

LLM coding agents are good at execution, weaker at search. Every token spent searching is a token not spent on the actual fix. Selectors, file paths, and computed styles compress search-cost to near-zero.

This is why tools like [Agentation](https://www.agentation.com) exist — they let humans *click* elements instead of describing them, then emit structured selectors the agent can grep for directly.

## Where pointing applies

- **UI review feedback** — annotate the element; don't describe it.
- **Bug reports to an AI agent** — include selectors, console errors, file paths.
- **"Build me X" requests** — link a reference (screenshot, URL, or comparable product), don't write a 500-word description.
- **Code reviews destined for an agent fix** — quote the exact lines.

## Where prose still wins

- **Justifying *why*** — "this feels off" needs prose to explain the principle ("the elevation hierarchy is inverted — child elements have stronger shadows than parents"). Pointing identifies the WHAT; prose explains the WHY.
- **Naming the principle** — "this violates visual hierarchy" or "this is a Gestalt grouping issue" — invoking the principle gives the agent the right vocabulary to look up.
- **Talking to humans** — humans interpret prose better than selectors. Use pointing when the audience is the agent; use prose when the audience is a designer or PM.

## The two-channel pattern

Best feedback combines both:

> [Click annotation on `.product-card`, file `ProductCard.tsx:42`]
>
> "The padding feels cramped — `16px 12px` reads as B2B form-density, not the consumer-feel we're going for. Bump to `24px 20px` to match the hero card. See [[border-radius]] for the parallel-padding-to-radius rule."

The pointing tells the agent **where**. The prose tells it **why and what**. The wikilink tells it **the principle**.

## When to apply

- Any time you're giving feedback that an agent will execute.
- Any time you're authoring a design-review document that includes an agent in the workflow.
- Any time you're tempted to write "the X in the Y" — instead, click the X and let the tool generate the selector.

## Tools that enable pointing

- **Agentation** — the productized version. Toolbar in your localhost app, click → annotate → emit selectors. Recommended for any installer of this skill. See [[agentation-workflow]] for installation.
- **Browser DevTools "Copy selector"** — manual but free. Right-click any element → Inspect → right-click in DOM → Copy → Copy selector.
- **Chrome's Recorder** — captures a full user-flow as selectors + actions. Heavier; useful for repro steps.
- **Screenshot annotations** (CleanShot, Figma, Loom) — visual pointing rather than DOM pointing. Works for non-web UIs.

## Gotcha

Don't use this principle as an excuse to skip explanation. A bare selector with no rationale ("`.sidebar > button.primary` — fix it") is *worse* than prose, because the agent has no idea what's wrong. The principle is *pointing + reason*, not *pointing instead of reason*.

Also: brittle selectors break. `.product-card > div:nth-child(3) > span` is technically a selector but it's lottery-ticket fragile. Prefer semantic selectors (`[data-testid="product-card-name"]`) or className-stable ones (`.product-card__name`).

## Sources

- Benji Taylor — [benji.org/annotating](https://benji.org/annotating), [benji.org/agentation](https://benji.org/agentation).
- [Agentation](https://www.agentation.com) — the productized version.
- Related: [[agentation-workflow]] (how to install + use Agentation), [[feeling-right]] (the prose-side of feedback), [[review-format]] (structured UI-critique format).
