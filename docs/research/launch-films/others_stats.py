"""Stats for the 18-film acclaimed in-house/studio corpus, with frame-reading corrections
hand-entered from the per-film analyses (kept local). Compares with the Skale corpus.

Reads corpus-acclaimed.json, corpus-skale.json and metrics/<id>.json next to this file.
usage: python others_stats.py            (run from anywhere; paths are relative to this file)
"""
import json, os, statistics as st
D = os.path.dirname(os.path.abspath(__file__))
O = {r['id']: r for r in json.load(open(os.path.join(D, 'corpus-acclaimed.json')))}
S = {r['id']: r for r in json.load(open(os.path.join(D, 'corpus-skale.json')))}
LRA = {}
for i in O:
    j = json.load(open(os.path.join(D, 'metrics', f'{i}.json')))
    a = j['audio']; b = a.get('band_share') or {}
    LRA[i] = (a.get('lra_lu'), (b.get('2000-6000') or 0) + (b.get('6000-22050') or 0), a.get('true_peak_dbfs'))

short = {'apple-liquid-glass-2025': 'apple', 'granola-2-0-2025': 'granola', 'spline-hana-2025': 'spline',
         'linear-agent-2026': 'linear', 'raycast-new-2025': 'raycast', 'cursor-2-0-2025': 'cursor',
         'anthropic-opus-4-6-2026': 'opus', 'anthropic-cowork-2026': 'cowork', 'perplexity-comet-2025': 'comet',
         'google-gemini-app-2024': 'gemini', 'google-ai-mode-2025': 'aimode', 'google-m3-expressive-2025': 'm3',
         'figma-glass-2025': 'figglass', 'figma-motion-2026': 'figmotion', 'framer-3-0-2026': 'framer',
         'notion-mail-2025': 'mail', 'notion-3-agents-2025': 'notion3', 'arc-windows-2024': 'arc'}
R = {short[k]: v for k, v in O.items()}
X = {short[k]: v for k, v in LRA.items()}

# ---- hand-entered from frame readings ----
# corrected hard cuts (incl. cuts to endcard/black; excl. flash blooms, dims, rotations)
cuts = dict(apple=66, granola=0, spline=14, linear=9, raycast=9, cursor=13, opus=50, cowork=20, comet=2,
            gemini=4, aimode=0, m3=19, figglass=9, figmotion=12, framer=15, mail=19, notion3=25, arc=37)
# endcard: (start s, final logo hold s)
endc = dict(apple=(259.76, 3.7), granola=(23.2, 1.1), spline=(22.57, 0.9), linear=(45.10, 4.5),
            raycast=(28.27, 1.9), cursor=(62.28, 0.9), opus=(36.75, 2.3), cowork=(62.17, 2.4),
            comet=(33.6, 1.8), gemini=(66.7, 1.8), aimode=(92.3, 2.9), m3=(35.17, 2.1), figglass=(23.73, 2.2),
            figmotion=(62.58, 1.23), framer=(62.46, 2.0), mail=(51.54, 3.1), notion3=(82.12, 2.9), arc=(31.08, 1.4))
# first readable word (any, incl. wordmark / UI text), first scene change / seam
first_word = dict(apple=13.3, granola=0.8, spline=0.0, linear=0.0, raycast=1.0, cursor=0.0, opus=0.0, cowork=0.33,
                  comet=3.29, gemini=0.0, aimode=0.75, m3=0.0, figglass=0.6, figmotion=3.3, framer=1.0, mail=0.5,
                  notion3=1.17, arc=1.46)
first_seam = dict(apple=3.37, granola=5.0, spline=0.633, linear=3.05, raycast=3.667, cursor=2.05, opus=0.46,
                  cowork=2.33, comet=3.25, gemini=8.71, aimode=4.2, m3=1.45, figglass=3.8, figmotion=2.0,
                  framer=2.34, mail=2.18, notion3=1.17, arc=1.0)
# name of the launched thing on screen as text (s)
name_t = dict(apple=110.9, granola=5.53, spline=0.0, linear=3.6, raycast=32.2, cursor=0.0, opus=26.29, cowork=3.0,
              comet=3.29, gemini=16.0, aimode=1.2, m3=3.1, figglass=21.97, figmotion=7.17, framer=61.46, mail=0.5,
              notion3=2.0, arc=15.63)
# human-typed prompt speed (chars/s), per film median of measured instances
typing = dict(linear=15, granola=13, cursor=20, notion3=13.5, figmotion=33, framer=21, raycast=10, mail=21.5, gemini=7.5)
# text/title card holds (s, representative median per film)
hold = dict(cursor=2.0, mail=2.1, notion3=2.9, granola=1.45, framer=1.5, arc=0.85, figmotion=2.5, gemini=1.15,
            aimode=1.5, opus=1.0, spline=1.1, cowork=1.4, apple=2.4, linear=2.1)
views = dict(apple=(4306173, 78321), granola=(49812, 292), spline=(138132, 2743), linear=(23606, 369),
             raycast=(112692, 4434), cursor=(9462162, 4056), opus=(401567, 6727), cowork=(947346, 7211),
             aimode=(322359, 7110), m3=(424692, 12695), figglass=(173386, 5787), figmotion=(38076, 867),
             framer=(1682705, 924), mail=(5990208, 5548), notion3=(15754909, 6358), arc=(192183, 7592))
reg = dict(linear='R1', raycast='R1', cowork='R1',
           cursor='R2', mail='R2', granola='R2', figmotion='R2', framer='R2',
           notion3='R3',
           opus='R4', gemini='R4', aimode='R4',
           spline='R5', m3='R5', figglass='R5', arc='R5',
           comet='R6', apple='R6')

def q(v):
    v = sorted(v); n = len(v)
    def p(x):
        i = (n - 1) * x; lo = int(i); hi = min(lo + 1, n - 1); return v[lo] + (v[hi] - v[lo]) * (i - lo)
    return f"{p(.5):.3g} [{p(.25):.3g}, {p(.75):.3g}] min {v[0]:.3g} max {v[-1]:.3g} n={n}"
def rank(v):
    s = sorted(range(len(v)), key=lambda i: v[i]); r = [0] * len(v)
    i = 0
    while i < len(v):
        j = i
        while j + 1 < len(v) and v[s[j + 1]] == v[s[i]]: j += 1
        for k in range(i, j + 1): r[s[k]] = (i + j) / 2
        i = j + 1
    return r
def spear(a, b):
    ra, rb = rank(a), rank(b); ma, mb = st.mean(ra), st.mean(rb)
    num = sum((x - ma) * (y - mb) for x, y in zip(ra, rb))
    den = (sum((x - ma) ** 2 for x in ra) * sum((y - mb) ** 2 for y in rb)) ** .5
    return round(num / den, 2)

F = list(R)
cpm = {f: cuts[f] / R[f]['dur'] * 60 for f in F}
print('corrected cpm', {f: round(cpm[f], 1) for f in F})
print('cpm corrected', q(cpm.values()))
print('cpm detected ', q([R[f]['cpm'] for f in F]))
print('films with 0 hard cuts', [f for f in F if cuts[f] == 0])
print('films <=4 cuts', [f for f in F if cuts[f] <= 4])
for k in ['dur', 'still', 'calm', 'mpm', 'mv_med', 'lufs', 'sub', 'beat', 'colf', 'luma', 'held', 'pan', 'zoom', 'blur']:
    print(k, q([R[f][k] for f in F]))
print('lra', q([X[f][0] for f in F])); print('hi>2k', q([X[f][1] for f in F])); print('tp', q([X[f][2] for f in F]))
ec_tot = {f: R[f]['dur'] - endc[f][0] for f in F}
print('endcard total', q(ec_tot.values())); print('endcard share', q([ec_tot[f] / R[f]['dur'] for f in F]))
print('logo hold', q([endc[f][1] for f in F]))
print('first word', q(first_word.values())); print('first seam', q(first_seam.values()))
nt = {f: name_t[f] / R[f]['dur'] for f in F}
print('name share', {f: round(nt[f], 3) for f in F})
print('name early<=11%', sorted(f for f in F if nt[f] <= .11), 'late>=40%', sorted(f for f in F if nt[f] >= .40))
print('typing', q(typing.values())); print('text hold', q(hold.values()))
print('lufs hotter than -14', sorted((R[f]['lufs'], f, R[f]['dur']) for f in F if R[f]['lufs'] > -14))
print('lufs < -30', sorted((R[f]['lufs'], f, R[f]['dur']) for f in F if R[f]['lufs'] < -30))
print('tp>=0', sorted(f for f in F if X[f][2] >= 0))
print('dark-dom', [f for f in F if R[f]['dark'] > .5], 'light-dom', [f for f in F if R[f]['light'] > .5])
print('mono>=.32', [f for f in F if R[f]['mono'] >= .32])
lr = {f: views[f][1] / views[f][0] for f in views}
print('like rate %', {f: round(100 * lr[f], 2) for f in sorted(lr, key=lr.get)})
yt = [f for f in views]
for k, vals in [('dur', {f: R[f]['dur'] for f in F}), ('cpm_corr', cpm), ('still', {f: R[f]['still'] for f in F}),
                ('lufs', {f: R[f]['lufs'] for f in F}), ('colf', {f: R[f]['colf'] for f in F})]:
    print('spearman like-rate vs', k, spear([lr[f] for f in yt], [vals[f] for f in yt]),
          '| views vs', spear([views[f][0] for f in yt], [vals[f] for f in yt]))
print('spearman lufs vs dur (all 18)', spear([R[f]['lufs'] for f in F], [R[f]['dur'] for f in F]))
print('spearman still vs cpm_corr', spear([R[f]['still'] for f in F], [cpm[f] for f in F]))
# after-cut
ac = {f: R[f]['after_cut'] for f in F if R[f]['after_cut']}
print('after_cut n', len(ac))
for j, lab in enumerate(['1f', '100', '200', '400', '800']):
    print(' ', lab, q([v[j] for v in ac.values()]))
print('  decay<=0.4 by 800', sorted(f for f, v in ac.items() if v[4] <= .4),
      'rise>1 at 400', sorted(f for f, v in ac.items() if v[3] > 1))
# registers
for r in ['R1', 'R2', 'R3', 'R4', 'R5', 'R6']:
    fs = [f for f in F if reg[f] == r]
    def m(k): return round(st.median([R[f][k] for f in fs]), 3)
    print(r, fs, 'dur', m('dur'), 'cpm_corr', round(st.median([cpm[f] for f in fs]), 1), 'still', m('still'),
          'calm', m('calm'), 'mv_med', m('mv_med'), 'lufs', m('lufs'), 'sub', m('sub'), 'beat', m('beat'),
          'colf', m('colf'), 'luma', m('luma'), 'pan', m('pan'))
# Skale comparison (client films 01-28 + reel for motion; audio excludes reel)
Sk = list(S.values())
def sq(k, excl_reel=False):
    return q([r[k] for r in Sk if r.get(k) is not None and not (excl_reel and r['id'][:2] == '00')])
for k in ['still', 'calm', 'mpm', 'mv_med', 'mv_p75', 'held', 'colf', 'luma', 'pan', 'zoom']:
    print('SKALE', k, sq(k))
for k in ['lufs', 'sub', 'beat', 'tp']:
    print('SKALE', k, sq(k, True))

print('--- organic only (like-rate >= 0.5%) ---')
org = [f for f in views if lr[f] >= .005]
print(org, len(org))
for k, vals in [('dur', {f: R[f]['dur'] for f in F}), ('cpm_corr', cpm), ('still', {f: R[f]['still'] for f in F}),
                ('lufs', {f: R[f]['lufs'] for f in F}), ('colf', {f: R[f]['colf'] for f in F}), ('beat', {f: R[f]['beat'] for f in F})]:
    print('organic spearman like-rate vs', k, spear([lr[f] for f in org], [vals[f] for f in org]))
prom = [f for f in views if lr[f] < .001]
print('promoted', prom, 'durs', [R[f]['dur'] for f in prom], 'regs', [reg[f] for f in prom])
# Skale frame-read cpm: printed by synth_stats.py (cuts_read), 4.0 [1.9, 11.6] n=28
# durations <=40
print('<=40 s', sorted((round(R[f]['dur'],1), f) for f in F if R[f]['dur'] <= 40))
print('fps', sorted((R[f]['fps'], f) for f in F))
# maker: the four studio films (Claude Opus 4.6 BUCK per brief, Google Gemini app Ordinary Folk,
# Google AI Mode Ordinary Folk by inference, Perplexity Comet Studio Freight); the rest are in-house
# or uncredited (Framer 3.0)
maker = {f: ('studio' if f in ('opus', 'gemini', 'aimode', 'comet') else 'in-house or uncredited') for f in F}
for mk in ['studio', 'in-house or uncredited']:
    fs = [f for f in F if maker[f] == mk]
    print('maker', mk, len(fs), 'cpm_corr', q([cpm[f] for f in fs]))
