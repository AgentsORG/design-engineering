---
title: component-confusables
summary: The component pairs people reach for interchangeably but shouldn't — tooltip vs popover, badge vs tag, sheet vs drawer vs dialog. Pick by behaviour, not by looks.
tags: [components, vocabulary, distinctions]
---

# Component confusables

Some components look alike and get used interchangeably. The cost is silent: the wrong one breaks an expectation the user already has. Pick by *behaviour*, not by appearance. This is [[articulate-precisely]] applied to the component layer — naming the difference is choosing the right one.

## Tooltip vs popover

The line is interactivity:

- **Tooltip** — a hover/focus label that explains an element. It *cannot* hold interactive content. No links, no buttons — the pointer can't move into it without dismissing it.
- **Popover** — a click-anchored overlay that *can* hold interactive content: links, buttons, a small form. It stays open until dismissed.

If you need a link inside the floating thing, it is a popover, not a tooltip. A button living in a tooltip is the tell that the wrong primitive was chosen. Both still need [[accessibility-baseline]] focus handling.

## Badge vs tag

The line is ownership and interactivity:

- **Badge** — attached to another element and read-only. Numeric badges imply a count (the "3" on an inbox); word badges ("New", a status) are informational.
- **Tag** — standalone and interactive: selectable, removable, used to categorise or filter. A chip the user can pick up or discard.

A badge is pinned on; a tag is handled. Styling one as the other collapses a real behavioural difference and trains the user to expect the wrong affordance.

## Sheet vs drawer vs dialog

All three are overlays; the difference is origin and intent — and all three share the same focus-and-dismissal rules as a modal (see [[tray-rules]]):

- **Dialog / modal** — interrupts the flow centre-screen to demand a decision. Focus trapped, background inert.
- **Sheet** — slides in from a screen edge; common on mobile for secondary nav or contextual actions.
- **Drawer** — a bottom sheet pulled up from the base; a frequent mobile replacement for a dialog.

Reach for a dialog when the choice must be made now; reach for a sheet or drawer when the surface is secondary and dismissible.

## Reference

| Kit part | Behaviour | Motion |
|---|---|---|
| `Tooltip` | Names the icon under a resting cursor; hides on the click; never carries the story | In 0.15s, out 0.1s, 2px of travel |
| `Popover` | Measured from its trigger (right edge on the button's, top 8px below); holds a field, a menu, actions | Surface from scale 0.96 at its origin over 0.24s `cubic-bezier(0.22, 1, 0.36, 1)`; closes as one object |
| `Badge` | A read-only status pill, with a dot or a glyph beside the label | None; it changes with its status |
| `Chip` | A filter chip with a remove x | Opens and closes its own width over 0.4s `cubic-bezier(0.25, 0.8, 0.25, 1)`, so the chips after it slide |

- **Gold example:** `stageshow/examples/share/` (the popover holds an email field, a role menu and Invite) and `stageshow/examples/gmail/` (the tooltip says "Archive" over the icon and goes on the click).
- **Check:** hover each floating thing, then try to click or Tab into it: anything that takes a click is a popover, a tooltip still showing after its click is a bug, and a badge with an x is really a tag.

## Gotcha

The trap is choosing by how it looks in the design file ("a little floating box") instead of how it behaves. Ask three questions: does the user need to *interact inside* it (popover, not tooltip)? Can they *act on* it (tag, not badge)? Must they decide *now* (dialog, not sheet)? Behaviour picks the component.

## Sources

- *Index — Say Precisely What You Mean*, Emil Kowalski & Glenn Carstens-Peters — [index.how/to/articulate](https://index.how/to/articulate). The components vocabulary these distinctions sharpen; see also [[design-vocabulary]].
- [[tray-rules]] — Benji Taylor's overlay/sheet rules. [[accessibility-baseline]] — the focus and dismissal floor.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/parts/Tooltip.tsx`, `stageshow/kit/parts/Tooltip.css`, `stageshow/kit/motion/Popover.css`, `stageshow/kit/controls/Badge.tsx`, `stageshow/kit/parts/Chip.tsx`, `stageshow/kit/parts/Chip.css`, `stageshow/examples/share/index.tsx`, `stageshow/examples/gmail/index.tsx`.
