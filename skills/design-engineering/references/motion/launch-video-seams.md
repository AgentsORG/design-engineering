---
title: launch-video-seams
summary: How HeyGen cuts launch videos so seven scenes read as one camera move — one ease family with mirrored exits, matched vectors at every cut, a ledger per seam, a storyboard with an act table and an audio cue map, and the HyperFrames project shape that carries it.
tags: [motion, launch-video, hyperframes, seams, storyboard, video]
---

# Launch-video seams

A product launch video is a stack of scenes. What separates the ones that feel expensive from the ones that feel like a slideshow is not the scenes — it is the **seams**. HeyGen open-sourced twenty-one of its launch compositions, and the same two decisions run through all of them.

## One ease family

Everything arriving uses the same curve; everything leaving uses its mirror. Nothing overshoots, nothing is linear, nothing bounces on a stock `elastic`. Because it is one family, moves that were never individually tuned still look like they belong to each other. In this skill's terms: pick from [[easing-curves]] once, write it as a constant, and derive the exit from it (`power3.out` in, `power2.in` out at ~65 % of the entrance duration — [[compose-subtract-asymmetry]]).

## Matched vectors at every cut

No scene settles before its cut, and none starts from rest after one. The outgoing element is **still travelling** when the frame changes, and the incoming one enters **already in flight on the same axis, in the same direction**. Exit up → enter from below, moving up. Exit left → enter from the right, moving left. That single rule is why the cuts read as a continuous camera move instead of a stack of scenes.

Keep the agreement in a **ledger**, one row per seam, so it survives retiming:

```json
{ "fps": 30, "seams": [
  { "id": "title → router", "cut": 2.4, "technique": "velocity-matched cut, upward",
    "exit":  { "selector": "#s1 .scene", "axis": "y", "dir": -1 },
    "entry": { "selector": "#s2-h",      "axis": "y", "dir": -1 } } ] }
```

Exit and entry must agree on `axis` and `dir`. When you retime anything, re-read the ledger before you re-render.

## Seam grammar worth naming

- **Velocity-matched cut** — the default above.
- **Centre mask-open** — a window scales up from a point (`scale 0.04 → 1`, `expo.out`, ~0.6 s) over the ground colour: "the window materializes."
- **Recede / zoom-through** — the outgoing window shrinks (`scale 1 → 0.82`) and blurs (`0 → 14 px`) over ~0.32 s, revealing the clip beneath it on a lower track.
- **Explode-out** — `scale 1.55 + blur(18 px) + opacity 0`, `power2.in`, 0.34 s, for a terminal or card leaving hard.
- The body ground colour sits behind every section so exposed edges stay seamless.

## The project shape

```text
<launch>/
├── index.html        top-level composition: clips with data-start / data-duration on tracks
├── compositions/     one file per scene when a scene is worth isolating
├── assets/           media, fonts, sfx/  (Git LFS for binaries)
├── STORYBOARD.md     the act table + the audio cue map (below)
├── HANDOFF.md        what changed this session, what is left, how to verify
├── ledger.json       the seams
└── meta.json         id, name, createdAt
```

The **storyboard's act table** has one row per act: id, type, start, duration, media start, the beat in one line, and the *seam out*. Its **audio cue map** has one row per moment: film time, cue, source — and the film is built silent; sound is placed against locked picture ([[sound-from-motion]] renders that map).

## HyperFrames specifics that bite

- A sub-composition is visible for its **GSAP timeline's duration**, not its `data-duration`. Pad short timelines with `tl.to({}, { duration: slot }, 0)` or the tail flashes black.
- An `<audio>` clip needs an `id`, or it renders silent.
- Preview audio is muted until the first click on the studio Play button — autoplay policy, not a bug.
- `npx hyperframes check` runs lint, runtime, layout, motion, and contrast. Run it before every render; fix `gsap_exit_missing_hard_kill` with a `tl.set` at the scene boundary.

## Templates as slots

A finished sting is a set of **slots**, not screens: a lockup, an entry surface, a number that matters, a nav, an action taken, an endcard. Re-branding means capturing the real brand (`npx hyperframes capture <url> --json`), writing the product's own surfaces into the slots, and **keeping every frame number, ease, and cut**. If you rewrote the animation, you failed the task even if yours looks fine.

## When to apply

Any multi-scene composition: launch films, feature sizzles, README demos, onboarding heroes. Not product UI transitions, where [[fly-not-teleport]] and [[cross-blur-transitions]] own the seam.

## Gotcha

Matched vectors only work if the exit is short. An exit that takes as long as the entrance leaves the frame empty for a beat and the cut reads as a fade. Exits at 60–70 % of the entrance, and the hard kill exactly on the cut frame.

## Sources

- HeyGen, *hyperframes-launches* (github.com/heygen-com/hyperframes-launches, Apache-2.0 for composition source): `heygen-apple-motion/README.md` ("one ease family", "matched vectors at every cut", `ledger.json`), `sfx-music-launch/STORYBOARD.md` (act table, seam grammar, audio cue map), `hyperframes-launch/HANDOFF.md` (timeline padding, audio ids, preview autoplay).
- HyperFrames CLI docs — `check`, `capture`, `render`.
- Related: [[stagger-choreography]], [[launch-video-sound]], [[sound-from-motion]].
