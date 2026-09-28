---
title: sound-from-motion
summary: Derive every audio property from the motion, and let the picture place a bed's or a track's structure.
tags: [sound, motion, spatial, launch-video, cue-sheet, stereo, bed, foley]
---

# Sound from motion

A library sound placed on a frame is still a guess: it has a pitch, a length, and a position that were decided somewhere else. When the sound *feels wrong* against the animation, it is almost always one of those three disagreeing with what the eye sees — a small chip landing with a low thud, a card on the right edge sounding from the centre, a whoosh that peaks before the element stops. The fix is not a better library. It is to **derive the sound from the motion** and let the picture decide.

## The mapping

| The motion says | The sound does | Rule of thumb |
|---|---|---|
| **Size** (√ of the element's area) | pitch and decay | 60 px → ~5 kHz and ~165 ms (a `tick`, 50 ms); a 460 px headline → ~1.1 kHz and 600 ms. `f0 = 5200 · (60 / size)^0.75`, `t60 = 0.1 + size / 460 · 0.5`. In the bed-and-clicks register (B), clicks stay in 2.8–5.2 kHz whatever the size: a 20 ms sound has no room for a low fundamental, so a *big* thing gets a thud on the bed's root instead. Product-camera foley (E) sits lower, at 1.45–2.5 kHz (Linear Agent, Raycast); set `pitch` per cue, since the derived click band floors at 2.8 kHz |
| **x on the canvas** | stereo pan | constant-power, `pan = (x / W − 0.5) · 1.4`, clamped to ±0.7 — never hard left or right; thuds pan at 40 % |
| **y on the canvas** | brightness of the attack | higher on screen = brighter contact noise; the ear reads height as brightness, not as pitch |
| **Direction of travel** | contour | leaving upward → the breath sweeps up; sliding in from the left → the tick's pan starts left of where it lands |
| **Tween duration** | length of the breath | a whoosh starts with the tween and **peaks on the settle**, then dies in 60 ms |
| **A stepped reveal** | one click per step | a glyph flipbook at seven frames a step, words at 110 ms, table cells at 210 ms — the cadence is the sound |
| **Level** | six dB per doubling of size | inside a narrow window so the biggest thing is loudest but nothing shouts. In register B a click's median peak at the hit runs from about level with the sub (*Refreshed.* +1.7 dB) to 7 dB under it (GPT-5 −7.3 dB); across the film, at p95, the high band sits ~19 dB under the sub band. Where foley follows consequence (E), commits outrank typing — [[launch-video-sound]] |
| **A reveal or an act change** | the bed's or track's structure | the drop or the low end returns on the reveal frame, and something leaves 0.25–0.9 s before it (the sub in Contra Indy, the whole mix in Taste Labs); a key change can mark an act (Linear Agent) — [[launch-video-music]], [[launch-video-sound]] |

Two things stay constant: **one material** for the whole piece ([[sound-palette]]) and a deliberate relationship to silence — true silence in the dry register, silence as punctuation in the bed register ([[launch-video-sound]]).

## The cue sheet

Write the sound as data next to the timeline, one row per visual event, *before* rendering any audio:

```json
{ "canvas": { "w": 1920, "h": 1080 }, "fps": 30, "duration": 12,
  "bed": { "root": 43.1, "level": -22, "pad": -31, "in": 0, "out": 11.55,
           "gainPoints": [ [0, -9], [1.0, -5], [2.9, -2], [5.9, 0], [11.4, 1] ],
           "dropouts": [ { "t": 6.95, "dur": 0.6, "keep": "pad" } ],
           "swells":   [ { "t": 11.2, "dur": 0.35, "db": 2.5 } ] },
  "cues": [
    { "id": "s1-glyphs", "kind": "flicker", "t": 0.20, "n": 3,  "x": 810, "y": 480, "w": 300, "h": 132 },
    { "id": "s1-title",  "kind": "thud",    "t": 0.90, "x": 810, "y": 480, "w": 1300, "h": 132 },
    { "id": "s1-sub",    "kind": "type",    "t": 1.30, "n": 13, "every": 0.11, "x": 700, "y": 640, "w": 120, "h": 40, "gain": -8 },
    { "id": "s3-cells",  "kind": "type",    "t": 6.25, "n": 9,  "every": 0.21, "x": 604, "y": 640, "w": 260, "h": 60 },
    { "id": "s3-modal",  "kind": "thud",    "t": 7.51, "x": 1432, "y": 620, "w": 520, "h": 420, "semitones": 7 } ] }
```

- `t` is the **contact frame**: tween start + ~85 % of its duration for a decelerating ease (where `power3.out` has visibly stopped), not the tween start and not its mathematical end — see [[sound-motion-sync]]. For `whoosh` and `air`, `t` is the tween start and `dur` its length; the peak lands on `t + dur`. For `type` and `flicker`, `t` is the first step and the run expands into `n` clicks at `every`. A `type` run should not be a metronome: HeyGen's claude-paper-launch spaces its typing ticks 0.117 s apart on average (sd 34 ms, about ±30 %) with a humanizing formula, about one tick per 3 characters of text typed at 25–29 characters a second; `"jitter": 0.35` on the run reproduces that spread (without it a run keeps ±8 ms, so older sheets render unchanged). Keep ticks under ~10 a second: under faster type, thin them or lay one continuous typing bed per passage, trimmed past its lead-in; `--report` warns on faster runs. A `flicker` run, streamed agent output included, is cut-exact.
- `kind` is the gesture: `click` (a stepped reveal), `thud` (something big settles while the bed is on), `type` / `flicker` (runs), `land` / `tick` (the dry register's mallet and tick), `whoosh` / `air` (travel and overlays), `success` / `error` (a fifth or a minor second on the derived pitch).
- `bed` is the brand-film register: a drone on `root` (F1 by default) with an octave and a pad on the 4th, 5th, 6th, and 8th partials, a faint 0.26 s pulse, **gainPoints** as the film's act-by-act arc in dB, **dropouts** (with `keep: "pad"` to pull only the sub, the GPT-5 "thinking" move), **swells**, and automatic 3–4 dB ducking under every thud. Omit `bed` for the dry register.
- Staggers get one cue per member with `semitones` stepping up — the ear hears the count.

`scripts/sound-sheet.mjs cues.json --out stem.wav --report` renders the stereo stem deterministically (no randomness; a fixed seed per cue id), peak-normalized to −1 dBFS (sample peak; use `--peak -1.5` or check true peak against the −1 dBTP ceiling in [[launch-video-review]]), and prints the frame, pitch, length, and pan of every onset so you can check them against the timeline. `--family <dir>` writes six product one-shots from the same voices so the app and its launch video share a material.

## Workflow

1. **Lock picture.** Cues are placed on frames; frames that move invalidate them.
2. **Extract the events** from the timeline: every `from`/`to` that translates or scales an element the viewer will notice, and every stepped `set` run. Fades of small labels are not events. Two settles on the same frame are **one** cue — voice the bigger element.
3. **Measure the boxes.** Centre and size on the composition canvas, from the layout, not from memory.
4. **Write the arc.** In the bed register, decide where the film opens low, where it fills, where it holds its breath, where it resolves — as gain points and dropouts — before touching a single click.
5. **Render, read the report, listen once on phone speakers.**
6. **Place the stem as one clip** at `t = 0`, inside the composition at the root, with its own `id`, not as seventy clips. One clip keeps sync exact. A HyperFrames product-launch-video build fetches named SFX per beat instead: leave them out under a beat track, and in registers A, B and E replace them with this stem ([[launch-video-sound]]). A mix added in post survives in one render only: HeyGen recovered three launches' soundtracks from published renders that ran 64 ms late, one frame late, and 100 ms early (commits 2a439ec, dd128ad).
7. **Check the onset list** against motion peaks the way [[launch-video-sound]] measures it: every onset on its visual event's frame or up to two frames after it, never before, and nothing in the holds.

## When to apply

Logo reveals, brand films and product tours in registers A, B and E ([[launch-video-sound]]). In a beat-track sizzle the track carries the pops, and under a voice the voice is the clock; there only the track's structure is placed ([[launch-video-music]]). In product UI the same voices apply, but pan does not: UI sound is mono ([[sound-spec]]), because the element's position on a phone is not a position in the room.

## Gotcha

Deriving is not the same as sonifying. If a scene has forty tweens, it does not get forty sounds; it gets the ones the eye actually tracks. In the bed register the bed is not a music track: one drone in one key, no beat, quiet enough that every click reads. In a beat or voice register the derivation moves up a level — the picture places the track's drop, dropouts and breakdowns ([[launch-video-music]]). The mapping decides *how* a sound behaves; [[sound-decision-framework]] and the register chosen in [[launch-video-sound]] decide *whether*.

## Sources

- HKTITAN — `sound-sheet.mjs` and the launch film's cue sheet in `docs/demo/hyperframes/assets/sfx/cues.json` (240 onsets from 138 cues, a bed with three dropouts, stem −15.4 LUFS integrated and −1.4 dBTP true peak; −18.5 LUFS in the rendered film).
- OpenAI, *Refreshed.* and *Introducing GPT-5* — the bed-and-clicks register, measured; hit-versus-sub levels and band p95 in `docs/research/launch-register/*-summary.json` (analysis3), the rest in [[launch-video-sound]].
- HeyGen, *hyperframes-launches* (Apache-2.0) — some storyboards (sfx-music-launch, hyperframes-launch, website-to-hyperframes) carry an audio cue map, but most sources shipped silent with the mix done in post; three soundtracks were recovered from published renders (commits 2a439ec, dd128ad); `claude-paper-launch/index.html` L168–252 for typing-tick timing (74 typing clips over 227 typed characters, 71 intervals) and `claude-paper-launch/compositions/chat-response.html` L325–338 for the humanizing formula.
- Linear Agent (2026), Raycast (2025) — foley band, levels and harmony; Skale's Contra Indy (sub pulled 0.25–0.5 s before reveals) and Taste Labs (0.9 s at −42 dB before the raise is named). Measured by HKTITAN 2026-09-28; `docs/research/launch-films/notes/synthesis-acclaimed.md`, `notes/synthesis-skale.md`.
- ITU-R BT.1359-1 — audio may lag video, never lead; see [[sound-motion-sync]].
- Blattner, Sumikawa & Greenberg, *Earcons and icons* (1989) — pitch, rhythm, and register as a grammar of families.
- Related: [[launch-video-music]], [[sound-palette]], [[launch-video-seams]], [[stagger-choreography]].
