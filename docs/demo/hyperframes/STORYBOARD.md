# design-engineering demo — storyboard

**Format:** 1920×1080 · 30 fps · 12.0 s · one paused GSAP timeline on `window.__timelines.main`.
**Sound register:** measured from OpenAI's *Refreshed.* and *Introducing GPT-5* — a warm sub-heavy bed in F, dry clicks 10–20 dB under it on every stepped reveal, a low thud when something big settles, the sub dropping out before the modal lands. `references/sound/launch-video-sound.md`.
**Motion system:** HeyGen's launch grammar — arrivals relax exponentially (tau 0.131 s), exits accelerate on the mirror curve; placement rings on a damped spring at zeta 1/3 (position 1.45 Hz, shape 1.88 Hz, rotation 2.5 Hz); blur follows velocity; text reveals are stepped (seven frames a glyph, 110 ms a word, 210 ms a cell); every scene change is a shared-element morph, never a cut; no idle motion. `references/motion/launch-video-seams.md`. Seams are in `ledger.json`.
**Built silent.** Sound is one stereo stem, `assets/sfx/stem.wav`, rendered from `assets/sfx/cues.json` by `scripts/sound-sheet.mjs` after picture lock.

## Acts

| Act | id | start | dur | beat | seam out |
|---|---|---|---|---|---|
| 1 · Title | `s1` | 0.00 | 2.80 | glyph flipbook 0.20–0.90 → the word lands on a spring (y 26 → 0, squash 0.93 → 1) with blur clearing → mark slides in 1.15 → thirteen words pop in at 110 ms, each blur 3 → 0 | **zoom-through** @2.50: scene scales 1 → 1.18, blur 10 px, gone by 2.80 |
| 2 · Router | `s2` | 2.80 | 2.80 | scene arrives from behind (0.92 → 1, blur 8 → 0); headline springs up; cards spring from y 96 with a ±3° rotation ring, blur 6 → 0, at 3.45 / 3.75 / 4.05; each card's three lines step in 120 ms apart | **edge-on collapse** @5.30: cards scaleX → 0.02 |
| 3 · Review | `s3` | 5.60 | 3.00 | terminal unfolds from the same axis (scaleX 0.03 → 1); nine cells stream at 210 ms, each blur 4 → 0; modal springs in at 7.05 under the overlay; a cursor arrives 7.40, flips the toggle 7.95 (knob on a spring, track to blue, "· on"), moves to Save, presses 8.35 (button dips 0.95 and rings back) | **dock** @8.35: modal wrap shrinks to 0.5 and blurs |
| 4 · Sound + SVG | `s4` | 8.60 | 2.00 | mascot stage grows from 0.5 on a spring; six bars ride a conveyor in from y 54 at 90 ms, waveform bars spring up; flipbook at 8 fps | **conveyor** @10.30: bars accelerate off the top, stage recedes |
| 5 · Install | `s5` | 10.60 | 1.40 | command pill rises from y 140 on a spring; five chunks type in at 120 ms; at 11.55 a volume-conserving pop (1.03 × 0.96 → rings back) and a shine sweeps the pill; footer rises | end |

## Audio cue map

Time is the **contact frame**: for a spring arrival, start + 0.30 s (the first crossing of rest); for an exponential arrival, start + 85 % of duration; runs list their first onset and cadence. Pan, brightness, and click centre come from the element's box — `references/sound/sound-from-motion.md`.

| time | cue | source event | derived |
|---|---|---|---|
| 0.00 → | bed in | film starts | sub F1 + F2 (43 / 86 Hz), pad on F3 · A3 · C4 · F4, −9 dB until the land |
| 0.21 / 0.44 / 0.68 | flicker ×3 | glyph variants cut every 7 frames | 4.0 kHz clicks |
| 0.90 | thud | `design‑engineering` lands | 86 Hz sweep-down, click on the frame, bed ducks 4 dB |
| 1.32 … 2.63 | type ×13 | words every 110 ms (±8 ms hand jitter) | 5.0 kHz clicks at −22 dB |
| 2.50–2.80 | air | zoom-through | a breath under the seam, −6 dB |
| 3.15 | thud | `#s2-h` springs to rest | a fifth up |
| 3.75 / 4.05 / 4.35 | click + flicker ×3 | each card crosses rest, then its k / v / d lines | 3.7 → 4.6 kHz, pan −0.40 / 0 / +0.40 |
| 5.30–5.60 | air | edge-on collapse | |
| 5.98, 6.05 | thud, click | the terminal unfolds; the headline crosses rest | |
| 6.26 … 7.94 | type ×9 | Before / After / Why cells | 4.4 kHz, 210 ms cadence |
| 6.75–7.30 | sub dropout | the room holds its breath before the modal | pad stays, sub gone |
| 7.05 | air | overlay darkens the wrap | |
| 7.35 | thud | modal crosses rest, sub returns | a fifth up |
| 7.95, 8.06 | click ×2 | the toggle is pressed; the knob seats | +3 dB, then −4 dB a third up |
| 8.35 | click + thud | Save is pressed | the thud an octave up at −10 dB |
| 8.35–8.65 | air | dock | |
| 8.90, 9.00 | thud, click | stage crosses rest; headline crosses rest | |
| 9.14 … 9.59 | type ×6 | bars ride in | 4.2 → 5.5 kHz, one semitone per bar |
| 8.80 … 10.43 | flicker ×14 | mascot frames at 8 fps | −32 dB, pan +0.30 |
| 10.30–10.60 | air | conveyor off | |
| 10.90, 11.02 | thud, click | the pill crosses rest; the headline crosses rest | |
| 10.95 … 11.43 | type ×5 | command chunks | 4.5 kHz |
| 11.55 | success | install lands | thud on the root + a mallet a fifth up; bed swells 2.5 dB then leaves |

Stem: 81 onsets from 31 cues · integrated −16.0 LUFS · peak −0.9 dBFS · bed present 96 % of the runtime with one dropout.

## Build / verify

```bash
npx hyperframes@0.8.29 check .
node ../../../skills/design-engineering/scripts/sound-sheet.mjs assets/sfx/cues.json --out assets/sfx/stem.wav --family assets/sfx --report
npx hyperframes@0.8.29 render . --output renders/demo.mp4 --fps 30
```

Retime anything → re-read `ledger.json`, update `cues.json`, re-render the stem, then the picture.
