---
title: multi-segment-shake
summary: Form-error shake at 0%, 28.57%, 57.14%, 78.57%, 100% over 280ms with 4px overshoot.
tags: [motion, error, form]
---

# Multi-segment shake

When a form field fails validation, the shake animation is one of the highest-leverage micro-interactions. Done right, it's unmistakable. Done wrong, it's a nervous twitch.

## The Jakub Antalik formula

Total duration: **280ms** total. Five keyframe stops (not four, not six — five). Translation peaks at **4px** overshoot.

```css
@keyframes shake {
  0%    { transform: translateX(0); }
  28.57%{ transform: translateX(-4px); }
  57.14%{ transform: translateX(4px); }
  78.57%{ transform: translateX(-2px); }
  100%  { transform: translateX(0); }
}

.input--error {
  animation: shake 280ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
```

Why these specific percentages?

- **0%** — start position.
- **28.57%** — first peak, full overshoot in one direction.
- **57.14%** — second peak, full overshoot in opposite direction (the "bounce").
- **78.57%** — third peak, half-amplitude in opposite direction (damping).
- **100%** — settle.

The decreasing amplitude (4px → 4px → 2px → 0) is what makes it feel physical. A uniform-amplitude shake feels mechanical.

## Hold the error state

After the shake completes, the field should remain visually marked as errored:

```css
.input--error {
  border-color: var(--danger);
  background-color: var(--danger-bg);
  animation: shake 280ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
```

The shake itself is just the attention-getter. The persistent error styling is what tells the user what went wrong.

Pair with an error message that appears just below the field:

```css
.error-message {
  opacity: 0;
  transform: translateY(-4px);
  transition: all 200ms 100ms; /* 100ms delay so it appears as shake settles */
}
.field--errored .error-message {
  opacity: 1;
  transform: translateY(0);
}
```

## Curve choice

The cubic-bezier `(0.36, 0.07, 0.19, 0.97)` is a "snappy" curve — it accelerates fast and decelerates fast. A standard `ease-in-out` makes the shake look slow and tentative. The snappy curve is essential.

## When to apply

- Form validation errors.
- "This field is required" moments after submit.
- Password-mismatch animations.
- Wrong PIN entry on auth flows.

## When NOT to apply

- Soft validation that doesn't block submission ("looks like an unusual format"). Use border color only, no shake.
- High-frequency revalidation while typing. Shake should fire on a discrete event (submit, blur), not every keystroke.
- More than once in quick succession. Debounce so users don't see two shakes overlapping.

## Reference

The five stops land on round times of the 280ms clock, which is how to read a filmed shake frame by frame:

| Time | Wrapper `x` | Field | Message lane |
|---|---|---|---|
| 0ms | 0 | danger ring on | hint out over 0.15s, error in over 0.25s after 0.07s |
| 80ms | -4px | | |
| 160ms | +4px | | |
| 220ms | -2px | | |
| 280ms | 0 | ring holds | error fully in by 320ms, held until the value is fixed |

Benji's call differs: his form gold does not shake at all. It says the error with the ring and one line, in a lane that exists from first paint so the hint and the error swap in place and the form never grows. Keep the shake for a blocking submit, and give the message that lane rather than inserting it under the field.

- **Gold example:** `stageshow/examples/form-error/` (error `Add the domain, like name@company.com`, cleared the moment the ending is typed); the swap timings are `stageshow/kit/motion/States.css`.
- **Check:** film the submit at 40ms a frame: the shake starts on the submit frame, the 80, 160 and 220ms frames sit at -4, +4 and -2px, and the button below is at the same y in every frame.

## Gotcha

Apply the shake to the field's *wrapper*, not the `<input>` itself. Shaking the input causes the text cursor to jump, which is disorienting and can break IME composition for non-Latin scripts.

```html
<div class="field-wrapper" :class="{ 'field--errored': hasError }">
  <input ... />
  <span class="error-message">...</span>
</div>
```

## Sources

- Jakub Antalik — transitions.dev, prototype P9 (form error).
- Material Design — motion guidelines, multi-stop keyframes.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/examples/form-error/index.tsx`, `stageshow/examples/form-error/form.css`, `stageshow/kit/motion/States.css`.
