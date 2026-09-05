---
title: sound-from-motion
summary: Derive every audio property from the motion it accompanies — pitch and decay from size, pan from position, brightness from height, contour from direction, length from the tween — and, in the brand-film register, a bed whose arc, dropouts, and ducking are written as data next to the timeline. The cue-sheet workflow and the numbers.
tags: [sound, motion, spatial, launch-video, cue-sheet, stereo, bed]
---

# Sound from motion

A library sound placed on a frame is still a guess: it has a pitch, a length, and a position that were decided somewhere else. When the sound *feels wrong* against the animation, it is almost always one of those three disagreeing with what the eye sees — a small chip landing with a low thud, a card on the right edge sounding from the centre, a whoosh that peaks before the element stops. The fix is not a better library. It is to **derive the sound from the motion** and let the picture decide.

## The mapping

| The motion says | The sound does | Rule of thumb |
|---|---|---|
| **Size** (√ of the element's area) | pitch and decay | 60 px → ~5 kHz and 50 ms; a 460 px headline → ~1.1 kHz and 600 ms. `f0 = 5200 · (60 / size)^0.75`, `t60 = 0.1 + size / 460 · 0.5`. Clicks stay in 2.8–5.2 kHz whatever the size: a 20 ms sound has no room for a low fundamental, so a *big* thing gets a thud on the bed's root instead |
| **x on the canvas** | stereo pan | constant-power, `pan = (x / W − 0.5) · 1.4`, clamped to ±0.7 — never hard left or right; thuds pan at 40 % |
| **y on the canvas** | brightness of the attack | higher on screen = brighter contact noise; the ear reads height as brightness, not as pitch |
| **Direction of travel** | contour | leaving upward → the breath sweeps up; sliding in from the left → the tick's pan starts left of where it lands |
| **Tween duration** | length of the breath | a whoosh starts with the tween and **peaks on the settle**, then dies in 60 ms |
| **A stepped reveal** | one click per step | a glyph flipbook at seven frames a step, words at 110 ms, table cells at 210 ms — the cadence is the sound |
| **Level** | six dB per doubling of size | inside a narrow window so the biggest thing is loudest but nothing shouts; clicks sit 10–20 dB under the bed |

Two things stay constant: **one material** for the whole piece ([[sound-palette]]) and a deliberate relationship to silence — true silence in the dry register, silence as punctuation in the bed register ([[launch-video-sound]]).

## The cue sheet

Write the sound as data next to the timeline, one row per visual event, *before* rendering any audio:

```json
{ "canvas": { "w": 1920, "h": 1080 }, "fps": 30, "duration": 12,
  "bed": { "root": 43.1, "level": -22, "pad": -31, "in": 0, "out": 11.55,
           "gainPoints": [[0, -9], [1.0, -5], [2.9, -2], [5.9, 0], [11.4, 1]],
           "dropouts": [ { "t": 6.95, "dur": 0.6, "keep": "pad" } ],
           "swells":   [ { "t": 11.2, "dur": 0.35, "db": 2.5 } ] },
  "cues": [
    { "id": "s1-glyphs", "kind": "flicker", "t": 0.20, "n": 3,  "x": 810, "y": 480, "w": 300, "h": 132 },
    { "id": "s1-title",  "kind": "thud",    "t": 0.90, "x": 810, "y": 480, "w": 1300, "h": 132 },
    { "id": "s1-sub",    "kind": "type",    "t": 1.30, "n": 13, "every": 0.11, "x": 700, "y": 640, "w": 120, "h": 40, "gain": -8 },
    { "id": "s3-cells",  "kind": "type",    "t": 6.25, "n": 9,  "every": 0.21, "x": 604, "y": 640, "w": 260, "h": 60 },
    { "id": "s3-modal",  "kind": "thud",    "t": 7.51, "x": 1432, "y": 620, "w": 520, "h": 420, "semitones": 7 } ] }
```

- `t` is the **contact frame**: tween start + ~85 % of its duration for a decelerating ease (where `power3.out` has visibly stopped), not the tween start and not its mathematical end — see [[sound-motion-sync]]. For `whoosh` and `air`, `t` is the tween start and `dur` its length; the peak lands on `t + dur`. For `type` and `flicker`, `t` is the first step and the run expands into `n` clicks at `every` (a `type` run gets ±8 ms of hand jitter; a `flicker` run is cut-exact).
- `kind` is the gesture: `click` (a stepped reveal), `thud` (something big settles while the bed is on), `type` / `flicker` (runs), `land` / `tick` (the dry register's mallet and tick), `whoosh` / `air` (travel and overlays), `success` / `error` (a fifth or a minor second on the derived pitch).
- `bed` is the brand-film register: a drone on `root` (F1 by default) with an octave and a pad on the 4th, 5th, 6th, and 8th partials, a faint 0.26 s pulse, **gainPoints** as the film's act-by-act arc in dB, **dropouts** (with `keep: "pad"` to pull only the sub, the GPT-5 "thinking" move), **swells**, and automatic 3–4 dB ducking under every thud. Omit `bed` for the dry register.
- Staggers get one cue per member with `semitones` stepping up — the ear hears the count.

`scripts/sound-sheet.mjs cues.json --out stem.wav --report` renders the stereo stem deterministically (no randomness; a fixed seed per cue id), peak-normalized to −1 dBFS, and prints the frame, pitch, length, and pan of every onset so you can check them against the timeline. `--family <dir>` writes six product one-shots from the same voices so the app and its launch video share a material.

## Workflow

1. **Lock picture.** Cues are placed on frames; frames that move invalidate them.
2. **Extract the events** from the timeline: every `from`/`to` that translates or scales an element the viewer will notice, and every stepped `set` run. Fades of small labels are not events. Two settles on the same frame are **one** cue — voice the bigger element.
3. **Measure the boxes.** Centre and size on the composition canvas, from the layout, not from memory.
4. **Write the arc.** In the bed register, decide where the film opens low, where it fills, where it holds its breath, where it resolves — as gain points and dropouts — before touching a single click.
5. **Render, read the report, listen once on phone speakers.** Anything under 200 Hz vanishes there; the clicks carry the sync, the bed carries the feeling.
6. **Place the stem as one clip** at `t = 0`, not as seventy clips. One clip keeps sync exact and keeps the lint quiet.
7. **Check the onset list** against motion peaks the way [[launch-video-sound]] measures it: every onset within two frames of a visual event, nothing in the holds.

## When to apply

Launch videos, logo reveals, feature sizzles, product tours — any composition where sound is placed against a timeline. In product UI the same voices apply, but pan does not: UI sound is mono ([[sound-spec]]), because the element's position on a phone is not a position in the room.

## Gotcha

Deriving is not the same as sonifying. If a scene has forty tweens, it does not get forty sounds; it gets the ones the eye actually tracks. And the bed is not a music track: one drone in one key, no beat, quiet enough that a click at −20 dB under it still reads. The mapping decides *how* a sound behaves; [[sound-decision-framework]] and the density rule in [[launch-video-sound]] decide *whether*.

## Sources

- HKTITAN — `sound-sheet.mjs` and the demo cue sheet in `docs/demo/hyperframes/assets/sfx/cues.json` (72 onsets from 22 cues, a bed with one dropout, integrated −16.5 LUFS).
- OpenAI, *Refreshed.* and *Introducing GPT-5* — the bed-and-clicks register, measured; numbers in [[launch-video-sound]].
- HeyGen, *hyperframes-launches* — every launch ships an audio cue map in `STORYBOARD.md` (film time · cue · source) and an `audio_meta.json`; the sheet above is that table made renderable.
- ITU-R BT.1359-1 — audio may lag video, never lead; see [[sound-motion-sync]].
- Blattner, Sumikawa & Greenberg, *Earcons and icons* (1989) — pitch, rhythm, and register as a grammar of families.
- Related: [[sound-palette]], [[launch-video-seams]], [[stagger-choreography]].
