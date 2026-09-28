"""Per-format medians for the Skale corpus (28 client films + the 2025 reel), read from
metrics/<id>.json. Formats are the frame-read assignment in notes/synthesis-skale.md section 1.
Prints (median, p25, p75, min, max, n) per format, the music-only and voice-led audio subsets,
per-film energy above 2 kHz, motion after a cut, and the frame-read cut rates.

usage: python synth_stats.py            (run from anywhere; paths are relative to this file)

The frame-read cut counts are hand-entered at the end of this file from the per-film analyses
(kept local). The other hand-timed Skale values (first word, first seam, reveal, endcard, holds,
stagger, seam and counter durations) are not entered here: the notes record their medians and
ranges, and the per-film values stay in the local analyses.
"""
import json,glob,os,statistics as st
D=os.path.dirname(os.path.abspath(__file__))
fs=sorted(glob.glob(os.path.join(D,'metrics','[0-9][0-9]-*.json')))
M={}
for f in fs:
    d=json.load(open(f)); M[d['id'][:2]]=d
fmt={'ui':['00','02','05','08','09','11','12','13','16','17','18','19','20','21','23','24','25','26'],
     'founder':['01','06','10','14','15','27','28'],'live':['03','04','07'],'cg':['22']}
def q(v):
    v=sorted(v); n=len(v)
    def p(x):
        i=(n-1)*x; lo=int(i); hi=min(lo+1,n-1); return v[lo]+(v[hi]-v[lo])*(i-lo)
    return round(p(.5),3),round(p(.25),3),round(p(.75),3),round(v[0],3),round(v[-1],3),n
def get(d,k):
    a=d.get('audio',{})
    if k=='still': return d['still_frac']
    if k=='calm': return d['calm_frac_global']
    if k=='mv': return d['move_len_s']['median']
    if k=='mvp90': return d['move_len_s'].get('p90')
    if k=='mpm': return d['moves_per_min']
    if k=='hi': 
        b=a.get('band_share',{}); return (b.get('2000-6000',0) or 0)+(b.get('6000-22050',0) or 0) if b else None
    if k=='b2_6': b=a.get('band_share',{}); return b.get('2000-6000') if b else None
    if k=='sub': b=a.get('band_share',{}); return b.get('0-120') if b else None
    if k=='lufs': return a.get('lufs_i')
    if k=='lra': return a.get('lra_lu')
    if k=='tp': return a.get('true_peak_dbfs')
    if k=='beat': return a.get('beat_clarity')
    if k=='speech': return a.get('speech_mod_index')
    if k=='pan': return d['camera_share_of_moving_frames']['pan']
    if k=='zoom': return d['camera_share_of_moving_frames']['zoom']
    if k=='area': return d['changed_area_median_when_moving']
    if k=='light': return d['light_frac_luma_gt_180']
    if k=='colf': return d['colorfulness_median']
for k in ['still','calm','mv','mvp90','mpm','sub','b2_6','hi','lufs','lra','tp','beat','speech','pan','zoom','area','light','colf']:
    print(k)
    for g,ids in fmt.items():
        v=[get(M[i],k) for i in ids if i in M and get(M[i],k) is not None]
        if g!='ui' and k in ('sub','b2_6','hi','lufs','lra','tp','beat') : pass
        if v: print('  ',g,q(v))
    # music-only audio subset excludes 00
    if k in ('sub','b2_6','hi','lufs','lra','tp','beat','speech'):
        v=[get(M[i],k) for i in fmt['ui']+fmt['cg'] if i!='00' and get(M[i],k) is not None]
        print('   music-only(18 incl 22, excl 00)',q(v))
        v=[get(M[i],k) for i in fmt['founder']+fmt['live'] if get(M[i],k) is not None]
        print('   voice-led(10)',q(v))
    v=[get(M[i],k) for i in M if get(M[i],k) is not None and not (k in ('lufs','lra','tp','sub','b2_6','hi','beat','speech') and i=='00')]
    print('   ALL',q(v))
print('hi band per music film')
for i in fmt['ui']+fmt['cg']:
    if i=='00': continue
    print(i, M[i]['id'], get(M[i],'b2_6'), get(M[i],'hi'))
print('voice hi')
for i in fmt['founder']+fmt['live']:
    print(i, M[i]['id'], get(M[i],'b2_6'), get(M[i],'hi'))
# motion after cut
mac=[M[i]['motion_after_cut_rel_at_1f_100ms_200ms_400ms_800ms'] for i in sorted(M) if M[i]['motion_after_cut_rel_at_1f_100ms_200ms_400ms_800ms']]
print('mac n',len(mac))
for j,lab in enumerate(['1f','100','200','400','800']):
    print(lab, q([m[j] for m in mac]))

# ---- hand-entered from frame readings (per-film analyses, kept local) ----
# Hard scene cuts as each film's analysis counted them. Match cuts and cuts to black or to the
# endcard count; fills, wipes, dissolves, dips, file-end black and the detector's false positives
# do not. The poster-frame switch (the cut out of a 1-4 frame poster at t <= 0.17 s: 03, 04, 06,
# 10, 11, 24) is left out everywhere. 07 (the Poke anthology, 16 min) is excluded from the rates.
# One-frame scale jumps inside one composition are not counted (10, 11, 13), except where the
# analysis counted a punch-in as a cut: 09 x1, 17 x1, 19 x1, 24 x4 (the 'strict' line drops them).
cuts_read = {'00': 3, '01': 38, '02': 5, '03': 19, '04': 24, '05': 3, '06': 4, '08': 0, '09': 5,
             '10': 5, '11': 5, '12': 3, '13': 0, '14': 0, '15': 31, '16': 1, '17': 6, '18': 3,
             '19': 8, '20': 2, '21': 2, '22': 7, '23': 8, '24': 7, '25': 4, '26': 4, '27': 5, '28': 1}
punch_in = {'09': 1, '17': 1, '19': 1, '24': 4}
def cut_rates(counts):
    return {i: counts[i] / M[i]['duration_s'] * 60 for i in counts}
for lab, counts in [('frame-read', cuts_read),
                    ('strict', {i: n - punch_in.get(i, 0) for i, n in cuts_read.items()})]:
    r = cut_rates(counts)
    print('cuts/min', lab, 'ALL(28, excl 07)', q(list(r.values())))
    for g, ids in fmt.items():
        v = [r[i] for i in ids if i in r]
        print('  ', g, q(v))
r = cut_rates(cuts_read)
print('cuts/min per film', {i: round(r[i], 2) for i in sorted(r)})
print('zero scene cuts', [i for i in sorted(cuts_read) if cuts_read[i] == 0])
