---
title: copy-voice
summary: Active voice, Title Case for headings + buttons, "&" over "and", 2nd person, numerals for counts, error messages guide the exit.
tags: [components, copy, voice, microcopy]
---

# Copy and voice

Microcopy is design. The button label, the empty state, the error message — they ship every day, and the wrong word in any of them quietly ages the product.

This node is the universal rules. For broader content authenticity (real data vs lorem, specific numbers, real photos), see [[content-authenticity]].

## Universal rules

### Voice

- **Active voice.** "Saved your changes" beats "Your changes have been saved."
- **2nd person, addressing the user.** "You can…" beats "Users can…"
- **Be specific.** "Couldn't connect to the server" beats "Something went wrong."
- **Be positive.** "Add another" beats "You can't add fewer than one."
- **Drop the throat-clearing.** "Saved." beats "Awesome, your changes were saved!"

### Capitalization

- **Title Case for headings and buttons.** "Create Project" not "Create project" or "CREATE PROJECT" (uppercase is harder to read — see [[line-length-tracking]]).
- **Sentence case for body and tooltips.** "Click here to learn more" not "Click Here to Learn More."
- **Consistent within a surface.** Don't mix Title Case buttons with sentence-case buttons.

### Numerals + units

- **Numerals for counts.** "3 projects" not "three projects". Even small numbers.
- **Non-breaking space between number and unit.** `3 MB` (3 + nbsp + MB) so it doesn't line-break.
- **Consistent currency decimals.** $5.00 not $5 (in financial / commerce contexts where 2 decimals are the norm).
- **Singular/plural matters.** "1 item" not "1 items".

### Punctuation

- **Typographic quotes.** Use `"` and `'`, not `"` and `'`. Most editors auto-correct.
- **Ellipsis character `…`**, not three dots `...`. Single character; better-rendered.
- **Em-dash `—` for parentheticals.** En-dash `–` for ranges (5–10 items).
- **"&" only where it's part of brand or label**, never in body prose. "Q&A" yes; "Save & Continue" — usually no, just "Save and Continue" or split into two buttons.

## Error messages

A good error message answers three questions:
1. **What went wrong** (specific, not generic).
2. **Why** (if helpful).
3. **What the user can do next** (actionable).

```text
Bad:   Something went wrong.
Bad:   Error: 500 Internal Server Error
OK:    Couldn't save. Network connection lost.
Good:  Couldn't save. Network connection lost. Try again, or check your
       internet connection.
```

Errors should never just announce. They should guide.

## Empty states

A good empty state has:
- **A title** stating what the user is looking at (or *not* looking at).
- **Why it's empty.** "No projects yet" not "Empty."
- **The next action.** "Create your first project →" with the actual link.

See [[empty-loading-states]] for full empty-state design.

## Async status

- **"Saving…"** (with ellipsis) — operation in progress.
- **"Saved"** — complete.
- **"Couldn't save"** — failed.
- **`aria-live="polite"`** on the status element so screen readers announce changes. See [[accessibility-baseline]].

## When to apply

Every label, every error, every empty state, every tooltip. Microcopy is the highest leverage / lowest cost design intervention available.

## Gotcha

Don't be cute in error messages. "Oops! Something tripped on the wires!" is funny once and annoying forever. Error messages get re-read every time the user hits the error — write them for the 10th encounter, not the 1st.

Also: don't put microcopy decisions in code reviews. Microcopy lives in design files and content systems. If you're approving "Save" vs "Save Changes" in a PR, the team is missing a design step.

## Sources

- Vercel Web Interface Guidelines — Copywriting and Content sections.
- Erika Hall — *Conversational Design* on tone, voice, error messages.
- Material Design — writing guidelines.
- Related: [[content-authenticity]] (real data, real numbers), [[empty-loading-states]] (empty-state patterns), [[accessibility-baseline]] (aria-live), [[typography-humanity]] (typographic quotes, em-dashes).
