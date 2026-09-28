---
name: film-review
description: Measure a launch film (a reference to match, or your own render) at its native frame rate and review it against its register. Returns the launch-video-review rubric table plus a per-film JSON.
---

# Film review

`/film-review <local path or user-supplied URL>`

Spawn or emulate the **launch-film-analyst** subagent (`agents/launch-film-analyst.md`) in judge posture: it measures and reports, and it does not edit the composition.

1. A local file goes straight in. A URL is never downloaded without the user's explicit approval: state the filename, the source and the size, then wait for a yes. Keep the film, its frames and its contact sheets in a scratch directory; never commit or publish them.
2. Load `skills/design-engineering/references/launch-video/launch-video-review.md` and `launch-video-registers.md`, plus `gotchas.md` and `pov.md`.
3. Probe the native fps and never resample. Build contact sheets, read the loudness with ffmpeg's `ebur128`, and recount every cut by eye. `docs/research/launch-films/measure.py` runs only in a repo checkout with numpy and OpenCV; the ffmpeg-only protocol is the default.
4. Return the [[launch-video-review]] rubric as Before | After | Why rows (the measurement, the register's target, the owner node), then the per-film JSON, then at most three lines of notes.

If the user wants to plan a film rather than measure one, route to [[MOC-launch-video]] and stop.
