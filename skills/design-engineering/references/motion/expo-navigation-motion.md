---
title: expo-navigation-motion
summary: Screen-to-screen motion in Expo Router comes from native stack options, never a JS rebuild. Push for depth, modal for an abandonable task, formSheet with detents for a short interruption, no motion between tabs, fade under reduced motion, and animationMatchesGesture with any custom animation.
tags: [motion, react-native, expo, navigation, sheets]
---

# Expo navigation motion

Screen transitions in an Expo app are configured on the native stack, not built. The OS animates it off the JS thread, the interactive back swipe comes with it, and it looks like the rest of the system. Navigation is the one place to match the platform's own timing (an iOS push runs about 350ms); every other UI motion stays under 300ms and beats it ([[duration-table]]). The thread and spring rules are in [[react-native-motion]].

## Pick the option

| The user is | Option |
|---|---|
| Going deeper into a hierarchy | `animation: 'default'`, the platform push, untouched |
| Starting a self-contained task they may abandon | `presentation: 'modal'` |
| Briefly interrupted (picker, filter, share) | `presentation: 'formSheet'` with `sheetAllowedDetents` |
| Switching tabs | `animation: 'none'` |
| Asking for reduced motion | `animation: 'fade'` on the stack's `screenOptions` ([[prefers-reduced-motion]]) |

## The back swipe must match

Whenever a screen gets a custom `animation` (say `slide_from_right`), also set `animationMatchesGesture: true`. The iOS back swipe then plays your transition in reverse under the finger. Without it, pushing forward and dragging back look like two different apps.

```jsx
<Stack screenOptions={{ animation: reduced ? 'fade' : 'default' }}>
  <Stack.Screen name="settings" options={{ animation: 'slide_from_right', animationMatchesGesture: true }} />
  <Stack.Screen name="filter" options={{ presentation: 'formSheet', sheetAllowedDetents: 'fitToContents' }} />
</Stack>
```

## formSheet is native on both, not the same on both

- **Three detents on Android.** A longer `sheetAllowedDetents` list works on iOS and is cut short on Android without a warning. Design for three.
- **The grabber is iOS-only.** `sheetGrabberVisible` draws nothing on Android.
- **No native header or nested stack inside an Android sheet.** Keep the sheet to one screen; if it needs its own navigation, it is a `modal`.
- **`fitToContents` needs sized content.** A root that only says `flex: 1` gives the sheet nothing to measure, so the detent comes out wrong; set a real size on the content.

A formSheet's drag and settle come from the platform for free; hand-build a sheet only when it isn't a screen, using the spring rows in [[react-native-motion]] and [[gesture-phases]].

## Gotcha

A grabber as the sheet's only "you can drag this" cue looks right on an iPhone and is simply absent on Android, so the swipe-down goes undiscovered there. Give the sheet a visible close or done control as well, and check both platforms on hardware, not one simulator.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/animate-expo/RECIPES.md (Screen transitions), skills/animate-expo/SKILL.md (Timing, Reduced motion).
- Related: [[expo-tool-ladder]], [[touch-and-focus]], [[haptic-feedback]].
