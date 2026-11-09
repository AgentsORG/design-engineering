---
title: react-native-motion
summary: Motion in React Native and Expo lives on the UI runtime. Reanimated not core Animated, no setState per frame, springs for anything a finger touched, native navigation instead of hand-rolled transitions, haptics on the causal frame, judged on a release build.
tags: [motion, react-native, expo, reanimated, gestures, haptics]
---

# React Native motion

Mobile changes three things: there is no hover, there are two runtimes, and the user's finger is on the element. React renders on the JS runtime; Reanimated worklets run every frame on the UI runtime. Motion that touches the JS side stutters the moment the app does anything else, so the craft is keeping it on the UI runtime and leaving navigation to the platform. The web rules in [[animation-decision-framework]] and [[transform-opacity-only]] still apply.

## Threads

- **Reanimated, not core `Animated`.** Core `Animated` can't follow a gesture without crossing to JS. Gestures come from `Gesture.Pan()`, never `PanResponder`.
- **Never `setState` in a gesture or scroll handler.** Shared value → `useAnimatedStyle`; React never re-renders.
- **`scheduleOnRN` (which replaces `runOnJS`) only in `onEnd`**, or in a `useAnimatedReaction` that fires when a value crosses a threshold. In `onUpdate` it runs 60–120 times a second.
- **Read and write shared values with `.get()` / `.set()`**, only in worklets, handlers and effects — never during render. Helpers called from a worklet need the `'worklet'` directive.
- **Build a gesture once (`useMemo`) and copy the current value into a start shared value in `onStart`.** A rebuilt gesture can drop a drag in flight; a pan that starts from 0 makes a mid-spring grab jump. On Gesture Handler v3 the gesture is a hook (`onActivate` / `onDeactivate`, `event.canceled` replaces `success`) and needs no memo.

## Tools and properties

- Walk [[expo-tool-ladder]] and stop at the first tool that fits. A two-state press or toggle is a Reanimated CSS transition; a shared value is for continuous or interruptible values only. Rows that reveal action buttons use `ReanimatedSwipeable`; hand-build only a commit that needs momentum projection.
- Use the native stack for screen transitions, `presentation: 'formSheet'` for a sheet that is its own screen, `NativeTabs` for the tab bar ([[expo-navigation-motion]]). **Tabs never slide**: `animation: 'none'`.
- Anything that follows the keyboard is translated by `react-native-keyboard-controller`'s height shared value. `Keyboard.addListener` plus `withTiming` always drifts: the event reaches JS after the keyboard has started, and the system curve is private.
- Layout properties re-run layout for the node and its siblings. The exception is an absolutely positioned element with no children (a tab pill, a progress fill), where `width` keeps the corner radius that `scaleX` would smear.
- `transform` is an ordered array: put translate first, or the scale multiplies it. A `'100%'` translate is the element's own size, so a sheet moves by its own height whatever it holds.
- Collapse a header by translating content inside a fixed-height, clipped container, never by animating `height`. Never animate to a hardcoded height either: at 200% font scale it is wrong. Measure with `onLayout`.
- Never animate Android `elevation` or `BlurView` intensity; crossfade a static pre-rendered layer.
- Never put `entering` on rows of a virtualized list: recycled rows re-fire it while scrolling. Use `itemLayoutAnimation` for reflow.

## Springs

If a finger was involved, use a spring and pass it the release velocity ([[gesture-momentum]]). Pass `reduceMotion: ReduceMotion.System`; reduced means fewer and gentler, keeping opacity and colour ([[prefers-reduced-motion]]).

| Interaction | Config |
|---|---|
| Settle, no overshoot | `{ duration: 400, dampingRatio: 1 }` |
| Snap back after a drag | `{ duration: 400, dampingRatio: 0.8, velocity }` |
| Sheet or drawer | `{ duration: 300, dampingRatio: 0.8, velocity }` |
| Dismiss past a hard edge | add `overshootClamping: true` |

Press feedback is `scale: 0.97` in 100–150ms on press-in; commit on press-out. Targets are 44pt (48dp on Android); grow `hitSlop`, not the visual. Declare the pan axis with `activeOffsetX: [-10, 10]` or it steals vertical scrolls. Clamp every scroll `interpolate` with `Extrapolation.CLAMP`.

## Haptics

`selectionAsync` for a detent tick, `impactAsync(Light)` when something snaps home, `notificationAsync` for success or error. Fire on the causal frame, once per user action, never per frame or on an entrance the user didn't cause, and never as the only feedback.
The same families on the mobile web, with the Android and iOS Safari routes: [[haptic-feedback]].

## Reference

Swipe to archive: the row 1:1 under the finger, thrown off at the speed it left ([[momentum-projection]]), the list told only once it has gone:

```tsx
const start = useSharedValue(0);
const pan = useMemo(() => Gesture.Pan()
  .activeOffsetX([-10, 10])
  .onStart(() => start.set(x.get()))
  .onUpdate((e) => x.set(start.get() + e.translationX))
  .onEnd((e) => {
    const resting = x.get() + (e.velocityX / 1000) * 0.998 / 0.002;
    const to = resting < -width / 2 ? -width : 0;
    const cfg = { duration: 300, dampingRatio: 0.8, velocity: e.velocityX, overshootClamping: to !== 0 };
    x.set(withSpring(to, cfg, (done) => { if (done && to !== 0) scheduleOnRN(archive, id); }));
  }), [width, id]);
```

- **Card-stack flick.** Before: a `PanResponder` on JS, so the card trails the finger, leaves only past half its width (a quick short flick fails) and eases back over 300ms. After: `Gesture.Pan()` 1:1 on the UI runtime, commit when the projected rest point clears the threshold, exit with `withTiming` 200ms, one `impactAsync(Light)` on the commit frame, the cards below reflow through `itemLayoutAnimation`.
- **Gold example:** `stageshow/examples/swipe/` for the anatomy native Mail has: Archive is the row's own back, same height and edge to edge, its mark riding the row's trailing edge, and the gap closes in one ease with the color solid, never through gray. For an in-app response no finger drives, Benji's timing is UIKit-quick, 0.5s on `cubic-bezier(0.3, 0.75, 0.1, 1)`, which is `withTiming(v, { duration: 500, easing: Easing.bezier(0.3, 0.75, 0.1, 1) })` (`stageshow/references/motion.md`, Phones in motion).
- **Check:** on a release build on a device, screenshot the frame at the furthest point of the swipe at full size, the one people share: row text is cut only by the list's edge and the action fills the row's height. Width emulation doesn't change touch, so judge the throw on hardware.

## Gotcha

Expo Go and the simulator hide exactly the problems that matter. Judge feel on a release build on the slowest device you support. On ProMotion iPhones third-party animation is capped at 60fps unless `CADisableMinimumFrameDurationOnPhone` is set in the Info.plist; once it is set, the frame budget is 8ms.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, unchanged since `a81dbca`; unchanged through `715c180`): skills/animate-expo/SKILL.md, skills/animate-expo/RECIPES.md. Gesture plumbing, keyboard, property and reduced-motion rules added at HEAD `715c180` (read 2026-11-09): RECIPES.md, SKILL.md.
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG: the card-stack flick.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/examples/swipe/index.tsx`, `stageshow/references/motion.md` (Phones in motion), `stageshow/references/rehearse.md` (What the tools can't sign off).
- Related: [[spring-animations]], [[gesture-momentum]], [[momentum-projection]], [[prefers-reduced-motion]], [[touch-and-focus]].
