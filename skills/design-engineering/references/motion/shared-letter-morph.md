---
title: shared-letter-morph
summary: Text-state morphs that share letters animate the difference. "Continue" → "Confirm" via the shared "Con".
tags: [motion, text, morph, benji]
---

# Shared-letter text morphs

Benji Taylor's button transition pattern from Family: when two states of the same button share letters (e.g., **Continue** → **Confirm**), animate the shared letters in place and crossfade only the differing ones. The eye reads it as the same button *changing its mind* rather than two different buttons swapping.

## The principle

> If a component occupies a space and will persist in the next phase, it should remain consistent.

For text labels, "consistent" means the letters the user already sees should stay where they are. Only the letters that change should animate.

## How it works

**Continue → Confirm** shares `Con`. The transition:

1. The "Con" stays in place, unanimated.
2. The trailing "tinue" exits (fade + slight up-translate).
3. The new trailing "firm" enters (fade + slight up-translate, staggered slightly).

```tsx
function MorphingText({ text }: { text: string }) {
  const chars = text.split('');
  return (
    <AnimatePresence mode="popLayout">
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {char}
        </motion.span>
      ))}
    </AnimatePresence>
  );
}
```

Motion's `AnimatePresence` with `mode="popLayout"` and a key composed of `index + char` automatically does the right thing: characters that exist in both states (same index, same character) stay; characters that change get enter/exit animations.

## Why it works

The brain identifies the button by its persistent letters. As long as the "Con" stays, the user perceives this as the same button entering a new state ("I am acknowledging your continue tap, and now requiring confirmation"). If both states fade entirely, the user perceives two separate buttons appearing one after another — which feels like a UI reset.

## When to apply

- Two-step confirmation buttons (Continue → Confirm, Save → Saved, Submit → Submitted).
- State labels with shared prefixes (Loading → Loaded, Connecting → Connected).
- Counter increments where digits change (`12` → `13` — share the "1").
- Any text-state transition where the words share characters at the same indices.

## When NOT to apply

- States with no shared characters (Cancel → Done). Use a single fade-crossfade ([[cross-blur-transitions]]) instead — there's nothing to preserve.
- Long sentences. The technique works best for short labels (1–3 words). Longer text reads as a sentence, not a label, and per-character morph looks weird.
- Localized text. "Continue" → "Confirm" works in English; the Spanish equivalent ("Continuar" → "Confirmar") shares a different prefix. Don't hard-code shared-letter assumptions.

## Gotcha

The morph fails if you re-render the parent on state change with no AnimatePresence — React unmounts the old span and mounts a new one with no animation. Wrap the morphing text in `AnimatePresence` and use stable keys (index + char, not random uuid).

Also: a single character changing at the *start* of a word (Submit → Sub*j*ect-like cases) is harder to design well — the shift of the surrounding letters reads as more disruptive than a stable prefix. Where possible, design label pairs that share the *start*.

## Sources

- Benji Taylor — *Family Values*, [benji.org/family-values](https://benji.org/family-values).
- Related: [[fly-not-teleport]], [[cross-blur-transitions]], [[responsive-feedback]].
