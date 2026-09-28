"""Probe: total camera shift and scale between two times, by OpenCV phase correlation and ECC.

Expects local media (not committed; see ../README.md). Takes the media path as an argument.
usage: python drift.py <film.mp4> <t0_s> <t1_s> [fps=24]

Prints the summed shift in 1080p pixels, the duration, the first-to-last scale and the count of
moving frames. The duration assumes the film's frame rate: pass fps for anything but 24 (the drift
quoted for Claude Cowork, 18-50 px/s on the agent's turn, was read on a 24 fps file).
Needs numpy, opencv-python and ffmpeg.
"""
import sys, subprocess, numpy as np, cv2
path=sys.argv[1]; t0=float(sys.argv[2]); t1=float(sys.argv[3]); W=480
FPS=float(sys.argv[4]) if len(sys.argv)>4 else 24.0
H=270
raw=subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-t',str(t1-t0),'-i',path,'-vf',f'scale={W}:{H}','-f','rawvideo','-pix_fmt','gray','-'],capture_output=True).stdout
fr=np.frombuffer(raw,np.uint8).reshape(-1,H,W).astype(np.float32)
first=fr[0]; prev=fr[0]
tot=np.zeros(2)
out=[]
for i in range(1,len(fr)):
    (dx,dy),r=cv2.phaseCorrelate(prev,fr[i]); prev=fr[i]
    tot+= (dx,dy); out.append((i,dx,dy,r))
# scale estimate first vs last via ECC affine
warp=np.eye(2,3,dtype=np.float32)
try:
    cc,warp=cv2.findTransformECC(first,fr[-1],warp,cv2.MOTION_AFFINE,(cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,200,1e-5),None,5)
    sc=np.sqrt(abs(np.linalg.det(warp[:,:2])))
except Exception as e:
    sc=float('nan')
dur=(len(fr)-1)/FPS
print(f'{t0}-{t1}s frames={len(fr)} total shift dx={tot[0]*1920/W:.1f}px dy={tot[1]*1920/W:.1f}px (1080p px) over {dur:.2f}s; scale first->last={sc:.3f}; moving frames={sum(1 for o in out if abs(o[1])+abs(o[2])>0.05)}')
