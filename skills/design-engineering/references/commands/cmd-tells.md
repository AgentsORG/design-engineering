---
title: cmd-tells
summary: "/design-engineering tells [target]" — scan UI, code or copy for AI-default tells and return a prioritized deletion list, not a redesign.
tags: [command, anti-patterns, unslop, judge]
---

# /design-engineering tells

Aliases: `unslop`, `slop`. **Posture: judge.** The output is a list of things to delete, not a new visual direction.

## Steps

1. Pick the surface and read only its nodes:
   - a screen or page → [[ai-default-tells]], [[content-authenticity]]
   - a screenshot → [[screenshot-critique]]
   - copy, a README or release notes → [[copy-tells]]
   - code → [[code-tells]]
   - a dashboard → [[dashboard-tells]]
2. Read [[gotchas]] and [[pov]]. The installer's hard rules outrank the catalog.
3. Run [[unslop-pass]] in its order. Every tell you remove must leave something better behind, because removing tells and leaving a thin screen is its own failure.

## Output

A numbered deletion list, highest impact first. Each item gives what to remove or replace, where it is (file:line or the region of the screen), and the `[[node]]` that names the tell. Then one line on what to enlarge or keep, so the screen is not left empty.

## Hand-offs

Propose a new direction only if the user asks after the scan, and then run `options` from [[cmd-small]]. You may delegate to the `anti-pattern-scanner` subagent where the host has it.
