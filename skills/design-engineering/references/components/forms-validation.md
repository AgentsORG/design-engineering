---
title: forms-validation
summary: Validate at input, not on submit. Inline errors beat error summaries. Soft validation while typing, hard validation on blur.
tags: [components, forms, validation]
---

# Forms — inline validation

The on-submit error summary is dead. Modern forms validate at the field level, inline, as the user moves through them.

## The validation cadence

1. **While typing — soft signals only.** Don't fire red borders or error text on keystroke. The user is still composing. The only allowed feedback while typing is *positive* — a green check appearing when the field becomes valid.
2. **On blur — hard validation.** When the user leaves the field, validate. Fire the error if it fails. This matches user intent: "I'm done with this field; tell me if it's wrong."
3. **On submit — final pass.** Catch anything blur-validation missed (cross-field rules, server-side checks). If errors exist, scroll to the *first* invalid field and focus it.

The cardinal sin: validating on every keystroke and showing errors mid-typing. This punishes the user for an in-progress action and reads as nagging.

## Error display

Each errored field has:

- **Border color** — `var(--danger)` outline (1px, slightly stronger than default).
- **Background tint** (optional) — very subtle, `rgba(danger, 0.04)`.
- **Inline error message** — below the field, in danger color, 13px–14px. Don't bury it in a sidebar.
- **Optional: shake animation on the error fire.** See [[multi-segment-shake]]. Use only on submit, not on blur (too aggressive otherwise).

```tsx
<FormField>
  <Label>Email</Label>
  <Input
    value={email}
    onBlur={validateEmail}
    aria-invalid={hasError}
    aria-describedby="email-error"
  />
  {hasError && (
    <ErrorMessage id="email-error">
      Email looks invalid. Try the format name@example.com.
    </ErrorMessage>
  )}
</FormField>
```

## Error copy

Bad error copy:
> "Invalid input."
> "Email is invalid."
> "Please enter a valid email."

Good error copy:
> "Email looks invalid. Try the format name@example.com."

Rules:
- Tell the user *what* is wrong.
- Tell them *how to fix it*.
- Skip "Please."
- Don't say "Invalid" — say what was expected.
- Sound like a person, not a 1990s database.

## Success states

Valid fields can show a subtle green check inside the input on blur. This is optional but rewards the user for getting a field right. Don't overdo it — checks on every field becomes noise. Use for fields where validity is non-obvious (email format, password strength) and skip for trivially-valid ones (first name).

## Multi-field validation

For rules that involve multiple fields (password confirmation, date range start ≤ end), validate when the *second* field blurs, not the first. The first field can't be wrong in isolation; only the relationship is wrong.

```tsx
function PasswordFields({ password, confirm, setConfirmError }) {
  return (
    <>
      <Input name="password" />
      <Input
        name="confirm"
        onBlur={() => setConfirmError(confirm !== password ? "Doesn't match." : null)}
      />
    </>
  );
}
```

## Server-side validation

Server errors (email already in use, network error) come back after submit. Handle them by:

- Scrolling to the relevant field.
- Replacing the inline error message with the server message.
- NOT clearing what the user typed. Never make the user retype.

## When to apply

Every form: signup, login, settings, payment, anything.

## When NOT to apply

- Single-input search boxes — don't validate, just search.
- Free-form comments / chat messages — no "wrong" answer to validate.
- Inline edits of single fields (rename, status change) — validate on Enter or commit, not on blur (the user might be navigating elsewhere with the value intact).

## Gotcha

`required` on every field is lazy. Mark *only* the fields that genuinely require user input as required. Optional fields should clearly indicate "Optional" — don't leave the user guessing whether a missing value will fail submit.

Also: don't disable the submit button until the form is valid. It tells the user *nothing* about why. Better to let the click happen, run validation, and surface the errors clearly.

## Sources

- guidelines.sh — "Validate forms inline at input."
- Material Design — form patterns.
- Stripe — best-in-class form copy.
- Related: [[multi-segment-shake]], [[states-are-the-work]], [[empty-loading-states]].
