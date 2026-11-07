---
title: keyboard-patterns
summary: The key maps a custom widget owes (ARIA APG): tabindex only 0 or -1, roving tabindex for composite widgets, aria-activedescendant for a combobox, showModal() or inert for dialogs, Escape closes the last thing opened, destructive confirms focus the safe button, and a client-side route change moves focus and retitles the page.
tags: [components, accessibility, keyboard, focus, aria, apg]
---

# Keyboard patterns

Native elements ship their keyboard behaviour; a custom widget has to rebuild it, and the rebuild is where it fails. Before writing one, check that a native element or a headless library (Radix, React Aria) can't do it ([[accessibility-baseline]]). If you do write one, it owes these key maps — the ARIA Authoring Practices patterns — exactly.

## tabindex has two legal values

- `tabindex="0"` joins the natural tab order. Only for a custom control that is not natively focusable.
- `tabindex="-1"` is focusable from script only: a heading you move focus to, a dialog container, a roving-tabindex member.
- A positive `tabindex` hijacks the order of the whole page. Fix the DOM order instead.

## One tab stop per composite widget

Tabs, menus, toolbars, radio groups and listboxes take **one** Tab stop. With **roving tabindex** the active item is `0`, every other `-1`, and the arrow keys move both focus and the `0`. A combobox keeps DOM focus in its input instead: `aria-activedescendant` on the input points at the highlighted option's `id` and moves with the arrows.

| Widget | Keys |
|---|---|
| Dialog | Tab / Shift+Tab cycle inside and wrap; Escape closes |
| Tabs | Arrows move (wrapping); Home / End jump; Tab leaves to the panel. Automatic activation when panels render instantly, manual (Enter / Space) when switching is expensive |
| Menu button | Enter, Space or ↓ opens on the first item; ↑ opens on the last; Escape closes and refocuses the button |
| Disclosure, accordion | The header is a `<button aria-expanded>`; Enter and Space toggle |
| Combobox | ↓ opens or moves in; Enter accepts; Escape closes back to the input; typing filters |
| Listbox, radio group | Arrows move the selection; one Tab stop for the group |

Escape dismisses whatever opened **last** — tooltip, then menu, then dialog. Enter in a single-line input submits natively; in a `<textarea>` it is a newline, and ⌘ / Ctrl+Enter submits only because you wired it ([[forms-behavior]]).

## Dialogs: trap, then give back

Prefer `<dialog>` opened with `showModal()`: the background goes inert and Escape closes, for free. A custom overlay needs `role="dialog"`, `aria-modal="true"`, a name through `aria-labelledby`, and `inert` on everything behind it — one property that removes the background from both the tab order and the accessibility tree.

On open, focus the first focusable element; **in a destructive confirmation, focus the least destructive action** so a reflexive Enter cancels ([[destructive-actions]]). On close, return focus to the trigger, or the nearest logical container if the trigger is gone ([[touch-and-focus]] rule 7).

## Client-side navigation announces nothing

A router swap resets neither focus nor the title. On every route change: set `document.title` for the new view, then focus its `<h1>` (given `tabindex="-1"`) or `<main>`. Restore the scroll position on back and forward; scroll to the top on a new navigation ([[url-as-state]]).

## Focus that stays visible

`:focus-visible`, never bare `:focus`. Prefer the browser's own ring — adding only `outline-offset: 2px` keeps it, and it already adapts to platform and forced colours. A custom ring is allowed when it is a verified token that clears 3:1 against **every** colour it crosses, and the focused element is never fully hidden under sticky chrome (`scroll-padding-block-start`, [[growth-and-overflow]]). The numbers are in [[wcag-thresholds]].

- **A ring means focus.** Never ring a card to point at it, and never walk a ring between controls as a stand-in for a pointer (Benji Taylor, Stageshow `references/craft.md`, `references/motion.md`).

## Reference

```tsx
// Roving tabindex for a toolbar or tablist: the part most custom widgets skip
function onKeyDown(e: React.KeyboardEvent, i: number) {
  const last = items.length - 1
  const keys: Record<string, number> = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }
  const next = keys[e.key]; if (next === undefined) return
  e.preventDefault()
  setActive(next) // active item renders tabIndex={0}, every other tabIndex={-1}
  refs.current[next]?.focus()
}
```

Print the shortcut as the product does: one keycap per key, 18px tall, 11px at weight 500, 4px radius, 3px apart, tabular digits (`⌘` `K`), or flat gray `⌘K` beside a menu item.
Gold example: `stageshow/examples/raycast/index.tsx`, a keyboard-only loop (type "clip", Enter pushes the command, ↓ moves the selection, Esc pops back to root search); keycaps from `stageshow/kit/parts/Kbd.css`.
Check: put the mouse away and run the widget: Tab enters it once, the arrows wrap end to start, Home and End jump, Escape hands focus back to the trigger, and every recorded frame shows exactly one ring.

## Gotcha

`role="tab"` with no `onKeyDown` is a tab the mouse can use and the keyboard cannot: it looks finished in every screenshot. Grep for `role="button"`, `role="tab"`, `role="menuitem"` and check each has the key map above, or swap it for the native element.

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, read 2026-10-25): `skills/better-accessibility/SKILL.md` (**Full keyboard support**, **Trap and restore focus**), `focus-and-keyboard.md`.
- W3C ARIA Authoring Practices Guide — dialog, tabs, menu button, disclosure, combobox, listbox patterns.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/examples/raycast/index.tsx`, `stageshow/kit/parts/Kbd.css`, `stageshow/kit/parts/Kbd.tsx`, `stageshow/references/craft.md` (Color and looks: a ring is for real focus), `stageshow/references/motion.md` (no cursor means no stand-in; keyboard stories show the keys).
- Related: [[screen-reader-announcements]], [[component-confusables]], [[interfaces-reconciliation]].
