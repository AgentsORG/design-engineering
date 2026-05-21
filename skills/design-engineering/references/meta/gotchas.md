---
title: gotchas
summary: Lived failures. Append a one-liner every time the agent gets a UI detail wrong.
tags: [gotchas, append-only]
---

# Gotchas

This file is **append-only**. Each time the agent (or you) gets a UI detail wrong in practice, add a one-line gotcha here. Do not edit existing entries unless they're outright wrong.

The Perplexity Agent Skills team calls this the "gotchas flywheel." Negative examples are the highest-signal content in a skill over time. The skill's description and instructions should change rarely; this file should grow steadily.

## Format

```text
- [YYYY-MM-DD] One-line description of the gotcha. → fix in [[node-name]]
```

## Starter gotchas

- [2026-05-21] Agent set `transition: all` on a card with `width` defined. Caused layout thrash on hover. → Animate only `transform` and `opacity`. See [[transform-opacity-only]].
- [2026-05-21] Agent generated a hover state with `transform: translateY(-4px)` on a list row. Felt bouncy and amateur. → 1px shifts. See [[hover-states-subtle]].
- [2026-05-21] Agent reached for `<Spinner />` on a 200ms API call. Created a flash. → No spinner under 800ms. See [[empty-loading-states]].
- [2026-05-21] Agent crossfaded two icons for play/pause toggle. Looked like two separate elements. → Transform a single icon. See [[fly-not-teleport]] and [[icon-systems]].
- [2026-05-21] Agent set `prefers-reduced-motion` to disable *all* animations including 120ms opacity fades. Made the UI feel broken. → Disable translations/scales, keep opacity. See [[prefers-reduced-motion]].
- [2026-05-21] Agent used a single 16px shadow for elevation. Looked flat. → Layered shadows at 4–6% opacity. See [[shadows-whisper]].
- [2026-05-21] Agent picked Inter for a marketing page. Indistinguishable from every other AI page. → Pangram, Geist, or Displaay. See [[typography-humanity]].
- [2026-05-21] Agent applied `prefers-reduced-motion` to disable a loading spinner without providing a static replacement. Critical accessibility miss. See [[prefers-reduced-motion]].

## Why this file matters

A skill's description and main nodes encode the **happy path** — what to do. Gotchas encode the **failure mode** — what *not* to do, with examples. The model uses both to triangulate.

The Perplexity team finds gotchas often help more than positive guidance. If you're unsure whether a piece of advice belongs in a main node or here, **prefer here**.

## When to add

- Every time the agent gets a detail wrong.
- Every time a real user reports a UI issue caused by AI-generated code.
- Every time a code review flags a regression on a polished interaction.

## Don't put

- Things the model already knows from training data (write commands, syntax).
- Personal taste calls — those go in [[pov]].
- Long explanations — keep gotchas to one line. If it needs explanation, link to a node.

— append below this line —
