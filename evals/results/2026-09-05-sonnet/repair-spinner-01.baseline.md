# Repair: Spinner flashes on a 150ms request

## Fixed code

```tsx
import { useEffect, useState } from "react";

/**
 * Delays showing the spinner until the request has been in flight for
 * `delay` ms, so fast responses never render a visible flash.
 */
function useDelayedLoading(isLoading: boolean, delay = 300) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowSpinner(false);
      return;
    }

    const timer = setTimeout(() => setShowSpinner(true), delay);
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showSpinner;
}

// Usage
function MyComponent({ isLoading }: { isLoading: boolean }) {
  const showSpinner = useDelayedLoading(isLoading, 300);

  return <>{showSpinner && <Spinner />}</>;
}
```

## Rationale

The original code renders the spinner the instant `isLoading` becomes true, so a request that resolves in 150ms produces a spinner that mounts and unmounts almost immediately — a flash that reads as a glitch rather than useful feedback. The fix withholds the spinner behind a short delay (commonly 200–300ms, roughly the threshold below which state changes feel instantaneous to users); if the request finishes before the timer fires, `isLoading` flips back to `false`, the timeout is cleared, and the spinner never appears at all. For requests that do run long, the spinner still shows up quickly enough to reassure the user that something is happening. (A related but separate concern — avoiding a spinner that appears and then immediately disappears once shown — is solved with a *minimum display duration* rather than a delay; the two are often combined, but a delay alone is the correct fix for this specific flash-on-fast-response issue.)
