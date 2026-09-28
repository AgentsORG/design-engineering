#!/usr/bin/env python3
"""Corpus statistics over HeyGen's hyperframes-launches composition source.

Method
- Walk every tracked text file under the clone. Two file sets:
  * ALL_HTML   : every .html (what the 2026-09-05 study counted)
  * COMP       : composition source only = project index.html, compositions/*.html,
                 project js/*.js, heygen-apple-motion/<template>/index.html (+hero, +examples);
                 excludes contact sheets, mockups, boards, storyboards, previews,
                 background studies and vendored gsap.min.js / three.
  * COMP_DEDUP : COMP minus heygen-apple-motion/examples/* (re-brands of 01-ui-sting with
                 identical motion) and spacex-launch/compositions/* (a re-skin of
                 claude-paper-launch's compositions).
- Tween calls: `.to(` `.from(` `.fromTo(` `.set(` preceded by an identifier (tl, gsap, T, inner ...).
  Arguments are split at top level with a bracket/string-aware scanner; only object-literal
  vars are analysed. `keyframes:[...]` arrays are analysed separately (their per-step
  durations are NOT mixed into the tween-duration statistics).
- Keys counted once per tween call (from-vars + to-vars union for fromTo).
- Eases: string literal eases per tween; non-literal eases (function refs / CustomEase vars)
  counted as "<function>". Tweens with no ease key are counted as "(default)" (GSAP default
  power1.out unless a timeline `defaults` overrides it).
- Raw token counts (regex over the whole file text) are reported too, because a raw count of
  `scale` / `blur(` is what inflates numbers compared with per-tween key counts.
"""
import json, os, re, statistics, subprocess, sys
from collections import Counter, defaultdict

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
OUT = sys.argv[2] if len(sys.argv) > 2 else None

files = subprocess.run(["git", "-C", ROOT, "ls-files"], capture_output=True, text=True).stdout.split("\n")
files = [f for f in files if f.endswith((".html", ".js"))]

EXCL = re.compile(r"(contact-sheet|mockups/|boards/|/storyboard\.html|STORYBOARD-SCENE|/preview\.html|background-studies/|gsap\.min\.js|node_modules|design-pass/|capture/extracted)")

def project_of(f):
    parts = f.split("/")
    if parts[0] == "heygen-apple-motion" and len(parts) > 2:
        return "heygen-apple-motion/" + parts[1] + ("/" + parts[2] if parts[1] == "examples" else "")
    return parts[0]

ALL_HTML = [f for f in files if f.endswith(".html")]
COMP = [f for f in files if not EXCL.search(f)]
COMP_DEDUP = [f for f in COMP if not f.startswith("heygen-apple-motion/examples/") and not f.startswith("spacex-launch/compositions/")]

# ---------------- scanner helpers ----------------
def match_close(s, i):
    """s[i] is an opening bracket; return index of its match (string/comment aware)."""
    pairs = {"(": ")", "[": "]", "{": "}"}
    stack = [pairs[s[i]]]
    j = i + 1
    n = len(s)
    while j < n and stack:
        c = s[j]
        if c in "\"'`":
            q = c; j += 1
            while j < n and s[j] != q:
                if s[j] == "\\": j += 1
                j += 1
        elif c == "/" and j + 1 < n and s[j + 1] == "/":
            while j < n and s[j] != "\n": j += 1
        elif c == "/" and j + 1 < n and s[j + 1] == "*":
            k = s.find("*/", j + 2); j = n if k < 0 else k + 1
        elif c in pairs:
            stack.append(pairs[c])
        elif c == stack[-1]:
            stack.pop()
            if not stack: return j
        j += 1
    return -1

def split_top(s):
    """split s at top-level commas"""
    out, depth, cur, i, n = [], 0, [], 0, len(s)
    while i < n:
        c = s[i]
        if c in "\"'`":
            q = c; k = i + 1
            while k < n and s[k] != q:
                if s[k] == "\\": k += 1
                k += 1
            cur.append(s[i:k + 1]); i = k + 1; continue
        if c in "([{": depth += 1
        elif c in ")]}": depth -= 1
        if c == "," and depth == 0:
            out.append("".join(cur)); cur = []
        else:
            cur.append(c)
        i += 1
    if "".join(cur).strip(): out.append("".join(cur))
    return [x.strip() for x in out]

KEY_RE = re.compile(r"^\s*(?:\"([^\"]+)\"|'([^']+)'|([A-Za-z_$][\w$]*))\s*:\s*(.*)$", re.S)

def obj_items(txt):
    """top-level key/value pairs of an object literal text '{...}'"""
    txt = txt.strip()
    if not (txt.startswith("{") and txt.endswith("}")): return None
    items = []
    for part in split_top(txt[1:-1]):
        m = KEY_RE.match(part)
        if m:
            k = m.group(1) or m.group(2) or m.group(3)
            items.append((k, m.group(4).strip()))
    return items

NUM = re.compile(r"^-?\d*\.?\d+(?:e-?\d+)?$")
def num(v):
    v = v.strip()
    return float(v) if NUM.match(v) else None

CONTROL = {"duration", "ease", "delay", "stagger", "onUpdate", "onComplete", "onStart", "onReverseComplete",
           "repeat", "yoyo", "repeatDelay", "immediateRender", "overwrite", "keyframes", "paused", "callbackScope",
           "onUpdateParams", "onCompleteParams", "onStartParams", "id", "runBackwards", "lazy", "data", "snap",
           "easeEach", "defaults", "inherit", "startAt", "modifiers", "reversed", "force3D"}

TWEEN_RE = re.compile(r"([A-Za-z_$][\w$]*|\))\s*\.\s*(to|from|fromTo|set)\s*\(")
BLUR_RE = re.compile(r"blur\(\s*(-?\d*\.?\d+)\s*px\s*\)")

class Stats:
    def __init__(self):
        self.calls = Counter(); self.eases = Counter(); self.keys = Counter(); self.durs = []
        self.set_calls = 0; self.stagger = []; self.blur_to = []; self.blur_from = []
        self.scale_from_entr = []; self.scale_to_exit = []; self.rot = []; self.rot3d = []
        self.xoff_entr = []; self.kf_tweens = 0; self.kf_steps = 0; self.per_project_calls = Counter()
        self.ease_by_project = defaultdict(Counter); self.default_ease_tl = Counter()
        self.z_use = 0; self.dur_by_kind = defaultdict(list); self.set_positions = 0
        self.tween_blur = 0

def analyse(fileset):
    S = Stats()
    raw = Counter()
    persp_projects = defaultdict(Counter)
    for f in fileset:
        try:
            s = open(os.path.join(ROOT, f), encoding="utf-8", errors="replace").read()
        except Exception:
            continue
        proj = project_of(f)
        # raw tokens
        for tok, rx in [("scale", r"\bscale[XY]?\b"), ("blur(", r"blur\("), ("rotation", r"\brotation[XYZ]?\b|\brotate[XYZ]?\b"),
                        ("stagger", r"\bstagger\b"), ("skew", r"\bskew[XY]?\b"), ("clipPath", r"clipPath|clip-path"),
                        ("perspective", r"perspective"), ("preserve-3d", r"preserve-3d"), ("translateZ/z:", r"translateZ|\bz\s*:"),
                        ("PerspectiveCamera", r"PerspectiveCamera"), ("CustomEase", r"CustomEase"),
                        ("power2.out", r"power2\.out"), ("none-ease", r"ease\s*:\s*[\"']none[\"']"),
                        ("expo.out", r"expo\.out")]:
            c = len(re.findall(rx, s)); raw[tok] += c
            if tok in ("perspective", "preserve-3d", "translateZ/z:", "PerspectiveCamera") and c:
                persp_projects[proj][tok] += c
        # timeline defaults
        for m in re.finditer(r"timeline\s*\(\s*\{[^}]*defaults\s*:\s*\{[^}]*ease\s*:\s*[\"']([^\"']+)[\"']", s):
            S.default_ease_tl[m.group(1)] += 1
        for m in TWEEN_RE.finditer(s):
            kind = m.group(2)
            op = m.end() - 1
            cl = match_close(s, op)
            if cl < 0: continue
            args = split_top(s[op + 1:cl])
            if not args: continue
            if kind == "fromTo":
                if len(args) < 3: continue
                fv, tv = obj_items(args[1]), obj_items(args[2])
                objs = [o for o in (fv, tv) if o is not None]
                if tv is None: continue
            else:
                if len(args) < 2: continue
                tv = obj_items(args[1]); fv = None
                if tv is None: continue
                objs = [tv]
            S.calls[kind] += 1
            S.per_project_calls[proj] += 1
            d_to = dict(tv)
            allkeys = set()
            for o in objs:
                for k, v in o: allkeys.add(k)
            # keyframes
            if "keyframes" in d_to:
                S.kf_tweens += 1
                kv = d_to["keyframes"].strip()
                if kv.startswith("["):
                    steps = split_top(kv[1:-1]) if kv.endswith("]") else []
                    S.kf_steps += len(steps)
                    for st in steps:
                        it = obj_items(st)
                        if it:
                            for k, v in it:
                                if k not in CONTROL: allkeys.add(k)
                elif kv.startswith("{"):
                    it = obj_items(kv)
                    if it:
                        for k, v in it:
                            if k not in CONTROL: allkeys.add(k)
            for k in allkeys:
                if k not in CONTROL: S.keys[k] += 1
            if kind == "set":
                S.set_calls += 1
            else:
                e = d_to.get("ease")
                if e is None: lab = "(default)"
                else:
                    em = re.match(r"^[\"']([^\"']+)[\"']$", e)
                    lab = em.group(1) if em else "<function>"
                S.eases[lab] += 1
                S.ease_by_project[proj][lab] += 1
                dv = d_to.get("duration")
                if dv is not None:
                    x = num(dv)
                    if x is not None and "keyframes" not in d_to:
                        S.durs.append(x); S.dur_by_kind[lab].append(x)
            stg = d_to.get("stagger")
            if stg is not None:
                x = num(stg)
                if x is None:
                    mm = re.search(r"each\s*:\s*(-?\d*\.?\d+)", stg)
                    if mm: x = float(mm.group(1))
                if x is not None: S.stagger.append(x)
            # blur values in to / from
            for k, v in tv:
                if k == "filter":
                    for bm in BLUR_RE.finditer(v): S.blur_to.append(float(bm.group(1)))
            if fv:
                for k, v in fv:
                    if k == "filter":
                        for bm in BLUR_RE.finditer(v): S.blur_from.append(float(bm.group(1)))
            if kind in ("from",):
                for k, v in tv:
                    if k == "filter":
                        for bm in BLUR_RE.finditer(v): S.blur_from.append(float(bm.group(1)))
            if any(k == "filter" and "blur" in v for o in objs for k, v in o): S.tween_blur += 1
            # entrances: fromTo with to-scale 1 or from()
            dfrom = dict(fv) if fv else {}
            if kind == "fromTo":
                sf, st = num(dfrom.get("scale", "x")), num(d_to.get("scale", "x"))
                if sf is not None and st is not None and abs(st - 1) < 1e-6 and sf != 1: S.scale_from_entr.append(sf)
                xf, xt = num(dfrom.get("x", "q")), num(d_to.get("x", "q"))
                if xf is not None and xt is not None and xt == 0 and xf != 0: S.xoff_entr.append(xf)
            if kind == "from":
                sf = num(d_to.get("scale", "x"))
                if sf is not None and sf != 1: S.scale_from_entr.append(sf)
            if kind == "to":
                st = num(d_to.get("scale", "x"))
                if st is not None and st != 1: S.scale_to_exit.append(st)
            for k in ("rotation", "rotate", "rotationZ"):
                for o in objs:
                    for kk, v in o:
                        if kk == k:
                            x = num(v)
                            if x is not None: S.rot.append(x)
            for k in ("rotationX", "rotationY", "rotateX", "rotateY"):
                for o in objs:
                    for kk, v in o:
                        if kk == k:
                            x = num(v)
                            if x is not None: S.rot3d.append(x)
            if "z" in allkeys or "transformPerspective" in allkeys: S.z_use += 1
    return S, raw, persp_projects

def q(xs, p):
    if not xs: return None
    xs = sorted(xs); k = (len(xs) - 1) * p
    lo, hi = int(k), min(int(k) + 1, len(xs) - 1)
    return round(xs[lo] + (xs[hi] - xs[lo]) * (k - lo), 3)

def summary(xs):
    if not xs: return {}
    return {"n": len(xs), "p25": q(xs, .25), "median": q(xs, .5), "p75": q(xs, .75), "min": min(xs), "max": max(xs)}

def report(name, fs):
    S, raw, pp = analyse(fs)
    tweens = sum(v for k, v in S.calls.items() if k != "set")
    r = {
        "files": len(fs),
        "tween_calls": dict(S.calls), "tweens_excl_set": tweens,
        "keyframe_tweens": S.kf_tweens, "keyframe_steps": S.kf_steps,
        "eases_top": S.eases.most_common(25),
        "timeline_default_eases": dict(S.default_ease_tl),
        "props_top": S.keys.most_common(30),
        "tweens_with_blur_filter": S.tween_blur,
        "duration_s": summary(S.durs),
        "duration_by_ease": {k: summary(v) for k, v in S.dur_by_kind.items() if len(v) >= 20},
        "stagger_s": summary(S.stagger), "stagger_top": Counter(round(x, 3) for x in S.stagger).most_common(12),
        "blur_to_px": summary(S.blur_to), "blur_to_top": Counter(S.blur_to).most_common(12),
        "blur_from_px": summary(S.blur_from), "blur_from_top": Counter(S.blur_from).most_common(12),
        "entrance_scale_from": summary(S.scale_from_entr), "entrance_scale_from_top": Counter(round(x, 3) for x in S.scale_from_entr).most_common(15),
        "entrance_scale_from_share_below1": round(sum(1 for x in S.scale_from_entr if x < 1) / max(1, len(S.scale_from_entr)), 3),
        "to_scale_non1": summary(S.scale_to_exit), "to_scale_top": Counter(round(x, 3) for x in S.scale_to_exit).most_common(15),
        "entrance_x_offset_px": summary(S.xoff_entr), "entrance_x_top": Counter(S.xoff_entr).most_common(12),
        "rotation_deg": summary([abs(x) for x in S.rot]), "rotation_top": Counter(S.rot).most_common(15),
        "rotation3d_deg": summary([abs(x) for x in S.rot3d]), "rotation3d_top": Counter(S.rot3d).most_common(15),
        "tweens_touching_z_or_transformPerspective": S.z_use,
        "raw_token_counts": dict(raw),
        "perspective_by_project": {k: dict(v) for k, v in pp.items()},
        "tween_calls_by_project": S.per_project_calls.most_common(),
        "ease_by_project_top3": {p: c.most_common(3) for p, c in sorted(S.ease_by_project.items())},
    }
    return r

res = {"method": __doc__, "sets": {}}
for name, fs in [("ALL_HTML", ALL_HTML), ("COMP", COMP), ("COMP_DEDUP", COMP_DEDUP)]:
    res["sets"][name] = report(name, fs)
if OUT:
    json.dump(res, open(OUT, "w"), indent=1)
for name in res["sets"]:
    r = res["sets"][name]
    print("=====", name, r["files"], "files", r["tween_calls"], "tweens(excl set)", r["tweens_excl_set"])
    for k in ["eases_top", "props_top", "duration_s", "stagger_s", "stagger_top", "blur_to_px", "blur_to_top", "blur_from_px", "blur_from_top",
              "entrance_scale_from", "entrance_scale_from_top", "entrance_scale_from_share_below1", "to_scale_top", "entrance_x_offset_px", "entrance_x_top",
              "rotation_deg", "rotation_top", "rotation3d_deg", "rotation3d_top", "tweens_touching_z_or_transformPerspective", "raw_token_counts",
              "timeline_default_eases", "tweens_with_blur_filter", "keyframe_tweens", "keyframe_steps"]:
        print(" ", k, ":", r[k])
