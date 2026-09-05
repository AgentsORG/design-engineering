---
title: forms-behavior
summary: The semantics the platform gives you, then the details — label wiring, right input type, 16px, focus-visible, autocomplete where it helps, decorations over the input, autofocus only on desktop modals, a real form so Enter submits, buttons that disable while submitting, no dead zones, confirmed destruction, prefilled everything.
tags: [components, forms, inputs, buttons, keyboard]
---

# Forms — behavior

Forms are where users do real work, and they notice every rough edge: the label that doesn't focus the input, the page that zooms on iOS, the button that fires twice, the Enter key that does nothing. None of it is hard; it is easy to forget. [[forms-validation]] owns *when* to validate and how errors look; this node owns everything else a form has to do.

## Wire the platform first

- **Every input gets an associated label** — `for`/`id` or wrapping — so clicking the label focuses the field.
- **Right `type`** (`email`, `tel`, `url`, `number`, `search`, `password`): the correct mobile keyboard, native validation, and autofill come free.
- **Inputs, textareas, and selects at ≥ 16px** on touch viewports (see [[line-behavior]] for why not `maximum-scale`).
- **`:focus-visible`, never bare `outline: none`.** Keyboard users get the ring; mouse users don't see it on every click. Keep the ring neutral (grey, black, white) unless a focus token exists.
- **Real `<button>` elements.** A `<div onClick>` is invisible to keyboards and screen readers. Default `type="button"`.

## Browser behaviors, curated

Keep `autocomplete` **on** for identity, address, and payment fields — there it helps. Turn `spellcheck` and `autocomplete` **off** for usernames, search, codes, and slugs, and suppress password-manager overlays (`data-1p-ignore`, `data-lpignore`) where they don't belong.

## Decorations, focus, submission

- **Prefix/suffix icons overlay the input** (absolutely positioned, padding reserving room), never siblings. A sibling icon does nothing when clicked and the border lies about the hit area. Clickable decorations (clear, search) refocus the input.
- **Autofocus the first input when a desktop modal opens; never on touch** — it shoves the keyboard into the user's face.
- **Wrap inputs in a `<form>`** so Enter submits. Textareas submit on Cmd/Ctrl+Enter.
- **Disable the submit control while the request is in flight** and change its label to say what's happening; that is the double-submit fix.
- **Press feedback** `scale(0.97)` on `:active` through a ~150ms transition — see [[responsive-feedback]].
- **Surface the shortcut** in the button's tooltip ("Save (⌘S)"), bound to Cmd on macOS and Ctrl elsewhere.

## Rows, danger, prefill

- **No dead zones.** The control, the label, and the gap between them are all clickable — wrap the row in one `<label>` or make the label `flex: 1`.
- **Destructive actions are confirmed** and spatially separated from the primary action. `confirm()` is the floor; a real dialog for real products, and prefer easy undo everywhere the action is reversible.
- **Prefill everything you can** from the logged-in user and the link context: a "change username" link lands on a form already carrying the current value.
- **Build on accessible primitives** (Base UI, Radix, React Aria) rather than hand-rolling focus management. The bar — focus, ARIA, keyboard — is non-negotiable whichever library you pick.

## When to apply

Any form, input, search field, login/signup, settings page, checkout, or submit handler — building or reviewing.

## Gotcha

Auto-advancing verification-code inputs feel clever until someone needs to correct a digit. Waiting for Tab is safer; if you auto-advance, Backspace must move back and select.

## Sources

- Emil Kowalski's design-engineering practice on forms, distilled by HKTITAN.
- Related: [[forms-validation]], [[accessibility-baseline]], [[touch-and-focus]], [[responsive-feedback]].
