---
title: strings-and-locale
summary: Inventory the existing strings before writing one; one noun per object, one verb per action. Build sentences whole in ICU with real plural categories, format every number, date and list through Intl, start buttons with a verb, make links name their destination, label toggles for the ON state, and keep in-progress and done strings parallel.
tags: [components, copy, i18n, icu, intl, microcopy]
---

# Strings and locale

Copy breaks two ways: it contradicts the product's own vocabulary, or it is assembled so it cannot be translated. Both are visible in the code before anyone reads the screen. [[copy-voice]] sets the voice; this node is how the strings are found, built and formatted.

## Inventory before writing

Find where the copy lives first: the translation call (`t(`, `i18n.`, `<FormattedMessage`, `$t(`) and its catalogues (`locales/**/*.json`, `messages/*.json`, `*.po`, `*.strings`), or a CMS or API. List the noun used for each object and the verb for each action — "project" or "workspace", "Delete" or "Remove" — and the case used per element type. New copy uses those words. A synonym is a finding only where one thing is now named two ways: if it is "Archive" in the menu it is not "Move to storage" in the toast.

A multi-step flow uses one vocabulary end to end: "Get started" to enter, "Continue" *or* "Next" to advance, "Done" to finish.

## Build strings whole

Never assemble a sentence around a variable — `"You have " + n + " new messages"` — because word order changes per language. Write one message with placeholders, and never `n === 1 ? "" : "s"`: many languages have more than two plural forms.

```text
inbox.count = {count, plural,
  =0 {No new messages}
  one {# new message}
  other {# new messages}
}
```

`=0` matches zero exactly; `one` and `other` are categories, and a translator adds `few` or `many` where the language needs them. Without a library, `new Intl.PluralRules(locale).select(count)` picks the category.

## Format through Intl, with the user's locale

| Value | Call |
|---|---|
| Currency | `Intl.NumberFormat(locale, { style: "currency", currency })` |
| Unit | `Intl.NumberFormat(locale, { style: "unit", unit: "megabyte" })` |
| Date | `Intl.DateTimeFormat(locale, { dateStyle: "medium" })` |
| Relative time | `Intl.RelativeTimeFormat(locale, { numeric: "auto" })` → "yesterday" |
| List | `Intl.ListFormat(locale, { type: "conjunction" })` — never join with `", "` and `" and "` |

`toLocaleDateString()` with no locale, or a date built from `getMonth()`, is the finding. Translated strings grow — a one-word button grows most — so the container rules are in [[growth-and-overflow]].

## Labels that do their job

- **Buttons start with a verb** naming the action: "Send", "Save draft", "Delete project" — never "OK" or "Let's go!". An icon button's accessible name follows the same rule: "Delete project", never "Trash icon" ([[screen-reader-announcements]]).
- **Links name their destination** out of context: "Read the billing docs", not "Click here". Two bare "Learn more" on one page each get a suffix: "Learn more about exports".
- **Toggles describe the ON state.** "Send read receipts", never "Don't send read receipts", which makes the switch a double negative. Link straight to a referenced setting instead of narrating its path.
- **Address the reader as "you"**; in errors, "we" reads as deflection. Possessives sparingly — "Favorites" beats "Your favorites" — and never "My account" beside "Your settings".
- **Match the device:** "tap" on touch, "click" with a pointer, "select" when both.

## Status copy stays parallel

| State | Pattern |
|---|---|
| In progress | `-ing` verb + object: "Saving changes…" |
| Done | object + past tense, no "successfully": "Changes saved" |
| Failed | what did not happen, then the next step: "Changes not saved. Check your connection and try again." |
| Unavailable | why, beside the control: "Add a payment method to publish" |
| Partial | both counts: "9 of 12 files uploaded. Retry 3 failed files" |

"Saving changes…" resolves to "Changes saved" — same object, same order. Cut "Please" from routine instructions.

## Gotcha

A placeholder is an example in the accepted format — `name@example.com`, `DD/MM/YYYY` — never an instruction and never the label ([[forms-behavior]]). And a deliberate brand voice is not a defect: reword only where copy is inconsistent, ambiguous, untranslatable or wrong for the stakes.

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, read 2026-10-25): `skills/better-writing/SKILL.md` (**Inventory the existing strings first**, **Build strings whole**, **Verb-first buttons**, **Links describe their destination**, **Settings describe the ON state**), `patterns.md` (status copy, plurals, locale formatting).
- Unicode ICU MessageFormat; ECMA-402 `Intl`.
- Related: [[copy-voice]], [[copy-tells]], [[destructive-actions]], [[interfaces-reconciliation]].
