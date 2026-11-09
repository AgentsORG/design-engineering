---
title: worst-case-values
summary: The worst-case fixture beyond long names — numbers, time, collections, states, content and media — one realistic value per row with what it breaks, every value one a real account could hold or the schema's own limit.
tags: [meta, testing, worst-case]
---

# Worst-case values

Long names are the case everyone remembers. What ships broken is the rest: the float that prints sixteen digits, the date that lands on 1970, the list of exactly forty that shows an empty page two, the row where the current user can remove themself. Every value below is one a real account could hold, or the exact limit the schema allows. Pick the rows that match the fields you mapped in [[stress-scenarios]]; names, emails and labels live there, and the full run is [[cmd-break]]. Emails and links use `example.com` or `.test` only, so a fixture never points at a real inbox.

## Numbers

| Value | Breaks |
|---|---|
| `0.1 + 0.2` stored as a total | prints `0.30000000000000004` unless it goes through `Intl.NumberFormat` |
| `-1820.4` in a ledger | the minus, the red rule, and accounting parentheses `(1,820.40)` |
| `117%` used, `-6%` change | meters and progress bars drawn past their track |

## Time

| Value | Breaks |
|---|---|
| `0` or `1970-01-01T00:00:00Z` | an unset timestamp shown as a real date |
| `2026-03-31T23:40:00-07:00` | a different calendar day in UTC than for the user |
| created just now | "0 seconds ago" where "just now" belongs |
| a renewal in 9 days | "-9 days ago" from a formatter that assumed the past |
| `2,931` hours on a timer | a duration that never rolls into days |

Format with `Intl.RelativeTimeFormat` and `Intl.DateTimeFormat` ([[strings-and-locale]]).

## Collections

| Value | Breaks |
|---|---|
| exactly page size (25), then 26 | "Showing 25 of 25" off by one; a page two that is empty |
| three projects all called `Q3 plan` | a list whose only distinguishing field is the name |
| one card ten times taller than its row | grid and masonry rows stretched to the outlier |

## States

| Value | Breaks |
|---|---|
| every enum at once: `active`, `invited`, `paused`, `expired`, `deleted` | badge widths that differ row to row |
| half the optional fields filled | misaligned rows, orphaned separators |
| the signed-in user inside the list | a missing "You", or "Remove" offered on yourself |

## Content

| Value | Breaks |
|---|---|
| `<b>hi</b>`, `&lt;`, `**bold**` as a title | must render as literal text, never as markup |
| `North` + newline + `wing` in a one-line field | a doubled row, or the newline silently dropped |
| a 2,000-character pasted note | clamp, "show more", textarea growth |
| `rhea+invoices@example.com` | validation that rejects `+`, truncation that hides the tag |

## Media

| Value | Breaks |
|---|---|
| an avatar URL that returns 404 | a broken-image icon instead of initials ([[avatar-systems]]) |
| a 3600×180 panorama, a 180×3600 portrait | distortion without `object-fit: cover`; a card blown tall |
| a dark transparent logo in dark mode | invisible on the surface |
| a slow image with no `aspect-ratio` | layout shift when it lands |

## Gotcha

A fixture that only lengthens names looks thorough and misses what actually ships broken: the plural at 1, the epoch date, the page-size edge and the current user in the list. Add one row from every table that applies before you lengthen anything.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/break-ui/CATALOG.md (the value kinds and what each breaks; examples here are this graph's own).
- Related: [[stress-scenarios]], [[cmd-break]], [[growth-and-overflow]], [[empty-loading-states]].
