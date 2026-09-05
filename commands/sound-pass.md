---
name: sound-pass
description: Decide which moments earn a sound, design one material family, generate the files (ElevenLabs if keyed, synth or CC0 if not), and wire them in — returns a sound map table.
---

# Sound pass

Spawn or emulate the **sound-designer** subagent (`agents/sound-designer.md`).

1. Load `skills/design-engineering/references/sound/sound-decision-framework.md`, `sound-palette.md`, `sound-spec.md`, and `sound-playback-web.md` — or `launch-video-sound.md` if the surface is a video.
2. Load `gotchas.md` and `pov.md`; a POV that raises the sound floor wins.
3. Classify every proposed moment; reject most. Write the surviving family as a manifest shaped like `skills/design-engineering/scripts/sound-family.example.json`.
4. Run `node skills/design-engineering/scripts/sound-family.mjs <manifest> --out <dir>` (`--dry-run` first if credits matter). It picks ElevenLabs when `ELEVENLABS_API_KEY` is set and the offline synthesizer otherwise.
5. Return the sound map table (Moment | Sound | Material / contour | Length | Trigger | Why), the file list, and the playback wiring — mute toggle off by default, unlock on first gesture, transient on the contact frame.

If the user only asked whether something *should* make a sound, answer from `sound-decision-framework.md` in one line and stop.
