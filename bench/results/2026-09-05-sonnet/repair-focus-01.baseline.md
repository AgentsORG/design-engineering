# Repair: Keyboard users tab into the closed drawer

```css
.drawer {
  opacity: 0;
  transform: translateX(100%);
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0s linear 0.2s;
}

.drawer.is-open {
  opacity: 1;
  transform: translateX(0);
  visibility: visible;
  pointer-events: auto;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0s linear 0s;
}
```

```html
<!-- Toggle both the class and inert for robustness -->
<div class="drawer" inert>
  ...
</div>
```

```js
// When opening/closing the drawer, keep inert in sync with the visual state
function setDrawerOpen(el, open) {
  el.classList.toggle('is-open', open);
  el.inert = !open;
  if (open) el.querySelector('[data-autofocus]')?.focus();
}
```

**Rationale:** `opacity: 0` and `transform: translateX(100%)` only change how the drawer looks — they don't remove it from the layout, the accessibility tree, or the tab order, so a sighted mouse user never notices it's "there," but a keyboard user tabs straight into invisible, off-screen controls. Adding `visibility: hidden` (delayed via `transition-delay` so the fade/slide-out still plays before it drops out) and `pointer-events: none` takes the closed drawer out of the tab sequence and click target area entirely, while the delayed transition preserves the existing animation. Pairing that with the `inert` attribute (toggled in JS alongside the open/closed class) is the more bulletproof fix, since `inert` also blocks programmatic `.focus()` calls and screen-reader virtual-cursor entry, not just sequential Tab navigation — belt-and-suspenders for a container whose contents may still receive focus some other way.
