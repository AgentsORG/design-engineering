"""Probe: duplicate-frame pattern between two times.

Expects local media (not committed; see ../README.md). Takes the media path as an argument.
usage: python dups.py <film.mp4> <t0_s> <t1_s>

Prints one symbol per frame step: 0 = exact or near duplicate (mean abs grey difference < 0.3 at
480x270), . = small change, # = change. Reads cadence directly: 0#0# is on twos, a 0 every fifth step
is 24p in a 30 fps file. Behind the on-twos and on-threes cadence quoted for Claude Opus 4.6 and the
duplicate-frame caveats. Needs numpy and ffmpeg.
"""
import sys, subprocess, numpy as np
path=sys.argv[1]; t0=float(sys.argv[2]); t1=float(sys.argv[3]); W,H=480,270
raw=subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-t',str(t1-t0),'-i',path,'-vf',f'scale={W}:{H}','-f','rawvideo','-pix_fmt','gray','-'],capture_output=True).stdout
fr=np.frombuffer(raw,np.uint8).reshape(-1,H,W).astype(np.int16)
d=[float(np.mean(np.abs(fr[i]-fr[i-1]))) for i in range(1,len(fr))]
print(' '.join('0' if x<0.3 else ('.' if x<1.5 else '#') for x in d))
