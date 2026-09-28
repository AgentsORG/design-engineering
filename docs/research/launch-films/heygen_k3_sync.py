"""k3-promo: are the music's strong onsets on the composition's stamped event times?

Expects local media: a render of HeyGen's k3-promo composition (not committed; see README)
and a clone of hyperframes-launches (Apache-2.0) for the composition source.

usage: python heygen_k3_sync.py <hg-k3-promo.mp4> <path/to/hyperframes-launches>

Detects strong spectral-flux onsets in the render's audio, reads the stamped event times from the
TIMELINE section of k3-promo/index.html, and reports the share of onsets within 67 ms of an event
against a null of 400 random time shifts (+-2 s). Output is one JSON line.
"""
import subprocess, re, sys, os, numpy as np, json
V = sys.argv[1]
SRC = os.path.join(sys.argv[2], 'k3-promo', 'index.html')
SR = 22050
pcm=subprocess.run(['ffmpeg','-v','error','-i',V,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
x=np.frombuffer(pcm,np.int16).astype(np.float32)/32768
hop=256; win=1024
frames=np.lib.stride_tricks.sliding_window_view(x,win)[::hop]*np.hanning(win)
S=np.abs(np.fft.rfft(frames,axis=1))
flux=np.maximum(0,np.diff(np.log1p(S*10),axis=0)).sum(1)
t=np.arange(len(flux))*hop/SR+win/SR/2
# peaks
thr=np.median(flux)+2.5*np.std(flux)
pk=[i for i in range(1,len(flux)-1) if flux[i]>thr and flux[i]>=flux[i-1] and flux[i]>=flux[i+1]]
# de-dup within 60 ms
hits=[]
for i in pk:
    if not hits or t[i]-hits[-1]>0.06: hits.append(float(t[i]))
src=open(SRC,encoding='utf-8').read()
tl=src[src.find('/* ================= TIMELINE'):]
ev=sorted(set(round(float(m),3) for m in re.findall(r'\},\s*([0-9]+\.[0-9]+)\s*\)',tl) if 0.5<float(m)<16.5))
ev=np.array(ev)
def frac(h,shift=0.0):
    h=np.array(h)+shift
    return float(np.mean([np.min(np.abs(ev-v))<=0.067 for v in h]))
real=frac(hits)
rng=np.random.default_rng(0)
null=[frac(hits,s) for s in rng.uniform(-2,2,400)]
# beat grid
ioi=np.diff(hits)
print(json.dumps({'strong_onsets':len(hits),'onset_times_first20':[round(h,2) for h in hits[:20]],'n_timeline_events':len(ev),
 'hits_within_67ms_of_timeline_event':round(real,3),'null_mean':round(float(np.mean(null)),3),'null_p95':round(float(np.percentile(null,95)),3),
 'median_ioi':round(float(np.median(ioi)),3)}))
