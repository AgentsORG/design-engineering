---
title: sound-generation-open-source
summary: No API key needed — open-weight text-to-audio that runs on a CPU, procedural synthesis in under a kilobyte, and CC0 libraries you can ship commercially. A decision table for which path.
tags: [sound, generation, open-source, synthesis, cc0, audio]
---

# Sound generation without a key

Three open paths, each right for a different job. Pick by *what you need the sound to be*, not by what is installed.

| You need… | Path | Cost |
|---|---|---|
| A bespoke material that matches the brand | **Open-weight model** — Stable Audio 3 Small-SFX | A few minutes of CPU per family |
| Sounds now, zero assets, tweakable in code | **Procedural synth** — Web Audio or ZzFX | 0 bytes of audio, < 1 KB of JS |
| Safe, decent, shipping today | **CC0 library** — Kenney, soundcn, Freesound | One command |

## Open-weight models

- **Stable Audio 3 Small-SFX** (`stabilityai/stable-audio-3-small-sfx`, ~460 M parameters) — Stability's dedicated sound-effects model, sized for CPU inference, up to two minutes per clip. Stability AI Community License: free for research and commercial use under US $1 M annual revenue; above that, an enterprise license. The right default in 2026.
- **Stable Audio Open Small** (`stabilityai/stable-audio-open-small`, ~340 M) — the earlier 11-second model, Arm-optimized; generates ten seconds of audio in about seven seconds on a phone-class CPU. Same license.
- **Meta AudioGen** (AudioCraft) — code is MIT, but the weights are CC BY-NC 4.0. Fine for a prototype, not for a shipped product.

```python
from stable_audio_tools import get_pretrained_model
from stable_audio_tools.inference.generation import generate_diffusion_cond
model, cfg = get_pretrained_model("stabilityai/stable-audio-3-small-sfx")
audio = generate_diffusion_cond(model, steps=8, device="cpu",
    conditioning=[{"prompt": "single very short tick, fingernail on thin plastic, dry, no tail",
                   "seconds_total": 1}])
```

Prompt exactly as in [[sound-generation-elevenlabs]] — material first, "dry, no tail" always — then post-process per [[sound-spec]].

## Procedural synthesis

For ticks, taps, pops, and two-note tones, a synthesizer beats any model: the sound is deterministic, weighs nothing, and its pitch and length are *parameters* you can tie to the UI (a taller card, a lower thud). `scripts/sound-family.mjs --provider synth` ships six archetypes — `tick`, `tap`, `chime`, `thud`, `pop`, `whoosh` — and writes WAVs from the same manifest the ElevenLabs path uses, so a team without a key gets a coherent family, not silence.

In the browser, the same idea in eight lines is often enough:

```ts
// A tick: 60 ms of high sine with an exponential decay. No file, no fetch.
function tick(ctx: AudioContext, freq = 2400, ms = 60) {
  const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.5, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + ms / 1000);
  o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + ms / 1000);
}
```

**ZzFX** (MIT, under 1 KB) is the mature version of that idea — twenty parameters covering waveform, envelope, pitch sweep, modulation, and filter — with a visual designer that exports one-liners. Its idiom is 8-bit; tame the square waves and shorten everything for product UI. **jsfxr** is the browser port of the classic sfxr and lives in the same register.

## CC0 libraries

- **Kenney** — *Interface Sounds* (100 files) and *UI Audio* (50 files), CC0, the most-used free UI sets in existence. Which is also the problem: they are recognizable. Use them as a starting family and re-pitch or layer, don't ship them raw.
- **soundcn** — 700+ short sounds packaged for the shadcn CLI: `npx shadcn add @soundcn/click-soft` drops a base64-inlined TypeScript module and a `useSound` hook into your repo. Mostly Kenney-derived CC0; skip its World of Warcraft pack, which is non-commercial.
- **Freesound** — APIv2 with `filter=license:"Creative Commons 0"`; token auth for search, OAuth2 for download. The largest pool and the most uneven; budget time to audition.

Whatever the source, the [[sound-palette]] rule still applies: one material. A CC0 grab-bag is the audio version of the Lucide-icon tell in [[ai-default-tells]].

## When to apply

Any time an installer wants sound and has no ElevenLabs key — or has one and wants deterministic, parameter-driven sounds. `sound-family.mjs` chooses automatically: key present → ElevenLabs, absent → synth.

## Gotcha

"Open source" and "commercial use" are not the same claim. AudioGen weights are non-commercial; Stability's license flips at US $1 M revenue; soundcn mixes CC0 with a proprietary pack. Record the license next to every file in the manifest, and re-check it before a launch.

## Sources

- Stability AI — Stable Audio 3 family (May 2026), Stable Audio Open Small model card, Community License terms.
- Arm, *Running Stable Audio Open Small with KleidiAI* — on-device timing.
- Meta, AudioCraft repository — MIT code, CC BY-NC 4.0 weights.
- KilledByAPixel, *ZzFX* — parameters, size, license; chr15m, *jsfxr*.
- Kenney — Interface Sounds and UI Audio packs (CC0); kapishdima, *soundcn*; Freesound APIv2 docs.
- Related: [[sound-generation-elevenlabs]], [[sound-playback-web]], [[dependency-discipline]].
