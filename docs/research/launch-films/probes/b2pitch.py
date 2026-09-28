"""Probe: strongest spectral peaks (30-700 Hz) per window, named as notes.

Expects local media (not committed; see ../README.md). Takes the media path as an argument.
usage: python b2pitch.py <film.mp4> [window_s=1.0]

Read the note names across windows to see chord and root changes: behind Linear Agent's key change
on Send and Raycast's sub root stepping with its cuts. Needs numpy and ffmpeg.
"""
import sys, subprocess, numpy as np
p=sys.argv[1]; win=float(sys.argv[2]) if len(sys.argv)>2 else 1.0
sr=8000
raw=subprocess.run(['ffmpeg','-v','error','-i',p,'-ac','1','-ar',str(sr),'-f','f32le','-'],capture_output=True).stdout
x=np.frombuffer(raw,dtype=np.float32)
n=int(sr*win); N=16384
names=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
for i in range(0,len(x)-n,n):
    seg=x[i:i+n]*np.hanning(n)
    X=np.abs(np.fft.rfft(seg,N)); f=np.fft.rfftfreq(N,1/sr)
    m=(f>30)&(f<700)
    Xm=X[m]; fm=f[m]
    # top 5 peaks
    idx=[j for j in range(1,len(Xm)-1) if Xm[j]>Xm[j-1] and Xm[j]>=Xm[j+1]]
    idx=sorted(idx,key=lambda j:-Xm[j])[:5]
    pk=[]
    for j in sorted(idx,key=lambda j:fm[j]):
        fr=fm[j]; midi=69+12*np.log2(fr/440)
        pk.append(f"{fr:.0f}{names[int(round(midi))%12]}")
    print(f"{i/sr:5.1f} "+' '.join(pk))
