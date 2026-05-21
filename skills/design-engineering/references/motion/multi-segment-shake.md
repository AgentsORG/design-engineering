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
