---
title: screen-reader-announcements
summary: Pick the announcement by a four-step ladder — focus move, aria-describedby, role="status", role="alert" — and stop at the first match. Live regions exist empty before their text changes; aria-busy around loads; alt text by purpose, not looks; sr-only boxes are 1px; aria-hidden never sits on or above anything focusable.
tags: [components, accessibility, screen-reader, aria, live-region]
---

# Screen-reader announcements

A sighted user sees a change; a screen-reader user hears it only if something announces it. Choose the mechanism by what the change is tied to, and pick the quietest one that works. [[accessibility-baseline]] states the floor ("polite for async"); this node is how to make that floor actually speak.

## The ladder — stop at the first match

1. **Focus moves there anyway** — an opened dialog, the first invalid field after submit. The focus move is the announcement; add nothing.
2. **Tied to one control** — a field error, a character count: `aria-describedby` on the control, read with the field.
3. **Not urgent, not tied to a control** — a toast, "Saved", a result count, a loading state: a polite region, `role="status"`.
4. **Urgent, not tied to a control** — a form-level failure, session expiry: `role="alert"`, and nothing else gets it.

`role="status"` is `aria-live="polite"` plus `aria-atomic="true"`; `role="alert"` is the assertive twin. Default to polite — assertive interrupts whatever the user was reading.

## Rules that make it reliable

- **Render the region empty first, then change its text.** `{msg && <div role="status">{msg}</div>}` mounts the region with its content, which screen readers announce inconsistently. Keep `<div role="status" className="sr-only">{msg}</div>` in the DOM from the start.
- **Short, self-contained messages.** `aria-atomic` re-reads the whole region on every change.
- **Never move focus to a toast.** Announce it and leave focus where the user is working — the toast's own timing rules are in [[wcag-thresholds]].
- **Loads:** `aria-busy="true"` on the updating region, "Loading…" politely, then the outcome: "Loaded, 12 results". The copy pattern is in [[strings-and-locale]].
- **Inserted alerts vary by reader.** Test the browser and screen-reader pairs you support before relying on one.

## Hiding, two opposite ways

- **Visually hidden, still read** — `.sr-only` / Tailwind `sr-only`: `position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap`. One pixel, not zero: some readers skip zero-sized boxes. `nowrap` stops words being read as one run-together string.
- **Read-hidden, still visible** — `aria-hidden="true"` removes the subtree from assistive tech. Use it on decorative icons and visual duplicates; never on or above a button, link or input, or Tab lands on a stop the reader says does not exist. Hiding something interactive means `inert` ([[touch-and-focus]]).

## Alt text by purpose

| Purpose | `alt` |
|---|---|
| Decorative, or repeats adjacent text | `alt=""` — present and empty |
| Informative | The meaning it adds: "Ticket QR code" |
| Functional (the image is the link or button) | The action: "Search", never "magnifying glass" |
| Image of text | The exact text — better, real text |
| Chart or diagram | A one-line summary; the data as a table nearby |

A missing `alt` is worse than an empty one: readers fall back to the file name. Inline SVG: decorative → `aria-hidden="true"`; meaningful → `role="img"` + `aria-label` ([[svg-creation]]). Prerecorded video needs captions, audio a transcript, and nothing autoplays with sound.

## Gotcha

`aria-live="assertive"` on a success toast is the common over-correction: "Saved" now interrupts the sentence the user was hearing. Success is `role="status"`; only failure that blocks the task earns `role="alert"`.

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, read 2026-10-25): `skills/better-accessibility/SKILL.md` (**Announce dynamic content**, **Alt text by purpose**), `screen-readers.md`.
- WCAG 2.2 SC 4.1.3 Status Messages, 1.1.1 Non-text Content, 1.2.1–1.2.2, 1.4.2.
- Related: [[keyboard-patterns]], [[forms-validation]], [[interfaces-reconciliation]].
