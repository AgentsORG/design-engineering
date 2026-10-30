---
title: film-as-function-of-time
summary: A film rendered from code is a pure function of time on a beat grid. That buys real sub-frame motion blur, a shutter that never crosses a cut, a grid fitted to the music the film actually uses, and delivery gates (H.264 level, size, frame count, the hardware decoder) that a file must pass before handover.
tags: [launch-video, render, motion-blur, beat-grid, encode, delivery]
---

# A film as a function of time

When a film is code, every frame must be a pure function of `t`: no `Math.random`, no `Date`, no state carried from one frame to the next. A renderer can then seek to any time, out of order, and average several sub-frame samples into motion blur that is real rather than painted. One stray `Math.random` makes the samples of a frame disagree with each other, and the blur turns to noise. Seeded randomness is fine; the rule is the same one [[vibe-to-generator]] sets for generators.

## The shutter

- **Default:** a 180° forward shutter, 4 samples a frame. Grain and bloom are added in the render, after averaging, and the grain is seeded so a re-render matches the last one. Never fake blur, grain or bloom in the page.
- **Fast windows raise the count:** a whip pan stretches the shutter to about 600° with up to 24 samples. The smear is what makes a whip read as one move ([[launch-video-cuts]], "into motion").
- **Never cross a hard cut.** If a cut falls inside the shutter, slide the window back so it ends on the cut. A clipped window renders the fastest frame of a whip sharp, which reads as a stutter on exactly the frame the eye is following.
- **Counters and HUD digits read the output frame time**, not the sample time, or blur smears the numbers.

## The grid comes from the track, not from the brief

Everything is placed in beats (`B(k)` = k × 60 / bpm), so one tempo change retimes the film. A generated track's tempo is a hope until it is measured:

- Give the beat tracker the intended tempo, or it can lock to half or two thirds of it.
- Fit only the stretch the film uses. Generated music drifts, and only that stretch has to be exact.
- Drop alignment: `music.offset = drop_seconds − planned_drop_beat × 60 / bpm`. Check the result against the listed downbeats.
- Prefer a music model whose schema takes a tempo. In the Kaiju Postal build, both takes asked for 172 BPM measured 172.0.

Over a 50 s film, a 0.15 % tempo error puts the last hits about 70 ms late. The sync budget is 0–30 ms, never early ([[sound-motion-sync]]), so a grid that is "nearly right" fails by the end card.

## Delivery gates

Hand over nothing until every file passes all of these:

| Gate | Why |
|---|---|
| Frame count equals the film's | a mux with `-shortest` silently drops the last frames when the audio ends a few ms early |
| H.264 Level ≤ 5.2 at 4K, ≤ 4.2 at 1080p | a slower x264 preset without `-level` writes Level 6.0, which plays in ffmpeg and fails in QuickTime, Safari and on phones |
| Under 1 GB at 4K | a 52 s 4K master with grain is 0.96 GB at CRF 12.4 (preset slower, ~50 dB PSNR); CRF 11 at preset medium reaches 1.37 GB for a 51 dB difference no one can see |
| A full decode on the hardware decoder | what QuickTime and phones use; a software decode passing proves nothing |
| Loudness written for the register, −1 dBTP | [[launch-video-sound]]; the engine's −14 LUFS default is not a standard ([[scenario-kinetic-reconciliation]]) |

Render 1080p until the film passes, then the 4K master once, then run the gates again on the master. Make the 1080p and 9:16 files from the master, and lay the 9:16 one out again per [[launch-video-formats]], not as the film centred on black.

## Gotcha

Headless Chrome has capture traps of its own, separate from the render traps in [[gotchas]]. A 1920 × 1080 viewport paints only about 990 px, so use a taller viewport and clip. `captureScreenshot` returns CSS pixels unless `clip.scale` equals the device scale factor, so a "4K" render comes back at 1080p. Large 3D layers are captured half-drawn without `--run-all-compositor-stages-before-draw`. Each 4K worker needs about 11 GB of memory; six of them stalled a 36 GB machine.

## Sources

- Scenario, `scenario-kinetic-film` skill (zip received 2026-10-30, no licence file, so it is cited here and none of its code is copied): `SKILL.md` (rules table, common mistakes), `references/render.md` (pipeline, traps, encode settings, gates), `references/sound.md` §1 (beat grid, offset), `references/method.md` §4.
- Related: [[launch-video-review]], [[launch-video-music]], [[cinetic-reconciliation]], [[hyperframes-reconciliation]].
