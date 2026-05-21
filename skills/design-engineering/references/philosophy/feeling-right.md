---
title: feeling-right
summary: Optimize for "feeling right," not just "working." This is the part the model cannot infer from training data.
tags: [philosophy, taste, feel]
---

# Feeling right

A UI can be technically correct, accessible, performant, and consistent — and still feel cheap. "Feeling right" is the residual quality that's left after every other box is ticked. It's also the part of design engineering that LLMs are weakest at.

Benji Taylor: *"Claude got morphing icons technically correct, but couldn't tell when something looked wrong. That judgment is human."*

## What feeling right means

- Motion clarifies intent rather than decorates.
- The first frame and the last frame both look intentional, not accidental.
- Persistent elements stay continuous (see [[fly-not-teleport]]).
- A lifeless product feels uncared for; a lifeless product *is* uncared for.
- The thing the user notices last, after using it for a week, is the thing the designer worked hardest on.

## How to test for "feels right"

You cannot test this with automated checks. You can only test it with:

- **The next-day review.** Build it, sleep, look again. If you still like it, ship it. Emil's principle.
- **The phone-call test.** Demo to a friend on a phone call. If they say "wait, what?" the timing is off.
- **The slow-motion playback.** Record the interaction, slow it to 25%, watch each frame. Almost every motion bug shows up here.
- **The cold-eyes test.** Hand it to someone who has never seen the product. Their first reaction is the truth.

## When to apply

- Use this as the **final** check, after correctness, accessibility, performance, and consistency.
- If the user says "it works but something's off," this is the cluster to load. The fix is rarely a single property; usually it's the rhythm and timing across several elements.
- See [[delight-impact-curve]] for *where* feeling-right is most worth chasing.

## Gotcha

"Feeling right" is not a synonym for "fancy." A static screen with the right hierarchy, type, and color feels more right than a busy screen with five animations. Restraint reads as confidence; over-design reads as anxiety.

## Sources

- Benji Taylor — [benji.org/agentation](https://benji.org/agentation), [benji.org/morphing-icons-with-claude](https://benji.org/morphing-icons-with-claude).
- Emil Kowalski — Sonner principles, "review work the next day."
