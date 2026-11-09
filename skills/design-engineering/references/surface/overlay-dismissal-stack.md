---
title: overlay-dismissal-stack
summary: Every dismissible layer — dialog, drawer, sheet, popover, menu, combobox list, tooltip — joins one stack. Escape and platform close requests reach only the topmost layer, content can claim Escape first, an IME composition is never a dismissal, a backdrop closes only when the press starts and ends on it, the top layer consumes its own outside press, and focus returns to the opener without scrolling. From Meta's Astryx.
tags: [surface, overlays, dialog, popover, escape, focus, astryx]
---

# The overlay dismissal stack

Nested overlays fail in one of three ways: one Escape closes the menu **and** the dialog under it; a text selection dragged past a dialog's edge closes the dialog; or closing returns focus to the top of the page and scrolls it. Astryx prevents all three with a single dismissal stack that every layered surface registers with. [[z-index-strategy]] decides what paints on top; this decides what *closes*.

## Rules

1. **Every dismissible layer participates.** Dialogs, drawers, bottom sheets, popovers, menus, combobox lists, date calendars, pinned tooltips and context menus all register. One that doesn't is the one that steals Escape.
2. **One request, one layer.** An unclaimed Escape goes to exactly one layer, the topmost present one. It either closes or refuses; it never falls through to the layer behind.
3. **Platform close requests use the same rule** (Android back, the `CloseWatcher` close request): topmost only.
4. **Nesting beats placement.** When a layer knows its parent (a menu opened from inside a dialog), that outranks DOM or portal order.
5. **Content claims first.** The shared Escape listener runs in the bubble phase and stands down when the content already handled the key: a combobox clearing its query, an editor cancelling a selection.
6. **Composition is not dismissal.** Escape that cancels an IME composition (CJK input, accents) is consumed without closing anything, and close requests are declined while composing.
7. **A backdrop press starts and ends on the backdrop.** A press that crosses the edge either way (a text selection, a slider dragged past the edge) does not dismiss. A cancelled pointer ends the press.
8. **The top layer consumes its outside press.** The press that light-dismisses a popover inside a dialog does not also close the dialog.
9. **Focus returns to the opener, without scrolling** the page or any scroller, with the focus ring the last input calls for ([[touch-and-focus]]). It works in the document the layer rendered in, including a Picture-in-Picture window.
10. **Registration is not ownership.** The stack calls the layer's own dismiss callback; open state stays with the component's owner.

## Gotcha

`onPointerDown` on the backdrop is the common bug: it fires before the user has finished a drag that started inside the panel. Track the press from down to up and dismiss only when both landed on the backdrop.

## Sources

- Meta, Astryx (MIT, github.com/meta/astryx, HEAD `9f55320`, read 2026-11-09): `docs/families/overlay-dismissal.md` FR1–FR11 (current). Paraphrased.
- Related: [[keyboard-patterns]], [[destructive-actions]], [[astryx-reconciliation]].
