# Repair: keyboard users tab into the closed drawer

## Issue

```css
.drawer { opacity: 0; transform: translateX(100%); }
```

`opacity: 0` and an off-screen `transform` only hide a drawer *visually*. Every control inside it stays in the tab order, so a keyboard user tabs past the trigger straight into a panel they cannot see, with no way to tell where focus went.

## Fixed code

```css
.drawer {
  position: fixed;
  inset-block: 0;
  right: 0;
  width: min(360px, 100vw);

  /* visual closed state — GPU-only properties */
  opacity: 0;
  transform: translateX(100%);
  transition: transform 240ms var(--ease-out-quart, cubic-bezier(0.165, 0.84, 0.44, 1)),
              opacity 240ms var(--ease-out-quart, cubic-bezier(0.165, 0.84, 0.44, 1));
}

.drawer[data-state="open"] {
  opacity: 1;
  transform: translateX(0);
}
```

```html
<div
  class="drawer"
  role="dialog"
  aria-modal="true"
  aria-labelledby="drawer-title"
  data-state="closed"
  inert
>
  <h2 id="drawer-title">Drawer title</h2>
  <button type="button" aria-label="Close" data-dismiss>×</button>
  <!-- drawer content -->
</div>
```

```js
function setDrawerOpen(drawerEl, triggerEl, open) {
  drawerEl.dataset.state = open ? "open" : "closed";
  // `inert` pulls every descendant out of the tab order AND blocks
  // pointer/AT interaction — opacity/transform alone do neither.
  drawerEl.inert = !open;

  if (open) {
    // focus moves in: first focusable control (or the dialog itself)
    drawerEl.querySelector("[data-autofocus], button, a, input")?.focus();
  } else {
    // focus never strands on a removed/hidden node — give it back
    triggerEl.focus();
  }
}
```

## Rationale

This matches the exact entry already logged in `[[gotchas]]` (2026-09-05): *"Agent hid a closed drawer with `opacity: 0`; keyboard users tabbed into it → `inert` or `visibility: hidden`. See `[[touch-and-focus]]`."* The repair applies `[[touch-and-focus]]` rule 6 (hidden content must leave the tab order via `visibility: hidden`, `display: none`, or `inert` — never `opacity: 0` or an off-screen transform alone) and rule 7 (overlays move focus in on open and restore it to the trigger on close, never stranding focus on a removed node), backed by `[[accessibility-baseline]]`'s keyboard floor ("everything interactive is reachable by Tab" cuts both ways — nothing *invisible* should be). `inert` was chosen over `visibility: hidden` because it removes the panel from both the tab order and the accessibility tree while leaving `opacity`/`transform` free to keep doing the visual animation — which `[[transform-opacity-only]]` requires stay GPU-only properties, so the fix doesn't trade a11y for jank. The dialog role, label, and explicit close control follow `[[tray-rules]]`'s "title + dismiss are always present" rule for this drawer/tray pattern. `[[pov]]` (this install's Duolingo fork) is silent on drawer/focus mechanics, so canonical guidance holds untouched.
