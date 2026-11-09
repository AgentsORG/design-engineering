---
title: hover-states-subtle
summary: Hover is not lift-and-shadow. 1px shifts, color shifts, layered disabled state.
tags: [components, hover, micro-interaction]
---

# Hover states — subtle by default

The default hover effect — "lift the card by 4px and add a stronger shadow" — is dated and overused. Subtler hover states read as more considered.

## Subtle hover patterns

### Background-color shift

```css
.row {
  transition: background-color 120ms;
}
.row:hover {
  background-color: var(--hover-overlay); /* rgba(0,0,0,0.04) */
}
```

For most interactive rows, lists, and table cells, this is enough. The shift signals "interactive" without theatrics.

- **Hover fills are inset and rounded;** negative margins go on the list, not the row. Links get no hover surface (Benji Taylor, Stageshow `references/craft.md`).
- **A filled button keeps its colour under the pointer:** one step darker of its own colour, never a gray swap (Stageshow `kit/controls/Button.css`).

### 1px translate

```css
.card {
  transition: transform 150ms var(--ease-out-quart);
}
.card:hover {
  transform: translateY(-1px);
}
```

A 1px lift is felt more than seen. It's the smallest possible motion that still registers. 4px lifts look bouncy and amateur. If a card hover scales at all, the ceiling is about `scale(1.02)`; 1.05 swells the whole card. Use `transition-transform` (never `transition-all`) at about 150ms: hover answers a pointer that is already there, so 300ms drags.

### Border-color shift on inputs

```css
.input {
  border-color: var(--border-default);
  transition: border-color 100ms;
}
.input:hover { border-color: var(--border-strong); }
.input:focus { border-color: var(--accent); }
```

### Icon scale on icon buttons

```css
.icon-button { transition: transform 100ms; }
.icon-button:hover .icon { transform: scale(1.05); }
```

A small inner scale of the icon (not the button) feels playful without being theatrical.

## Pressed states

Use `:active` for press feedback. See [[responsive-feedback]].

- **B2C apps:** more pronounced press (`scale(0.96)`). Adds delight.
- **B2B / productivity apps:** subtler (`scale(0.98)` or just background). Frequent users tire of springy buttons.

## Disabled states — layer them right

Disabled elements should be visually distinct but not dead:

```css
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

But for inputs:

```css
.input:disabled {
  background-color: var(--bg-disabled); /* not just opacity */
  color: var(--text-muted);
  cursor: not-allowed;
}
```

A flat opacity on a complex element (e.g., a card with multiple children) looks washed out. Set explicit disabled colors for the elements that need them; use opacity for the rest.

## Touch device gate

```css
@media (hover: hover) {
  .card:hover { transform: translateY(-1px); }
}
```

On touch devices, `:hover` triggers on tap and persists until the next tap elsewhere — looks broken. The `(hover: hover)` media query restricts hover effects to devices with actual pointers.

## When to apply

Every interactive element. The hover state is the first thing a power user notices.

## Reference

| Element | Hover | Timing |
|---|---|---|
| Primary button | `color-mix(in srgb, var(--accent), #000 10%)` | colours 160ms |
| Ghost button | `rgba(0,0,0,0.06)` on transparent | colours 160ms |
| Menu row | `rgba(0,0,0,0.06)`, 6px radius, 8px side padding | in at once, out over 150ms ease |
| Link | no surface; colour or underline only | — |

Gold example: `stageshow/kit/controls/Button.css` and `stageshow/kit/parts/Menu.css`; `stageshow/examples/gmail/gmail.css` for hover actions that cover the row's date instead of pushing it.
Benji's call differs: when the UI copies a real product, copy its own hover even if it lifts; Gmail's row rises on a soft edge-to-edge shadow, against this node's no-lift default.
Check: film the pointer sweeping down a menu at 40 to 80ms steps: the fill is on the row under the pointer in the same frame and trails off behind it, and no filled button turned gray.

## Gotcha

Hover effects that change layout (margin, padding, width) cause adjacent elements to shift. Use only `transform`, `opacity`, `background-color`, `border-color`, `box-shadow`. See [[transform-opacity-only]].

## Sources

- guidelines.sh — "Hover isn't lift-and-shadow; 1px shifts."
- Emil Kowalski — touch device hover gating, disabled-state layering.
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG (the card-hover ceiling: 1.02, `transition-transform`, 150ms).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/craft.md` (Spacing and alignment; Color and looks), `stageshow/kit/controls/Button.css`, `stageshow/kit/parts/Menu.css`, `stageshow/kit/stage.css` (ink tokens), `stageshow/examples/gmail/gmail.css`.
