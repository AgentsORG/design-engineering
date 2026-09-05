```css
.dropdown {
  transform-origin: top left;
  animation: pop 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

The original used `scale(0)` with `ease-in`, which grows the panel from nothing at the center of its own box and starts slow/accelerates — the opposite of how an entrance should feel and disconnected from the trigger. I set `transform-origin` to the corner nearest the trigger (e.g. `top left` for a trigger above-left of the panel; swap to match actual placement, or drive it dynamically with a custom property like `transform-origin: var(--dropdown-origin)` if the trigger can be on either side) so the panel visibly unfurls from the button instead of expanding from its own center. I also softened the start scale from `0` to `0.95` — real UI elements don't balloon in from a point, they settle from a slightly smaller state — switched to an ease-out-style curve (fast start, gentle settle) which reads as responsive for things appearing on screen, and trimmed the duration to 150ms since opening affordances like this should feel immediate rather than lingering at 400ms.
