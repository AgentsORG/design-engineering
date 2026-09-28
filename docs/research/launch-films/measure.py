"""Measure one launch film at its native frame rate: cuts, shots, stillness, move lengths,
camera moves, blur-with-velocity, luminance, colour, audio register, and cut/hit sync.
Writes <out>/<id>.json and contact sheets <out>/<id>-time-{1,2}.jpg, <id>-moves.jpg, <id>-cuts.jpg.

Frame-rate honesty: resampling a 24 fps film to 30 fps inserts a duplicate every fifth frame,
which fakes 4-frame "moves" and inflates stillness. So nothing is resampled; per-frame motion is
scaled to a per-second rate, and a duplicate frame whose neighbours are both moving (pulldown,
animation on twos) is bridged into the move and counted separately as `held_in_move_frac`.

usage: python measure.py <video.mp4> <id> <outdir>
"""
import sys, os, json, subprocess, re, wave
import numpy as np
import cv2

video, vid, out = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(out, exist_ok=True)
W = 384


def probe(path):
    r = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
                        'stream=width,height,avg_frame_rate,r_frame_rate:format=duration', '-of', 'json', path],
                       capture_output=True, text=True)
    j = json.loads(r.stdout)
    s = j['streams'][0]
    rate = s.get('avg_frame_rate') or s['r_frame_rate']
    num, den = rate.split('/')
    if float(den) == 0:
        num, den = s['r_frame_rate'].split('/')
    return int(s['width']), int(s['height']), float(num) / float(den), float(j['format']['duration'])


sw, sh, FPS, dur = probe(video)
H = int(round(W * sh / sw / 2) * 2)
K = FPS / 30.0          # per-frame change x K = change per 1/30 s, so thresholds hold at any fps


def frames(width, height):
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', video, '-vf', f'scale={width}:{height}:flags=area',
                          '-vsync', 'passthrough', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'], stdout=subprocess.PIPE)
    n = width * height * 3
    while True:
        b = p.stdout.read(n)
        if len(b) < n:
            break
        yield np.frombuffer(b, np.uint8).reshape(height, width, 3)
    p.wait()


def fi(seconds):
    return int(round(seconds * FPS))


# ---------------- pass 1: per-frame metrics ----------------
ys, xs = np.mgrid[0:H // 2:4, 0:W // 2:4]
xc = (xs - W / 4) / (W / 4); yc = (ys - H / 4) / (W / 4)
A = np.stack([np.ones_like(xc).ravel(), np.zeros_like(xc).ravel(), xc.ravel(), -yc.ravel()], 1)
B = np.stack([np.zeros_like(xc).ravel(), np.ones_like(xc).ravel(), yc.ravel(), xc.ravel()], 1)
M = np.concatenate([A, B], 0)
Mp = np.linalg.pinv(M)

from collections import deque
STEP = max(1, int(round(FPS / 30)))       # compare frames ~1/30 s apart, whatever the fps
STEP_NORM = FPS / (30 * STEP)             # scale a STEP-frame change to a 1/30 s change
hist_g = deque(maxlen=STEP + 1)
mad, hd, lum, colf, sharp, pan, zoom, rot, local, flowmag, area, madS = ([] for _ in range(12))
prev_g = prev_small = prev_hist = None
for f in frames(W, H):
    g = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY)
    gb = cv2.GaussianBlur(g, (3, 3), 0).astype(np.int16)
    hist_g.append(gb)
    if len(hist_g) == STEP + 1:
        d = np.abs(hist_g[-1] - hist_g[0])
        area.append(float(np.mean(d > 12)) * STEP_NORM); madS.append(float(d.mean()) * STEP_NORM)
    else:
        area.append(0.0); madS.append(0.0)
    small = cv2.resize(g, (W // 2, H // 2), interpolation=cv2.INTER_AREA)
    hsv = cv2.cvtColor(f, cv2.COLOR_BGR2HSV)
    hist = cv2.calcHist([hsv], [0, 1, 2], None, [12, 6, 6], [0, 180, 0, 256, 0, 256])
    hist = cv2.normalize(hist, hist).flatten()
    b, gg, r = [c.astype(np.float32) for c in cv2.split(f)]
    rg = r - gg; yb = 0.5 * (r + gg) - b
    colf.append(float(np.sqrt(rg.std() ** 2 + yb.std() ** 2) + 0.3 * np.sqrt(rg.mean() ** 2 + yb.mean() ** 2)))
    lum.append(float(g.mean()))
    sharp.append(float(cv2.Laplacian(g, cv2.CV_32F).var()))
    if prev_g is None:
        for L in (mad, hd, pan, zoom, rot, local, flowmag): L.append(0.0)
    else:
        mad.append(float(np.abs(g.astype(np.int16) - prev_g.astype(np.int16)).mean()))
        hd.append(float(cv2.compareHist(prev_hist, hist, cv2.HISTCMP_BHATTACHARYYA)))
        fl = cv2.calcOpticalFlowFarneback(prev_small, small, None, 0.5, 3, 15, 3, 5, 1.2, 0)
        u = fl[::4, ::4, 0].ravel(); v = fl[::4, ::4, 1].ravel()
        p = Mp @ np.concatenate([u, v])
        res = np.concatenate([u, v]) - M @ p
        W2 = W / 2
        pan.append(float(np.hypot(p[0], p[1]) / W2))
        zoom.append(float(p[2] / (W2 / 2)))
        rot.append(float(p[3] / (W2 / 2)))
        local.append(float(np.sqrt((res ** 2).mean()) / W2))
        flowmag.append(float(np.sqrt(u ** 2 + v ** 2).mean() / W2))
    prev_g, prev_small, prev_hist = g, small, hist

mad, hd, lum, colf, sharp, area, madS = map(np.array, (mad, hd, lum, colf, sharp, area, madS))
pan, zoom, rot, local, flowmag = map(np.array, (pan, zoom, rot, local, flowmag))
nf = len(mad)
# per-second-normalised copies ("as if 30 fps")
mad30, flow30, pan30, zoom30, rot30, local30 = (x * K for x in (mad, flowmag, pan, zoom, rot, local))

# ---------------- cuts ----------------
cuts = []
for i in range(1, nf):
    lo, hi = max(1, i - 6), min(nf, i + 7)
    neigh = np.concatenate([mad[lo:i], mad[i + 1:hi]])
    base = np.median(neigh) if len(neigh) else 0
    if hd[i] > 0.45 and mad[i] > 18 and mad[i] > 3 * base + 4:
        if cuts and i - cuts[-1] < max(3, fi(0.12)):
            if mad[i] > mad[cuts[-1]]:
                cuts[-1] = i
            continue
        cuts.append(i)
flashes = [i for i in range(1, nf - 3) if abs(lum[i] - lum[i - 1]) > 60 and
           any(abs(lum[j] - lum[i - 1]) < 15 for j in range(i + 1, min(nf, i + 4)))]
cuts_np = np.array(cuts, int)
cutset = set(cuts)
shots = np.diff(np.concatenate([[0], cuts_np, [nf]])) / FPS

# ---------------- stillness and moves ----------------
# "still" = no visible change: under 0.05 % of the frame changed by more than 12 grey levels in 1/30 s.
# A small element moving over a static layout counts as motion; a slow gradient drift or grain does not.
AREA_STILL = 0.0005
raw_still = area < AREA_STILL
if len(cuts_np): raw_still[cuts_np] = False
calm_frac = float(np.mean(((flow30 < 0.0008) | (madS < 0.35))))   # the older, global "nearly still" reading
dup = mad < 0.08        # an exact repeat of the previous frame
still = raw_still.copy()
held = np.zeros(nf, bool)
for i in range(1, nf - 1):
    if dup[i]:
        l = next((j for j in range(i - 1, max(-1, i - 3), -1) if not dup[j]), None)
        r = next((j for j in range(i + 1, min(nf, i + 3)) if not dup[j]), None)
        if l is not None and r is not None and not raw_still[l] and not raw_still[r]:
            still[i] = False; held[i] = True
still_frac = float(np.mean(still))
moves = []; run = 0; start = 0
for i in range(nf):
    if i in cutset:
        if run: moves.append((start, run))
        run = 0; continue
    if not still[i]:
        if run == 0: start = i
        run += 1
    else:
        if run: moves.append((start, run))
        run = 0
if run: moves.append((start, run))
mv_s = np.array([m[1] / FPS for m in moves if m[1] >= 2]) if any(m[1] >= 2 for m in moves) else np.array([0.0])
moving_frames = (~still).sum()
held_in_move = float(held.sum() / max(1, moving_frames))

# motion curve after cuts, sampled at fixed times
t_after = [1 / FPS, 0.1, 0.2, 0.4, 0.8]
curves = []
for c in cuts:
    idx = [c + max(1, fi(t)) for t in t_after]
    if idx[-1] < nf and mad[c + 1] > 0.5:
        # use a 3-frame max so a held (duplicate) frame does not read as a stop
        vals = np.array([mad[max(c + 1, k - 1):k + 2].max() for k in idx])
        curves.append(vals / vals[0])
after_cut = [round(float(x), 2) for x in np.mean(curves, 0)] if curves else None

# camera classification over moving, non-cut frames
mvmask = (~still) & (flow30 > 0.0015) & (~held)
if len(cuts_np): mvmask[cuts_np] = False
comp = np.stack([pan30, np.abs(zoom30) * 0.5, np.abs(rot30) * 0.5, local30], 1)
dom = np.argmax(comp[mvmask], 1) if mvmask.any() else np.array([], int)
labels = ['pan', 'zoom', 'rotate', 'local']
cam_share = {labels[k]: round(float(np.mean(dom == k)), 3) for k in range(4)} if len(dom) else None


def runs(mask, min_s):
    minlen = max(2, fi(min_s)); out_, r, s0 = [], 0, 0
    for i, m in enumerate(mask):
        if m:
            if r == 0: s0 = i
            r += 1
        else:
            if r >= minlen: out_.append((s0, r))
            r = 0
    if r >= minlen: out_.append((s0, r))
    return out_


mv_bridge = (~still) & (flow30 > 0.0015)
push_in = runs((zoom30 > 0.002) & mv_bridge, 0.33)
pull_out = runs((zoom30 < -0.002) & mv_bridge, 0.33)
pans = runs((pan30 > 0.004) & (pan30 > np.abs(zoom30) * 0.5) & mv_bridge, 0.33)

fast = mvmask & (flow30 > np.percentile(flow30[mvmask], 75)) if mvmask.sum() > 8 else mvmask
blur_ratio = float(np.median(sharp[fast]) / max(1e-6, np.median(sharp[still]))) if fast.any() and still.any() else None

# ---------------- audio ----------------
wav = os.path.join(out, f'{vid}.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', video, '-ac', '1', '-ar', '44100', wav])
audio = {}
if os.path.exists(wav) and os.path.getsize(wav) > 1000:
    SR = 44100
    with wave.open(wav) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    r = subprocess.run(['ffmpeg', '-v', 'info', '-nostats', '-i', wav, '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True)
    mI = re.findall(r'I:\s+(-?[\d.]+) LUFS', r.stderr); mP = re.findall(r'Peak:\s+(-?[\d.]+) dBFS', r.stderr)
    mLRA = re.findall(r'LRA:\s+(-?[\d.]+) LU', r.stderr)
    audio['lufs_i'] = float(mI[-1]) if mI else None
    audio['true_peak_dbfs'] = float(mP[-1]) if mP else None
    audio['lra_lu'] = float(mLRA[-1]) if mLRA else None
    db = lambda v: 20 * np.log10(np.maximum(v, 1e-9))
    hop = int(SR * 0.005); win = int(SR * 0.01)
    env = np.sqrt(np.convolve(x ** 2, np.ones(win) / win, 'valid')[::hop])
    env_db = db(env)
    audio['silence_frac_-50dB'] = round(float(np.mean(env_db < -50)), 3)
    N, Hh = 2048, 512
    nfr = (len(x) - N) // Hh
    frames_a = np.lib.stride_tricks.sliding_window_view(x, N)[::Hh][:nfr] * np.hanning(N)
    spec = np.abs(np.fft.rfft(frames_a, axis=1)).astype(np.float32)
    freqs = np.fft.rfftfreq(N, 1 / SR)
    pw = (spec ** 2).sum(0); tot = pw.sum() + 1e-12
    bands = [(0, 120), (120, 500), (500, 2000), (2000, 6000), (6000, 22050)]
    audio['band_share'] = {f'{a}-{b}': round(float(pw[(freqs >= a) & (freqs < b)].sum() / tot), 3) for a, b in bands}
    logspec = np.log1p(spec * 10)
    flux = np.concatenate([[0], np.maximum(np.diff(logspec, axis=0), 0).sum(1)])
    kk = int(0.5 * SR / Hh)
    med = np.median(np.lib.stride_tricks.sliding_window_view(np.pad(flux, kk, mode='edge'), 2 * kk + 1), 1)
    thr = med + 0.35 * (flux.max() * 0.02 + med.std())
    cand = np.where((flux > thr) & (flux >= np.roll(flux, 1)) & (flux >= np.roll(flux, -1)))[0]
    onsets = []
    for c in cand:
        t = c * Hh / SR
        if onsets and t - onsets[-1][0] < 0.06:
            if flux[c] > onsets[-1][1]: onsets[-1] = (t, flux[c])
            continue
        onsets.append((t, flux[c]))
    ot = np.array([o[0] for o in onsets]); ov = np.array([o[1] for o in onsets])
    adur = len(x) / SR
    audio['onsets_per_s'] = round(len(ot) / adur, 2)
    oenv = flux - med; oenv[oenv < 0] = 0
    ac = np.correlate(oenv - oenv.mean(), oenv - oenv.mean(), 'full')[len(oenv) - 1:]
    fps_a = SR / Hh
    lags = np.arange(len(ac)) / fps_a
    sel = (lags >= 60 / 180) & (lags <= 60 / 60)
    if sel.any() and ac[0] > 0:
        li = np.argmax(ac[sel]); lag = lags[sel][li]
        audio['bpm_estimate'] = round(60 / lag, 1)
        audio['beat_clarity'] = round(float(ac[sel][li] / ac[0]), 3)
    vb = (freqs >= 300) & (freqs < 3400)
    venv = np.sqrt((spec[:, vb] ** 2).sum(1))
    seg = int(3 * fps_a); idx = []
    for s0 in range(0, len(venv) - seg, seg // 2):
        e = venv[s0:s0 + seg]; e = e - e.mean()
        F = np.abs(np.fft.rfft(e * np.hanning(len(e)))) ** 2; fr = np.fft.rfftfreq(len(e), 1 / fps_a)
        den = F[(fr > 0.5) & (fr < 12)].sum()
        if den > 0: idx.append(F[(fr >= 3) & (fr <= 6)].sum() / den)
    audio['speech_mod_index'] = round(float(np.median(idx)), 3) if idx else None
    if len(ot):
        strong = ot[ov >= np.percentile(ov, 85)]          # the top 15 % of hits
        audio['strong_hits_per_s'] = round(len(strong) / adur, 2)
        if len(cuts):
            ct = cuts_np / FPS
            near = np.array([np.min(np.abs(strong - t)) for t in ct])
            audio['cuts_within_67ms_of_strong_hit'] = round(float(np.mean(near <= 0.067)), 2)
            audio['chance_within_67ms'] = round(float(min(1, len(strong) / adur * 0.134)), 2)
        offs = []
        for t in strong:
            f0 = fi(t); lo, hi = max(0, f0 - fi(0.2)), min(nf, f0 + fi(0.2) + 1)
            if hi > lo: offs.append((lo + int(np.argmax(mad30[lo:hi])) - f0) / FPS)
        offs = np.array(offs)
        audio['strong_hits_within_67ms_of_motion_peak'] = round(float(np.mean(np.abs(offs) <= 0.067)), 2) if len(offs) else None
    os.remove(wav)

# ---------------- summary ----------------
summary = {
    'id': vid, 'source': os.path.basename(video), 'duration_s': round(dur, 2), 'fps': round(FPS, 3),
    'resolution': f'{sw}x{sh}', 'aspect': round(sw / sh, 3), 'frames': nf,
    'cuts': len(cuts), 'cuts_per_min': round(len(cuts) / (nf / FPS) * 60, 1),
    'cut_times_s': [round(c / FPS, 2) for c in cuts],
    'flash_frames': len(flashes),
    'shot_len_s': {'median': round(float(np.median(shots)), 2), 'p25': round(float(np.percentile(shots, 25)), 2),
                   'p75': round(float(np.percentile(shots, 75)), 2), 'max': round(float(shots.max()), 2)},
    'still_frac': round(still_frac, 3), 'calm_frac_global': round(calm_frac, 3),
    'changed_area_median_when_moving': round(float(np.median(area[~still])) if (~still).any() else 0.0, 4),
    'held_in_move_frac': round(held_in_move, 3),
    'moves_per_min': round(len(mv_s) / (nf / FPS) * 60, 1),
    'move_len_s': {'median': round(float(np.median(mv_s)), 3), 'p75': round(float(np.percentile(mv_s, 75)), 3),
                   'p90': round(float(np.percentile(mv_s, 90)), 3)},
    'motion_after_cut_rel_at_1f_100ms_200ms_400ms_800ms': after_cut,
    'camera_share_of_moving_frames': cam_share,
    'push_in_runs': len(push_in), 'pull_out_runs': len(pull_out), 'pan_runs': len(pans),
    'push_in_time_frac': round(sum(r for _, r in push_in) / nf, 3),
    'blur_ratio_fast_vs_still': round(blur_ratio, 2) if blur_ratio else None,
    'luma_median': round(float(np.median(lum)), 1), 'dark_frac_luma_lt_50': round(float(np.mean(lum < 50)), 3),
    'light_frac_luma_gt_180': round(float(np.mean(lum > 180)), 3),
    'colorfulness_median': round(float(np.median(colf)), 1), 'mono_frac_colorfulness_lt_15': round(float(np.mean(colf < 15)), 3),
    'audio': audio,
}
json.dump(summary, open(os.path.join(out, f'{vid}.json'), 'w'), indent=1)

# ---------------- pass 2: contact sheets ----------------
TW = 384; TH = int(round(TW * sh / sw / 2) * 2)
n_thumbs = 60
step = max(fi(1.0), int(np.ceil(nf / n_thumbs)))
time_idx = list(range(0, nf, step))[:n_thumbs]
top = sorted([m for m in moves if m[1] >= 3], key=lambda m: -flow30[m[0]:m[0] + m[1]].max())[:8]
move_rows = []
for s0, ln in sorted(top):
    pk = s0 + int(np.argmax(flow30[s0:s0 + ln]))
    move_rows.append([max(0, s0 - 1), s0 + ln // 3, pk, min(nf - 1, s0 + ln)])
cut_rows = []
csel = cuts if len(cuts) <= 8 else [cuts[int(k)] for k in np.linspace(0, len(cuts) - 1, 8)]
for c in csel:
    cut_rows.append([max(0, c - 3), c - 1, c, min(nf - 1, c + 3)])
need = set(time_idx) | {i for row in move_rows + cut_rows for i in row}
store = {}
for i, f in enumerate(frames(TW, TH)):
    if i in need: store[i] = f.copy()


def label(img, text):
    img = img.copy()
    cv2.rectangle(img, (0, 0), (8 + 9 * len(text), 22), (0, 0, 0), -1)
    cv2.putText(img, text, (4, 16), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
    return img


def grid(tiles, cols):
    blank = np.zeros((TH, TW, 3), np.uint8)
    rows = [tiles[i:i + cols] + [blank] * (cols - len(tiles[i:i + cols])) for i in range(0, len(tiles), cols)]
    return np.vstack([np.hstack([np.pad(t, ((2, 2), (2, 2), (0, 0))) for t in r]) for r in rows])


tiles = [label(store[i], f'{i / FPS:.1f}s') for i in time_idx if i in store]
for k in range(0, len(tiles), 30):
    cv2.imwrite(os.path.join(out, f'{vid}-time-{k // 30 + 1}.jpg'), grid(tiles[k:k + 30], 5), [cv2.IMWRITE_JPEG_QUALITY, 82])
for name, rows_ in (('moves', move_rows), ('cuts', cut_rows)):
    mt = [label(store[i], f'{i / FPS:.2f}s' + (' CUT' if i in cutset else '')) for row in rows_ for i in row if i in store]
    if mt:
        cv2.imwrite(os.path.join(out, f'{vid}-{name}.jpg'), grid(mt, 4), [cv2.IMWRITE_JPEG_QUALITY, 80])
print(json.dumps({k: summary[k] for k in ('id', 'fps', 'duration_s', 'cuts', 'still_frac', 'held_in_move_frac', 'move_len_s')}))
