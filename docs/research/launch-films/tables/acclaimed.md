# Acclaimed corpus: measured metrics

18 launch films from 2024-2026, measured at native frame rate with `measure.py` by HKTITAN on 2026-09-28. The [film list](../README.md#acclaimed-18-films) gives brand, title, year, maker and URL. Frame-read cut counts and the hand-timed endcard, first word, first seam, name, typing and hold values are entered in `others_stats.py`; stagger, seam, counter and time-constant values are in [the acclaimed notes](../notes/synthesis-acclaimed.md), sections 3-4.

Read it with the [caveats](../README.md#caveats): `cuts`, `cpm` and `shot_med` are the automatic detector's counts, not the frame-read ones; `still` compares only within a register; move runs (`mv_*`) chain overlapping changes and are not tween durations; `blur` above 1 only means the still frames are flat; `speech` is a proxy.

## Per film

The table, distribution and legend below are the unedited output of `python aggregate.py acclaimed "metrics/[a-gi-z]*.json"`, run from this folder (it also rewrites `corpus-acclaimed.json`); only the blank line under the distribution heading was added.

| id | dur | fps | cuts | cpm | shot_med | still | calm | held | mpm | mv_med | mv_p75 | pan | zoom | local | push | pull | blur | luma | dark | light | colf | lufs | ops | hits | bpm | beat | speech | sub | cut_hit | chance | hit_motion |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| anthropic-cowork-2026 | 68.64 | 24.0 | 4 | 3.5 | 14.79 | 0.343 | 0.82 | 0.071 | 56.0 | 0.542 | 0.844 | 0.261 | 0.05 | 0.688 | 1 | 1 | 3.55 | 244.1 | 0.0 | 0.982 | 6.7 | -35.8 | 6.96 | 1.05 | 72.8 | 0.284 | 0.236 | 0.63 | 0.0 | 0.14 | 0.19 |
| anthropic-opus-4-6-2026 | 39.47 | 24.0 | 24 | 36.5 | 0.58 | 0.552 | 0.815 | 0.472 | 47.2 | 0.25 | 0.521 | 0.165 | 0.113 | 0.713 | 0 | 0 | 0.8 | 202.6 | 0.002 | 0.559 | 6.0 | -17.2 | 7.93 | 1.19 | 147.7 | 0.173 | 0.207 | 0.549 | 0.25 | 0.16 | 0.36 |
| apple-liquid-glass-2025 | 273.83 | 29.97 | 66 | 14.5 | 2.8 | 0.188 | 0.46 | 0.001 | 34.6 | 0.968 | 2.286 | 0.329 | 0.147 | 0.46 | 20 | 29 | 1.11 | 148.3 | 0.042 | 0.256 | 34.9 | -22.3 | 7.63 | 1.15 | 117.5 | 0.222 | 0.314 | 0.236 | 0.18 | 0.15 | 0.2 |
| arc-windows-2024 | 36.64 | 24.0 | 37 | 60.7 | 0.75 | 0.366 | 0.593 | 0.029 | 72.2 | 0.333 | 0.594 | 0.135 | 0.052 | 0.771 | 1 | 1 | 4.05 | 111.4 | 0.038 | 0.284 | 49.6 | -13.0 | 6.17 | 0.93 | 62.3 | 0.769 | 0.474 | 0.613 | 0.03 | 0.12 | 0.18 |
| cursor-2-0-2025 | 64.48 | 60.0 | 2 | 1.9 | 17.72 | 0.611 | 0.862 | 0.103 | 114.6 | 0.083 | 0.175 | 0.264 | 0.304 | 0.386 | 4 | 5 | 1.55 | 238.7 | 0.033 | 0.967 | 3.3 | -32.6 | 7.37 | 1.12 | 112.3 | 0.808 | 0.238 | 0.568 | 0.0 | 0.15 | 0.32 |
| figma-glass-2025 | 29.63 | 30.001 | 6 | 12.2 | 3.8 | 0.13 | 0.312 | 0.031 | 20.3 | 3.333 | 3.725 | 0.252 | 0.091 | 0.657 | 4 | 2 | 34.88 | 41.2 | 0.552 | 0.0 | 32.8 | -12.1 | 8.57 | 1.28 | 129.2 | 0.416 | 0.169 | 0.803 | 0.0 | 0.17 | 0.24 |
| figma-motion-2026 | 68.15 | 12.0 | 14 | 12.3 | 4.58 | 0.024 | 0.42 | 0.001 | 13.2 | 4.5 | 5.917 | 0.094 | 0.133 | 0.709 | 8 | 6 | 24.13 | 147.5 | 0.151 | 0.208 | 52.6 | -17.1 | 7.44 | 1.12 | 63.0 | 0.751 | 0.286 | 0.474 | 0.07 | 0.15 | 0.09 |
| framer-3-0-2026 | 75.16 | 29.97 | 16 | 12.8 | 3.97 | 0.188 | 0.515 | 0.005 | 32.8 | 0.734 | 1.535 | 0.253 | 0.15 | 0.595 | 1 | 6 | 5.94 | 14.7 | 0.943 | 0.0 | 41.8 | -18.2 | 5.93 | 0.89 | 60.1 | 0.364 | 0.276 | 0.629 | 0.25 | 0.12 | 0.25 |
| google-ai-mode-2025 | 97.11 | 24.0 | 2 | 1.2 | 45.54 | 0.171 | 0.581 | 0.004 | 27.8 | 0.917 | 2.625 | 0.478 | 0.047 | 0.474 | 8 | 4 | 6.26 | 28.3 | 0.786 | 0.204 | 14.3 | -21.4 | 6.17 | 0.93 | 60.8 | 0.811 | 0.219 | 0.255 | 0.0 | 0.12 | 0.1 |
| google-gemini-app-2024 | 73.81 | 29.97 | 4 | 3.3 | 8.71 | 0.097 | 0.458 | 0.005 | 21.9 | 1.468 | 3.27 | 0.123 | 0.071 | 0.802 | 6 | 9 | 6.37 | 233.8 | 0.338 | 0.655 | 9.7 | -19.3 | 6.46 | 0.98 | 74.9 | 0.606 | 0.324 | 0.375 | 0.0 | 0.13 | 0.15 |
| google-m3-expressive-2025 | 38.08 | 60.0 | 19 | 30.0 | 1.55 | 0.272 | 0.512 | 0.024 | 72.6 | 0.308 | 0.725 | 0.209 | 0.063 | 0.728 | 3 | 1 | 0.76 | 175.6 | 0.326 | 0.472 | 32.4 | -12.7 | 6.72 | 1.02 | 172.3 | 0.301 | 0.187 | 0.63 | 0.0 | 0.14 | 0.23 |
| granola-2-0-2025 | 29.29 | 59.999 | 0 | 0.0 | 29.25 | 0.488 | 0.731 | 0.027 | 86.2 | 0.133 | 0.533 | 0.03 | 0.124 | 0.841 | 5 | 1 | 2.0 | 234.6 | 0.0 | 1.0 | 26.2 | -12.5 | 7.24 | 1.09 | 83.4 | 0.487 | 0.457 | 0.626 |  |  | 0.19 |
| linear-agent-2026 | 54.92 | 60.0 | 1 | 1.1 | 27.43 | 0.588 | 0.888 | 0.002 | 108.3 | 0.033 | 0.033 | 0.707 | 0.073 | 0.22 | 1 | 0 | 2.89 | 14.4 | 1.0 | 0.0 | 3.9 | -32.9 | 5.99 | 0.91 | 94.0 | 0.127 | 0.287 | 0.862 | 0.0 | 0.12 | 0.32 |
| notion-3-agents-2025 | 90.05 | 24.0 | 6 | 4.0 | 7.87 | 0.395 | 0.843 | 0.098 | 66.0 | 0.292 | 0.625 | 0.053 | 0.311 | 0.636 | 1 | 4 | 0.97 | 243.8 | 0.0 | 1.0 | 13.2 | -18.7 | 6.92 | 1.04 | 60.1 | 0.312 | 0.194 | 0.589 | 0.0 | 0.14 | 0.21 |
| notion-mail-2025 | 60.09 | 24.0 | 14 | 14.0 | 2.21 | 0.368 | 0.771 | 0.163 | 54.0 | 0.5 | 0.906 | 0.226 | 0.095 | 0.679 | 0 | 1 | 2.13 | 239.4 | 0.0 | 1.0 | 15.3 | -25.6 | 7.29 | 1.1 | 143.6 | 0.154 | 0.29 | 0.418 | 0.14 | 0.15 | 0.26 |
| perplexity-comet-2025 | 41.39 | 24.0 | 3 | 4.4 | 6.4 | 0.165 | 0.6 | 0.0 | 21.8 | 1.417 | 3.479 | 0.248 | 0.114 | 0.626 | 3 | 2 | 1.58 | 218.0 | 0.295 | 0.639 | 12.1 | -15.2 | 6.28 | 0.94 | 156.6 | 0.101 | 0.246 | 0.272 | 0.33 | 0.13 | 0.13 |
| raycast-new-2025 | 38.59 | 30.0 | 3 | 4.7 | 9.58 | 0.486 | 0.744 | 0.013 | 31.1 | 0.183 | 1.333 | 0.588 | 0.004 | 0.408 | 1 | 1 | 0.89 | 27.7 | 0.882 | 0.0 | 1.4 | -16.9 | 3.42 | 0.52 | 129.2 | 0.116 | 0.248 | 0.79 | 0.0 | 0.07 | 0.6 |
| spline-hana-2025 | 26.73 | 30.0 | 12 | 27.0 | 1.4 | 0.299 | 0.7 | 0.052 | 83.2 | 0.267 | 0.6 | 0.168 | 0.028 | 0.804 | 0 | 0 | 1.84 | 22.0 | 0.705 | 0.146 | 12.6 | -20.9 | 6.47 | 0.97 | 129.2 | 0.625 | 0.46 | 0.677 | 0.17 | 0.13 | 0.27 |

## distribution (median [p25, p75], min, max) over 18 films

- dur: 57.5 [38.2, 72.5]  min 26.7 max 274
- fps: 30 [24, 30]  min 12 max 60
- cuts: 6 [3, 15.5]  min 0 max 66
- cpm: 8.45 [3.35, 14.4]  min 0 max 60.7
- shot_med: 5.49 [2.36, 13.5]  min 0.58 max 45.5
- still: 0.321 [0.175, 0.463]  min 0.024 max 0.611
- calm: 0.65 [0.513, 0.804]  min 0.312 max 0.888
- held: 0.0255 [0.00425, 0.0662]  min 0 max 0.472
- mpm: 50.6 [28.6, 72.5]  min 13.2 max 115
- mv_med: 0.416 [0.254, 0.955]  min 0.033 max 4.5
- mv_p75: 0.875 [0.595, 2.54]  min 0.033 max 5.92
- pan: 0.237 [0.143, 0.263]  min 0.03 max 0.707
- zoom: 0.093 [0.0548, 0.131]  min 0.004 max 0.311
- local: 0.668 [0.504, 0.724]  min 0.22 max 0.841
- push: 2 [1, 4.75]  min 0 max 20
- pull: 1.5 [1, 4.75]  min 0 max 29
- blur: 2.06 [1.22, 5.47]  min 0.76 max 34.9
- luma: 162 [31.5, 234]  min 14.4 max 244
- dark: 0.223 [0.00975, 0.667]  min 0 max 1
- light: 0.378 [0.16, 0.889]  min 0 max 1
- colf: 13.8 [7.45, 32.7]  min 1.4 max 52.6
- lufs: -18.4 [-22.1, -15.6]  min -35.8 max -12.1
- ops: 6.82 [6.2, 7.35]  min 3.42 max 8.57
- hits: 1.03 [0.932, 1.12]  min 0.52 max 1.28
- bpm: 103 [65.5, 129]  min 60.1 max 172
- beat: 0.338 [0.185, 0.62]  min 0.101 max 0.811
- speech: 0.262 [0.223, 0.308]  min 0.169 max 0.474
- sub: 0.601 [0.432, 0.63]  min 0.236 max 0.862
- cut_hit: 0 [0, 0.17]  min 0 max 0.33
- chance: 0.14 [0.12, 0.15]  min 0.07 max 0.17
- hit_motion: 0.22 [0.182, 0.268]  min 0.09 max 0.6
- motion after a cut, relative to the first frame, at [1f, 100, 200, 400, 800 ms] (mean over films): [1.0, 0.95, 0.79, 1.51, 1.1]

legend: still = share of frames with no visible change (<0.05 % of area changed >12 grey levels in 1/30 s); calm = older global near-stillness; held = duplicate frames inside moves (animation on twos / pulldown); mpm = moves per minute; mv_* = move length in s; pan/zoom/local = share of moving frames dominated by each; push/pull = sustained zoom runs >=0.33 s; blur = Laplacian sharpness on fastest frames / on still frames (<1 = motion blur); luma 0-255; dark/light = share of frames with mean luma <50 / >180; colf = Hasler-Susstrunk colourfulness; lufs = integrated loudness; ops = audio onsets/s; hits = top-15 % onsets/s; beat = autocorrelation clarity; speech = syllabic-modulation index (~>0.3 suggests VO, proxy only); sub = energy share under 120 Hz; cut_hit = cuts within 67 ms of a strong hit vs chance.
