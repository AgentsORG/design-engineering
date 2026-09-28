"""Probe: sub / mid / high band levels per time step, with a sub-level bar.

Expects local media (not committed; see ../README.md). Takes the media path as an argument.
usage: python o5-subenv.py <film.mp4> [step_s=0.1]

Bands: <120 Hz, 120-2000 Hz, >=2 kHz, in dB per step. Read the sub column for dropouts before a
reveal and the return on it (the sub envelopes quoted for Figma Motion and Framer 3.0, and the same
reading elsewhere). Needs numpy and ffmpeg.
"""
import numpy as np, subprocess, sys
V=sys.argv[1]; step=float(sys.argv[2]) if len(sys.argv)>2 else 0.1
sr=8000
raw=subprocess.run(["ffmpeg","-v","error","-i",V,"-ac","1","-ar",str(sr),"-f","f32le","-"],capture_output=True).stdout
x=np.frombuffer(raw,np.float32)
from numpy.fft import rfft, rfftfreq
w=int(step*sr); out=[]
for i in range(0,len(x)-w+1,w):
    s=x[i:i+w]*np.hanning(w); P=np.abs(rfft(s))**2; f=rfftfreq(w,1/sr)
    sub=10*np.log10(P[f<120].sum()+1e-9); mid=10*np.log10(P[(f>=120)&(f<2000)].sum()+1e-9); hi=10*np.log10(P[f>=2000].sum()+1e-9)
    out.append((i/sr,sub,mid,hi))
a=np.array(out)
for t,s,m,h in a: print(f"{t:5.1f} sub {s:5.1f} mid {m:5.1f} hi {h:5.1f} " + '#'*max(0,int((s-a[:,1].max()+40)/2)))
