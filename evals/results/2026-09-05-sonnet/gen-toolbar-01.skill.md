# Icon toolbar with tooltips

## HTML

```html
<div class="toolbar" role="toolbar" aria-label="Formatting actions" data-toolbar>
  <button type="button" class="toolbar-btn" data-tip="Bold" aria-label="Bold" tabindex="0">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 4h8a4 4 0 0 1 0 8H6z"/>
      <path d="M6 12h9a4 4 0 0 1 0 8H6z"/>
    </svg>
  </button>

  <button type="button" class="toolbar-btn" data-tip="Italic" aria-label="Italic" tabindex="-1">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="19" y1="4" x2="10" y2="4"/>
      <line x1="14" y1="20" x2="5" y2="20"/>
      <line x1="15" y1="4" x2="9" y2="20"/>
    </svg>
  </button>

  <button type="button" class="toolbar-btn" data-tip="Underline" aria-label="Underline" tabindex="-1">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 3v7a6 6 0 0 0 12 0V3"/>
      <line x1="4" y1="21" x2="20" y2="21"/>
    </svg>
  </button>

  <div class="toolbar-divider" role="separator" aria-orientation="vertical"></div>

  <button type="button" class="toolbar-btn" data-tip="Insert link" aria-label="Insert link" tabindex="-1">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5"/>
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12.5 19.5"/>
    </svg>
  </button>

  <button type="button" class="toolbar-btn" data-tip="Delete" aria-label="Delete" tabindex="-1">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  </button>
</div>

<!-- one shared tooltip, positioned by JS — see [[responsive-feedback]] popover origin awareness -->
<div class="tooltip" id="shared-tooltip" role="tooltip"></div>
```

## CSS

```css
:root {
  /* Duolingo-forked tokens — see pov.md §2, §4 */
  --eel: #4B4B4B;
  --wolf: #777777;
  --hare: #AFAFAF;
  --swan: #E5E5E5;
  --polar: #F7F7F7;
  --snow: #FFFFFF;
  --macaw: #1CB0F6; /* focus ring — "information / secondary action" */

  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  /* tooltip is a floating layer: it keeps the canonical whisper shadow,
     the lip construction below is only for surfaces you press */
  --shadow-md:
    0 1px 2px rgba(17, 17, 17, 0.05),
    0 4px 8px rgba(17, 17, 17, 0.05),
    0 8px 24px rgba(17, 17, 17, 0.04);
}

@media (prefers-color-scheme: dark) {
  :root {
    --eel: #F1F7FB;      /* body text flips */
    --wolf: #A6B6BF;
    --hare: #6B7C86;
    --swan: #2B3D45;
    --polar: #202F36;    /* remap, not a second palette — pov.md §2 */
    --snow: #131F24;     /* ground */
    --shadow-md:
      0 4px 12px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.06);
  }
}

.toolbar {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  background: var(--snow);
  border-radius: 16px;              /* card/tile radius scale — pov.md §4 */
  box-shadow: var(--shadow-md);
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: var(--swan);
}

.toolbar-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;                      /* desktop pointer target */
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 12px;              /* inner = outer(16) − padding(4) */
  background: transparent;
  color: var(--eel);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: background-color 140ms var(--ease-out-quart),
              color 140ms var(--ease-out-quart),
              transform 100ms var(--ease-out-quart),
              box-shadow 100ms var(--ease-out-quart);
}

/* 44px touch target without inflating the visible 40px chrome */
.toolbar-btn::after {
  content: "";
  position: absolute;
  inset: -2px;
}

/* rest: quiet. hover: fill lightens (pov overrides hover-states-subtle) */
@media (hover: hover) and (pointer: fine) {
  .toolbar-btn:hover {
    background: var(--polar);
    color: var(--wolf);
  }
}

/* press: the physical lip, scaled down for an icon button — pov.md §1 */
.toolbar-btn:active {
  background: var(--polar);
  box-shadow: inset 0 0 0 2px var(--swan);
  transform: scale(0.97);
}

/* :focus-visible only — never on a mouse click that leaves lingering focus */
.toolbar-btn:focus-visible {
  outline: 2px solid var(--macaw);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(28, 176, 246, 0.15);
}
.toolbar-btn:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

/* Shared floating tooltip */
.tooltip {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  padding: 6px 10px;
  border-radius: 12px;
  background: var(--eel-always-dark, #4B4B4B);
  color: #FFFFFF;
  font: 700 12px/1.4 Nunito, "DIN Next Rounded", system-ui, sans-serif;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: var(--shadow-md);
  opacity: 0;
  transform: translate(-50%, 4px) scale(0.95);
  transform-origin: bottom center;
  transition: opacity 150ms var(--ease-out-quart),
              transform 150ms var(--ease-out-quart);
}

.tooltip[data-state="open"] {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}

.tooltip[data-state="closing"] {
  opacity: 0;
  transform: translate(-50%, 2px) scale(0.97);
  transition-duration: 110ms; /* exit ~70% of enter — asymmetric enter/exit */
}

@media (prefers-reduced-motion: reduce) {
  .toolbar-btn,
  .tooltip {
    transition-duration: 120ms;
    transform: none !important;
  }
  .tooltip { transition-property: opacity; }
}
```

## JS

```js
(() => {
  const OPEN_DELAY = 600;   // first hover in a "cold" toolbar — responsive-feedback.md
  const WARM_WINDOW = 1500; // siblings within this window open instantly
  const CLOSE_DELAY = 150;  // hover-delay symmetry, avoids flicker on overshoot

  const tip = document.getElementById("shared-tooltip");
  let lastClosedAt = 0;
  let openTimer, closeTimer;
  let activeBtn = null;

  function place(btn) {
    const r = btn.getBoundingClientRect();
    const x = Math.min(Math.max(r.left + r.width / 2, 24), window.innerWidth - 24);
    tip.style.left = `${x}px`;
    tip.style.top = `${r.top - 8}px`;
  }

  function open(btn) {
    clearTimeout(closeTimer);
    activeBtn = btn;
    tip.textContent = btn.dataset.tip;
    tip.id = "shared-tooltip";
    btn.setAttribute("aria-describedby", "shared-tooltip");
    place(btn);
    requestAnimationFrame(() => tip.setAttribute("data-state", "open"));
  }

  function scheduleOpen(btn) {
    clearTimeout(openTimer);
    const sinceLastClose = Date.now() - lastClosedAt;
    const delay = sinceLastClose < WARM_WINDOW ? 0 : OPEN_DELAY;
    openTimer = setTimeout(() => open(btn), delay);
  }

  function close() {
    clearTimeout(openTimer);
    closeTimer = setTimeout(() => {
      tip.setAttribute("data-state", "closing");
      activeBtn?.removeAttribute("aria-describedby");
      activeBtn = null;
      lastClosedAt = Date.now();
      setTimeout(() => tip.removeAttribute("data-state"), 150);
    }, CLOSE_DELAY);
  }

  const buttons = Array.from(document.querySelectorAll(".toolbar-btn"));

  buttons.forEach((btn, i) => {
    // mouse / pen only — touch must not get a stuck tooltip
    btn.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return;
      scheduleOpen(btn);
    });
    btn.addEventListener("pointerleave", close);

    // keyboard focus shows the tooltip immediately — it's a deliberate move,
    // not incidental travel, so the 600ms cold delay doesn't apply
    btn.addEventListener("focus", () => open(btn));
    btn.addEventListener("blur", close);

    // roving tabindex per the toolbar ARIA pattern — Tab enters/exits once,
    // arrow keys move focus between actions
    btn.addEventListener("keydown", (e) => {
      const focusable = buttons;
      let next;
      if (e.key === "ArrowRight") next = focusable[(i + 1) % focusable.length];
      else if (e.key === "ArrowLeft") next = focusable[(i - 1 + focusable.length) % focusable.length];
      else if (e.key === "Home") next = focusable[0];
      else if (e.key === "End") next = focusable[focusable.length - 1];
      else if (e.key === "Escape") { close(); btn.blur(); return; }
      if (next) {
        e.preventDefault();
        focusable.forEach((b) => (b.tabIndex = -1));
        next.tabIndex = 0;
        next.focus();
      }
    });
  });

  window.addEventListener("scroll", () => activeBtn && place(activeBtn), true);
})();
```

## Rationale

This is a **Build**-posture job, so `[[routing-table]]` sends it through `[[icon-systems]]` and `[[touch-and-focus]]` for the component itself, with `[[gotchas]]` and this install's `[[pov]]` loaded as the override layer per the router's rule 4. The install is forked to Duolingo's design language, and that fork is the reason this toolbar doesn't look like a stock Radix example: buttons are quiet at rest, lighten their fill on hover (pov §1 explicitly overrides `[[hover-states-subtle]]`'s 1px-shift default), and compress into an inset lip on `:active` — the scaled-down version of pov's "every pressable surface gets a lip" rule, sized for a 40px icon button instead of a 50px CTA. Radius follows pov's nested scale exactly (`16px` container, `12px` buttons = outer − the 4px padding, the same math flagged in `[[gotchas]]`'s pinched-corner entry), and the tooltip is the one element that keeps the canonical `[[shadows-whisper]]` treatment rather than the lip, because pov explicitly carves out floating layers ("anything that leaves the page plane") as an exception. Dark mode is a token remap, not a second stylesheet, per pov §2 and `[[dark-mode]]` — values flip, the tooltip's near-black chip is marked `-always-dark` because it should stay dark in both themes.

The tooltip mechanics come straight from `[[responsive-feedback]]` and `[[touch-and-focus]]`: a 600ms delay on the first "cold" hover, a 1.5s warm window in which sibling tooltips open with no delay and no entrance (`OPEN_DELAY`/`WARM_WINDOW` mirror the node's own pseudocode), and a 150ms close delay for hover symmetry so a slightly overshot pointer doesn't cause flicker. `[[duration-table]]`'s asymmetric enter/exit rule sets the fade-out to ~70% of the fade-in duration, `[[never-scale-from-zero]]` keeps the entrance at `scale(0.95)` rather than 0, and `[[easing-curves]]` supplies `--ease-out-quart` instead of a bare `ease`. `[[prefers-reduced-motion]]` disables the scale/translate on both the button press and the tooltip while keeping the opacity fade, per the node's table (translations and scale changes are the disable-worthy category, opacity isn't).

`[[accessibility-baseline]]` and `[[touch-and-focus]]` cover everything else: every icon button has a real `aria-label` (not "icon"), the visible chrome is 40px with a `::after` pseudo-element pushing the true hit area toward the 44px touch minimum, `:focus-visible` (never plain `:focus`) draws a 2px Macaw ring with a soft 4px halo per accessibility-baseline's "custom ring beats `outline: 2px solid blue`," keyboard focus opens the tooltip instantly since it's a deliberate action rather than incidental travel, and Escape dismisses it. Because the container carries `role="toolbar"`, the buttons use roving `tabindex` with arrow-key navigation instead of five independent Tab stops — the ARIA Authoring Practices pattern that role implies, and a gap the plain-Tab baseline version of this component leaves open. `[[component-api-design]]`'s one rule that applies to plain HTML rather than a component library — `type="button"`, never the implicit `submit` — is set on all five.
