import sys, json, wave, os
import numpy as np
from scipy.signal import butter, sosfiltfilt
from numpy.lib.stride_tricks import sliding_window_view
os.chdir(os.path.dirname(os.path.abspath(__file__)))
vid = sys.argv[1]
SR = 44100
with wave.open(f'{vid}.wav') as w:
    n = w.getnframes(); x = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768
dur = len(x) / SR
db = lambda v: 20 * np.log10(np.maximum(v, 1e-9))
def band(lo, hi):
    sos = butter(4, [lo, hi], btype='band', fs=SR, output='sos'); return sosfiltfilt(sos, x).astype(np.float32)
def lowp(hi):
    sos = butter(4, hi, btype='low', fs=SR, output='sos'); return sosfiltfilt(sos, x).astype(np.float32)
sub = lowp(120); lowmid = band(120, 500); mid = band(500, 2000); high = band(2000, 10000)
hop = int(SR * 0.005); win = int(SR * 0.01)
def envdb(sig):
    frames = (len(sig) - win) // hop
    return db(np.sqrt(np.mean(sliding_window_view(sig[:frames * hop + win], win)[::hop] ** 2, axis=1)))
E = {k: envdb(v) for k, v in {'sub': sub, 'lowmid': lowmid, 'mid': mid, 'high': high, 'full': x}.items()}
tt = np.arange(len(E['full'])) * hop / SR
# ---- hits in the high band, measured against the high band's own floor (bed-free) ----
h = E['high']
k = int(0.4 / (hop / SR)); pad = np.pad(h, k, mode='edge')
floor = np.percentile(sliding_window_view(pad, 2 * k + 1), 20, axis=1)
prom = h - floor
cand = np.where((prom > 8) & (h >= np.roll(h, 1)) & (h >= np.roll(h, -1)) & (h > -55))[0]
hits = []
for c in cand:
    if hits and tt[c] - tt[hits[-1]] < 0.05:
        if h[c] > h[hits[-1]]: hits[-1] = c
    else: hits.append(c)
rows = []
for c in hits:
    seg = h[c:c + int(1.5 / (hop / SR))]
    bel = np.where(seg < h[c] - 20)[0]; dec20 = float(bel[0] * hop / SR) if len(bel) else 1.5
    bel10 = np.where(seg < h[c] - 10)[0]; dec10 = float(bel10[0] * hop / SR) if len(bel10) else 1.5
    rows.append({'t': round(float(tt[c]), 2), 'high_db': round(float(h[c]), 1), 'prom_db': round(float(prom[c]), 1), 'full_db': round(float(E['full'][c]), 1), 'sub_db': round(float(E['sub'][c]), 1), 'dec10_s': round(dec10, 3), 'dec20_s': round(dec20, 3)})
strong = [r for r in rows if r['prom_db'] >= 12]
# ---- bed texture: modulation of the sub envelope (pulse?) and per-band level in 1 s bins ----
subenv = E['sub']; se = subenv - np.convolve(subenv, np.ones(400) / 400, mode='same')
ac = np.correlate(se[::4], se[::4], mode='full')[len(se[::4]) - 1:]; lag = np.arange(len(ac)) * hop * 4 / SR
m = (lag > 0.25) & (lag < 2.0); pulse_lag = float(lag[m][np.argmax(ac[m])]); pulse_strength = float(ac[m].max() / max(ac[0], 1e-9))
bins = []
for s in range(int(dur)):
    i0, i1 = int(s / (hop / SR)), int((s + 1) / (hop / SR))
    bins.append([s] + [round(float(np.percentile(E[b][i0:i1], 50)), 1) for b in ['sub', 'lowmid', 'mid', 'high']] + [sum(1 for r in strong if s <= r['t'] < s + 1)])
out = {
    'video': vid, 'hits_total': len(rows), 'strong_hits': len(strong), 'strong_per_s': round(len(strong) / dur, 2),
    'strong_high_db_median': round(float(np.median([r['high_db'] for r in strong])), 1),
    'strong_prom_db_median': round(float(np.median([r['prom_db'] for r in strong])), 1),
    'strong_dec10_median_s': round(float(np.median([r['dec10_s'] for r in strong])), 3),
    'strong_dec20_median_s': round(float(np.median([r['dec20_s'] for r in strong])), 3),
    'strong_dec20_p25_p75': [round(float(np.percentile([r['dec20_s'] for r in strong], p)), 3) for p in (25, 75)],
    'hit_vs_sub_at_same_time_db_median': round(float(np.median([r['high_db'] - r['sub_db'] for r in strong])), 1),
    'sub_env_pulse_lag_s': round(pulse_lag, 3), 'sub_env_pulse_strength': round(pulse_strength, 3),
    'band_medians_db': {b: round(float(np.median(E[b])), 1) for b in ['sub', 'lowmid', 'mid', 'high']},
    'band_p95_db': {b: round(float(np.percentile(E[b], 95)), 1) for b in ['sub', 'lowmid', 'mid', 'high']},
}
json.dump({'summary': out, 'hits': rows, 'bins': bins}, open(f'{vid}-analysis3.json', 'w'), indent=1)
print(json.dumps(out, indent=1))
print('sec | sub lowmid mid high (median dB) | strong hits')
for b in bins: print(f'{b[0]:4d} | {b[1]:6} {b[2]:6} {b[3]:6} {b[4]:6} | {b[5]}')
print('first 40 strong hits:'); [print(r) for r in strong[:40]]
