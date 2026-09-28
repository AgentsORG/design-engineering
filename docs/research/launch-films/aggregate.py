"""Aggregate per-film JSONs into a corpus table + distribution summary.
usage: python aggregate.py <name> <dir | file | glob> [...] > table.md   (also writes corpus-<name>.json next to this file)
  e.g. python aggregate.py skale "metrics/[0-9][0-9]-*.json"
       python aggregate.py acclaimed "metrics/[a-gi-z]*.json"
       python aggregate.py heygen "metrics/hg-*.json"
"""
import sys, json, glob, os
import numpy as np

name = sys.argv[1]
rows = []
for d in sys.argv[2:]:
    paths = sorted(glob.glob(os.path.join(d, '*.json'))) if os.path.isdir(d) else sorted(glob.glob(d))
    for p in paths:
        j = json.load(open(p))
        a = j.get('audio', {})
        cam = j.get('camera_share_of_moving_frames') or {}
        rows.append({
            'id': j['id'], 'dur': j['duration_s'], 'fps': j['fps'],
            'cuts': j['cuts'], 'cpm': j['cuts_per_min'], 'shot_med': j['shot_len_s']['median'],
            'still': j['still_frac'], 'calm': j['calm_frac_global'], 'held': j['held_in_move_frac'],
            'mpm': j['moves_per_min'], 'mv_med': j['move_len_s']['median'], 'mv_p75': j['move_len_s']['p75'],
            'after_cut': j['motion_after_cut_rel_at_1f_100ms_200ms_400ms_800ms'],
            'pan': cam.get('pan'), 'zoom': cam.get('zoom'), 'rot': cam.get('rotate'), 'local': cam.get('local'),
            'push': j['push_in_runs'], 'pull': j['pull_out_runs'], 'blur': j['blur_ratio_fast_vs_still'],
            'luma': j['luma_median'], 'dark': j['dark_frac_luma_lt_50'], 'light': j['light_frac_luma_gt_180'],
            'colf': j['colorfulness_median'], 'mono': j['mono_frac_colorfulness_lt_15'], 'flash': j['flash_frames'],
            'lufs': a.get('lufs_i'), 'tp': a.get('true_peak_dbfs'), 'ops': a.get('onsets_per_s'),
            'hits': a.get('strong_hits_per_s'), 'bpm': a.get('bpm_estimate'),
            'beat': a.get('beat_clarity'), 'speech': a.get('speech_mod_index'), 'sub': (a.get('band_share') or {}).get('0-120'),
            'cut_hit': a.get('cuts_within_67ms_of_strong_hit'), 'chance': a.get('chance_within_67ms'),
            'hit_motion': a.get('strong_hits_within_67ms_of_motion_peak'),
        })

cols = ['id', 'dur', 'fps', 'cuts', 'cpm', 'shot_med', 'still', 'calm', 'held', 'mpm', 'mv_med', 'mv_p75', 'pan', 'zoom',
        'local', 'push', 'pull', 'blur', 'luma', 'dark', 'light', 'colf', 'lufs', 'ops', 'hits', 'bpm', 'beat', 'speech',
        'sub', 'cut_hit', 'chance', 'hit_motion']
print('| ' + ' | '.join(cols) + ' |')
print('|' + '---|' * len(cols))
for r in rows:
    print('| ' + ' | '.join('' if r[c] is None else str(r[c]) for c in cols) + ' |')
print()
print(f'## distribution (median [p25, p75], min, max) over {len(rows)} films')
for c in cols[1:]:
    v = np.array([r[c] for r in rows if isinstance(r[c], (int, float))], float)
    if len(v):
        print(f'- {c}: {np.median(v):.3g} [{np.percentile(v, 25):.3g}, {np.percentile(v, 75):.3g}]  min {v.min():.3g} max {v.max():.3g}')
ac = np.array([r['after_cut'] for r in rows if r['after_cut']])
if len(ac):
    print('- motion after a cut, relative to the first frame, at [1f, 100, 200, 400, 800 ms] (mean over films):',
          [round(float(x), 2) for x in ac.mean(0)])
json.dump(rows, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), f'corpus-{name}.json'), 'w'), indent=1)
print('\nlegend: still = share of frames with no visible change (<0.05 % of area changed >12 grey levels in 1/30 s); calm = older global near-stillness; held = duplicate frames inside moves (animation on twos / pulldown); mpm = moves per minute; mv_* = move length in s; pan/zoom/local = share of moving frames dominated by each; push/pull = sustained zoom runs >=0.33 s; blur = Laplacian sharpness on fastest frames / on still frames (<1 = motion blur); luma 0-255; dark/light = share of frames with mean luma <50 / >180; colf = Hasler-Susstrunk colourfulness; lufs = integrated loudness; ops = audio onsets/s; hits = top-15 % onsets/s; beat = autocorrelation clarity; speech = syllabic-modulation index (~>0.3 suggests VO, proxy only); sub = energy share under 120 Hz; cut_hit = cuts within 67 ms of a strong hit vs chance.')
