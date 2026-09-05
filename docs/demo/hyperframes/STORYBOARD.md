# design-engineering demo — storyboard

**Format:** 1920×1080 · 30 fps · 12.0 s · one paused GSAP timeline on `window.__timelines.main`.
**Built silent.** Sound is one stereo stem, `assets/sfx/stem.wav`, rendered from the cue sheet `assets/sfx/cues.json` by `scripts/sound-sheet.mjs` after picture lock. No music bed.
**Ease family:** `power3.out` in, `power2.in` out at ~65 % of the entrance; every scene exits with an 8 px upward nudge and a `tl.set` hard kill on the cut frame. Seams are in `ledger.json`.

## Acts

| Act | id | start | dur | beat | seam out |
|---|---|---|---|---|---|
| 1 · Title | `s1` | 0.00 | 2.40 | wordmark eyebrow, `design-engineering` lands at 0.51, the one-line thesis | nudge up + fade @2.14, kill @2.40 |
| 2 · Router | `s2` | 2.40 | 2.80 | headline; three cards land at 80 ms intervals (3.00, 3.08, 3.16) | @4.94 → 5.20 |
| 3 · Review | `s3` | 5.20 | 3.00 | terminal lands 5.80; three Before/After/Why rows slide in 5.84–6.00; overlay + modal open together at 6.40 | @7.94 → 8.20 |
| 4 · Sound + SVG | `s4` | 8.20 | 2.20 | mascot stage lands 8.63; six waveform bars slide in 8.71–8.96; flipbook runs at 8 fps | @10.14 → 10.40 |
| 5 · Install | `s5` | 10.40 | 1.60 | command lands 10.76, headline lands a fifth above at 10.84, footer with the mark | end |

## Audio cue map

One row per visual event. Time is the **contact frame** (tween start + 85 % of duration for `power3.out`); whooshes start with the exit tween and peak on the cut. Pitch, decay, pan, and brightness are derived from the element's box on the canvas — see `references/sound/sound-from-motion.md`.

| time | cue | source event | derived |
|---|---|---|---|
| 0.52 | land | `#s1-h` settles (1300×132 @ 810,480) | 1.2 kHz · 735 ms · pan −0.11 |
| 2.14–2.36 | whoosh ↑ | scene 1 exits upward | breath sweeps 600 → 2.4 kHz, peaks on the cut |
| 2.85 | land | `#s2-h` | 1.4 kHz |
| 3.00 / 3.08 / 3.16 | land ×3 | `#c1 #c2 #c3` (512×230) | 1.4 / 1.6 / 1.8 kHz · pan −0.40 / 0 / +0.40 |
| 4.94–5.16 | whoosh ↑ | scene 2 exits | |
| 5.65 | land | `#s3-h` | 1.4 kHz |
| 5.81 | land | `#term` (888×330 @ 604,640) | 1.0 kHz · 915 ms · pan −0.26 — the biggest thing in the scene |
| 5.85 / 5.93 / 6.01 | tick ×3 | `#r1 #r2 #r3` slide in from the left | 3.2 / 3.6 / 4.0 kHz · 118 ms |
| 6.40–6.60 | air | `#ov` darkens the modal wrap | sub-500 Hz swell, pan +0.34 |
| 6.58 | land | `#modal` (520×420 @ 1432,620) | 1.1 kHz · 810 ms · pan +0.34 |
| 7.94–8.16 | whoosh ↑ | scene 3 exits | |
| 8.64 | land | `#stage` (656×520 @ 1374,600) — the headline settles on the same frame and is folded into this hit | 944 Hz · 930 ms · pan +0.30 |
| 8.72 … 8.97 | tick ×6 | `#bars .bar` stagger, 50 ms apart | 3.9 → 5.1 kHz chromatic climb · pan −0.30 |
| 10.14–10.36 | whoosh ↑ | scene 4 exits | |
| 10.77 | land | `#cmd` (1000×100 @ 660,640) | 1.5 kHz · pan −0.22 |
| 10.85 | land | `#s5-h`, a perfect fifth above the command | 2.1 kHz — the two together are the success chord |

Stem: 25 cues · integrated −17.4 LUFS · peak −1.0 dBFS · every onset within one frame of its tween's settle · silence elsewhere.

## Build / verify

```bash
npx hyperframes@0.8.29 check .
node ../../../skills/design-engineering/scripts/sound-sheet.mjs assets/sfx/cues.json --out assets/sfx/stem.wav --family assets/sfx --report
npx hyperframes@0.8.29 render . --output renders/demo.mp4 --fps 30
```

Retime anything → re-read `ledger.json`, update `cues.json`, re-render the stem, then the picture.
