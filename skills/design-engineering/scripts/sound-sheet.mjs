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
// One material for the whole piece (a felt mallet on wood, plus filtered breath for
// travel), no music bed, true silence between events. Deterministic: no Math.random.
//
//   node sound-sheet.mjs cues.json --out stem.wav [--family dir] [--peak -1] [--report]
//
// cues.json:
//   { "canvas": { "w": 1920, "h": 1080 }, "fps": 30, "duration": 12,
//     "cues": [ { "id": "title", "kind": "land", "t": 0.53, "x": 810, "y": 480, "w": 1300, "h": 132 },
//               { "id": "s1-out", "kind": "whoosh", "t": 2.14, "dur": 0.22, "x": 960, "y": 540, "dir": "up" },
//               { "id": "row-1", "kind": "tick", "t": 5.85, "x": 604, "y": 560, "w": 760, "h": 60, "dir": "right" },
//               { "id": "overlay", "kind": "air", "t": 6.4, "dur": 0.2, "x": 1432, "y": 620 } ] }
//
// kinds: land | tick | whoosh | air | success | error. Optional per cue: "pitch" (Hz override),
// "semitones" (offset from the derived pitch), "gain" (dB offset), "lag" (seconds, default 0.01).
//
// --family <dir> also writes the six named one-shots (tick, tap, send, receive, error, success)
// from the same voices, mono, so a product UI and its launch video share one material.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const SR = 44100;
const TAU = Math.PI * 2;

// ---------- CLI ----------
const argv = process.argv.slice(2);
const flag = (name, dflt) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : dflt; };
const has = (name) => argv.includes(name);
const cuesPath = argv.find((a) => !a.startsWith("--") && !argv[argv.indexOf(a) - 1]?.startsWith("--"));
if (!cuesPath || has("--help")) {
  console.log("usage: node sound-sheet.mjs cues.json --out stem.wav [--family dir] [--peak -1] [--report]");
  process.exit(cuesPath ? 0 : 1);
}
const sheet = JSON.parse(readFileSync(cuesPath, "utf8"));
const OUT = flag("--out", "stem.wav");
const FAMILY = flag("--family", null);
const PEAK_DB = Number(flag("--peak", "-1"));
const W = sheet.canvas?.w ?? 1920;
const H = sheet.canvas?.h ?? 1080;
const DURATION = sheet.duration ?? Math.max(...sheet.cues.map((c) => c.t + (c.dur ?? 0))) + 1;

// ---------- deterministic noise ----------
function makeNoise(seed) {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s / 4294967296) * 2 - 1; };
}

// ---------- DSP helpers ----------
const db = (x) => 10 ** (x / 20);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// RBJ biquad band-pass (constant skirt gain), coefficients recomputed per sample so a
// whoosh can sweep. Stable for any centre below Nyquist, unlike the Chamberlin SVF.
function svf() {
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

// ---------- the material ----------
// Felt mallet on a wooden bar: fundamental + one inharmonic partial (wood bar ≈ 2.76×),
// exponential decay, a 3 ms felt-noise attack, and a brightness that follows the cue's height.
function mallet({ f0, t60, level, bright, seed }) {
  const n = Math.ceil((t60 * 1.3 + 0.02) * SR);
  const out = new Float32Array(n);
  const noise = makeNoise(seed);
  const bp = svf();
  const k = Math.log(1000) / t60; // −60 dB at t60
  const k2 = k * 3.2;             // the partial dies faster (felt, not rubber)
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.exp(-k * t);
    const attack = t < 0.002 ? t / 0.002 : 1;
    const tone = Math.sin(TAU * f0 * t) * env + 0.22 * Math.sin(TAU * f0 * 2.76 * t) * Math.exp(-k2 * t);
    // felt contact: a 3 ms burst band-passed around 3×f0, brighter when the element sits higher on screen
    const felt = t < 0.004 ? bp(noise(), f0 * (2.4 + 1.6 * bright), 1.2) * (1 - t / 0.004) * 0.7 : 0;
    out[i] = (tone * 0.85 + felt) * attack * level;
  }
  return out;
}

// Breath through paper: band-passed noise whose centre sweeps with the travel direction and
// whose envelope peaks on the settle (the last sample of the tween), then dies in 60 ms.
function breath({ dur, level, dirSign, bright, seed }) {
  const tail = 0.06;
  const n = Math.ceil((dur + tail) * SR);
  const out = new Float32Array(n);
  const noise = makeNoise(seed);
  const bp = svf();
  const lp = onePoleLP();
  const fLo = 500 + 500 * bright, fHi = 1800 + 1200 * bright;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = clamp(t / dur, 0, 1);
    // rising raised-cosine to the peak, then a short exponential release
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
function derive(c) {
  const size = Math.sqrt(Math.max(1, (c.w ?? 200) * (c.h ?? 60)));
  // 60 px → ~5.2 kHz, 460 px (a headline) → ~1.1 kHz. Small ticks high, big lands low.
  let f0 = clamp(5200 * (60 / size) ** 0.75, 450, 5200);
  if (c.kind === "tick") f0 = clamp(f0 * 1.6, 2800, 5200);
  if (c.pitch) f0 = c.pitch;
  if (c.semitones) f0 *= 2 ** (c.semitones / 12);
  let t60 = clamp(0.1 + (size / 460) * 0.5, 0.06, 0.7);
  if (c.kind === "tick") t60 = clamp(0.04 + size / 6000, 0.04, 0.09);
  // Level: bigger is louder, six dB per doubling, inside a narrow window so nothing shouts.
  let level = db(clamp(-13 + 6 * Math.log2(size / 240), -19, -5) + (c.gain ?? 0));
  if (c.kind === "tick") level = db(-16 + (c.gain ?? 0));
  const pan = clamp(((c.x ?? W / 2) / W - 0.5) * 2 * 0.7, -0.7, 0.7);
  const bright = 1 - clamp((c.y ?? H / 2) / H, 0, 1); // top of frame = 1
  const dirSign = c.dir === "up" || c.dir === "right" ? 1 : -1;
  return { size, f0, t60, level, pan, bright, dirSign };
}

function seedFor(id) { let h = 2166136261; for (const ch of id) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

function voice(c) {
  const d = derive(c);
  const seed = seedFor(c.id ?? `${c.kind}@${c.t}`);
  switch (c.kind) {
    case "land":
    case "tick":
      return { samples: mallet({ f0: d.f0, t60: d.t60, level: d.level, bright: d.bright, seed }), at: c.t + (c.lag ?? 0.01), pan: d.pan, d };
    case "whoosh":
      return { samples: breath({ dur: c.dur ?? 0.25, level: db(-22 + (c.gain ?? 0)), dirSign: d.dirSign, bright: d.bright, seed }), at: c.t, pan: d.pan, d };
    case "air":
      return { samples: air({ dur: c.dur ?? 0.2, level: db(-27 + (c.gain ?? 0)), seed }), at: c.t, pan: d.pan, d };
    case "success": {
      // consonance: the derived note, then a perfect fifth above it, 90 ms later
      const a = mallet({ f0: d.f0, t60: d.t60, level: d.level, bright: d.bright, seed });
      const b = mallet({ f0: d.f0 * 1.5, t60: d.t60 * 0.9, level: d.level * 0.9, bright: d.bright, seed: seed + 1 });
      return { samples: mix([{ s: a, at: 0 }, { s: b, at: 0.09 }]), at: c.t + (c.lag ?? 0.01), pan: d.pan, d };
    }
    case "error": {
      // dissonance: a minor second, both notes damped hard
      const a = mallet({ f0: d.f0, t60: Math.min(d.t60, 0.16), level: d.level, bright: d.bright, seed });
      const b = mallet({ f0: d.f0 * 2 ** (1 / 12), t60: Math.min(d.t60, 0.14), level: d.level, bright: d.bright, seed: seed + 1 });
      return { samples: mix([{ s: a, at: 0 }, { s: b, at: 0.05 }]), at: c.t + (c.lag ?? 0.01), pan: d.pan, d };
    }
    default:
      throw new Error(`unknown cue kind: ${c.kind}`);
  }
}

function mix(parts) {
  const n = Math.max(...parts.map((p) => Math.ceil(p.at * SR) + p.s.length));
  const out = new Float32Array(n);
  for (const p of parts) { const o = Math.round(p.at * SR); for (let i = 0; i < p.s.length; i++) out[o + i] += p.s[i]; }
  return out;
}

// ---------- render the stem ----------
const total = Math.ceil(DURATION * SR);
const L = new Float32Array(total), R = new Float32Array(total);
const report = [];
for (const c of sheet.cues) {
  const v = voice(c);
  const th = (v.pan + 1) * Math.PI / 4; // constant-power pan law
  const gl = Math.cos(th), gr = Math.sin(th);
  const o = Math.round(v.at * SR);
  let peak = 0;
  for (let i = 0; i < v.samples.length && o + i < total; i++) {
    const s = v.samples[i];
    L[o + i] += s * gl; R[o + i] += s * gr;
    if (Math.abs(s) > peak) peak = Math.abs(s);
  }
  report.push({ id: c.id, kind: c.kind, at: +v.at.toFixed(3), frame: Math.round(v.at * (sheet.fps ?? 30)), hz: Math.round(v.d.f0), ms: Math.round(v.samples.length / SR * 1000), pan: +v.pan.toFixed(2), peakDb: +(20 * Math.log10(peak || 1e-9)).toFixed(1) });
}
// master: peak-normalize to --peak dBFS (default −1 dBFS, the social-video true-peak ceiling)
let peak = 0;
for (let i = 0; i < total; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const g = peak > 0 ? db(PEAK_DB) / peak : 1;
for (let i = 0; i < total; i++) { L[i] *= g; R[i] *= g; }
writeWav(OUT, [L, R]);

// ---------- the family (mono one-shots from the same voices) ----------
if (FAMILY) {
  mkdirSync(FAMILY, { recursive: true });
  const base = { x: W / 2, y: H / 2 };
  const fam = {
    tick: { kind: "tick", w: 120, h: 24 },
    tap: { kind: "land", w: 160, h: 44 },
    send: { kind: "success", w: 320, h: 48, semitones: 0 },
    receive: { kind: "land", w: 420, h: 64, semitones: -5 },
    error: { kind: "error", w: 320, h: 48 },
    success: { kind: "success", w: 640, h: 120 },
  };
  const manifest = { material: "felt mallet on a wooden bar, breath through paper for travel", generatedAt: new Date().toISOString(), provider: "sound-sheet", sounds: [] };
  for (const [name, spec] of Object.entries(fam)) {
    const v = voice({ id: name, t: 0, lag: 0, ...base, ...spec });
    const s = trimAndNormalize(v.samples, -3);
    writeWav(join(FAMILY, `${name}.wav`), [s]);
    manifest.sounds.push({ name, file: `${name}.wav`, ms: Math.round(s.length / SR * 1000), hz: Math.round(v.d.f0), peakDbfs: -3 });
  }
  writeFileSync(join(FAMILY, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
}

if (has("--report")) {
  console.log(`stem ${basename(OUT)} · ${DURATION}s · ${report.length} cues · peak ${PEAK_DB} dBFS`);
  console.log("id".padEnd(12), "kind".padEnd(8), "at".padStart(7), "frame".padStart(6), "hz".padStart(6), "ms".padStart(5), "pan".padStart(6), "peak".padStart(6));
  for (const r of report) console.log(String(r.id).padEnd(12), r.kind.padEnd(8), r.at.toFixed(3).padStart(7), String(r.frame).padStart(6), String(r.hz).padStart(6), String(r.ms).padStart(5), r.pan.toFixed(2).padStart(6), (r.peakDb + (20 * Math.log10(g))).toFixed(1).padStart(6));
}
if (has("--json")) writeFileSync(OUT.replace(/\.wav$/, ".cues.report.json"), JSON.stringify(report, null, 2) + "\n");

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
