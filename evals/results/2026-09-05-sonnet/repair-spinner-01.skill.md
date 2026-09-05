# Repair: spinner flashes on a 150ms request

## Fixed code

```tsx
import { useEffect, useState } from "react";

/**
 * Only reports "loading" once the request has been in flight longer
 * than `delay`. Fast responses (the 150ms case) never flip this true,
 * so nothing renders — no flash.
 */
function useDelayedLoading(isLoading: boolean, delay = 800) {
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

function MyComponent({ isLoading }: { isLoading: boolean }) {
  const showSpinner = useDelayedLoading(isLoading);

  return <>{showSpinner && <Spinner />}</>;
}
```

## Rationale

The bug is a textbook case in the skill's loading-state choice tree ([[empty-loading-states]]): 0–800ms should render nothing, with a spinner only introduced after the 800ms mark, because anything shorter reads as a flash rather than feedback — this exact scenario ("Agent reached for `<Spinner />` on a 200ms API call. Created a flash.") is a standing entry in [[gotchas]]. The fix moves the decision from "is `isLoading` true" to "has `isLoading` been true for longer than the threshold," via a `setTimeout` that's cleared if the request resolves first, so a 150ms round trip never mounts the spinner at all. This is a loading-arrival issue, not a layout-shift-from-animation one, so per [[disambiguation]] it stays scoped to [[empty-loading-states]] rather than [[transform-opacity-only]]. No [[pov]] override applies here — the Duolingo fork doesn't touch loading-state timing, so canonical defaults hold; [[states-are-the-work]] confirms this class of fix (empty/loading/error) is core product work, not a nitpick.
