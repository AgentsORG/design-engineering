#!/usr/bin/env node
// sound-family.mjs — turn one sound-family manifest into a normalized set of files.
//
//   node scripts/sound-family.mjs family.json [--out public/sfx] [--provider auto|elevenlabs|synth]
//                                             [--dry-run] [--influence 0.8]
//
// Provider "auto" (default) uses ElevenLabs when ELEVENLABS_API_KEY is set and the
// dependency-free synthesizer below when it is not. Every output is mono 44.1 kHz,
// trimmed to zero leading silence, peaked at -3 dBFS. ElevenLabs post-processing
// needs ffmpeg on PATH; without it the raw MP3 is kept and flagged in manifest.json.
//
// Manifest shape (see sound-family.example.json):
//   {
//     "material": "felt mallet on a small wooden block, dry, no tail",
//     "sounds": {
//       "tick": { "prompt": "single very short tick", "seconds": 0.5, "synth": { "type": "tick" } },
//       "send": { "prompt": "two quick rising notes", "seconds": 0.8,
//                 "synth": { "type": "chime", "notes": [523.25, 659.25], "decay": 0.18 } }
//     }
//   }
// The `material` phrase is prefixed to every prompt so the family shares one character
// (references/sound/sound-palette.md). `synth` is the offline recipe for the same sound.

import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { basename, join, resolve } from "node:path";

const SR = 44100;
const PEAK = 10 ** (-3 / 20); // -3 dBFS

// ---------------------------------------------------------------- CLI
const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const manifestPath = args.find((a) => !a.startsWith("--") && a.endsWith(".json"));
if (!manifestPath) {
  console.error("usage: node sound-family.mjs family.json [--out dir] [--provider auto|elevenlabs|synth] [--dry-run]");
  process.exit(1);
}
const outDir = resolve(flag("--out", "sfx"));
const dryRun = args.includes("--dry-run");
const influence = Number(flag("--influence", "0.8"));
const apiKey = process.env.ELEVENLABS_API_KEY;
let provider = flag("--provider", "auto");
if (provider === "auto") provider = apiKey ? "elevenlabs" : "synth";
if (provider === "elevenlabs" && !apiKey && !dryRun) {
  console.error("ELEVENLABS_API_KEY is not set. Use --provider synth, or export the key.");
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const material = (manifest.material ?? "").trim();
const sounds = Object.entries(manifest.sounds ?? {});
if (!sounds.length) { console.error("manifest has no sounds"); process.exit(1); }
mkdirSync(outDir, { recursive: true });

// ---------------------------------------------------------------- WAV I/O
function writeWav(path, samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.max(-1, Math.min(1, samples[i])) * 32767, 44 + i * 2);
  writeFileSync(path, buf);
}

function finalize(samples) {
  // Trim leading silence (below -60 dBFS), fade the last 10 ms, peak to -3 dBFS.
  const floor = 10 ** (-60 / 20);
  let start = 0;
  while (start < samples.length && Math.abs(samples[start]) < floor) start++;
  // Trim the tail too: everything after the last sample above -45 dBFS is inaudible ring.
  const tailFloor = 10 ** (-45 / 20);
  let end = samples.length;
  while (end > start && Math.abs(samples[end - 1]) < tailFloor) end--;
  let out = samples.subarray(start, Math.min(samples.length, end + Math.floor(SR * 0.01)));
  const fade = Math.min(Math.floor(SR * 0.01), out.length);
  for (let i = 0; i < fade; i++) out[out.length - 1 - i] *= i / fade;
  let peak = 0;
  for (const s of out) peak = Math.max(peak, Math.abs(s));
  if (peak > 0) for (let i = 0; i < out.length; i++) out[i] *= PEAK / peak;
  return out;
}

// ---------------------------------------------------------------- synth archetypes
// Each returns Float32Array at 44.1 kHz. Times in seconds. Designed to sit inside
// references/sound/sound-spec.md: mid-range bodies, short decays, no low rumble.
const rnd = () => Math.random() * 2 - 1;
const secs = (s) => Math.max(1, Math.floor(s * SR));

const archetypes = {
  // Fingernail-on-plastic: a burst of noise plus a short high sine body.
  tick({ freq = 3200, seconds = 0.07 }) {
    const n = secs(seconds), out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      out[i] = rnd() * Math.exp(-t / 0.004) * 0.6 + Math.sin(2 * Math.PI * freq * t) * Math.exp(-t / 0.018);
    }
    return out;
  },
  // Felt mallet on wood: lower body, slightly longer, softer transient.
  tap({ freq = 1400, seconds = 0.12 }) {
    const n = secs(seconds), out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const body = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t / 0.03)
        + 0.3 * Math.sin(2 * Math.PI * freq * 2.4 * t) * Math.exp(-t / 0.012);
      out[i] = rnd() * Math.exp(-t / 0.003) * 0.35 + body;
    }
    return out;
  },
  // Muted bar instrument: notes with a soft partial, staggered so contour reads.
  chime({ notes = [523.25, 659.25], decay = 0.18, stagger = 0.07, seconds }) {
    // Length is the last note's onset plus 2.5 decays; a raised-cosine fade over the
    // final quarter hides the cut so the sound reads as short, not clipped.
    const total = seconds ?? stagger * (notes.length - 1) + decay * 2.5;
    const n = secs(total), out = new Float32Array(n);
    notes.forEach((f, k) => {
      const off = Math.floor(k * stagger * SR);
      for (let i = off; i < n; i++) {
        const t = (i - off) / SR;
        const env = Math.min(1, t / 0.003) * Math.exp(-t / decay);
        out[i] += (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(2 * Math.PI * f * 3.01 * t) * Math.exp(-t / (decay * 0.4))) * env * 0.7;
      }
    });
    const fadeFrom = Math.floor(n * 0.75);
    for (let i = fadeFrom; i < n; i++) out[i] *= 0.5 * (1 + Math.cos(Math.PI * (i - fadeFrom) / (n - fadeFrom)));
    return out;
  },
  // Rubber on wood, pitch falling: the error / dismiss shape.
  thud({ from = 220, to = 140, seconds = 0.16 }) {
    const n = secs(seconds), out = new Float32Array(n);
    let phase = 0;
    for (let i = 0; i < n; i++) {
      const t = i / SR, p = t / seconds;
      const f = from + (to - from) * Math.min(1, p * 2.5);
      phase += (2 * Math.PI * f) / SR;
      out[i] = Math.sin(phase) * Math.exp(-t / 0.05) + rnd() * Math.exp(-t / 0.004) * 0.25;
    }
    return out;
  },
  // A downward sine sweep with a fast decay: select / drop.
  pop({ from = 900, to = 320, seconds = 0.06 }) {
    const n = secs(seconds), out = new Float32Array(n);
    let phase = 0;
    for (let i = 0; i < n; i++) {
      const t = i / SR, p = i / n;
      phase += (2 * Math.PI * (from + (to - from) * p)) / SR;
      out[i] = Math.sin(phase) * Math.exp(-t / 0.02);
    }
    return out;
  },
  // Filtered breath: noise through a one-pole low-pass whose cutoff and level peak on the settle.
  whoosh({ seconds = 0.4, peakAt = 0.75, cutoff = 2500 }) {
    const n = secs(seconds), out = new Float32Array(n);
    let y = 0;
    for (let i = 0; i < n; i++) {
      const p = i / n;
      const env = p < peakAt ? (p / peakAt) ** 2 : ((1 - p) / (1 - peakAt)) ** 1.5;
      const fc = 300 + cutoff * env;
      const a = 1 - Math.exp((-2 * Math.PI * fc) / SR);
      y += a * (rnd() - y);
      out[i] = y * env * 3;
    }
    return out;
  },
};

function synthesize(name, spec) {
  const recipe = spec.synth ?? { type: "tick" };
  const fn = archetypes[recipe.type];
  if (!fn) throw new Error(`${name}: unknown synth type "${recipe.type}" (have ${Object.keys(archetypes).join(", ")})`);
  // `spec.seconds` is the ElevenLabs request length; the synth recipe carries its own.
  return finalize(fn({ ...recipe }));
}

// ---------------------------------------------------------------- ElevenLabs
const ffmpeg = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status === 0;

async function generateEleven(name, spec) {
  const text = material ? `${material}. ${spec.prompt}` : spec.prompt;
  const body = {
    text,
    model_id: "eleven_text_to_sound_v2",
    duration_seconds: spec.seconds ?? 0.5,
    prompt_influence: spec.influence ?? influence,
    loop: Boolean(spec.loop),
  };
  const res = await fetch("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${name}: ElevenLabs ${res.status} ${await res.text()}`);
  const mp3 = join(outDir, `${name}.mp3`);
  writeFileSync(mp3, Buffer.from(await res.arrayBuffer()));
  if (!ffmpeg) return { file: basename(mp3), processed: false, prompt: text };

  // Two-pass: measure peak, then trim leading silence, high-pass, and normalize to -3 dBFS.
  const probe = spawnSync("ffmpeg", ["-i", mp3, "-af", "volumedetect", "-f", "null", "-"], { encoding: "utf8" });
  const max = Number(/max_volume:\s*(-?[\d.]+) dB/.exec(probe.stderr)?.[1] ?? 0);
  const wav = join(outDir, `${name}.wav`);
  const af = `silenceremove=start_periods=1:start_threshold=-50dB,highpass=f=150,volume=${(-3 - max).toFixed(2)}dB,afade=t=out:st=0:d=0.01:curve=tri`;
  const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", mp3, "-af", af, "-ac", "1", "-ar", String(SR), wav]);
  if (r.status !== 0) return { file: basename(mp3), processed: false, prompt: text };
  unlinkSync(mp3);
  return { file: basename(wav), processed: true, prompt: text };
}

// ---------------------------------------------------------------- run
const results = [];
for (const [name, spec] of sounds) {
  if (dryRun) {
    const text = material ? `${material}. ${spec.prompt}` : spec.prompt;
    results.push({ name, provider, prompt: text, seconds: spec.seconds ?? 0.5, synth: spec.synth?.type ?? "tick" });
    continue;
  }
  if (provider === "elevenlabs") {
    const r = await generateEleven(name, spec);
    results.push({ name, provider, ...r, seconds: spec.seconds ?? 0.5, license: "ElevenLabs — per your plan's commercial terms" });
  } else {
    const samples = synthesize(name, spec);
    const file = `${name}.wav`;
    writeWav(join(outDir, file), samples);
    results.push({ name, provider, file, processed: true, seconds: +(samples.length / SR).toFixed(3), synth: spec.synth ?? { type: "tick" }, license: "generated locally — no third-party rights" });
  }
  console.log(`${provider.padEnd(10)} ${name.padEnd(12)} ${results.at(-1).file ?? ""}`);
}

if (dryRun) {
  console.table(results);
} else {
  writeFileSync(join(outDir, "manifest.json"), JSON.stringify({ material, generatedAt: new Date().toISOString(), provider, sounds: results }, null, 2) + "\n");
  console.log(`\n${results.length} sound(s) → ${outDir}\nmanifest.json records prompts, recipes, and licenses. Check LUFS per references/sound/sound-spec.md.`);
  if (provider === "elevenlabs" && !ffmpeg) console.log("ffmpeg not found: MP3s kept unprocessed. Install ffmpeg and rerun to trim and normalize.");
}
