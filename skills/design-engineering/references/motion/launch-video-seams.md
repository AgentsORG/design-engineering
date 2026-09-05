---
title: launch-video-seams
summary: How launch videos are made to feel alive and cut so scenes read as one camera move — one easing law (exponential arrivals, tau 0.131 s), a damped spring at zeta 1/3 on three channels, blur derived from velocity, stepped decisions vs eased curves, shared-element morphs instead of cuts, a ledger per seam, no idle motion — with the numbers measured from HeyGen's launches and Skale's reel.
tags: [motion, launch-video, hyperframes, seams, springs, storyboard, video]
---

# Launch-video seams and the motion system

A product launch video is a stack of scenes. What separates the ones that feel expensive from the ones that feel like a slideshow is not the scenes — it is the **seams** and the **physics**. HeyGen open-sourced twenty-one launch compositions and wrote the rules into their READMEs; Skale (Bay Area, launch videos for Google DeepMind, Replit, Polymarket, Bolt) posts a reel that measures the same way. Both are below.

## The motion system — four rules

1. **One easing law.** Every arrival relaxes exponentially toward its target with a time constant around **0.131 s**; every exit accelerates away on the mirror curve. Nothing is linear, nothing eases *in* on arrival. Write the curves once as functions and pass them everywhere — GSAP's built-in `expo.out` is a different polynomial, so entry and exit stop being mirror-symmetric if you mix them:

   ```js
   const TAU = 0.131;
   const eo = (dur, tau = TAU) => (p) => (1 - Math.exp(-p * dur / tau)) / (1 - Math.exp(-dur / tau));
   const ei = (dur, tau = TAU) => (p) => 1 - eo(dur, tau)(1 - p);
   ```

2. **A damped spring, zeta = 1/3, on three channels of the same body.** Position rings at **1.45 Hz**, shape (squash and stretch, volume-conserving) at **1.88 Hz**, rotation at **2.5 Hz** — the lighter the channel, the faster it rings. One `spring()` called three times is the entire "bouncy" quality. As a GSAP ease, windowed so it ends exactly at rest:

   ```js
   const spring = (dur, f = 1.45, z = 1 / 3) => (p) => {
     const u = p * dur, wd = 2 * Math.PI * f * Math.sqrt(1 - z * z);
     return 1 - Math.exp(-2 * Math.PI * z * f * u) * Math.cos(wd * u) * (1 - p);
   };
   ```

   Give two parts of one object `+A` and `−A` on the same spring (a wordmark's symbol and word, a card and its label) and it has life instead of sliding as one block.
3. **Blur is derived, never authored.** Motion blur ramps with the same curve as the motion, so it peaks exactly when the element is fastest — into a seam with `power2.in`, out of it with the settle. CSS `blur()` scales with the element's transform: a zooming wrapper carries a raw 2 px that reads as ~16 px at ×8.
4. **Stamp decisions, ease curves.** Anything that is a *curve* — a slide, a scale, a settle — is a tween. Anything that is a *decision* — a glyph flipbook, a typed run, an odometer digit, a cursor click, a highlight's path — is a per-frame `set`. Never tween a decision; it reads as a smear. The sound sits on the stamps ([[sound-from-motion]]).

And one prohibition: **no idle motion.** Nothing floats, breathes, or pulses to fill time. If a beat feels empty, the fix is more information, not more wobble.

## Seams: shared-element morphs, not cuts

No cuts and no crossfades between scenes — **one object always carries the eye across**. The outgoing element is still travelling when the scene changes and the incoming one enters already in flight on the same axis, in the same direction. A catalogue that recurs across HeyGen's launches:

| seam | what carries the eye |
|---|---|
| **Velocity-matched cut** | exit up → enter from below, moving up; exit left → enter from the right, moving left |
| **Zoom-through** | the scene flies past the camera (`scale 1 → 1.18`, blur up, fade); the next arrives from behind it (`0.92 → 1`, blur down) |
| **Edge-on collapse → unfold** | a group collapses to a sliver (`scaleX → 0.02`) and the next surface unfolds from the same axis (`scaleX 0.03 → 1`) |
| **Dock** | an object shrinks toward the rect where the next scene's hero grows from, and that hero grows from it |
| **Conveyor** | rows surface near the bottom, ride up on a long deceleration, accelerate off the top — three cheap transforms that read as one crane move |
| **Centre mask-open / recede** | a window materializes from a point (`scale 0.04 → 1`, ~0.6 s) or recedes (`1 → 0.82`, blur 14 px, 0.32 s) revealing the clip beneath |
| **Explode-out** | `scale 1.55 + blur(18 px) + opacity 0`, `power2.in`, 0.34 s — a terminal or card leaving hard |

Keep the agreement in a **ledger**, one row per seam, so it survives retiming:

```json
{ "fps": 30, "seams": [
  { "id": "router → review", "cut": 5.6, "technique": "edge-on collapse → unfold",
    "exit":  { "selector": "#cards", "axis": "x", "dir": 0 },
    "entry": { "selector": "#term",  "axis": "x", "dir": 0 } } ] }
```

Exits at 60–70 % of the entrance duration, the hard kill (`tl.set`) exactly on the cut frame, and clip boundaries just *below* their frame time (`1.166`, never `1.1667`) or the outgoing scene owns one extra frame.

## What the numbers look like

| | HeyGen templates | Skale reel (41.7 s) | OpenAI GPT-5 film |
|---|---|---|---|
| Hard cuts | 0 inside a sting; morphs only | 3 in the whole reel | 11, all in one montage |
| Move length | tau 0.131 s → visibly settled in ~0.4 s | median 4 frames, p75 11 frames | stepped reveals, long holds |
| Frames nearly still | — | 32 % | 64 % |
| Motion after a cut | exponential-out | 0.67 → 0.39 by frame 3 → 0.1 by frame 12 | — |
| Most-used eases (2,300 tweens) | `power2.out` 434 · `none` 338 · `power2.in` 275 · `power3.out` 237 · `expo.out` 89 | | |
| Most-tweened properties | `scale` 1,840 · `filter`/blur 1,695 · `rotation` 214 · `stagger` 110 · `skew` 100 · `clipPath` 57 | | |

Read the table as: arrivals are short and sharp, exits shorter; scale and blur do most of the work; rotation and skew are seasoning; almost nothing is a cut.

## The project shape

```text
<launch>/
├── index.html        top-level composition: clips with data-start / data-duration on tracks
├── compositions/     one file per scene when a scene is worth isolating
├── assets/           media, fonts, sfx/  (Git LFS for binaries)
├── STORYBOARD.md     the act table + the audio cue map
├── HANDOFF.md        what changed this session, what is left, how to verify
├── ledger.json       the seams
└── meta.json         id, name, createdAt
```

## HyperFrames specifics that bite

- A sub-composition is visible for its **GSAP timeline's duration**, not its `data-duration`. Pad short timelines with `tl.to({}, { duration: slot }, 0)` or the tail flashes black.
- An `<audio>` clip needs an `id`, or it renders silent. Preview audio is muted until the first click on the studio Play button.
- `npx hyperframes check` runs lint, runtime, layout, motion, and contrast. Every seam exit needs a `tl.set` hard kill with the **same selector string** on the cut frame; a collapsed-but-visible element still counts for the layout sampler, so hide it until its scene.
- Initial hidden states go in CSS, not in a `tl.set` at 0 — a zero-duration set at 0 does not render on frame 0.

## Templates as slots

A finished sting is a set of **slots**, not screens: a lockup, an entry surface, a number that matters, a nav, an action taken, an endcard. Re-branding means capturing the real brand (`npx hyperframes capture <url> --json`), writing the product's own surfaces into the slots, and **keeping every frame number, ease, and cut**. If you rewrote the animation, you failed the task even if yours looks fine.

## When to apply

Any multi-scene composition: launch films, feature sizzles, README demos, onboarding heroes. Not product UI transitions, where [[fly-not-teleport]] and [[cross-blur-transitions]] own the seam, and where [[spring-animations]] carries the spring rules at UI scale.

## Gotcha

"Lively" is not "more motion". The Skale reel is still a third of the time and the OpenAI film two thirds; what reads as alive is that every move is *fast, springy, blurred with its own velocity, and connected to the next scene by a shared object*. Adding drift, pulse, or float to a beat that has nothing to say makes it read as generated.

## Sources

- HeyGen, *hyperframes-launches* (github.com/heygen-com/hyperframes-launches, Apache-2.0 for composition source): `heygen-apple-motion/02-bouncy-ui/index.html` ("THE MOTION SYSTEM — four rules": tau 0.131, zeta 1/3 at 1.45 / 1.88 / 2.5 Hz, squash and stretch, derived blur, seek-safety); `01-ui-sting/README.md` (one ease family, matched vectors, stamp choreography, no idle motion); `03-message-sting/README.md` (shared-element morphs, velocity-matched blur, the conveyor, the traps); `sfx-music-launch/STORYBOARD.md` (act table, seam grammar, audio cue map); `hyperframes-launch/HANDOFF.md` (timeline padding, audio ids). Ease and property counts: HKTITAN, over every `.html` in the repo, 2026-09-05.
- Skale (skale.solutions; Mark Vassilevskiy, @MarkKnd) — studio reel posted 2025-08-29, cut/stillness/move-length analysis by HKTITAN, 2026-09-05.
- OpenAI, *Introducing GPT-5* — stillness and cut counts; see [[launch-video-sound]].
- Related: [[stagger-choreography]], [[spring-animations]], [[launch-video-sound]], [[sound-from-motion]].
