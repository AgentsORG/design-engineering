# HeyGen renders: measured metrics

Three renders committed in HeyGen's hyperframes-launches repository (Apache-2.0), measured at native frame rate with `measure.py` by HKTITAN on 2026-09-28. The Codex replica has no audio stream. The composition-source census is separate: `heygen_corpus_stats.py` and [digests/heygen-corpus-stats.json](../digests/heygen-corpus-stats.json).

Read it with the [caveats](../README.md#caveats): `cuts`, `cpm` and `shot_med` are the automatic detector's counts, not the frame-read ones; `still` compares only within a register; move runs (`mv_*`) chain overlapping changes and are not tween durations; `blur` above 1 only means the still frames are flat; `speech` is a proxy.

## Per film

The table, distribution and legend below are the unedited output of `python aggregate.py heygen "metrics/hg-*.json"`, run from this folder (it also rewrites `corpus-heygen.json`); only the blank line under the distribution heading was added.

| id | dur | fps | cuts | cpm | shot_med | still | calm | held | mpm | mv_med | mv_p75 | pan | zoom | local | push | pull | blur | luma | dark | light | colf | lufs | ops | hits | bpm | beat | speech | sub | cut_hit | chance | hit_motion |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| hg-codex-replica | 10.15 | 60.0 | 0 | 0.0 | 10.15 | 0.072 | 0.601 | 0.097 | 17.7 | 1.567 | 4.642 | 0.0 | 0.006 | 0.994 | 1 | 0 | 0.77 | 249.8 | 0.0 | 0.977 | 13.9 |  |  |  |  |  |  |  |  |  |  |
| hg-frame-md-launch | 60.29 | 30.0 | 4 | 4.0 | 8.2 | 0.337 | 0.669 | 0.054 | 83.6 | 0.333 | 0.7 | 0.041 | 0.056 | 0.903 | 2 | 1 | 0.45 | 215.1 | 0.045 | 0.554 | 26.5 | -31.3 | 5.92 | 0.9 | 62.3 | 0.083 | 0.336 | 0.022 | 0.25 | 0.12 | 0.3 |
| hg-k3-promo | 16.63 | 30.0 | 1 | 3.6 | 8.23 | 0.364 | 0.638 | 0.006 | 36.4 | 0.317 | 1.658 | 0.0 | 0.009 | 0.991 | 0 | 0 | 1.36 | 4.0 | 0.996 | 0.004 | 1.1 | -15.3 | 8.78 | 1.32 | 89.1 | 0.678 | 0.352 | 0.868 | 0.0 | 0.18 | 0.36 |

## distribution (median [p25, p75], min, max) over 3 films

- dur: 16.6 [13.4, 38.5]  min 10.2 max 60.3
- fps: 30 [30, 45]  min 30 max 60
- cuts: 1 [0.5, 2.5]  min 0 max 4
- cpm: 3.6 [1.8, 3.8]  min 0 max 4
- shot_med: 8.23 [8.21, 9.19]  min 8.2 max 10.2
- still: 0.337 [0.205, 0.351]  min 0.072 max 0.364
- calm: 0.638 [0.619, 0.653]  min 0.601 max 0.669
- held: 0.054 [0.03, 0.0755]  min 0.006 max 0.097
- mpm: 36.4 [27, 60]  min 17.7 max 83.6
- mv_med: 0.333 [0.325, 0.95]  min 0.317 max 1.57
- mv_p75: 1.66 [1.18, 3.15]  min 0.7 max 4.64
- pan: 0 [0, 0.0205]  min 0 max 0.041
- zoom: 0.009 [0.0075, 0.0325]  min 0.006 max 0.056
- local: 0.991 [0.947, 0.992]  min 0.903 max 0.994
- push: 1 [0.5, 1.5]  min 0 max 2
- pull: 0 [0, 0.5]  min 0 max 1
- blur: 0.77 [0.61, 1.06]  min 0.45 max 1.36
- luma: 215 [110, 232]  min 4 max 250
- dark: 0.045 [0.0225, 0.52]  min 0 max 0.996
- light: 0.554 [0.279, 0.766]  min 0.004 max 0.977
- colf: 13.9 [7.5, 20.2]  min 1.1 max 26.5
- lufs: -23.3 [-27.3, -19.3]  min -31.3 max -15.3
- ops: 7.35 [6.63, 8.06]  min 5.92 max 8.78
- hits: 1.11 [1.01, 1.22]  min 0.9 max 1.32
- bpm: 75.7 [69, 82.4]  min 62.3 max 89.1
- beat: 0.381 [0.232, 0.529]  min 0.083 max 0.678
- speech: 0.344 [0.34, 0.348]  min 0.336 max 0.352
- sub: 0.445 [0.233, 0.656]  min 0.022 max 0.868
- cut_hit: 0.125 [0.0625, 0.188]  min 0 max 0.25
- chance: 0.15 [0.135, 0.165]  min 0.12 max 0.18
- hit_motion: 0.33 [0.315, 0.345]  min 0.3 max 0.36
- motion after a cut, relative to the first frame, at [1f, 100, 200, 400, 800 ms] (mean over films): [1.0, 1.66, 2.14, 1.71, 1.81]

legend: still = share of frames with no visible change (<0.05 % of area changed >12 grey levels in 1/30 s); calm = older global near-stillness; held = duplicate frames inside moves (animation on twos / pulldown); mpm = moves per minute; mv_* = move length in s; pan/zoom/local = share of moving frames dominated by each; push/pull = sustained zoom runs >=0.33 s; blur = Laplacian sharpness on fastest frames / on still frames (<1 = motion blur); luma 0-255; dark/light = share of frames with mean luma <50 / >180; colf = Hasler-Susstrunk colourfulness; lufs = integrated loudness; ops = audio onsets/s; hits = top-15 % onsets/s; beat = autocorrelation clarity; speech = syllabic-modulation index (~>0.3 suggests VO, proxy only); sub = energy share under 120 Hz; cut_hit = cuts within 67 ms of a strong hit vs chance.
