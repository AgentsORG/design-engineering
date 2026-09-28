"""Probe: camera translation between frames sampled every <step> s, by FFT phase correlation.

Expects local media (not committed; see ../README.md). Takes the media path as an argument.
usage: python b2drift.py <film.mp4> [step_s=0.5] [height=216]
  frames are scaled to 384 px wide; pass height = 384 / aspect (216 for 16:9, 192 for Linear Agent's
  2:1 frame; `python b2drift.py linear-agent-2026.mp4 0.25 192` reproduces the quoted run)

Prints dx as % of frame width and dy as % of frame height per step, with the correlation peak
(low peaks mean a cut or local motion, not a camera move). Behind Linear Agent's constant camera
velocity (0.8 %W every 0.25 s = 3.2 %W/s) and Raycast's truck and S-curve pan. Needs numpy and ffmpeg.
"""
import subprocess, numpy as np, sys
path=sys.argv[1]; step=float(sys.argv[2]) if len(sys.argv)>2 else 0.5
W,H=384,int(sys.argv[3]) if len(sys.argv)>3 else 216
p=subprocess.run(['ffmpeg','-v','error','-i',path,'-vf',f'fps={1/step},scale={W}:{H},format=gray','-f','rawvideo','-'],capture_output=True)
a=np.frombuffer(p.stdout,np.uint8).reshape(-1,H,W).astype(np.float32)
win=np.outer(np.hanning(H),np.hanning(W))
def pc(A,B):
    A=(A-A.mean())*win;B=(B-B.mean())*win
    F=np.fft.fft2(A)*np.conj(np.fft.fft2(B)); F/=np.abs(F)+1e-9
    r=np.real(np.fft.ifft2(F)); i=np.unravel_index(np.argmax(r),r.shape)
    dy,dx=i; 
    if dy>H/2: dy-=H
    if dx>W/2: dx-=W
    return dx,dy,r.max()
for k in range(len(a)-1):
    dx,dy,c=pc(a[k+1],a[k])
    print(f"{k*step:5.1f}-{(k+1)*step:5.1f} dx={dx/W*100:6.1f}%W dy={dy/H*100:6.1f}%H peak={c:.2f}")
