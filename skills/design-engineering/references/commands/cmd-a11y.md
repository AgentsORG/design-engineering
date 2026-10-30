---
title: cmd-a11y
summary: "/design-engineering a11y [target]" — accessibility audit by evidence: WCAG 2.2 criteria and numbers, keyboard maps, announcements, focus and reduced motion, returned as a table with each row tied to a criterion.
tags: [command, accessibility, judge]
---

# /design-engineering a11y

**Posture: judge.** A finding needs evidence: a WCAG criterion it fails, or a behaviour you can reproduce. Anything else is a preference, and is labelled as one.

## Steps

1. Read [[accessibility-baseline]] and [[wcag-thresholds]], then only what the target contains:
   - widgets → [[keyboard-patterns]]
   - toasts and live updates → [[screen-reader-announcements]]
   - touch and focus → [[touch-and-focus]]
   - motion → [[prefers-reduced-motion]]
   - colour → [[contrast-and-color-scheme]]
2. Read [[gotchas]] and [[pov]].
3. Severity follows the criterion. A target that meets 2.5.8 at 24 × 24 px is never the top severity ([[gotchas]], 2026-10-25).

## Output

The [[review-format]] table with a Criterion column (for example `1.4.3 AA`, `2.1.1 A`, or "preference"), with the most severe rows first.

## Hand-offs

Copy for errors and destructive actions → [[destructive-actions]], [[copy-voice]]. A whole-screen review → [[cmd-review]].
