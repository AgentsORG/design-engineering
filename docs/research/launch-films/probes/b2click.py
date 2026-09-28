"""Probe: level and centroid of UI clicks against the sub band, at given onset times.

Expects local media (not committed; see ../README.md). Takes the media path as an argument.
usage: python b2click.py <film.mp4> <onset,onset,...>   (onset times in seconds)

For each onset: peak of the 2-8 kHz band (-30/+50 ms) minus the RMS under 120 Hz (+-100 ms), the
spectral centroid above 500 Hz, and the time for the high band to fall 10 dB. Behind the foley levels
quoted for Linear Agent (typing ~+4 dB, Enter +9.2, Send +14.5 over the sub) and Raycast (median -1.4 dB).
Levels are 2-8 kHz band peaks; for clicks centred at 1.45-2.5 kHz they understate the full-band level, so
read them as relative (consequence ordering), not absolute.
Needs numpy, scipy and ffmpeg.
"""
import sys,subprocess,numpy as np
from scipy.signal import butter,sosfilt
p=sys.argv[1]; ons=[float(v) for v in sys.argv[2].split(',')]
sr=22050
x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',p,'-ac','1','-ar',str(sr),'-f','f32le','-'],capture_output=True).stdout,np.float32)
lo=sosfilt(butter(4,120,'low',fs=sr,output='sos'),x)
hi=sosfilt(butter(4,[2000,8000],'band',fs=sr,output='sos'),x)
out=[]
for t in ons:
    a=int((t-0.03)*sr); b=int((t+0.05)*sr)
    hp=20*np.log10(np.abs(hi[a:b]).max()+1e-9)
    lr=20*np.log10(np.sqrt((lo[int((t-0.1)*sr):int((t+0.1)*sr)]**2).mean())+1e-9)
    # hi-band centroid
    seg=x[a:b]*np.hanning(b-a); S=np.abs(np.fft.rfft(seg)); f=np.fft.rfftfreq(b-a,1/sr)
    m=f>500; c=(S[m]*f[m]).sum()/S[m].sum()
    # decay: time for hi-band envelope to drop 10 dB after peak
    env=np.abs(hi[a:int((t+0.3)*sr)]); k=env.argmax(); pk=env[k]
    sm=np.convolve(env,np.ones(44)/44,'same')
    j=k
    while j<len(sm) and sm[j]>pk/3.16*0.5: j+=1
    out.append((t,round(hp,1),round(lr,1),round(hp-lr,1),int(c),round((j-k)/sr*1000)))
for o in out: print(o)
d=np.array([o[3] for o in out]); print('median hi-peak minus sub-rms dB',np.median(d),'median centroid',np.median([o[4] for o in out]))
