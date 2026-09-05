import sys, json, wave, os
import numpy as np
from numpy.lib.stride_tricks import sliding_window_view
os.chdir(os.path.dirname(os.path.abspath(__file__)))
vid = sys.argv[1]
SR = 44100
with wave.open(f'{vid}.wav') as w:
    n = w.getnframes(); x = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768
dur = len(x) / SR
db = lambda v: 20 * np.log10(np.maximum(v, 1e-9))
N = 2048; H = 441  # 10 ms hop
w = np.hanning(N); nfr = (len(x) - N) // H
spec = np.empty((nfr, N // 2 + 1), dtype=np.float32)
for i in range(nfr): spec[i] = np.abs(np.fft.rfft(x[i*H:i*H+N] * w))
freqs = np.fft.rfftfreq(N, 1 / SR); t = np.arange(nfr) * H / SR
bands = {'low': (20, 200), 'mid': (200, 2000), 'high': (2000, 10000)}
def flux_band(lo, hi):
    m = (freqs >= lo) & (freqs < hi)
    ls = np.log1p(spec[:, m] * 10)
    f = np.maximum(np.diff(ls, axis=0), 0).sum(axis=1); return np.concatenate([[0], f])
def pick(f, k_s=0.5, delta=0.35, minsep=0.06):
    k = int(k_s / (H / SR)); pad = np.pad(f, k, mode='edge')
    med = np.median(sliding_window_view(pad, 2 * k + 1), axis=1)
    thr = med + delta * (f.max() * 0.02 + med.std())
    cand = np.where((f > thr) & (f >= np.roll(f, 1)) & (f >= np.roll(f, -1)))[0]
    out = []
    for c in cand:
        if out and t[c] - t[out[-1]] < minsep:
            if f[c] > f[out[-1]]: out[-1] = c
        else: out.append(c)
    return np.array(out, dtype=int)
FL = {b: flux_band(*r) for b, r in bands.items()}
ON = {b: pick(FL[b]) for b in bands}

# ---- tempo from the full-band onset strength (autocorrelation, 60–180 BPM) ----
f_all = FL['low'] + FL['mid'] + FL['high']
f_all = f_all - np.convolve(f_all, np.ones(200) / 200, mode='same')
ac = np.correlate(f_all, f_all, mode='full')[len(f_all) - 1:]
lags = np.arange(len(ac)) * H / SR
m = (lags >= 60 / 180) & (lags <= 60 / 60)
best = lags[m][np.argmax(ac[m])]; bpm = 60 / best
# grid alignment of high-band hits: distance to nearest beat modulo the period
def grid_fit(times, period):
    if not len(times): return None
    ph = (times % period) / period
    # circular concentration: how tightly phases cluster
    return float(np.abs(np.mean(np.exp(2j * np.pi * ph))))

# ---- bed: per-second floor level, and its pitch ----
hop = int(SR * 0.01); win = int(SR * 0.02)
frames = (len(x) - win) // hop
env = np.array([np.sqrt(np.mean(x[i*hop:i*hop+win] ** 2)) for i in range(frames)]); env_db = db(env)
floor = [float(np.percentile(env_db[int(s * 100):int((s + 1) * 100)], 10)) for s in range(int(dur))]
bed_present = [f > -45 for f in floor]
# low-band spectrum of the whole thing → fundamental peaks
low = (spec[:, (freqs >= 25) & (freqs < 400)] ** 2).mean(axis=0); lf = freqs[(freqs >= 25) & (freqs < 400)]
pk = np.argsort(low)[-6:][::-1]
bed_peaks = [(round(float(lf[i]), 1), round(float(db(np.sqrt(low[i]))), 1)) for i in pk]
def note(f):
    n = 69 + 12 * np.log2(f / 440); names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    return f'{names[int(round(n)) % 12]}{int(round(n)) // 12 - 1}'
# dropouts: ≥0.5 s where floor falls >12 dB under the median floor while the bed is present
medf = float(np.median([f for f in floor if f > -60]))
drop = [s for s, f in enumerate(floor) if f < medf - 12]

# ---- hits above the bed: high-band onsets with their level, centroid, decay, motion offset ----
W, Hh = 160, 90
g = np.fromfile(f'{vid}.gray', dtype=np.uint8); nf = len(g) // (W * Hh)
g = g[:nf * W * Hh].reshape(nf, Hh, W).astype(np.float32)
motion = np.concatenate([[0], np.abs(np.diff(g, axis=0)).mean(axis=(1, 2))])
cuts = np.where(motion > 40)[0]
def centroid(i): s = spec[i:i + 5].mean(axis=0); return float((freqs * s).sum() / max(s.sum(), 1e-9))
def motion_offset(tt, rad=6):
    f = int(round(tt * 30)); lo, hi = max(0, f - rad), min(nf, f + rad + 1)
    seg = motion[lo:hi]; return int(lo + np.argmax(seg) - f) if len(seg) else None
hits = []
for o in ON['high']:
    tt = float(t[o]); e0 = int(tt * 100)
    seg = env_db[e0:e0 + 200]; pkv = float(seg[:6].max()) if len(seg) else -99
    bel = np.where(seg < pkv - 20)[0]; dec = float(bel[0] / 100) if len(bel) else 2.0
    hb = (spec[o:o + 3, (freqs >= 2000)] ** 2).sum() / ((spec[o:o + 3] ** 2).sum() + 1e-9)
    hits.append({'t': round(tt, 2), 'peak_db': round(pkv, 1), 'centroid_hz': round(centroid(o)), 'decay20_s': round(dec, 2), 'high_share': round(float(hb), 3), 'motion_off': motion_offset(tt), 'motion': round(float(motion[min(nf - 1, int(round(tt * 30)))]), 1), 'near_cut': bool(len(cuts) and np.min(np.abs(cuts - tt * 30)) <= 3)})
strong = [h for h in hits if h['high_share'] > 0.15]
# ---- motion: shot lengths and the average motion curve after a cut (ease shape) ----
shots = np.diff(np.concatenate([[0], cuts, [nf]])) / 30
curves = []
for c in cuts:
    seg = motion[c + 1:c + 25]
    if len(seg) == 24 and seg.max() > 0: curves.append(seg / seg.max())
avg_curve = np.mean(curves, axis=0).round(2).tolist() if curves else None
# per-frame motion percentiles: how much of the time is "still"
still = float(np.mean(motion < 0.3))
out = {
    'video': vid, 'duration': round(dur, 1), 'bpm_estimate': round(bpm, 1), 'beat_period_s': round(best, 3),
    'onsets_per_s': {b: round(len(ON[b]) / dur, 2) for b in bands},
    'grid_concentration_high_hits': round(grid_fit(t[ON['high']], best), 2), 'grid_concentration_low': round(grid_fit(t[ON['low']], best), 2),
    'bed_floor_median_db': round(medf, 1), 'bed_present_frac': round(float(np.mean(bed_present)), 2), 'dropout_seconds': drop,
    'bed_low_peaks_hz_db_note': [(f, l, note(f)) for f, l in bed_peaks],
    'strong_high_hits': len(strong), 'strong_hits_per_s': round(len(strong) / dur, 2),
    'strong_hit_centroid_median': round(float(np.median([h['centroid_hz'] for h in strong]))) if strong else None,
    'strong_hit_decay_median_s': round(float(np.median([h['decay20_s'] for h in strong])), 2) if strong else None,
    'strong_hit_peak_median_db': round(float(np.median([h['peak_db'] for h in strong])), 1) if strong else None,
    'strong_hits_within_2f_of_motion_peak': round(float(np.mean([abs(h['motion_off']) <= 2 for h in strong if h['motion_off'] is not None])), 2) if strong else None,
    'strong_hits_near_cut': round(float(np.mean([h['near_cut'] for h in strong])), 2) if strong else None,
    'cuts': len(cuts), 'cut_times': [round(float(c / 30), 2) for c in cuts], 'shot_len_median_s': round(float(np.median(shots)), 2), 'shot_len_p90_s': round(float(np.percentile(shots, 90)), 2),
    'still_frac_(motion<0.3)': round(still, 2), 'avg_motion_curve_24f_after_cut': avg_curve,
}
json.dump({'summary': out, 'hits': hits, 'floor': floor}, open(f'{vid}-analysis2.json', 'w'), indent=1)
print(json.dumps(out, indent=1))
print('strong hits (t, peak, centroid, decay, motion_off, near_cut):')
for h in strong[:60]: print(h['t'], h['peak_db'], h['centroid_hz'], h['decay20_s'], h['motion_off'], h['near_cut'])
