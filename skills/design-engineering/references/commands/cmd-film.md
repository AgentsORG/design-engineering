---
title: cmd-film
summary: "/design-engineering film [plan | review | formats] [target]" — plan a launch film from its register, or measure a render or reference at native frame rate and review it against that register.
tags: [command, launch-video, film]
---

# /design-engineering film

The second word picks the job. Without one, a video file or URL means `review`; anything else means `plan`.

## film plan

**Posture: decide, then build.** Follow [[MOC-launch-video]]'s decision flow in order. Name the register first ([[launch-video-registers]]), then [[launch-video-structure]], [[launch-video-type]], [[launch-video-ui-demo]], [[launch-video-motion]], [[launch-video-seams]] / [[launch-video-cuts]], and the sound ([[launch-video-sound]]). [[skill-router]] §5 names the build engine: HyperFrames by default, cinetic for Remotion ([[cinetic-reconciliation]]), and scenario-kinetic-film for a beat-cut type teaser ([[scenario-kinetic-reconciliation]]). Any film rendered from code follows [[film-as-function-of-time]].

## film review

**Posture: judge.** Measure and report; never edit the composition.

1. A local file goes straight in. A URL is never downloaded without the user's explicit yes: state the filename, the source and the size, then wait. Keep frames and contact sheets in a scratch directory, and never commit or publish them.
2. Read [[launch-video-review]], [[launch-video-registers]], [[gotchas]] and [[pov]].
3. Probe the native fps and never resample. Build contact sheets, read the loudness with ffmpeg's `ebur128`, and recount every cut by eye.
4. Return the rubric as [[review-format]] rows (the measurement, the register's target, the owner node), then the per-film JSON, then at most three lines of notes.

You may delegate to the `launch-film-analyst` subagent where the host has it.

## film formats

A loop, a logo sting, or a 9:16, 1:1 or 4:5 cut → [[launch-video-formats]].
