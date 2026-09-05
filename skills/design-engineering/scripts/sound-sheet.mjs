#!/usr/bin/env node
// sound-sheet.mjs — render a stereo sound stem from a motion cue sheet.
//
// The idea: sound is derived from the motion, not chosen from a library. Each cue names
// the visual event (what settles, where on the canvas, how big it is, which way it
// travelled, how long the tween took) and the renderer derives every audio property
// from it, so the stem cannot disagree with the picture:
//
//   size      → pitch and decay   (big things land low and long; small things tick high and short)
//   x         → stereo pan        (constant-power, ±0.7 at the canvas edges)
//   y         → brightness        (higher on screen = brighter attack)
//   direction → contour           (a whoosh sweeps up when the element leaves upward)
//   tween     → whoosh length     (the breath peaks on the settle frame, not the start)
//   t         → the transient     (placed on the contact frame; audio may lag, never lead)
//
// Two registers share the renderer:
//   · dry      — no bed, mallet lands and ticks, true silence between events (the bruno / superfx reel)
//   · bed      — a warm sub-heavy drone that carries the film, with dry clicks 10–20 dB under it,
//                dropouts before reveals, and a thud for big landings (OpenAI "Refreshed." / GPT-5,
//                measured: sub 43–108 Hz in F, clicks 3–5 kHz with 20–30 ms decay, ~5 hits/s while
//                text streams, 0.5–1 s silences as punctuation)
//
// Deterministic: no Math.random, a fixed seed per cue id.
//
//   node sound-sheet.mjs cues.json --out stem.wav [--family dir] [--peak -1] [--report] [--json]
//
// cues.json:
//   { "canvas": { "w": 1920, "h": 1080 }, "fps": 30, "duration": 12,
//     "bed": { "root": 43.1, "level": -18, "pad": -27, "in": 0, "out": 11.6, "fadeIn": 0.5, "fadeOut": 0.4,
//              "pulse": 0.26, "gainPoints": [[0, -8], [2.8, -3], [5.6, 0]], "dropouts": [ { "t": 7.0, "dur": 0.5, "keep": "pad" } ],
//              "swells": [ { "t": 11.3, "dur": 0.3, "db": 2 } ] },
//     "cues": [ { "id": "title", "kind": "thud",  "t": 0.9,  "x": 810, "y": 480, "w": 1300, "h": 132 },
//               { "id": "sub",   "kind": "type",  "t": 1.3,  "n": 13, "every": 0.11, "x": 700, "y": 640, "w": 60, "h": 40 },
//               { "id": "s1-h",  "kind": "flicker", "t": 0.2, "n": 3, "x": 810, "y": 480, "w": 200, "h": 132 },
//               { "id": "row-1", "kind": "click", "t": 5.85, "x": 604, "y": 560, "w": 760, "h": 60 },
//               { "id": "s1-out","kind": "whoosh","t": 2.14, "dur": 0.22, "x": 960, "y": 540, "dir": "up" } ] }
//
// kinds: click | thud | type | flicker | land | tick | whoosh | air | success | error.
// Optional per cue: "pitch" (Hz), "semitones", "gain" (dB), "lag" (s, default 0.01), "n", "every".
// --family <dir> also writes six product one-shots (tick, tap, send, receive, error, success)
// from the same voices, mono, so a product UI and its launch video share one material.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const SR = 44100;
const TAU = Math.PI * 2;

// ---------- CLI ----------
const argv = process.argv.slice(2);
const flag = (name, dflt) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : dflt; };
const has = (name) => argv.includes(name);
const cuesPath = argv.find((a, i) => !a.startsWith("--") && !(argv[i - 1] || "").startsWith("--"));
if (!cuesPath || has("--help")) {
  console.log("usage: node sound-sheet.mjs cues.json --out stem.wav [--family dir] [--peak -1] [--report] [--json]");
  process.exit(cuesPath ? 0 : 1);
}
const sheet = JSON.parse(readFileSync(cuesPath, "utf8"));
const OUT = flag("--out", "stem.wav");
const FAMILY = flag("--family", null);
const PEAK_DB = Number(flag("--peak", "-1"));
const W = sheet.canvas?.w ?? 1920;
const H = sheet.canvas?.h ?? 1080;
const FPS = sheet.fps ?? 30;
const DURATION = sheet.duration ?? Math.max(...sheet.cues.map((c) => c.t + (c.dur ?? 0))) + 1;

// ---------- deterministic noise ----------
function makeNoise(seed) {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s / 4294967296) * 2 - 1; };
}
function seedFor(id) { let h = 2166136261; for (const ch of String(id)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

// ---------- DSP helpers ----------
const db = (x) => 10 ** (x / 20);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// RBJ biquad band-pass (constant skirt gain), coefficients recomputed per sample so a
// whoosh can sweep. Stable for any centre below Nyquist.
function bandpass() {
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return (x, fc, q) => {
    const w0 = TAU * clamp(fc, 20, SR * 0.45) / SR;
    const sn = Math.sin(w0), cs = Math.cos(w0);
    const alpha = sn / (2 * q);
    const b0 = q * alpha, b2 = -q * alpha;
    const a0 = 1 + alpha, a1 = -2 * cs, a2 = 1 - alpha;
    const y = (b0 * x + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x; y2 = y1; y1 = y;
    return y;
  };
}
function onePoleLP() {
  let y = 0;
  return (x, fc) => { const a = 1 - Math.exp(-TAU * clamp(fc, 20, SR / 2.2) / SR); y += a * (x - y); return y; };
}
function mix(parts) {
  const n = Math.max(...parts.map((p) => Math.ceil(p.at * SR) + p.s.length));
  const out = new Float32Array(n);
  for (const p of parts) { const o = Math.round(p.at * SR); for (let i = 0; i < p.s.length; i++) out[o + i] += p.s[i]; }
  return out;
}

// ---------- the material ----------
// Dry click — the OpenAI register's UI sound. A 4 ms band-passed burst plus a sine ping that dies
// in ~15 ms; ten dB down within 25 ms, gone by 60 ms. Centre from the cue's size.
function click({ fc, level, bright, seed }) {
  const n = Math.ceil(0.07 * SR);
  const out = new Float32Array(n);
  const noise = makeNoise(seed);
  const bp = bandpass();
  const k = Math.log(10) / 0.022; // −10 dB at 22 ms
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.exp(-k * t);
    const burst = t < 0.004 ? bp(noise(), fc * (0.9 + 0.3 * bright), 2.6) * (1 - t / 0.004) * 2.2 : bp(0, fc, 2.6) * 2.2;
    const ping = Math.sin(TAU * fc * 0.55 * t) * Math.exp(-t / 0.012) * 0.5;
    out[i] = (burst + ping) * env * level;
  }
  return out;
}

// Thud — a big element settling while the bed is on: a sine dropping from 2.2× to 1× the
// bed's second harmonic over 60 ms, −60 dB in 180 ms, with a click on the contact frame.
function thud({ f0, level, bright, seed }) {
  const t60 = 0.18, n = Math.ceil((t60 * 1.3) * SR);
  const out = new Float32Array(n);
  const k = Math.log(1000) / t60;
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = f0 * (1 + 1.2 * Math.exp(-t / 0.03));
    phase += TAU * f / SR;
    const attack = t < 0.003 ? t / 0.003 : 1;
    out[i] = Math.sin(phase) * Math.exp(-k * t) * attack * level;
  }
  const c = click({ fc: 3200 + 1200 * bright, level: level * 0.35, bright, seed });
  return mix([{ s: out, at: 0 }, { s: c, at: 0 }]);
}

// Felt mallet on a wooden bar (the dry register): fundamental + one inharmonic partial,
// exponential decay, a 3 ms felt-noise attack, brightness following the cue's height.
function mallet({ f0, t60, level, bright, seed }) {
  const n = Math.ceil((t60 * 1.3 + 0.02) * SR);
  const out = new Float32Array(n);
  const noise = makeNoise(seed);
  const bp = bandpass();
  const k = Math.log(1000) / t60;
  const k2 = k * 3.2;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.exp(-k * t);
    const attack = t < 0.002 ? t / 0.002 : 1;
    const tone = Math.sin(TAU * f0 * t) * env + 0.22 * Math.sin(TAU * f0 * 2.76 * t) * Math.exp(-k2 * t);
    const felt = t < 0.004 ? bp(noise(), f0 * (2.4 + 1.6 * bright), 1.2) * (1 - t / 0.004) * 0.7 : 0;
    out[i] = (tone * 0.85 + felt) * attack * level;
  }
  return out;
}

// Breath through paper: band-passed noise sweeping with the travel direction, peaking on the settle.
function breath({ dur, level, dirSign, bright, seed }) {
  const tail = 0.06;
  const n = Math.ceil((dur + tail) * SR);
  const out = new Float32Array(n);
  const noise = makeNoise(seed);
  const bp = bandpass();
  const lp = onePoleLP();
  const fLo = 500 + 500 * bright, fHi = 1800 + 1200 * bright;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = clamp(t / dur, 0, 1);
    const env = t <= dur ? 0.5 - 0.5 * Math.cos(Math.PI * p) : Math.exp(-(t - dur) / (tail / 4));
    const fc = dirSign >= 0 ? fLo + (fHi - fLo) * p : fHi - (fHi - fLo) * p;
    out[i] = lp(bp(noise(), fc, 2.2), 6000) * env * env * level * 2.4;
  }
  return out;
}

// Low air: an overlay darkening the room. Sub-500 Hz noise swell, no transient.
function air({ dur, level, seed }) {
  const n = Math.ceil((dur + 0.12) * SR);
  const out = new Float32Array(n);
  const noise = makeNoise(seed);
  const lp = onePoleLP();
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = clamp(t / dur, 0, 1);
    const env = t <= dur ? 0.5 - 0.5 * Math.cos(Math.PI * p) : Math.exp(-(t - dur) / 0.04);
    out[i] = lp(noise(), 420) * env * level * 3.5;
  }
  return out;
}

// ---------- derive audio from geometry ----------
const BED_ROOT = sheet.bed?.root ?? 43.1; // F1
function derive(c) {
  const size = Math.sqrt(Math.max(1, (c.w ?? 200) * (c.h ?? 60)));
  let f0 = clamp(5200 * (60 / size) ** 0.75, 450, 5200);
  if (c.kind === "tick") f0 = clamp(f0 * 1.6, 2800, 5200);
  // clicks live in 2.8–5.2 kHz whatever the element: a 20 ms sound has no room for a low fundamental
  let fc = clamp(2600 + 2600 * (60 / size) ** 0.5, 2800, 5200);
  if (c.pitch) { f0 = c.pitch; fc = c.pitch; }
  if (c.semitones) { const r = 2 ** (c.semitones / 12); f0 *= r; fc *= r; }
  let t60 = clamp(0.1 + (size / 460) * 0.5, 0.06, 0.7);
  if (c.kind === "tick") t60 = clamp(0.04 + size / 6000, 0.04, 0.09);
  let level = db(clamp(-13 + 6 * Math.log2(size / 240), -19, -5) + (c.gain ?? 0));
  if (c.kind === "tick") level = db(-16 + (c.gain ?? 0));
  const pan = clamp(((c.x ?? W / 2) / W - 0.5) * 2 * 0.7, -0.7, 0.7);
  const bright = 1 - clamp((c.y ?? H / 2) / H, 0, 1);
  const dirSign = c.dir === "up" || c.dir === "right" ? 1 : -1;
  return { size, f0, fc, t60, level, pan, bright, dirSign };
}

// Expand runs (type / flicker) into individual cues before voicing.
function expand(cues) {
  const out = [];
  for (const c of cues) {
    if (c.kind === "type" || c.kind === "flicker") {
      const n = c.n ?? 1;
      const every = c.every ?? (c.kind === "flicker" ? 7 / FPS : 0.21);
      const noise = makeNoise(seedFor(c.id));
      for (let i = 0; i < n; i++) {
        const jitter = c.kind === "type" ? noise() * 0.008 : 0; // a human hand is not a metronome; a cut is
        out.push({ ...c, id: `${c.id}-${i + 1}`, kind: "click", t: c.t + i * every + jitter, gain: (c.gain ?? -4) + noise() * 1.5, semitones: (c.semitones ?? 0) + (c.step ?? 0) * i, run: c.id });
      }
    } else out.push(c);
  }
  return out;
}

function voice(c) {
  const d = derive(c);
  const seed = seedFor(c.id ?? `${c.kind}@${c.t}`);
  const at = c.t + (c.lag ?? 0.01);
  switch (c.kind) {
    case "click":
      return { samples: click({ fc: d.fc, level: db(-33 + (c.gain ?? 0)), bright: d.bright, seed }), at, pan: d.pan, d, duck: 0 };
    case "thud":
      return { samples: thud({ f0: (c.pitch ?? BED_ROOT * 2) * 2 ** ((c.semitones ?? 0) / 12), level: db(-14 + (c.gain ?? 0)), bright: d.bright, seed }), at, pan: d.pan * 0.4, d, duck: 4 };
    case "land":
    case "tick":
      return { samples: mallet({ f0: d.f0, t60: d.t60, level: d.level, bright: d.bright, seed }), at, pan: d.pan, d, duck: c.kind === "land" ? 3 : 0 };
    case "whoosh":
      return { samples: breath({ dur: c.dur ?? 0.25, level: db(-22 + (c.gain ?? 0)), dirSign: d.dirSign, bright: d.bright, seed }), at: c.t, pan: d.pan, d, duck: 0 };
    case "air":
      return { samples: air({ dur: c.dur ?? 0.2, level: db(-27 + (c.gain ?? 0)), seed }), at: c.t, pan: d.pan, d, duck: 0 };
    case "success": {
      // consonance: a thud on the root, then a click-ping a perfect fifth up, 90 ms later
      const a = thud({ f0: (c.pitch ?? BED_ROOT * 2), level: db(-14 + (c.gain ?? 0)), bright: d.bright, seed });
      const b = click({ fc: d.fc * 1.5, level: db(-26 + (c.gain ?? 0)), bright: d.bright, seed: seed + 1 });
      const b2 = mallet({ f0: BED_ROOT * 8 * 1.5, t60: 0.35, level: db(-22 + (c.gain ?? 0)), bright: d.bright, seed: seed + 2 });
      return { samples: mix([{ s: a, at: 0 }, { s: b, at: 0.09 }, { s: b2, at: 0.09 }]), at, pan: d.pan * 0.4, d, duck: 4 };
    }
    case "error": {
      const a = mallet({ f0: d.f0, t60: Math.min(d.t60, 0.16), level: d.level, bright: d.bright, seed });
      const b = mallet({ f0: d.f0 * 2 ** (1 / 12), t60: Math.min(d.t60, 0.14), level: d.level, bright: d.bright, seed: seed + 1 });
      return { samples: mix([{ s: a, at: 0 }, { s: b, at: 0.05 }]), at, pan: d.pan, d, duck: 2 };
    }
    default:
      throw new Error(`unknown cue kind: ${c.kind}`);
  }
}

// ---------- the bed ----------
// Sub: sines at the root and its octave. Pad: four detuned voices on the root's 4th, 5th, 6th and
// 8th harmonics (F–A–C–F over F1), each with its own slow breath, kept dark by construction.
// A faint pulse at the measured 0.26 s. Dropouts and swells from the sheet; ducking from the hits.
function renderBed(bed, ducks, total) {
  const L = new Float32Array(total), R = new Float32Array(total);
  if (!bed) return { L, R };
  const root = bed.root ?? 43.1;
  const subLvl = db(bed.level ?? -18), padLvl = db(bed.pad ?? -27);
  const tIn = bed.in ?? 0, tOut = bed.out ?? DURATION, fIn = bed.fadeIn ?? 0.5, fOut = bed.fadeOut ?? 0.4;
  const pulseT = bed.pulse ?? 0.26, pulseDepth = bed.pulseDepth ?? 0.12;
  const voices = [4, 5, 6, 8].flatMap((h, i) => [-1, 1].map((s) => ({ f: root * h * (1 + s * 0.0025 * (1 + i * 0.3)), lfo: 0.09 + 0.037 * i, ph: i * 1.3 + (s > 0 ? 0.7 : 0), pan: s * (0.35 - i * 0.05) })));
  const drops = (bed.dropouts ?? []).map((d) => ({ t0: d.t, t1: d.t + (d.dur ?? 0.5), keep: d.keep ?? "none", fade: d.fade ?? 0.05 }));
  const swells = (bed.swells ?? []).map((s) => ({ t0: s.t, t1: s.t + (s.dur ?? 0.3), g: s.db ?? 2 }));
  // gainPoints: [[t, dB], ...] — piecewise-linear level automation, the film's dynamic arc
  const pts = (bed.gainPoints ?? []).slice().sort((a, b) => a[0] - b[0]);
  const auto = (t) => {
    if (!pts.length) return 1;
    if (t <= pts[0][0]) return db(pts[0][1]);
    for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]) { const [t0, g0] = pts[i - 1], [t1, g1] = pts[i]; return db(g0 + (g1 - g0) * (t - t0) / (t1 - t0)); }
    return db(pts[pts.length - 1][1]);
  };
  const gate = (t, t0, t1, fade) => { if (t < t0 - fade || t > t1 + fade) return 1; if (t < t0) return 1 - (t - (t0 - fade)) / fade; if (t > t1) return (t - t1) / fade; return 0; };
  let phSub1 = 0, phSub2 = 0; const ph = voices.map(() => 0);
  for (let i = 0; i < total; i++) {
    const t = i / SR;
    if (t < tIn || t > tOut + fOut) continue;
    let env = t < tIn + fIn ? (t - tIn) / fIn : t > tOut ? Math.max(0, 1 - (t - tOut) / fOut) : 1;
    env = env * env;
    let subGate = 1, padGate = 1;
    for (const d of drops) { const g = gate(t, d.t0, d.t1, d.fade); subGate *= g; if (d.keep !== "pad") padGate *= g; }
    let swell = 1;
    for (const s of swells) if (t >= s.t0 && t <= s.t1) swell *= db(s.g * Math.sin(Math.PI * (t - s.t0) / (s.t1 - s.t0)));
    let duck = 1;
    for (const d of ducks) { const dt = t - d.t; if (dt >= 0 && dt < 0.3) duck *= db(-d.db * (dt < 0.04 ? dt / 0.04 : 1 - (dt - 0.04) / 0.26)); }
    const pulse = 1 - pulseDepth * (0.5 - 0.5 * Math.cos(TAU * t / pulseT));
    phSub1 += TAU * root / SR; phSub2 += TAU * root * 2 / SR;
    const sub = (Math.sin(phSub1) * 0.5 + Math.sin(phSub2) * 0.8) * subLvl * subGate * pulse;
    let pl = 0, pr = 0;
    voices.forEach((v, k) => {
      ph[k] += TAU * v.f / SR;
      const breathe = 0.6 + 0.4 * Math.sin(TAU * v.lfo * t + v.ph);
      const s = Math.sin(ph[k]) * breathe * padLvl * padGate * 0.35;
      const th = (v.pan + 1) * Math.PI / 4; pl += s * Math.cos(th); pr += s * Math.sin(th);
    });
    const g = env * swell * duck * auto(t);
    L[i] = (sub + pl) * g; R[i] = (sub + pr) * g;
  }
  return { L, R };
}

// ---------- render ----------
const total = Math.ceil(DURATION * SR);
const cues = expand(sheet.cues);
const voiced = cues.map((c) => ({ c, v: voice(c) }));
const ducks = voiced.filter(({ v }) => v.duck > 0).map(({ v }) => ({ t: v.at, db: v.duck }));
const bed = renderBed(sheet.bed, ducks, total);
const L = bed.L, R = bed.R;
const report = [];
for (const { c, v } of voiced) {
  const th = (v.pan + 1) * Math.PI / 4;
  const gl = Math.cos(th), gr = Math.sin(th);
  const o = Math.round(v.at * SR);
  let peak = 0;
  for (let i = 0; i < v.samples.length && o + i < total; i++) {
    const s = v.samples[i];
    L[o + i] += s * gl; R[o + i] += s * gr;
    if (Math.abs(s) > peak) peak = Math.abs(s);
  }
  report.push({ id: c.id, kind: c.kind, run: c.run, at: +v.at.toFixed(3), frame: Math.round(v.at * FPS), hz: Math.round(c.kind === "click" ? v.d.fc : c.kind === "thud" || c.kind === "success" ? BED_ROOT * 2 : v.d.f0), ms: Math.round(v.samples.length / SR * 1000), pan: +v.pan.toFixed(2), peakDb: +(20 * Math.log10(peak || 1e-9)).toFixed(1) });
}
let peak = 0;
for (let i = 0; i < total; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const g = peak > 0 ? db(PEAK_DB) / peak : 1;
for (let i = 0; i < total; i++) { L[i] *= g; R[i] *= g; }
writeWav(OUT, [L, R]);

// ---------- the family (mono one-shots from the same voices) ----------
if (FAMILY) {
  mkdirSync(FAMILY, { recursive: true });
  const base = { x: W / 2, y: H / 2, t: 0, lag: 0 };
  const fam = {
    tick: () => voice({ ...base, id: "tick", kind: "click", w: 90, h: 24 }).samples,
    tap: () => mix([{ s: voice({ ...base, id: "tap", kind: "click", w: 400, h: 120 }).samples, at: 0 }, { s: thud({ f0: BED_ROOT * 4, level: db(-20), bright: 0.5, seed: 7 }), at: 0 }]),
    send: () => mix([{ s: voice({ ...base, id: "send-a", kind: "click", w: 300, h: 60 }).samples, at: 0 }, { s: voice({ ...base, id: "send-b", kind: "click", w: 300, h: 60, semitones: 5 }).samples, at: 0.07 }]),
    receive: () => mix([{ s: voice({ ...base, id: "receive-a", kind: "click", w: 300, h: 60, semitones: 3 }).samples, at: 0 }, { s: voice({ ...base, id: "receive-b", kind: "click", w: 300, h: 60, semitones: -2 }).samples, at: 0.08 }]),
    error: () => voice({ ...base, id: "error", kind: "error", w: 320, h: 48 }).samples,
    success: () => voice({ ...base, id: "success", kind: "success", w: 640, h: 120 }).samples,
  };
  const manifest = { material: "dry clicks (3–5 kHz, 20–30 ms) with a low thud on the bed's root; a felt mallet for the two tonal cues", generatedAt: new Date().toISOString(), provider: "sound-sheet", sounds: [] };
  for (const [name, make] of Object.entries(fam)) {
    const s = trimAndNormalize(make(), -3);
    writeWav(join(FAMILY, `${name}.wav`), [s]);
    manifest.sounds.push({ name, file: `${name}.wav`, ms: Math.round(s.length / SR * 1000), peakDbfs: -3 });
  }
  writeFileSync(join(FAMILY, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
}

if (has("--report")) {
  console.log(`stem ${basename(OUT)} · ${DURATION}s · ${report.length} onsets (${sheet.cues.length} cues) · bed ${sheet.bed ? `root ${BED_ROOT} Hz, ${(sheet.bed.dropouts ?? []).length} dropouts` : "none"} · peak ${PEAK_DB} dBFS`);
  console.log("id".padEnd(16), "kind".padEnd(8), "at".padStart(7), "frame".padStart(6), "hz".padStart(6), "ms".padStart(5), "pan".padStart(6), "peak".padStart(6));
  for (const r of report) console.log(String(r.id).padEnd(16), r.kind.padEnd(8), r.at.toFixed(3).padStart(7), String(r.frame).padStart(6), String(r.hz).padStart(6), String(r.ms).padStart(5), r.pan.toFixed(2).padStart(6), (r.peakDb + 20 * Math.log10(g)).toFixed(1).padStart(6));
}
if (has("--json")) writeFileSync(OUT.replace(/\.wav$/, ".report.json"), JSON.stringify({ masterGainDb: +(20 * Math.log10(g)).toFixed(1), onsets: report }, null, 2) + "\n");

// ---------- WAV ----------
function trimAndNormalize(s, peakDb) {
  let end = s.length - 1;
  const floor = 10 ** (-60 / 20);
  while (end > 0 && Math.abs(s[end]) < floor) end--;
  const out = s.slice(0, Math.min(s.length, end + Math.round(0.01 * SR)));
  let p = 0; for (const v of out) p = Math.max(p, Math.abs(v));
  const gg = p > 0 ? db(peakDb) / p : 1;
  for (let i = 0; i < out.length; i++) out[i] *= gg;
  const fade = Math.min(out.length, Math.round(0.005 * SR));
  for (let i = 0; i < fade; i++) out[out.length - 1 - i] *= i / fade;
  return out;
}
function writeWav(path, channels) {
  const ch = channels.length, n = channels[0].length;
  const buf = Buffer.alloc(44 + n * ch * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * ch * 2, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(ch, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * ch * 2, 28); buf.writeUInt16LE(ch * 2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * ch * 2, 40);
  let o = 44;
  for (let i = 0; i < n; i++) for (let c = 0; c < ch; c++) { buf.writeInt16LE(Math.round(clamp(channels[c][i], -1, 1) * 32767), o); o += 2; }
  writeFileSync(path, buf);
}
