import sys, json, wave, os
import numpy as np
os.chdir(os.path.dirname(os.path.abspath(__file__)))
vid = sys.argv[1]
SR = 44100
with wave.open(f'{vid}.wav') as w:
    n = w.getnframes(); x = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768
dur = len(x) / SR
db = lambda v: 20 * np.log10(np.maximum(v, 1e-9))

# ---- envelope (10 ms RMS) ----
hop = int(SR * 0.005); win = int(SR * 0.01)
frames = (len(x) - win) // hop
env = np.array([np.sqrt(np.mean(x[i*hop:i*hop+win] ** 2)) for i in range(frames)])
env_db = db(env)
t_env = np.arange(frames) * hop / SR
silence_frac = float(np.mean(env_db < -50)); quiet_frac = float(np.mean(env_db < -40))

# ---- STFT for spectral flux + centroid ----
N = 2048; H = 512
w = np.hanning(N)
nfr = (len(x) - N) // H
spec = np.empty((nfr, N // 2 + 1), dtype=np.float32)
for i in range(nfr):
    spec[i] = np.abs(np.fft.rfft(x[i*H:i*H+N] * w))
freqs = np.fft.rfftfreq(N, 1 / SR)
t_spec = np.arange(nfr) * H / SR
logspec = np.log1p(spec * 10)
flux = np.maximum(np.diff(logspec, axis=0), 0).sum(axis=1)
flux = np.concatenate([[0], flux])
# adaptive threshold: local median over ±0.5 s + delta
from numpy.lib.stride_tricks import sliding_window_view
k = int(0.5 * SR / H)
pad = np.pad(flux, k, mode='edge')
med = np.median(sliding_window_view(pad, 2 * k + 1), axis=1)
thr = med + 0.35 * (flux.max() * 0.02 + med.std())
cand = np.where((flux > thr) & (flux >= np.roll(flux, 1)) & (flux >= np.roll(flux, -1)))[0]
# min 60 ms spacing, keep the stronger
onsets = []
for c in cand:
    if onsets and t_spec[c] - t_spec[onsets[-1]] < 0.06:
        if flux[c] > flux[onsets[-1]]: onsets[-1] = c
    else: onsets.append(c)
onsets = np.array(onsets)

def centroid(i0, i1):
    s = spec[i0:i1].mean(axis=0); return float((freqs * s).sum() / max(s.sum(), 1e-9))
def band_share(i0, i1):
    s = (spec[i0:i1] ** 2).mean(axis=0); tot = s.sum() + 1e-12
    return {b: float(s[(freqs >= lo) & (freqs < hi)].sum() / tot) for b, (lo, hi) in {'<120': (0, 120), '120-500': (120, 500), '500-2k': (500, 2000), '2k-6k': (2000, 6000), '>6k': (6000, 22050)}.items()}

rows = []
for o in onsets:
    t = float(t_spec[o])
    e0 = int(t / (hop / SR))
    pk = float(env_db[e0:e0 + int(0.06 / (hop / SR))].max()) if e0 < len(env_db) else -99
    # decay: time until env drops 20 dB below the peak (cap 2 s)
    seg = env_db[e0:e0 + int(2 / (hop / SR))]
    below = np.where(seg < pk - 20)[0]
    decay = float(below[0] * hop / SR) if len(below) else 2.0
    rows.append({'t': round(t, 3), 'peak_db': round(pk, 1), 'centroid_hz': round(centroid(o, o + 5)), 'decay20_s': round(decay, 3), 'flux': round(float(flux[o]), 1)})

# ---- motion from gray frames ----
W, Hh = 160, 90
g = np.fromfile(f'{vid}.gray', dtype=np.uint8)
nf = len(g) // (W * Hh)
g = g[:nf * W * Hh].reshape(nf, Hh, W).astype(np.float32)
motion = np.abs(np.diff(g, axis=0)).mean(axis=(1, 2))
motion = np.concatenate([[0], motion])
t_m = np.arange(nf) / 30
cuts = np.where(motion > 40)[0]
# motion peaks (local maxima above the 70th percentile)
mp = np.where((motion > np.percentile(motion, 70)) & (motion >= np.roll(motion, 1)) & (motion >= np.roll(motion, -1)))[0]
def nearest_peak_frames(t):
    f = int(round(t * 30))
    # nearest frame with motion above its 60th pct within ±6 frames
    lo, hi = max(0, f - 6), min(nf, f + 7)
    seg = motion[lo:hi]
    if not len(seg): return None
    j = int(np.argmax(seg)); return int(lo + j - f)
for r in rows:
    r['motion_offset_frames'] = nearest_peak_frames(r['t'])
    r['motion_at'] = round(float(motion[min(nf - 1, int(round(r['t'] * 30)))]), 1)

summary = {
    'video': vid, 'duration_s': round(dur, 1), 'onsets': len(rows), 'onsets_per_s': round(len(rows) / dur, 2),
    'silence_frac_below_-50dB': round(silence_frac, 3), 'quiet_frac_below_-40dB': round(quiet_frac, 3),
    'program_rms_db': round(float(db(np.sqrt(np.mean(x ** 2)))), 1), 'peak_db': round(float(db(np.abs(x).max())), 1),
    'env_median_db': round(float(np.median(env_db)), 1), 'env_p10_db': round(float(np.percentile(env_db, 10)), 1),
    'band_share_overall': {k: round(v, 3) for k, v in band_share(0, nfr).items()},
    'onset_centroid_median_hz': round(float(np.median([r['centroid_hz'] for r in rows]))) if rows else None,
    'onset_decay20_median_s': round(float(np.median([r['decay20_s'] for r in rows])), 3) if rows else None,
    'onset_peak_median_db': round(float(np.median([r['peak_db'] for r in rows])), 1) if rows else None,
    'cuts_(hard)': len(cuts), 'motion_mean': round(float(motion.mean()), 2),
    'onsets_within_2_frames_of_motion_peak': round(float(np.mean([abs(r['motion_offset_frames']) <= 2 for r in rows if r['motion_offset_frames'] is not None])), 2) if rows else None,
}
# a per-second timeline: env dB (max), onset count, motion mean
timeline = []
for s in range(int(dur)):
    e = env_db[int(s / (hop / SR)):int((s + 1) / (hop / SR))]
    m = motion[s * 30:(s + 1) * 30]
    timeline.append((s, round(float(e.max()), 1) if len(e) else None, int(sum(1 for r in rows if s <= r['t'] < s + 1)), round(float(m.mean()), 1) if len(m) else None))
json.dump({'summary': summary, 'onsets': rows, 'timeline': timeline}, open(f'{vid}-analysis.json', 'w'), indent=1)
print(json.dumps(summary, indent=1))
print('sec | env max dB | onsets | motion')
for s, e, o, m in timeline: print(f'{s:4d} | {e:7} | {o:2d} | {m}')
