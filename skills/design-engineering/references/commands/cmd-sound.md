---
title: cmd-sound
summary: "/design-engineering sound [target]" — decide which moments earn a sound, design one material family, generate the files (ElevenLabs if keyed, offline synth or CC0 if not), wire them in, and return a sound map.
tags: [command, sound, decide, build]
---

# /design-engineering sound

**Posture: decide, then build.** If the user only asked *whether* something should make a sound, answer from [[sound-decision-framework]] in one line and stop.

## Product UI

1. Read [[sound-decision-framework]], [[sound-palette]], [[sound-spec]], [[sound-playback-web]], [[gotchas]] and [[pov]]. A POV that raises the sound floor wins.
2. Classify every proposed moment and reject most of them: the hundredth use has to pass, not only the first.
3. Write the surviving family as a manifest shaped like `scripts/sound-family.example.json`. Run `node scripts/sound-family.mjs <manifest> --out <dir>`, with `--dry-run` first if credits matter. It uses ElevenLabs when `ELEVENLABS_API_KEY` is set and the offline synthesizer otherwise ([[sound-generation-elevenlabs]], [[sound-generation-open-source]]).
4. Wire it up: the mute toggle defaults to off, audio unlocks on the first gesture, and each transient lands on the contact frame ([[sound-motion-sync]]).

## A video

Pick the register first ([[launch-video-sound]]).

- A derived register (a dry reveal, a bed with clicks, or product-camera foley): write a cue sheet from the locked timeline ([[sound-from-motion]]), then run `node scripts/sound-sheet.mjs cues.json --out stem.wav --report`.
- A beat track or a voice-over: place it per [[launch-video-music]].
- Designed effects follow [[designed-sfx-anatomy]], and every recording passes [[sound-licensing]].

## Output

A sound map table (Moment | Sound | Material / contour | Length | Trigger | Why), then the file list and the playback wiring.

You may delegate to the `sound-designer` subagent where the host has it.
