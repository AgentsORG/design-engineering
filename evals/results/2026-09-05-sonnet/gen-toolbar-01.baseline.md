# Icon Toolbar with Tooltips

## HTML

```html
<div class="toolbar" role="toolbar" aria-label="Formatting actions">
  <button type="button" class="toolbar-btn" data-tooltip="Bold" aria-label="Bold">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 4h8a4 4 0 0 1 0 8H6z"/>
      <path d="M6 12h9a4 4 0 0 1 0 8H6z"/>
    </svg>
  </button>

  <button type="button" class="toolbar-btn" data-tooltip="Italic" aria-label="Italic">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="19" y1="4" x2="10" y2="4"/>
      <line x1="14" y1="20" x2="5" y2="20"/>
      <line x1="15" y1="4" x2="9" y2="20"/>
    </svg>
  </button>

  <button type="button" class="toolbar-btn" data-tooltip="Underline" aria-label="Underline">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 3v7a6 6 0 0 0 12 0V3"/>
      <line x1="4" y1="21" x2="20" y2="21"/>
    </svg>
  </button>

  <div class="toolbar-divider" role="separator" aria-orientation="vertical"></div>

  <button type="button" class="toolbar-btn" data-tooltip="Insert link" aria-label="Insert link">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5"/>
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12.5 19.5"/>
    </svg>
  </button>

  <button type="button" class="toolbar-btn" data-tooltip="Delete" aria-label="Delete">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  </button>
</div>
```

## CSS

```css
.toolbar {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  background: #fff;
  border: 1px solid #e2e2e5;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: #e2e2e5;
}

.toolbar-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #44444a;
  cursor: pointer;
  transition: background-color 0.12s ease, color 0.12s ease;
}

.toolbar-btn:hover {
  background: #f1f1f3;
  color: #18181b;
}

.toolbar-btn:active {
  background: #e6e6e9;
}

.toolbar-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Tooltip */
.toolbar-btn::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 4px 8px;
  border-radius: 6px;
  background: #18181b;
  color: #fff;
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 10;
}

.toolbar-btn::before {
  content: "";
  position: absolute;
  bottom: calc(100% + 4px);
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #18181b;
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
  z-index: 10;
}

.toolbar-btn:hover::after,
.toolbar-btn:hover::before,
.toolbar-btn:focus-visible::after,
.toolbar-btn:focus-visible::before {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Don't show the tooltip immediately on focus from a mouse click */
.toolbar-btn:focus:not(:focus-visible)::after,
.toolbar-btn:focus:not(:focus-visible)::before {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .toolbar-btn,
  .toolbar-btn::after,
  .toolbar-btn::before {
    transition: none;
  }
}
```

No JavaScript is required — the tooltip is pure CSS, driven by `:hover` and `:focus-visible`.

## Rationale

Each button is a native `<button>` with an `aria-label` carrying the real name (so screen readers announce "Bold", "Delete", etc.) while the visible content is an inline SVG icon sized at 18px inside a 32px hit target, keeping touch/click area comfortable without bloating the toolbar. Tooltips are implemented with `data-tooltip` + `::before`/`::after` pseudo-elements rather than the native `title` attribute, because `title` tooltips are slow to appear, unstyleable, and invisible to keyboard users — triggering on both `:hover` and `:focus-visible` (not plain `:focus`) means the tooltip appears for keyboard tabbing but not for a mouse click that leaves lingering focus. The five buttons are grouped in a `role="toolbar"` container with a visual divider separating the text-formatting cluster from the destructive/link actions, a small affordance that reads as intentional grouping rather than five undifferentiated icons in a row.
