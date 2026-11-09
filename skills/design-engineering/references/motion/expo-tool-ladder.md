---
title: expo-tool-ladder
summary: The cheapest-tool ladder for motion in Expo and React Native, walked top to bottom and stopped at the first match, plus the small press, toast and setup rules that keep the chosen tool working.
tags: [motion, react-native, expo, reanimated, tooling]
---

# Expo tool ladder

In an Expo app, pick the cheapest tool that does the job and stop there. Each step down costs more code, more runtime work or a heavier dependency. A worklet behind an on/off switch is overbuilt in the same way a motion package added for a single fade is. [[react-native-motion]] covers how each tool must be used once picked.

## The ladder

| Need | Tool |
|---|---|
| A state change with no gesture (press, toggle, colour) | Reanimated CSS transition |
| A loop, several stages, or a play-on-mount | Reanimated CSS animation (keyframes) |
| Mount, unmount or a list reflowing | Layout animations (`entering`, `exiting`, `itemLayoutAnimation`) |
| A finger drives it, or scroll does | Shared value + `Gesture` + `useAnimatedStyle` |
| Screen to screen | Native stack options ([[expo-navigation-motion]]) |
| A sheet that is its own screen | `presentation: 'formSheet'` |
| Tab bar | `NativeTabs` |
| Context menu, press-and-hold peek (iOS) | `Link.Menu` / `Link.Preview` |
| Header collapsing into a large title (iOS) | `headerLargeTitleEnabled` |
| Pull to refresh | `RefreshControl`, unless the pull is a signature interaction |
| UI that follows the keyboard | `react-native-keyboard-controller` |
| Illustration, celebration, empty state | Lottie, never for UI state |
| A huge scene or freeform drawing | Skia, only when the view tree itself is the bottleneck |

Climb to a shared value only for a number that changes continuously or has to be caught mid-flight: a drag qualifies, a press scale does not.

## Small rules

- **Press.** Set `pressRetentionOffset` so a press survives the small finger movement that happens while holding it. Use the same scale on both platforms; an Android ripple belongs only in a Material-styled app.
- **Builders live outside JSX.** Declare layout-animation builders at module scope; wrap per-index delays in `useMemo`. An inline chain is rebuilt on every render.
- **An RN toast** enters with `FadeInDown` over 300ms and leaves with `FadeOutDown` over 250ms, by the same edge, at `insets.bottom + 16`. A bare `bottom: 16` sits under the home indicator. On the web, use Sonner ([[sonner-usage]]).
- **Tab pill.** Trigger the selection haptic at the moment of the tap; tied to the pill's arrival it feels late ([[haptic-feedback]]).

## Setup that silently kills motion

- Install with `npx expo install`, which resolves the versions that match the SDK; plain `npm install` does not.
- Expo's Babel preset adds the worklets plugin for you. A bare RN project adds it by hand, last in the list; a missing or misplaced plugin throws `Failed to create a worklet`.
- `GestureHandlerRootView` wraps the root `_layout` once. Without it gestures do nothing and nothing errors.
- Keyboard-controller hooks need `KeyboardProvider` at the root, or the height stays at 0.
- Reanimated 4 needs the New Architecture.

## Gotcha

The commonest overbuild is a large-title header rebuilt as a scroll worklet with an animated height. The native stack already does it with `headerLargeTitleEnabled`, on the platform side and without a dropped frame. The counter-case: the option is iOS-only, so a collapsing header on Android (or any custom one) is a translate inside a fixed, clipped container, as [[react-native-motion]] describes, never a height animation.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/animate-expo/SKILL.md (Pick the tool, Dependencies, Press feedback, Setup), skills/animate-expo/RECIPES.md (Setup, Toast, Tab pill, Layout animations).
- Related: [[animation-decision-framework]], [[dependency-discipline]], [[performance-discipline]].
