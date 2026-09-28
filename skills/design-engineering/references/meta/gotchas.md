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
- [2026-09-05] Agent added a click sound to every button and a "whoosh" to every route change. Users muted the whole site within a day. → Sound only on daily and rare moments, off by default. See [[sound-decision-framework]].
- [2026-09-05] Agent created `new AudioContext()` at module load; sounds silently dropped until the second click. → Create and resume inside the first user gesture. See [[sound-playback-web]].
- [2026-09-05] Agent shipped a generated "success" sound with 40ms of leading silence; it read as lagging behind the check animation. → Trim to the first sample above −60 dBFS; transient on the contact frame. See [[sound-spec]] and [[sound-motion-sync]].
- [2026-09-05] Agent prompted ElevenLabs with "futuristic UI success sound" and got a stock jingle with reverb. → Describe a material and a stick, add "dry, no tail", request 0.5s and cut. See [[sound-generation-elevenlabs]].
- [2026-09-05] Agent pulled five sounds from three CC0 packs; the product sounded like a browser toolbar. → One material per product; re-pitch a single family. See [[sound-palette]].
- [2026-09-05] Agent laid a music bed under a logo reveal to hide the sync work; the piece felt cheap. → Cut with no bed first; place hits on frames; add a bed at −24 LUFS or not at all. See [[launch-video-sound]].

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
- [2026-09-05] Agent copied the parent's 16px radius onto a nested card; corners pinched. → inner = outer − padding. See [[depth-and-nesting]].
- [2026-09-05] Agent "fixed" grey-on-grey text by raising saturation; contrast unchanged. → move L only. See [[color-scales-oklch]].
- [2026-09-05] Agent put `text-wrap: balance` on body paragraphs; every column narrowed. → headings balance, paragraphs don't. See [[line-behavior]].
- [2026-09-05] Agent hid a closed drawer with `opacity: 0`; keyboard users tabbed into it. → `inert` or `visibility: hidden`. See [[touch-and-focus]].
- [2026-09-05] Agent sprinkled `will-change: transform` on every card "for performance". → only after an observed first-frame hitch. See [[performance-discipline]].
- [2026-09-05] Agent restyled a generated hero without deleting anything; the tells survived under new colors. → subtract first. See [[unslop-pass]].
- [2026-09-05] Agent rotated an SVG arm around (0,0) — it orbited the corner. → `transform-box: fill-box` + explicit origin. See [[svg-animation]].
- [2026-09-05] Agent morphed a four-line rect into a four-arc circle with CSS `d`; Safari jumped. → same command count and type. See [[svg-path-morphing]].
- [2026-09-05] Agent loaded four craft skills at once for one review and applied none properly. → one or two owners. See [[skill-router]].
- [2026-09-28] Agent chained 60 s of morphs because "launch films don't cut"; it read as a screensaver. → Cut on a cause, a constant ground or the element being read; Skale's client films cut ~4/min, acclaimed in-house or uncredited films ~16/min. See [[launch-video-cuts]].
- [2026-09-28] Agent crossfaded two opaque scenes on the same ground; the midpoint dimmed like a flash. → Hard-cut on a continuous ground, or fade the content to a bare surface identical to the next first frame, then cut. See [[launch-video-cuts]].
- [2026-09-28] Agent answered a pull-back exit (scale → 0.8) with a grow-from-small entry (0.75 → 1); the seam stuttered. → Z direction is the sign of scale: 1.2 answers 0.75, 0.8 answers 1.25. See [[launch-video-seams]].
- [2026-09-28] Agent put a zeta-1/3 spring on every arrival in a brand film; it read as a toy. → Exponential settle by default; visible overshoot is a register (4 of 29 Skale films, 3 of 18 acclaimed). See [[launch-video-motion]].
- [2026-09-28] Agent added a breathe loop (`yoyo`, `repeat: -1`) to a held card to keep it alive. → Nothing decorative moves on a UI object; creep the camera on its entry vector or add story. See [[launch-video-motion]].
- [2026-09-28] Agent resampled a 24 fps reference to 30 fps and quoted a studio reel as house style; pulldown faked 4-frame moves, and the reel is 33 % still against 12 % for the client films. → Native fps, cuts recounted by eye, compare within a register. See [[launch-video-review]].
- [2026-09-28] Agent typed a prompt the viewer must read at 50 characters a second. → ~15 c/s to be read, ~53 only to be recognised. See [[launch-video-ui-demo]].
- [2026-09-28] Agent mastered a 60 s walkthrough to −14 LUFS "because platforms normalize". → Loudness is a register choice (medians ≈ −18 LUFS; the four loudest acclaimed films all run 38 s or less, at −12 to −13); keep −1 dBTP. See [[launch-video-sound]].
- [2026-09-28] Agent laid a retrieved music bed from 0 s at a flat level; the drop landed on nothing. → Trim the head so the drop lands on the reveal; break down under reading. See [[launch-video-music]].
- [2026-09-28] Agent placed a library click by its file start; 158 ms of baked lead-in landed it 4 frames late at 24 fps. → Onset = first sample above 5 % of peak; trim it and place it where the press bottoms out. See [[sound-motion-sync]].
- [2026-09-28] Agent mixed the film's sound in an editor after render; the next re-render shipped silent. → Every audio clip lives in the composition, each `<audio>` with its own id (an id-less one renders silent). See [[sound-from-motion]].
- [2026-09-28] Agent followed HyperFrames' distributed crossfade default and jitter loops inside a motion-doctrine project. → Where HyperFrames' layers disagree, motion-doctrine wins. See [[hyperframes-reconciliation]].
- [2026-09-28] Correction to the 2026-09-05 bed entry: its −24 LUFS was never measured. → A reveal under 15 s takes no bed (register A); any other bed or track needs its structure on picture events, at a loudness written for the register (−1 dBTP is the only fixed number). See [[launch-video-sound]] and [[launch-video-music]].
