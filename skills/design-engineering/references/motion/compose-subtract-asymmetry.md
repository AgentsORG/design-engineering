---
title: compose-subtract-asymmetry
summary: Enter with 5 properties, exit with 3. Disappearance feels soft, not a reversed entrance.
tags: [motion, transition, asymmetry]
---

# Compose on enter, subtract on exit

A signature Jakub Antalik pattern: when something enters with N animated properties, have it exit with fewer than N. The exit should feel like a soft fade-away, not a reversed entrance.

## The principle

A perfectly-reversed exit (same properties, same curve, opposite direction) reads as mechanical. The element "rewinds." That's correct, but it feels off.

The fix: drop properties on the exit. Keep the essentials (usually opacity + blur), drop the theatrical ones (rotate, translate-bounce, stroke-draw).

## Concrete example — success check

Enter (5 properties, 350ms):
- Opacity 0 → 1
- Scale 0.8 → 1
- Rotate -8° → 0
- Y-bob translateY(4px) → 0 → translateY(-2px) → 0
- Stroke-draw on the checkmark path

Exit (3 properties, 180ms):
- Opacity 1 → 0
- Filter blur(0) → blur(2px)
- Scale 1 → 0.96 (subtle, not theatrical)

The exit doesn't undraw the stroke. It doesn't reverse-bob. It doesn't rotate back. It just fades softly.

## Why it works

The brain notices the entrance (it's the "new" event). The exit is a "going away" event — making it visually quieter respects the user's attention. Reversing the entrance over-emphasizes the moment of leaving.

## Other examples

- **Modal:** enter scales from 0.96 + opacity + slight Y-translate. Exit just opacity + minor scale. No Y-translate.
- **Tooltip:** enter scales from 0.94 + opacity. Exit just opacity. No scale.
- **Toast notification:** enter slides + opacity + slight bounce. Exit just slides + opacity. No bounce.
- **Confetti:** enters with rotation + translate + opacity. Exits with only opacity fade.
- **Popover (Benji Taylor, Stageshow):** subtract properties, never parts. It opens with the surface scaling from 0.96 while the text only fades, and closes as one object, surface and contents shrinking to 0.96 together over 0.24s on `cubic-bezier(0.4, 0, 1, 1)`; a surface that shrank alone would slip out from under its words.

## The asymmetric-duration rule

This pattern pairs naturally with [[duration-table]]'s asymmetric timing — exits are usually 60–80% of enter duration. Combine both:

```css
[data-state="open"] {
  animation: enterFull 300ms var(--ease-out-quart);
}
[data-state="closed"] {
  animation: exitMinimal 180ms var(--ease-out-quart);
}

@keyframes enterFull {
  from { opacity: 0; transform: scale(0.96) translateY(4px); filter: blur(2px); }
  to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
}

@keyframes exitMinimal {
  from { opacity: 1; transform: scale(1); filter: blur(0); }
  to { opacity: 0; transform: scale(0.96); filter: blur(2px); }
  /* no translate, no rotation, simpler */
}
```

## When to apply

Any element that animates on enter. Pause before writing the exit animation and ask: which properties belong here, and which are theater? Drop the theater.

## Reference

A control label handing off to its next state (Save to Saved). Enter composes three properties; exit keeps two and resets the rise once it is invisible (adapted from `stageshow/kit/motion/States.css`):

```css
.state { /* exit: fade + blur only */
  opacity: 0; filter: blur(2px); transform: translate3d(0, 4px, 0);
  transition: opacity 0.15s ease, filter 0.15s ease, transform 0s 0.15s;
}
.state[data-on] { /* enter: fade + blur + 4px rise, 70ms after the exit starts */
  opacity: 1; filter: none; transform: none;
  transition: opacity 0.25s ease-out 0.07s, filter 0.25s ease-out 0.07s,
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1) 0.07s;
}
```

Benji's call differs on the ratio: this exit is 0.15s against an enter that ends 0.32s to 0.37s in, under half rather than 60 to 80%, so the old label is mostly gone as the new one starts and the two never read as two labels.

Gold example: `stageshow/kit/motion/States.css` and `stageshow/kit/motion/Popover.css`.

Check: film enter and exit and put them on one contact sheet. The exit frames show fewer moving properties than the enter, and no exit frame shows a surface separating from its content.

## Gotcha

This is *not* a reason to skip the exit animation entirely. An element that pops onto the screen and then `display: none` looks broken. The exit needs *some* animation — just less than the entrance.

## Sources

- Jakub Antalik — transitions.dev, prototype P11 (success check).
- Emil Kowalski — Sonner asymmetric enter/exit.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `kit/motion/States.css`, `kit/motion/Popover.css`.
