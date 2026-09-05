# design-engineering demo — storyboard

**Format:** 1920×1080 · 30 fps · 12.0 s · one paused GSAP timeline on `window.__timelines.main`.
**Register:** the one measured from OpenAI's *Refreshed.* (Studio Dumbar/DEPT, 2025) and *Introducing GPT-5* — a warm sub-heavy bed in F that carries the film, dry clicks 10–20 dB under it on every stepped reveal, a low thud when something big settles, the sub dropping out before a reveal, stillness between events. See `references/sound/launch-video-sound.md`.
**Built silent.** Sound is one stereo stem, `assets/sfx/stem.wav`, rendered from `assets/sfx/cues.json` by `scripts/sound-sheet.mjs` after picture lock.
**Motion vocabulary:** stepped, not tweened, wherever something is *revealed* — the wordmark arrives as a glyph flipbook (seven frames a step, the brand film's cadence), text streams in word by word (110 ms) or cell by cell (210 ms, the GPT-5 typing cadence), cards build line by line. Only *placement* is tweened (`power3.out`). Every scene exits with an 8 px upward nudge over 0.22 s and a hard kill on the cut; seams are in `ledger.json`. No whooshes: the bed carries the cut.

## Acts

| Act | id | start | dur | beat | sound |
|---|---|---|---|---|---|
| 1 · Title | `s1` | 0.00 | 2.80 | glyph flipbook 0.20–0.90 → `design‑engineering` lands 0.90 → mark + version 1.20 → thesis streams in 13 words 1.30–2.62 | bed enters low (−9 dB) · 3 flicker clicks · thud on the land · 13 quiet clicks |
| 2 · Router | `s2` | 2.80 | 2.80 | headline lands 3.24; cards rise at 3.50 / 3.86 / 4.22, each builds its three lines a half-step apart; hold | bed up to −2 dB · thud (a fifth up) · click per card + three softer per card, panned −0.4 / 0 / +0.4 |
| 3 · Review | `s3` | 5.60 | 3.00 | terminal lands 6.20; nine cells stream at 210 ms; sub drops out 6.95–7.55; overlay + modal land 7.51 | bed to 0 dB with a swell · two thuds · nine typing clicks · air · thud with the sub returning |
| 4 · Sound + SVG | `s4` | 8.60 | 2.00 | stage lands 9.04; six bars step in at 100 ms; flipbook runs at 8 fps | thud + click · six clicks climbing a semitone each · a click per mascot frame at −14 dB |
| 5 · Install | `s5` | 10.60 | 1.40 | headline 11.04; the command types in five chunks 10.95–11.43; success 11.55; bed resolves and leaves 11.55–11.95 | thud · five typing clicks · thud + a fifth (mallet) · bed swell then out |

## Audio cue map

Time is the **contact frame** (tween start + 85 % of duration for `power3.out`); runs list their first onset and cadence. Pan, brightness, and click centre come from the element's box — `references/sound/sound-from-motion.md`.

| time | cue | source event | derived |
|---|---|---|---|
| 0.00 → | bed in | film starts | sub F1 + F2 (43 / 86 Hz), pad on F3 · A3 · C4 · F4, 0.26 s pulse at 12 % depth, −9 dB until the land |
| 0.21 / 0.44 / 0.68 | flicker ×3 | `#s1-h` glyph variants cut every 7 frames | clicks at 4.0 kHz, −18 dB |
| 0.90 | thud | `design‑engineering` lands | 86 Hz sweep-down, 180 ms, click on the frame, bed ducks 4 dB |
| 1.32 … 2.63 | type ×13 | thesis words every 110 ms (±8 ms hand jitter) | 5.0 kHz clicks at −22 dB, pan −0.19 |
| 3.25 | thud | `#s2-h` | root a fifth up |
| 3.77 / 4.13 / 4.49 | click + flicker ×3 | each card lands, then its k / v / d lines | 3.7 → 4.6 kHz, pan −0.40 / 0 / +0.40 |
| 6.05, 6.21 | thud ×2 | headline, then the terminal (888×330) | |
| 6.26 … 7.94 | type ×9 | Before / After / Why cells | 4.4 kHz, 210 ms cadence |
| 6.95–7.55 | sub dropout | the room holds its breath before the modal | pad stays, sub gone |
| 7.30 | air | overlay darkens the wrap | sub-500 Hz swell, pan +0.34 |
| 7.52 | thud | modal lands, sub returns | a fifth up |
| 9.05 | thud + click | stage and headline settle together | |
| 9.11 … 9.61 | type ×6 | bars step in | 4.2 → 5.5 kHz, one semitone per bar |
| 8.76 … 10.39 | flicker ×14 | mascot frames at 8 fps | −32 dB, pan +0.30 |
| 11.05 | thud | `#s5-h` | |
| 10.95 … 11.45 | type ×5 | command chunks | 4.5 kHz |
| 11.55 | success | install lands | thud on the root + mallet a fifth up; bed swells 2.5 dB then leaves |

Stem: 72 onsets from 22 cues · integrated −16.4 LUFS · peak −1.0 dBFS · bed present 96 % of the runtime with one dropout.

Reference measurements the register is matched to (from `Refreshed.` / `Introducing GPT-5`, 720p rips analysed frame-by-frame): integrated −19.1 / −20.6 LUFS, 66–67 % of energy under 120 Hz, bed root F1 with C2 · F2 · A2 partials, clicks at 3.5–4.7 kHz with a 20–30 ms ten-dB decay sitting 10–20 dB under the sub, 3–5 hits per second while text streams, 0.5–1 s silences as punctuation, 64 % of frames still.

## Build / verify

```bash
npx hyperframes@0.8.29 check .
node ../../../skills/design-engineering/scripts/sound-sheet.mjs assets/sfx/cues.json --out assets/sfx/stem.wav --family assets/sfx --report
npx hyperframes@0.8.29 render . --output renders/demo.mp4 --fps 30
```

Retime anything → re-read `ledger.json`, update `cues.json`, re-render the stem, then the picture.
