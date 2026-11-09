---
title: reorder-insertion-cue
summary: Reordering a list starts from a dedicated handle, shows the moving row and its source in one quieter (never raised) treatment, marks the candidate gap with an accent line while every other row stays put, commits once on drop, and clears all drag styling at once on drop or cancel. Keyboard reordering moves the same line, focus stays on the handle, and each move is announced. From Meta's Astryx.
tags: [components, drag, reorder, lists, accessibility, astryx]
---

# Reorder with an insertion cue

The common sortable list lifts the dragged row into a shadowed card and reshuffles its neighbours on every pixel of travel. The list never holds still long enough to read, and the "lift" implies the row became a different kind of object. Astryx's current reorder spec does the opposite: **show where it will land, change nothing until it lands.**

## Anatomy

| Part | Treatment |
|---|---|
| Reorder handle | A dedicated grip, discoverable at rest without overpowering the row. Starting a drag anywhere else on the row stays free for the row's own actions |
| Source row | Stays in place during the drag, in a temporary reduced-emphasis treatment |
| Moving preview | Follows the pointer on both axes in the **same** quiet treatment as the source; no raised-card shadow |
| Insertion cue | An accent line between rows on the list's ordering axis; length and inset follow the row geometry |
| Neighbours | Do not move until commit |

## The sequence

1. **Start** from the handle only.
2. **Drag:** the preview moves freely, but the candidate position is computed on the ordering axis alone (vertical list → pointer y).
3. **Drop:** the list adopts the new order **once**, then rows settle with the system's fast movement; all drag styling clears immediately.
4. **Cancel** (Escape, pointer cancel): original order and full contrast come back at once, even when motion is enabled.
5. **Reduced motion:** the order updates with no travel ([[reduced-motion-by-pointer]]).

## Keyboard parity

Keyboard reordering moves the **same** insertion line one position at a time; focus stays on the handle throughout; position, cancel and completion are announced in words ("Moved to position 3 of 7") through a polite live region ([[screen-reader-announcements]]). The quiet drag treatment is allowed only while the reorder is active, never as resting styling.

## Gotcha

Live reshuffling feels responsive in a demo with five rows and breaks in a long list: every crossed row shifts, the target moves out from under the pointer, and the drop lands one row off. Freeze the neighbours and draw the line.

## Sources

- Meta, Astryx (MIT, github.com/meta/astryx, HEAD `9f55320`, read 2026-11-09): `docs/design/ordered-collection-reordering.md` DR1–DR8 (current). Paraphrased.
- Related: [[gesture-phases]], [[keyboard-patterns]], [[astryx-reconciliation]].
