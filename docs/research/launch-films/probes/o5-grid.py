"""Probe: fit a tempo grid to the sub-band onset envelope and report each cut's offset from it.

Expects local media (not committed; see ../README.md). Takes the media path as an argument.
usage: python o5-grid.py <film.mp4> '<json list of cut times>' <min_period_s> <max_period_s>

Searches beat period and phase for the strongest mean onset strength (20-150 Hz), then prints each
cut's beat index, offset in ms and bar position. Behind the grid locks quoted for Figma glass (cuts on
the phrase), Framer 3.0 (act seams within 15 ms) and Spline Hana (eighths). Needs numpy and ffmpeg.
"""
import numpy as np, subprocess, sys, json
V=sys.argv[1]; cuts=np.array(json.loads(sys.argv[2])); lo,hi=float(sys.argv[3]),float(sys.argv[4])
sr=16000
raw=subprocess.run(["ffmpeg","-v","error","-i",V,"-ac","1","-ar",str(sr),"-f","f32le","-"],capture_output=True).stdout
x=np.frombuffer(raw,np.float32)
hop=80; n=1024
fr=np.lib.stride_tricks.sliding_window_view(x,n)[::hop]*np.hanning(n)
X=np.abs(np.fft.rfft(fr,axis=1)); f=np.fft.rfftfreq(n,1/sr); tt=np.arange(len(X))*hop/sr
e=np.log1p(X[:,(f>=20)&(f<150)].sum(1)*50); d=np.maximum(0,np.diff(e,prepend=e[0]))
best=None
for T in np.arange(lo,hi,0.0005):
    for ph in np.arange(0,T,0.005):
        g=np.arange(ph,tt[-1],T); idx=np.clip((g/ (hop/sr)).astype(int),0,len(d)-1)
        s=d[idx].mean()
        if best is None or s>best[0]: best=(s,T,ph)
s,T,ph=best; print(f"period {T:.4f}s = {60/T:.2f} bpm, phase {ph:.3f}")
for c in cuts:
    k=(c-ph)/T; off=(k-round(k))*T
    print(f"cut {c:.2f}: beat #{round(k)} offset {off*1000:+.0f} ms; bar pos {round(k)%4}")
