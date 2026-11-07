# Repair: Page zooms when tapping the search field on iPhone

## Fixed code

```css
input[type=search] {
  font-size: 16px;
}

@media (min-width: 768px) {
  input[type=search] {
    font-size: 14px;
  }
}
```

## Rationale

iOS Safari automatically zooms the viewport when focusing a text input whose computed `font-size` is below 16px, since it assumes anything smaller is too hard to read and tap into. The original rule set `font-size: 14px` unconditionally, which triggers that zoom on iPhone. The fix keeps the input at (or above) the 16px threshold on small/touch viewports so focus no longer zooms, and only drops back to the original 14px once the viewport is wide enough (`min-width: 768px`) to represent a non-mobile, non-zooming context — preserving the original visual density on desktop while fixing the mobile bug. (An equally valid alternative is to just set `font-size: 16px` everywhere and adjust visual size via `padding`/`transform: scale()` if 14px was purely a stylistic choice.)
