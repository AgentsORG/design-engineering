---
title: sound-playback-web
summary: Unlock the AudioContext on the first gesture, decode once, one source node per play, a persisted mute that is off by default, and never information carried by sound alone.
tags: [sound, web-audio, playback, accessibility, audio]
---

# Sound playback on the web

Browsers block audio until the user has interacted with the page, and they are right to. Build playback around that fact instead of fighting it: create the context lazily, resume it inside the first real gesture, preload and decode every sound before it is needed, and play each one from a fresh source node so latency is effectively zero. Sixty lines, no library — or `use-sound` if you want the hook.

## The pattern

```ts
// sounds.ts — one context, decoded buffers, zero-latency play.
const files = { tick: "/sfx/tick.mp3", send: "/sfx/send.mp3", error: "/sfx/error.mp3" };
type Name = keyof typeof files;

let ctx: AudioContext | null = null;
const buffers = new Map<Name, AudioBuffer>();
let enabled = localStorage.getItem("sound") === "on";   // off by default

async function unlock() {
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") await ctx.resume();     // must run inside a user gesture
  await Promise.all(Object.entries(files).map(async ([name, url]) => {
    if (buffers.has(name as Name)) return;
    const data = await fetch(url).then((r) => r.arrayBuffer());
    buffers.set(name as Name, await ctx!.decodeAudioData(data));
  }));
}
// Unlock on the first pointer or key event, once, before any sound is wanted.
addEventListener("pointerdown", unlock, { once: true });
addEventListener("keydown", unlock, { once: true });

export function play(name: Name, { rate = 1, gain = 1 } = {}) {
  if (!enabled || !ctx || ctx.state !== "running") return;
  const buf = buffers.get(name); if (!buf) return;
  const src = ctx.createBufferSource(); src.buffer = buf; src.playbackRate.value = rate;
  const g = ctx.createGain(); g.gain.value = gain;
  src.connect(g).connect(ctx.destination); src.start();  // new node per play — they are cheap
}

export function setSound(on: boolean) {
  enabled = on; localStorage.setItem("sound", on ? "on" : "off");
  if (on) play("tick");                                   // confirm the toggle with itself
}
```

`AudioBufferSourceNode` is the only web primitive with no start-up latency; `<audio>` elements and `HTMLMediaElement.play()` add tens of milliseconds and fail the sync rule in [[sound-motion-sync]]. If you prefer a hook, `use-sound` (≈1 KB over Howler) exposes `volume`, `playbackRate`, `interrupt`, `soundEnabled`, and `sprite` — the same shape as above.

## The five rules

1. **Off by default, with a toggle the user can find.** A visible control in settings *and* reachable by keyboard; state persisted across sessions. Josh Comeau's rule, and the reason sound on the web is trusted at all.
2. **No sound-only information.** Every sound has a visual twin — the state change, the toast, the shake. Muted users, screen-reader users, and everyone in an open office are the majority.
3. **No autoplay, no sound on page load.** Even after unlock, a sound the user did not cause is a notification, and notifications need permission.
4. **Respect the platform's silence.** On iOS the Ring/Silent switch mutes "nonessential" audio — keyboard clicks, effects, feedback — and your sounds are nonessential. Native: use the `ambient` audio session category so you mix with, and yield to, the user's music. Web: don't fight `document.hidden`; a hidden tab's UI sounds should not play.
5. **Treat the mute toggle as the `prefers-reduced-motion` of audio.** CSS has no audio media query. The closest signals are the user's toggle, OS focus modes on native, and — as a weak hint — `prefers-reduced-motion: reduce`, which correlates with users who want less stimulus. When it is set, default the toggle off *and* skip the onboarding "turn on sound?" prompt.

## Screen readers

Sounds fired on focus or on every list item collide with the reader's own speech. Never attach sound to `focus`, `focusin`, or roving tab-index movement. Confirmation sounds on explicit actions (send, delete) are fine, and should be shorter than the reader's announcement of the same event.

## When to apply

Any PR that adds an audio file or an `AudioContext`. Check for the unlock, the toggle, the visual twin, and the absence of `focus` handlers — [[review-checklist]] rows 12 and 13.

## Gotcha

Calling `new AudioContext()` at module load "works" in Chrome — it just starts suspended and every `play()` silently drops until something resumes it. The symptom is "sound works on the second click." Create and resume inside the gesture, or resume in the handler before playing.

## Sources

- Chrome for Developers, *Autoplay policy* and *Web Audio, autoplay policy and games* — suspended contexts, `resume()` after user activation.
- MDN, Web Audio API — `decodeAudioData`, `AudioBufferSourceNode` semantics.
- Josh Comeau, *use-sound* — mute toggle, persistence, never sound-only, the hook API.
- Apple Human Interface Guidelines, *Playing audio* — silent switch, audio session categories; *Feedback* — provide feedback through color, text, sound, and haptics so people can receive it in the way that works for them.
- Related: [[accessibility-baseline]], [[prefers-reduced-motion]].
