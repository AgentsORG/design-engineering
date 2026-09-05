---
title: sound-from-motion
summary: Derive every audio property from the motion it accompanies — pitch and decay from size, pan from position, brightness from height, contour from direction, length from the tween — so the stem cannot disagree with the picture. The cue-sheet workflow and the numbers.
tags: [sound, motion, spatial, launch-video, cue-sheet, stereo]
---

# Sound from motion

A library sound placed on a frame is still a guess: it has a pitch, a length, and a position that were decided somewhere else. When the sound *feels wrong* against the animation, it is almost always one of those three disagreeing with what the eye sees — a small chip landing with a low thud, a card on the right edge sounding from the centre, a whoosh that peaks before the element stops. The fix is not a better library. It is to **derive the sound from the motion** and let the picture decide.

## The mapping

| The motion says | The sound does | Rule of thumb |
|---|---|---|
| **Size** (√ of the element's area) | pitch and decay | 60 px → ~5 kHz and 50 ms; a 460 px headline → ~1.1 kHz and 600 ms. `f0 = 5200 · (60 / size)^0.75`, `t60 = 0.1 + size / 460 · 0.5` |
| **x on the canvas** | stereo pan | constant-power, `pan = (x / W − 0.5) · 1.4`, clamped to ±0.7 — never hard left or right |
| **y on the canvas** | brightness of the attack | higher on screen = brighter contact noise; the ear reads height as brightness, not as pitch |
| **Direction of travel** | contour | leaving upward → the breath sweeps up; sliding in from the left → the tick's pan starts left of where it lands |
| **Tween duration** | length of the breath | a whoosh starts with the tween and **peaks on the settle**, then dies in 60 ms |
| **Level** | six dB per doubling of size | inside a narrow window (−19 to −5 dBFS per hit) so the biggest thing is loudest but nothing shouts |

Two things stay constant: **one material** for the whole piece ([[sound-palette]]) and **true silence** between events ([[launch-video-sound]]).

## The cue sheet

Write the sound as data next to the timeline, one row per visual event, *before* rendering any audio:

```json
{ "canvas": { "w": 1920, "h": 1080 }, "fps": 30, "duration": 12,
  "cues": [
    { "id": "title",  "kind": "land",   "t": 0.507, "x": 810, "y": 480, "w": 1300, "h": 132, "dir": "up" },
    { "id": "card-2", "kind": "land",   "t": 3.075, "x": 960, "y": 640, "w": 512,  "h": 230, "semitones": 2 },
    { "id": "row-1",  "kind": "tick",   "t": 5.844, "x": 604, "y": 560, "w": 760,  "h": 60,  "dir": "right" },
    { "id": "s1-out", "kind": "whoosh", "t": 2.14,  "dur": 0.22, "x": 960, "y": 540, "dir": "up" },
    { "id": "modal",  "kind": "air",    "t": 6.40,  "dur": 0.20, "x": 1432, "y": 620 } ] }
```

- `t` is the **contact frame**: tween start + ~85 % of its duration for a decelerating ease (where `power3.out` has visibly stopped), not the tween start and not its mathematical end — see [[sound-motion-sync]]. For `whoosh` and `air`, `t` is the tween start and `dur` its length; the peak lands on `t + dur`.
- `kind` is the gesture: `land` (something settles), `tick` (something small slides into place), `whoosh` (a group leaves or arrives), `air` (an overlay darkens the room), `success` / `error` (a fifth or a minor second on the derived pitch).
- Staggers get one cue per member with `semitones` stepping up — the ear hears the count.

`scripts/sound-sheet.mjs cues.json --out stem.wav --report` renders the stereo stem deterministically (no randomness; a fixed seed per cue id), peak-normalized to −1 dBFS, and prints the frame, pitch, length, and pan of every onset so you can check them against the timeline. `--family <dir>` writes the six product one-shots from the same voices so the app and its launch video share a material.

## Workflow

1. **Lock picture.** Cues are placed on frames; frames that move invalidate them.
2. **Extract the events** from the timeline: every `from`/`to` that translates or scales an element the viewer will notice. Fades of small labels are not events. Two settles on the same frame are **one** cue — voice the bigger element.
3. **Measure the boxes.** Centre and size on the composition canvas, from the layout, not from memory.
4. **Render, read the report, listen once on phone speakers.** Anything under 200 Hz vanishes there; the mapping never goes below 450 Hz for that reason.
5. **Place the stem as one clip** at `t = 0`, not as thirty clips. One clip keeps sync exact and keeps the lint quiet.
6. **Check the onset list** against motion peaks the way [[launch-video-sound]] measures it: every onset within two frames of a visual event, nothing in the holds.

## When to apply

Launch videos, logo reveals, feature sizzles, product tours — any composition where sound is placed against a timeline. In product UI the same voices apply, but pan does not: UI sound is mono ([[sound-spec]]), because the element's position on a phone is not a position in the room.

## Gotcha

Deriving is not the same as sonifying. If a scene has forty tweens, it does not get forty sounds; it gets the six the eye actually tracks. The mapping decides *how* a sound behaves, [[sound-decision-framework]] and the density rule in [[launch-video-sound]] decide *whether*.

## Sources

- HKTITAN — `sound-sheet.mjs` and the demo cue sheet in `docs/demo/hyperframes/assets/sfx/cues.json` (25 cues, integrated −17 LUFS, every onset within one frame of its tween's settle).
- HeyGen, *hyperframes-launches* — every launch ships an audio cue map in `STORYBOARD.md` (film time · cue · source) and an `audio_meta.json` (id, file, offset, duration, volume per SFX); the sheet above is that table made renderable.
- ITU-R BT.1359-1 — audio may lag video, never lead; see [[sound-motion-sync]].
- Blattner, Sumikawa & Greenberg, *Earcons and icons* (1989) — pitch, rhythm, and register as a grammar of families.
- Related: [[sound-palette]], [[launch-video-seams]], [[stagger-choreography]].
