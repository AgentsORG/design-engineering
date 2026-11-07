# Confirmation sound on message send, with a settings toggle

A tiny, dependency-free sound engine (Web Audio, procedurally synthesized — no audio asset to fetch), an accessible settings switch, and the wiring into a chat composer's send action.

## 1. `lib/chat-sound.ts` — the sound engine

One sound in the family for now (`send`), off by default, persisted, unlocked on the first real user gesture, and killed on `prefers-reduced-motion` unless the user has explicitly opted in.

```ts
// lib/chat-sound.ts
//
// A minimal, dependency-free sound engine for one earcon: `send`.
// Synthesized procedurally (two-oscillator rising figure, dry, no tail) so
// there is no audio asset to fetch, host, or version — see
// sound-generation-open-source. Swap `synthSend()` for a decoded file from
// sound-generation-elevenlabs later without touching call sites; `play()`
// is the only public surface.

const STORAGE_KEY = "chat:sound";

let ctx: AudioContext | null = null;
let unlocked = false;
let enabled = readStoredPreference();

function readStoredPreference(): boolean {
  try {
    // Off by default. A user who has asked the OS for less motion is a user
    // who wants less stimulus generally — don't default them into sound
    // either. See sound-playback-web rule 5.
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      return prefersReducedMotion ? false : false; // default is off regardless; kept explicit for clarity
    }
    return stored === "on";
  } catch {
    return false; // localStorage unavailable (private mode, SSR) → silent
  }
}

/**
 * Must run inside a real user gesture (pointerdown/keydown). Creating an
 * AudioContext at module load leaves it suspended and silently drops the
 * first play() call — see the 2026-09-05 gotcha in gotchas.md.
 */
async function unlock(): Promise<void> {
  if (unlocked) return;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") await ctx.resume();
  unlocked = true;
}

if (typeof window !== "undefined") {
  addEventListener("pointerdown", unlock, { once: true });
  addEventListener("keydown", unlock, { once: true });
}

/**
 * `send`: two quick rising notes, major third apart (consonant = confirmation,
 * per sound-palette), dry, no tail, ~190ms total — inside the 150–250ms band
 * for send/save/confirm in sound-spec. Mono, high-passed implicitly by the
 * oscillator's own range (no content below 500Hz to trim).
 */
function synthSend(context: AudioContext, startAt: number): void {
  const notes = [
    { freq: 587.33, at: 0, dur: 0.09, gain: 0.22 },   // D5
    { freq: 739.99, at: 0.055, dur: 0.14, gain: 0.26 }, // F#5 — major third up
  ];
  for (const note of notes) {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.value = note.freq;

    const t0 = startAt + note.at;
    const t1 = t0 + note.dur;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(note.gain, t0 + 0.012); // fast attack, no click
    gain.gain.exponentialRampToValueAtTime(0.0001, t1); // decay to silence, no tail

    osc.connect(gain).connect(context.destination);
    osc.start(t0);
    osc.stop(t1 + 0.01);
  }
}

/**
 * Fire-and-forget. Silent no-op if sound is off, unlocked, or the tab is
 * hidden (a hidden tab's UI sounds should not play — sound-playback-web).
 */
export function playSend(): void {
  if (!enabled || !unlocked || !ctx || ctx.state !== "running") return;
  if (document.hidden) return;
  synthSend(ctx, ctx.currentTime);
}

export function isSoundEnabled(): boolean {
  return enabled;
}

export function setSoundEnabled(on: boolean): void {
  enabled = on;
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* private mode — preference just won't survive reload */
  }
  // Confirm the toggle with itself, same as flipping any switch that makes
  // sound — but only if the context is already unlocked (this click did that).
  if (on) {
    unlock().then(() => playSend());
  }
}
```

## 2. `components/SoundToggle.tsx` — the settings switch

A real `role="switch"`, keyboard-operable via native `<button>` semantics, 44px hit area on a visually smaller track, `:focus-visible` ring (not `:focus`), and a state that is legible without the sound (label text changes, thumb position, track color) — never sound-only information.

```tsx
// components/SoundToggle.tsx
import { useEffect, useState } from "react";
import { isSoundEnabled, setSoundEnabled } from "../lib/chat-sound";
import styles from "./SoundToggle.module.css";

export function SoundToggle() {
  // Read the persisted value after mount only — avoids a hydration
  // mismatch between server (no localStorage) and client.
  const [on, setOn] = useState(false);
  useEffect(() => setOn(isSoundEnabled()), []);

  function toggle() {
    const next = !on;
    setOn(next);
    setSoundEnabled(next);
  }

  return (
    <div className={styles.row}>
      <label id="sound-toggle-label" className={styles.label} htmlFor="sound-toggle">
        Sound
        <span className={styles.hint}>Play a tone when your message sends</span>
      </label>
      <button
        id="sound-toggle"
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby="sound-toggle-label"
        className={styles.track}
        data-on={on}
        onClick={toggle}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
}
```

```css
/* components/SoundToggle.module.css */
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 4px;
}

.label {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font: 700 15px/1.3 Nunito, system-ui, sans-serif; /* body face, per pov.md */
  color: #4b4b4b; /* Eel */
}

.hint {
  font: 400 13px/1.4 Nunito, system-ui, sans-serif;
  color: #777777; /* Wolf */
}

/* Track: pill, 44px tall hit area (the visible track is smaller, padding
   does the rest — touch-and-focus rule 2), 2px lip like every other
   pickable surface in pov.md's button construction, just flatter. */
.track {
  position: relative;
  width: 52px;
  height: 32px;
  padding: 12px 10px; /* grows the click/tap target past the visible 32px */
  margin: -12px -10px; /* claw the layout space back */
  border: none;
  border-radius: 9999px;
  background: #e5e5e5; /* Swan — off */
  box-shadow: inset 0 0 0 2px #d9d9d9;
  cursor: pointer;
  transition: background-color 160ms cubic-bezier(0.25, 1, 0.5, 1); /* --ease-out-quart, duration-table */
}

.track[data-on="true"] {
  background: #58cc02; /* Feather Green — on */
  box-shadow: inset 0 0 0 2px #58a700; /* Tree Frog lip, 2px per pov.md pickable-surface rule */
}

.track:focus-visible {
  outline: none;
  box-shadow:
    inset 0 0 0 2px #58a700,
    0 0 0 2px #fff,
    0 0 0 4px #1cb0f6; /* Macaw focus ring, accessibility-baseline */
}

.thumb {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transform: translate(0, -50%);
  transition: transform 160ms cubic-bezier(0.25, 1, 0.5, 1);
}

.track[data-on="true"] .thumb {
  transform: translate(20px, -50%);
}

@media (prefers-reduced-motion: reduce) {
  .track,
  .thumb {
    transition: none; /* keep the color/position change, drop the animation */
  }
}
```

## 3. Wiring it into the chat composer

The sound fires from the same event that starts the send, immediately — a send confirmation is not tied to a settling spring, so there is no `transitionend` to wait for. It never carries information alone: the message already lands visually in the thread.

```tsx
// components/ChatComposer.tsx
import { useState } from "react";
import { playSend } from "../lib/chat-sound";

interface ChatComposerProps {
  onSend: (text: string) => Promise<void> | void;
}

export function ChatComposer({ onSend }: ChatComposerProps) {
  const [value, setValue] = useState("");

  async function handleSend() {
    const text = value.trim();
    if (!text) return;

    setValue(""); // optimistic clear — the visual confirmation
    await onSend(text);
    playSend(); // confirmation tone; no-op if sound is off or context is locked
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message"
        rows={1}
      />
      <button type="button" onClick={handleSend} disabled={!value.trim()}>
        Send
      </button>
    </div>
  );
}
```

Drop `<SoundToggle />` into the existing settings panel/list — it needs no extra plumbing beyond `lib/chat-sound.ts`.

## Rationale

`sound-decision-framework` gates the feature before any code: "message sent" is the canonical daily-moment exception (one short tone, ≤250ms, opt-in), so this earns a sound where a button press or keystroke would not. `sound-palette` and `sound-spec` shape the actual tone — one material (a rising sine pair, major third apart per the consonance-means-success rule), 150–250ms, dry, no tail, trimmed to zero leading silence. `sound-motion-sync` decides *when* it fires: on the same event that starts the send, not delayed to a spring settle that doesn't exist here. `sound-playback-web` supplies the engine shape end to end — lazy `AudioContext`, unlock inside the first real gesture (the 2026-09-05 gotcha about a module-load `AudioContext` silently dropping the first play is exactly why unlock is gated on `pointerdown`/`keydown`), off-by-default with a persisted toggle, a hidden-tab guard, and the reduced-motion hint feeding the default rather than a hard block. `sound-generation-open-source` justifies synthesizing the tone procedurally instead of shipping an audio file, keeping the feature dependency-free (`dependency-discipline`). The toggle itself follows `accessibility-baseline` and `touch-and-focus` (`role="switch"`, `aria-checked`, `:focus-visible` not `:focus`, a 44px hit area grown by padding around a smaller visible track, state legible without sound) and is styled on `pov.md`'s Duolingo fork — Feather Green/Tree Frog for the "on" state, Nunito body face, the 2px lip construction pov.md prescribes for pickable surfaces — with `duration-table` and `easing-curves` supplying the 160ms `ease-out-quart` transition for the thumb and track color.
