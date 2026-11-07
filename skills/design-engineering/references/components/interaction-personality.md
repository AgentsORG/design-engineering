---
title: interaction-personality
summary: Unique microinteractions, easter eggs, contextual feedback, sound. Personality lives in how the product responds, not how it looks.
tags: [components, interaction, personality, easter-eggs, sound]
---

# Interaction personality

Two products with identical visual design can feel completely different based on how they *respond* to the user. Personality lives in interactions, not in static screens.

## What "interaction personality" means

- A hover state that does something specific to this product, not a generic 1px shift.
- A success state that *celebrates*, even briefly, not a silent "Saved.".
- An error state that explains in a voice (see [[forms-validation]] copy).
- A button that has a tiny physical response (slight squish, subtle haptic on touch).
- A loading state that informs ("Fetching your last 30 days…") instead of spinning anonymously.
- An empty state that suggests a next step in the product's voice, not "No data."
- Easter eggs — hidden, never-prompted small delights for users who explore.

The total is what users mean when they say "the product feels alive."

## Easter eggs — when they're earned

Easter eggs work when they:
- Reward exploration without depending on it (no user must find them).
- Match the product's tone (a financial app's easter egg should still be on-brand).
- Are cheap to maintain (don't ship a complex hidden feature that breaks silently).
- Appear at moments of natural curiosity (404 page, settings deep-dive, long-press, secret keyboard combo).

Classic spots:
- **404 page** — the most-explored "broken" page in any product. Most companies put a generic robot there. Put something specific.
- **Long-press on logo** — credits, a thank-you, a small animation.
- **Settings → About** — version number that flips on click, a hidden joke, a contributors list.
- **Konami-code-style sequences** — for the truly curious.
- **First-of-its-kind moments** — first project created, first 100th visit, etc.

What easter eggs are NOT for:
- Surprising users in the middle of a critical flow (signup, payment).
- Adding personality the product otherwise lacks (you can't easter-egg your way out of bad core UX).

## Imperfect timing — varied micro-delays

Generic animation has uniform timing — every button responds the same way, every hover state has the same duration. Products with personality often vary timing slightly:

- Hover delays of 80ms on one component, 120ms on another, deliberately.
- A "Save" button that responds at 100ms; a "Delete" button that responds at 200ms (the 100ms extra reads as deliberation, which is right for destructive actions).
- A "Done" success state that holds for 800ms before fading; a "Continue" state that exits at 200ms.

This is the opposite of design-tokens-make-everything-consistent. Tokens are right for *visual* properties. Timing has more room for narrative pacing.

## Contextual feedback

Error messages, success states, and confirmations should reflect the user's specific action.

| Generic | Contextual |
|---|---|
| "Saved." | "Saved your 3 changes." |
| "Item deleted." | "Deleted project Atlas." |
| "Network error." | "Couldn't reach our server. Trying again in 4s…" |
| "Success!" | "Sent to 47 recipients." |

Specificity costs you almost nothing and signals attention. The agent doing the action knows what was done — surface it.

- **The answer lands on the thing that was pressed.** A button whose label changes changes on itself; a draft becomes the posted comment in place (Benji Taylor, Stageshow `references/motion.md`).

## Sound design (use sparingly)

Sound is a personality lever most products skip entirely. When done well:

- Tied to *specific* interactions, not generic events. A send-message ping is fine; a beep on every button click is grating.
- Designed by someone, not pulled from a stock library. Stock UI sounds are tells.
- Off by default with a clear toggle. Most users will keep it off, but the ones who keep it on become attached.
- Synced precisely to the visual animation. The sound and the motion are one event.

Examples done well: Linear's command palette open sound, Apple's "swoosh" on Mail send (in earlier versions), Honk's [bespoke sound design tied to each interaction](https://benji.org/honkish).

Examples done poorly: Microsoft Office's pre-2007 default sounds. Discord's default ping (lovable, but obviously stock).

The sound cluster goes deeper: [[sound-decision-framework]] for whether, [[sound-palette]] for the family, [[sound-motion-sync]] for timing.

## When to apply

- Consumer products where personality is a competitive advantage.
- Brand-led products (financial apps with attitude, music apps, social apps).
- Products with a strong founding voice that the team wants to preserve at scale.
- Onboarding flows specifically — every first impression is a personality opportunity.

## When NOT to apply

- B2B power-user productivity tools where consistency and predictability win. Adding personality to an analyst's dashboard slows them down.
- Healthcare, finance, or other contexts where users want the product to be *calm* and reliable, not playful.
- Anywhere the personality would conflict with the brand's primary value (a "professional" service shouldn't easter-egg about pizza).

## Reference

Bad: Resolve is pressed, nothing on it changes, and a generic "Success!" toast drops in at the corner 400ms later.
Good: the press scales the button to 0.97 at once; its label crossfades to "Resolved" in the same button while its width eases over 0.5s `cubic-bezier(0.22, 1, 0.36, 1)` so neighbours make room; a reply typed in its `Draft` settles into the posted comment, and "Just now" fades in on the name's line.

| Job | Timing |
|---|---|
| Direct feedback (press, hover, toggle) | starts on the input, as fast as the real product |
| A state the click sets | fades in over about 150ms |
| Storytelling (a result arriving, a number counting up) | may take longer than the action that caused it |

Gold example: `stageshow/kit/controls/Draft.tsx` and `stageshow/examples/form-error/` ("Creating account" to "Account created" on one button).
Benji's call differs: vary timing by job, not for flavour; direct feedback never waits, so a deliberate 200ms on Delete belongs in a confirmation step, not in the button's response.
Check: film one press at 40 to 80ms steps: the response starts in the frame after the input and lands on the pressed thing, and covering the toast loses nothing the button didn't already say.

## Gotcha

Personality lives in restraint. A product with one well-placed easter egg and one specific success message feels alive. A product with ten easter eggs and animated success states everywhere feels exhausting.

The Benji rule: *"A lifeless product feels like a dead product, and a dead product feels uncared for."* Add personality where it matters most, not everywhere.

## Sources

- Benji Taylor — *Honkish*, [benji.org/honkish](https://benji.org/honkish).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/motion.md` (Story; Pace and easing; a state the click sets), `stageshow/references/choreography.md` (Timing has different jobs), `stageshow/kit/controls/Button.tsx`, `stageshow/kit/controls/Button.css`, `stageshow/kit/motion/Roll.css`, `stageshow/kit/controls/Draft.tsx`, `stageshow/examples/form-error/index.tsx`.
- guidelines.sh — Interaction Personality category (unique microinteractions, easter eggs, imperfect timing, contextual feedback, sound design).
- Related: [[feeling-right]], [[delight-impact-curve]], [[forms-validation]], [[states-are-the-work]].
