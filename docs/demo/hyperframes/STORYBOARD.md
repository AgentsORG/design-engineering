# design-engineering — launch film storyboard

**Format:** 1920×1080 · 30 fps · 34.6 s · eight sub-compositions in `compositions/`, one paused GSAP timeline each; `index.html` only mounts them and the stem. Built with hyperframes@0.8.82 (`npx hyperframes check`: 0 errors, 0 warnings).

**Register:** Skale's UI-motion register, the default for an unspecified launch film in `references/meta/pov.md` (see `references/launch-video/launch-video-registers.md`). The UI is rebuilt as vector and the type is the script. The newest word carries the accent and settles in 0.2 s. Words build 0.167 s apart. Every hold creeps on its entry vector, so the film has no frozen frame. Hard cuts are hidden inside a fill, on a constant ground, or on a palette flip, and one montage act accelerates into a snap. Nothing decorative moves on a UI object.

**Motion:** arrivals settle exponentially with a time constant sized to the move (`assets/film-motion.js`): ~0.035 s for a stamped card, ~0.09 s for a word, 0.12 s for a row, 0.35 s for a counter. Exits accelerate on `power3.in`. Seams use HyperFrames' stamp values, written by hand because the seam doctrine is not installed: lateral exit `power3.in` 0.34 s to 12 % with entry `power4.out` 0.42 s from 10 % at 0.35 opacity, and Z entry `expo.out` 0.5 s from 0.78 with 10 px blur (`references/launch-video/hyperframes-reconciliation.md`). There is no spring overshoot anywhere; bounce is a register this film does not use.

**Sound:** register B (`references/sound/launch-video-sound.md`). A warm sub-heavy bed in F carries the film. Dry clicks sit on every stamp and thuds on every big landing, all derived from the motion. The sub is taken away before the name, before the counters snap and before Enter. `assets/sfx/stem.wav` is rendered from `assets/sfx/cues.json` by `skills/design-engineering/scripts/sound-sheet.mjs`, with no library files: 138 cues, 240 onsets, −15.4 LUFS integrated, 5.4 LU range, −1.4 dBTP true peak.

**Beats vs the corpus** (`references/launch-video/launch-video-structure.md`):

- First word on screen at 0.07 s, after a two-frame poster of the endcard lockup.
- First seam at 2.63 s.
- The name lands at 6.75 s, 19 % of runtime, where the problem act ends.
- The low end comes back on it.
- Endcard 4.4 s with a 2.4 s final hold.

## Acts

| # | Scene | File | Start | Dur | Beat | Seam out |
|---|---|---|---|---|---|---|
| 1 | Hook | `s1-hook.html` | 0.000 | 2.633 | Poster frames 0–1. "Your agent ships" builds; "UI." slams in at ~5× for 9 frames, drifting, then jumps into the sentence in one frame. "It also ships this." Nine AI-default tells stamp in, 0.167 → 0.033 s apart. A 134 px cursor presses **Review it with /design-engineering** | **Fill the frame (click as seam):** the pressed pill's ink grows over the frame, 0.35 s `power2.in`, and the cut lands inside the fill |
| 2 | Review | `s2-review.html` | 2.633 | 3.567 | On ink: "Before. After. Why." Four review rows ride up 0.4 s apart. Each Before is struck, then its After and Why stamp in | **Constant ground:** the sheet accelerates off the top and the cut lands on unchanged ink |
| 3 | Name | `s3-name.html` | 6.200 | 3.700 | The caret holds alone for 0.55 s, with the sub out. `/` lands, then **design-engineering** flaps in one slot a frame, each glyph growing from its baseline with a dip and settling from yellow to paper. The subline follows | **Zoom into a glyph:** the camera dives into the caret block, ×30 in 0.5 s on `power4.in`, until its paper is the next ground |
| 4 | Motion | `s4-motion.html` | 9.900 | 4.400 | The scene arrives still pushing (0.78 → 1). "Motion, with numbers." The cursor presses **Open settings**, and on the same frame the modal opens at ¼ speed on `cubic-bezier(.23,1,.32,1)` while a dot rides the plotted curve and the readouts count 0 → 200 ms | **Cut the curve, leftward:** the film's current |
| 5 | Sound | `s5-sound.html` | 14.300 | 4.400 | "Sound, derived from motion." A playhead sweeps five UI events at constant speed. Each one dips, stamps its waveform and plays the sound it is labelled with | **Fill the frame:** the parked playhead widens until its blue is the ground |
| 6 | Measured | `s6-measured.html` | 18.700 | 5.900 | On blue: "Launch films, measured." Fourteen corpus findings stamp in, legible → accelerating → blur zone (0.42 → 0.07 s). They snap to a hold on three counters (47 · 3,446 · 116), which settle with a 0.35 s constant and flash on landing | **Hard cut on a palette flip:** everything rises out and the next scene rises in (the upward vector is reserved for a conclusion) |
| 7 | CTA | `s7-cta.html` | 24.600 | 5.600 | "Give your agent taste." `npx skills add AgentsORG/design-engineering` types at 15.4 c/s, seeded ±30 % per key. The sub drops out for 0.25 s; Enter is pressed at 28.943 s; the pill pops volume-conserving and the confirmation stamps | **Carrier dot:** the pill swells, then collapses to a dot turning 28°; the dot holds two frames |
| 8 | Endcard | `s8-endcard.html` | 30.200 | 4.400 | Paper grows out of the dot. The name flaps in again as a bookend, then the command, the URL and the AgentsORG mark; the final 2.4 s hold keeps creeping | end |

Every seam is typed in `ledger.json`.

## Frame 1

status: built
src: compositions/s1-hook.html
blueprint: kinetic-type-beats + overwhelm-surround + cta-morph-press
rules: kinetic-beat-slam, waterfall-entry, physics-press-reaction, center-outward-expansion

Your agent ships UI. It also ships this. Pressing **Review it with /design-engineering** fills the frame.

## Frame 2

status: built
src: compositions/s2-review.html
blueprint: comparison-split
rules: waterfall-entry, css-marker-patterns, nudge-curve

Before · After · Why, struck and stamped row by row.

## Frame 3

status: built
src: compositions/s3-name.html
blueprint: titlecard-reveal
rules: discrete-text-sequence, hacker-flip-3d (split-flap timing without the random glyphs), coordinate-target-zoom

The name, then the dive through the caret.

## Frame 4

status: built
src: compositions/s4-motion.html
blueprint: cursor-ui-demo
rules: svg-path-draw, control-target-sync, chart-scrub-readout, physics-press-reaction

A curve, a dot and a modal on the same ease.

## Frame 5

status: built
src: compositions/s5-sound.html
blueprint: panel-edit-live-sync
rules: stat-bars-and-fills, control-target-sync

A playhead turns motion into sound.

## Frame 6

status: built
src: compositions/s6-measured.html
blueprint: dataviz-countup + ticker-takeover
rules: dynamic-content-sequencing, motion-blur-streak, counting-dynamic-scale

The accelerating montage snaps to three counters.

## Frame 7

status: built
src: compositions/s7-cta.html
blueprint: prompt-type-submit-generate
rules: typewriter pacing (per-key, seeded), press-release-spring (without overshoot)

The command is typed, Enter pressed, and the pill collapses to a dot.

## Frame 8

status: built
src: compositions/s8-endcard.html
blueprint: logo-assemble-lockup
rules: center-outward-expansion, discrete-text-sequence

Paper grows from the dot and the lockup holds.

## Audio cue map (summary)

Each cue is placed on its motion's **contact frame**: a stamp's own frame, or the frame where an exponential arrival reaches ~90 %. The full sheet, with every box, is `assets/sfx/cues.json`.

| Time | Cue | Source event |
|---|---|---|
| 0.00 → | bed in | sub on F1 + F2, pad; −9 dB until the name |
| 0.67 | thud | "UI." slams |
| 1.65 → 2.28 | click ×9, a semitone higher each | the tells stamp, accelerating |
| 2.23 · 2.64 | click · thud | the press, then the ink lands |
| 3.61 → 4.81 | click + stamps ×4 | review rows arrive and get struck |
| 6.20–6.75 | sub out, pad only | stillness before the name |
| 6.90 → 7.47 · 7.75 | flicker ×18 · thud, swell | the flaps, then the name lands |
| 9.40 · 10.02 | air · thud | the dive, then the arrival |
| 11.30 · 11.62 | click · click | Open is pressed; the modal lands |
| 15.25 → 17.05 | thud · click · click + thud · ticks ×9 · type ×12 (jitter .35) | the events play the sounds they are labelled with |
| 19.55 → 21.41 | click ×14, rising | the montage |
| 21.30–21.50 · 21.50 | sub out · thud | the snap to the counters |
| 22.65 / 22.77 / 22.89 | thud ×3 (root, a third up, a fifth up) | the counters land |
| 25.80 → 28.59 | click ×43 at −17 dB | keystrokes, on their seeded onsets |
| 28.69–28.94 · 28.94 | sub out · click + success, swell | Enter |
| 30.00 · 30.45 · 31.40 | click · thud · thud | the dot; paper lands; the name lands |

## Build and verify

```bash
npx hyperframes@0.8.82 check .
node ../../../skills/design-engineering/scripts/sound-sheet.mjs assets/sfx/cues.json --out assets/sfx/stem.wav --peak -1.6 --report
npx hyperframes@0.8.82 render . --output renders/launch.mp4 --fps 30 --strict
python ../../research/launch-films/measure.py renders/launch.mp4 launch-film out/
```

Retime anything, and then:

1. Update `ledger.json` and `cues.json`.
2. Re-render the stem.
3. Re-render the picture.
4. Measure the render at native fps against its register before it ships (`references/launch-video/launch-video-review.md`).
