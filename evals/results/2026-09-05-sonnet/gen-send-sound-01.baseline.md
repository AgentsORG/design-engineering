# Confirmation sound on message send, with a settings toggle

## 1. Sound utility — `lib/sound.ts`

Uses the Web Audio API to synthesize a short, soft "pop"/blip tone client-side (no binary asset to ship, no network fetch, instant playback, tiny file). Falls back silently if `AudioContext` is unavailable (older browsers, SSR).

```ts
// lib/sound.ts

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  // Browsers suspend contexts created before a user gesture; a send
  // action is itself a gesture, so this resolves immediately in practice.
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

/**
 * Plays a short, soft two-tone "sent" confirmation sound.
 * Synthesized rather than sampled: no asset request, no decode latency,
 * trivially themeable (pitch/duration) later.
 */
export function playSendSound(volume = 0.15): void {
  const audioCtx = getContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  // Quick upward chirp: 720Hz -> 980Hz reads as "sent", not "error".
  osc.frequency.setValueAtTime(720, now);
  osc.frequency.exponentialRampToValueAtTime(980, now + 0.09);

  // Fast attack, short decay — stays out of the way of typing rhythm.
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 0.18);

  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}
```

If you'd rather ship a designed sample instead of a synthesized tone, swap the body for a pooled `HTMLAudioElement`:

```ts
// Alternative: sampled asset version
const pool: HTMLAudioElement[] = [];

export function playSendSound(): void {
  let audio = pool.find((a) => a.paused);
  if (!audio) {
    audio = new Audio("/sounds/message-sent.mp3");
    audio.volume = 0.35;
    pool.push(audio);
  }
  audio.currentTime = 0;
  audio.play().catch(() => {
    // Autoplay/gesture restrictions — safe to ignore, it's a minor enhancement.
  });
}
```

## 2. Settings persistence — `hooks/useSoundSetting.ts`

A small hook backing the toggle, persisted to `localStorage` and defaulting to **on**.

```ts
// hooks/useSoundSetting.ts
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "chat:sendSoundEnabled";

function readStored(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === null ? true : raw === "true";
  } catch {
    // Private browsing / storage disabled — fall back to default.
    return true;
  }
}

export function useSoundSetting() {
  const [enabled, setEnabledState] = useState<boolean>(() => readStored());

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // Ignore write failures; in-memory state still updates for this tab.
    }
  }, []);

  // Keep multiple tabs in sync.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setEnabledState(e.newValue !== "false");
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { enabled, setEnabled, toggle: () => setEnabled(!enabled) };
}
```

## 3. Settings toggle UI — `components/settings/SoundToggle.tsx`

```tsx
// components/settings/SoundToggle.tsx
import { useSoundSetting } from "@/hooks/useSoundSetting";
import { playSendSound } from "@/lib/sound";

export function SoundToggle() {
  const { enabled, setEnabled } = useSoundSetting();

  return (
    <div className="settings-row">
      <div className="settings-row__text">
        <label htmlFor="send-sound-toggle" className="settings-row__label">
          Sound on send
        </label>
        <p className="settings-row__description">
          Play a short sound when a message is sent.
        </p>
      </div>

      <button
        id="send-sound-toggle"
        type="button"
        role="switch"
        aria-checked={enabled}
        className={`switch ${enabled ? "switch--on" : ""}`}
        onClick={() => {
          const next = !enabled;
          setEnabled(next);
          // Immediate preview so the toggle itself confirms the change.
          if (next) playSendSound();
        }}
      >
        <span className="switch__thumb" />
      </button>
    </div>
  );
}
```

Minimal CSS for the switch (adapt to your design tokens):

```css
.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
}

.settings-row__label {
  font-size: 14px;
  font-weight: 500;
}

.settings-row__description {
  font-size: 13px;
  color: var(--text-muted, #6b7280);
  margin: 2px 0 0;
}

.switch {
  position: relative;
  width: 40px;
  height: 24px;
  border-radius: 999px;
  border: none;
  background: var(--switch-off, #d1d5db);
  cursor: pointer;
  padding: 2px;
  transition: background-color 150ms ease;
  flex-shrink: 0;
}

.switch--on {
  background: var(--switch-on, #4f46e5);
}

.switch__thumb {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transform: translateX(0);
  transition: transform 150ms ease;
}

.switch--on .switch__thumb {
  transform: translateX(16px);
}

.switch:focus-visible {
  outline: 2px solid var(--focus-ring, #4f46e5);
  outline-offset: 2px;
}
```

## 4. Wiring into the send flow — `components/chat/MessageComposer.tsx`

```tsx
// components/chat/MessageComposer.tsx
import { useState } from "react";
import { playSendSound } from "@/lib/sound";
import { useSoundSetting } from "@/hooks/useSoundSetting";

interface MessageComposerProps {
  onSend: (text: string) => Promise<void> | void;
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [text, setText] = useState("");
  const { enabled: soundEnabled } = useSoundSetting();

  async function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;

    setText("");
    await onSend(trimmed);

    // Play only after the send is accepted, so a failed send
    // doesn't confirm something that didn't happen.
    if (soundEnabled) {
      playSendSound();
    }
  }

  return (
    <form
      className="composer"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSend();
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void handleSend();
          }
        }}
        placeholder="Message"
        rows={1}
      />
      <button type="submit" disabled={!text.trim()}>
        Send
      </button>
    </form>
  );
}
```

### Where "send" fires the sound

The sound call is placed **after** `onSend` resolves, not immediately on click/Enter. Two ways this matters depending on your backend:

- **Optimistic send (most chat apps):** if `onSend` only enqueues the message locally and resolves immediately, the sound effectively plays on submit — fine for the common case.
- **Awaited network send:** if `onSend` awaits a server round-trip and throws on failure, wrap it:

```tsx
async function handleSend() {
  const trimmed = text.trim();
  if (!trimmed) return;
  setText("");
  try {
    await onSend(trimmed);
    if (soundEnabled) playSendSound();
  } catch (err) {
    // Restore the draft and surface the error; no confirmation sound
    // for a message that didn't actually go out.
    setText(trimmed);
    showSendError(err);
  }
}
```

## 5. Settings panel integration — `components/settings/SettingsPanel.tsx`

```tsx
// components/settings/SettingsPanel.tsx
import { SoundToggle } from "./SoundToggle";

export function SettingsPanel() {
  return (
    <section aria-labelledby="settings-notifications-heading">
      <h2 id="settings-notifications-heading">Notifications & Sounds</h2>
      <SoundToggle />
    </section>
  );
}
```

## 6. Test coverage sketch

```ts
// __tests__/useSoundSetting.test.ts
import { renderHook, act } from "@testing-library/react";
import { useSoundSetting } from "@/hooks/useSoundSetting";

describe("useSoundSetting", () => {
  beforeEach(() => window.localStorage.clear());

  it("defaults to enabled", () => {
    const { result } = renderHook(() => useSoundSetting());
    expect(result.current.enabled).toBe(true);
  });

  it("persists the toggle", () => {
    const { result, rerender } = renderHook(() => useSoundSetting());
    act(() => result.current.setEnabled(false));
    rerender();
    expect(result.current.enabled).toBe(false);
    expect(window.localStorage.getItem("chat:sendSoundEnabled")).toBe("false");
  });
});
```

---

## Rationale

The sound itself is synthesized with the Web Audio API (a fast upward sine chirp, ~170ms, low default volume) rather than shipped as an audio file, so there's no asset to fetch, license, or theme later, and it plays instantly with no decode delay; a sampled-asset alternative is included for teams that want a designed sound instead. The setting is a single boolean persisted to `localStorage` under a hook (`useSoundSetting`) so any component — the composer, a settings page, a future onboarding tooltip — can read or flip it without prop drilling, and it stays in sync across tabs via the `storage` event. The toggle is a real `role="switch"` button with `aria-checked` and focus styles rather than a styled checkbox, and flipping it to "on" immediately previews the sound so the control confirms itself. In the composer, the sound fires after `onSend` resolves rather than on keypress, so a failed or blocked send doesn't falsely confirm; for apps with real network sends, the try/catch variant shows how to keep that guarantee under latency or errors. Default-on was chosen because a send confirmation is a low-risk, expected affordance in chat UIs (iMessage, Slack, Discord all default it on), but it's one click away from being silenced for anyone in a shared space or who finds it noisy.
