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

## Tools and properties

- A two-state press or toggle is a Reanimated CSS transition; a shared value is for continuous or interruptible values only.
- Use the native stack for screen transitions, `presentation: 'formSheet'` for a sheet that is its own screen, `NativeTabs` for the tab bar, `react-native-keyboard-controller` for anything that follows the keyboard. **Tabs never slide**: `animation: 'none'`.
- Layout properties re-run layout for the node and its siblings. The exception is an absolutely positioned element with no children (a tab pill, a progress fill), where `width` keeps the corner radius that `scaleX` would smear.
- Never animate Android `elevation` or `BlurView` intensity; crossfade a static pre-rendered layer.
- Never put `entering` on rows of a virtualized list: recycled rows re-fire it while scrolling. Use `itemLayoutAnimation` for reflow.

## Springs

If a finger was involved, use a spring and pass it the release velocity ([[gesture-momentum]]).

| Interaction | Config |
|---|---|
| Settle, no overshoot | `{ duration: 400, dampingRatio: 1 }` |
| Snap back after a drag | `{ duration: 400, dampingRatio: 0.8, velocity }` |
| Sheet or drawer | `{ duration: 300, dampingRatio: 0.8, velocity }` |
| Dismiss past a hard edge | add `overshootClamping: true` |

Press feedback is `scale: 0.97` in 100–150ms on press-in; commit on press-out. Targets are 44pt (48dp on Android); grow `hitSlop`, not the visual. Declare the pan axis with `activeOffsetX: [-10, 10]` or it steals vertical scrolls. Clamp every scroll `interpolate` with `Extrapolation.CLAMP`.

## Haptics

`selectionAsync` for a detent tick, `impactAsync(Light)` when something snaps home, `notificationAsync` for success or error. Fire on the causal frame, once per user action, never per frame or on an entrance the user didn't cause, and never as the only feedback.

## Gotcha

Expo Go and the simulator hide exactly the problems that matter. Judge feel on a release build on the slowest device you support. On ProMotion iPhones third-party animation is capped at 60fps unless `CADisableMinimumFrameDurationOnPhone` is set in the Info.plist; once it is set, the frame budget is 8ms.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/animate-expo/SKILL.md, skills/animate-expo/RECIPES.md.
- Related: [[spring-animations]], [[gesture-momentum]], [[momentum-projection]], [[prefers-reduced-motion]], [[touch-and-focus]].
