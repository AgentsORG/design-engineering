---
title: apple-design-principles
summary: Apple's eight design principles as names to reason with, since every craft rule serves one of four human needs, plus the tactics under them (four kinds of feedback, wayfinding, controls beside what they change, labels named for their contents).
tags: [philosophy, apple, principles, feedback, wayfinding]
---

# Apple's design principles

Every craft rule in this graph serves one of four human needs: to feel safe and able to predict what happens next, to understand what is in front of them, to get the thing done, and to enjoy it. Apple names eight principles that sit between those needs and the pixels. Use the names when you argue for a decision; they are the "why" a spring curve or a spacing token answers to.

## The eight

- **Purpose** — the first decision is what to leave out. A feature costs people time and attention, so it has to give back more than it takes.
- **Agency** — the person stays in charge. Undo absorbs mistakes; a confirm dialog guards only what cannot come back, because a dialog on everything teaches people to dismiss it unread ([[destructive-actions]]).
- **Responsibility** — work for the person, not against them. Request access when the feature needs it, ask for the minimum, and explain the reason.
- **Familiarity** — things that look alike act alike and sit in the same spot. Depart from a known pattern only when testing proves the new one wins.
- **Flexibility** — adapt to the device, the situation and every level of ability; where no single layout works for all, let people reorder or hide parts.
- **Simplicity, not minimalism** — cut what does not help so the main job stands out. Adding a fact can simplify: a file size beside a download button saves a guess.
- **Craft** — no value is arbitrary; you can say why each gap, duration and offset is what it is. A stuttering list or an icon a pixel off tells people nobody checked.
- **Delight** — the payoff of the other seven done well, never a celebration bolted on afterwards ([[delight-impact-curve]]).

## Tactics that serve them

- **Four kinds of feedback**: status (something is running), completion (it worked), warning (it is about to go wrong), error (it went wrong). Validate inline as people type, not after submit ([[forms-behavior]]).
- **Wayfinding**: on any screen a person can tell their location, the places they can go next, what the screen holds and how to leave it ([[information-architecture]]). A screen with no way back is a dead end.
- **Mapping**: put a control next to what it changes and arrange it in the same shape. If a caption has to say what a control affects, move the control.
- **Labels name their contents**: "Invoices" and "Drafts" predict what is behind them; "Hub" and "Overview" do not.

## When to apply

At the start of a review that has to justify itself to someone who does not care about easing curves, and when two fixes compete: pick the one that serves the need higher up the list (safety before delight). For the motion side of Apple's guidance, go to [[spring-animations]] and [[gesture-phases]]; for materials, [[translucent-materials]].

## Reference

- Bad: a settings screen that folds every option into one overflow menu. It looks clean and fails Simplicity, Familiarity and wayfinding at once.
- Good: the three settings people change weekly shown inline next to what they affect, the rest one level deeper under a label that names them.

Check: open any screen cold and answer the four wayfinding questions in one breath each. Any you cannot answer is the first fix.

## Gotcha

Minimal is not simple. A screen that hides everything behind one menu has fewer pixels and more work: the user now has to remember where things are. Count the steps to the common task, not the elements on the screen.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/apple-design/SKILL.md, The Core Idea (the four needs) and §16 (the eight principles, after Apple's WWDC 2026 talk *Principles of Great Design*, and the tactical rules under them).
