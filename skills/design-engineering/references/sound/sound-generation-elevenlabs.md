---
title: sound-generation-elevenlabs
summary: Generate a whole sound family on demand with ElevenLabs — material-first prompts, high prompt_influence for functional sounds, short durations, one session per family, then trim and normalize.
tags: [sound, generation, elevenlabs, audio, tooling]
---

# Sound generation with ElevenLabs

For installers with an `ELEVENLABS_API_KEY`, text-to-sound-effects turns a written [[sound-palette]] into files in one pass, and lets you iterate on *words* ("more felt, less glass") instead of on a synth patch. The model is good at materials and bad at abstractions; prompt accordingly.

## The endpoint

`POST https://api.elevenlabs.io/v1/sound-generation` with header `xi-api-key`.

| Field | Range / default | Use for UI sounds |
|---|---|---|
| `text` | required | The material-first prompt below |
| `duration_seconds` | 0.5–30, default auto | **0.5** for ticks and taps; 0.6–1.0 for tones; never auto for UI |
| `prompt_influence` | 0–1, default 0.3 | **0.8+** — functional sounds need literal, low-variance output |
| `loop` | false | Only for ambiences and processing loops |
| `model_id` | `eleven_text_to_sound_v2` | — |
| `output_format` | `mp3_44100_128` default | `pcm_44100` if you will post-process; MP3 otherwise |

Each generation costs 200 credits; the free tier's 10,000 credits a month is roughly fifty sounds — enough to generate a six-sound family three or four times over while you tune the prompts. SDKs: `@elevenlabs/elevenlabs-js` (never the deprecated `elevenlabs` npm package) and `elevenlabs` on PyPI.

## The prompt formula

**Material + action + envelope + mood + frequency hint + purpose.** The model responds to physical descriptions and audio vocabulary (transient, one-shot, dry, muted, no tail), not to UI nouns ("a success sound" produces a stock jingle).

```text
tick     → "single very short tick, fingernail on thin plastic, dry, no tail, bright, one-shot UI feedback"
tap      → "soft muted tap, felt mallet on a small wooden block, dry, clean transient, short body, no reverb"
send     → "two quick rising notes on a muted kalimba, warm, dry, short decay, confirmation"
receive  → "two soft descending notes on a glockenspiel, gentle, dry, short, incoming message"
error    → "short low dull thud with a slight downward pitch, rubber on wood, dry, no tail"
success  → "three ascending mellow marimba notes, major, warm, dry, short decay, completion"
```

Rules that came out of use:

- **Say the material and the *stick*.** "Felt mallet on wood" and "fingernail on plastic" are different sounds; "a click" is a lottery.
- **Say "dry" and "no tail" every time.** The default has room reverb, and reverb is the first thing that breaks [[sound-spec]].
- **Give the contour, not the emotion.** "Two rising notes" beats "happy." "Downward pitch" beats "sad."
- **One session, one material.** Generate the whole family in one sitting with the same material phrase prefixed to every prompt; it is the cheapest way to get sounds that belong together.
- **Ask for 0.5 s and cut.** The model pads short prompts with air; a 0.5 s request trimmed to 80 ms is cleaner than a 0.1 s request.

## After generation

Every file still needs [[sound-spec]]: trim leading silence to zero, high-pass at 150 Hz, peak to −3 dBFS, mono. `scripts/sound-family.mjs` does the trim and peak with ffmpeg when it is installed; the high-pass and the LUFS check are a five-second ffmpeg or DAW step.

## The shipped script

`node scripts/sound-family.mjs family.json --out public/sfx` reads a manifest of `{ material, sounds: { name: { prompt, seconds, synth } } }`, calls ElevenLabs when the key is present (or `--provider synth` to force the offline path from [[sound-generation-open-source]]), writes normalized files and a `manifest.json`. Add `--dry-run` to print the prompts without spending credits.

## When to apply

An installer has the key and the [[sound-decision-framework]] has said yes to at least one sound. Also for launch videos — the same endpoint produces whooshes, risers, and impacts; see [[launch-video-sound]] for those prompts.

## Gotcha

Generated files are not deterministic. Regenerating `tick` next sprint produces a *different* tick, and a family with one re-rolled member sounds patched. Commit the WAVs, record the prompts and settings in the manifest, and regenerate the *whole family* when the material changes.

## Sources

- ElevenLabs API reference, *Create sound effect* — fields, ranges, defaults, output formats.
- ElevenLabs product guide, *Sound effects* — prompt vocabulary (impact, whoosh, one-shot, loop, drone, braam).
- ElevenLabs pricing — 200 credits per generation; 10,000 free credits a month.
- Envato, *UI sound design with AI* — the Action + Material + Mood + Frequency + Purpose formula; prompt-influence bands.
- Related: [[sound-palette]], [[sound-spec]], [[sound-designer]].
