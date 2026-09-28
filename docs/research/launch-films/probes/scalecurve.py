"""Probe: per-frame bounding box of the foreground against a flat ground.

Expects local media (not committed; see ../README.md). Takes the media path as an argument.
usage: python scalecurve.py <film.mp4> <t0_s> <n_frames> <fps>

Scales frames to 480 px wide, marks pixels more than 40 grey levels from the frame median, and
prints the box height, width, top and left per frame. Behind slam-word heights (Replit Slides' word
at ~5x, then 1x in one frame) and snap-zoom scale curves. Only meaningful on flat, uniform grounds.
Needs numpy and ffmpeg.
"""
import subprocess, sys, numpy as np
v=sys.argv[1]; t0=float(sys.argv[2]); n=int(sys.argv[3]); fps=float(sys.argv[4])
w=480
raw=subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-i',v,'-frames:v',str(n),'-vf',f'scale={w}:-2,format=gray','-f','rawvideo','-'],capture_output=True).stdout
h=len(raw)//(w*n)
X=np.frombuffer(raw,dtype=np.uint8).reshape(n,h,w).astype(np.float32)
for i in range(n):
    f=X[i]; bg=np.median(f)
    m=np.abs(f-bg)>40
    rows=np.where(m.sum(1)>2)[0]; cols=np.where(m.sum(0)>2)[0]
    if len(rows):
        print(f"{t0+i/fps:6.3f} h={rows.max()-rows.min():4d} w={cols.max()-cols.min():4d} top={rows.min()} left={cols.min()}")
    else: print(f"{t0+i/fps:6.3f} empty")
