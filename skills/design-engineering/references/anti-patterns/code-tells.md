---
title: code-tells
summary: Generated UI code is rarely buggy and still costs you — narrated comments, catch theater, silent fallbacks, casts that delete compiler errors, V2 names, one-call wrappers, dead scaffolding, celebratory logs, weakened tests, drive-by diffs. The default fix is deletion.
tags: [anti-patterns, code, review, generated]
---

# Code tells

Nobody flags generated code for one bad line; they recognize the accumulation: a comment narrating every statement, a try-catch around code that can't throw, a fallback to an empty array, a helper that exists two files over. Models were trained where code that *runs* wins, so they over-defend, over-comment, and over-scaffold — everything that keeps a snippet alive in isolation makes it slop inside a codebase. It compiles, it passes, and it buries intent, hides real failures, and doubles what the next reader has to hold. This node is the pass over any generated UI change, and the default fix for almost every item is deletion.

## The pass

Scan in order — comments, defense, types, naming, structure, logging, tests, scope. Delete first; rewrite only where behavior must survive. When removing a cast, catch, or fallback forces a choice, choose the **loud failure** (a throw, a failed build) over the quiet wrong answer. Match the room: mirror the surrounding codebase's comment density, naming, and error idiom.

## Comments

One test: **does the comment state something the code cannot?** A constraint, a unit, a tradeoff, the bug it works around — keep. Narration (`// increment the counter`), reviewer notes (`// Updated to use the new API`), section dividers, docstrings that restate the signature, commented-out code, file-level summaries — delete. When editing a region, re-read every comment in it; the ones the edit invalidated now lie.

## Defensive theater

- Null checks against states the types or the lines above already guarantee. Fix the type once instead.
- Catch-log-rethrow, empty catches, `catch (e) { console.error(e) }` that continues as if it succeeded. Handle errors once at a real boundary with context, or don't catch.
- **Silent fallbacks** — `catch { return [] }`, `?? default` masking a failed fetch, a simpler backup path. The most dangerous item on the list: tests stay green while the primary path is broken. Fail loudly unless degraded behavior is a product decision, and then make it visible.
- Validation repeated at every layer; `x !== null && x !== undefined && x !== ''` where one check suffices.

## Types, names, structure

- `as any`, `as unknown as X`, `@ts-ignore`, a `!` that silences instead of fixes: the compiler error was information. A cast survives only with a comment stating the invariant.
- `data`, `result`, `item`, `handler`: name what the value *means* (`unpaidInvoices`, `retryDelayMs`). `fetchDataV2`, `EnhancedButton`, `utils-new.ts`: replace the old thing and take its name; a deprecated alias only for published public API.
- One-call wrappers, options objects with one caller, interfaces with one implementation, duplicate helpers the model didn't search for, unrequested compatibility shims, scaffolding from an abandoned approach, unused imports, `TODO: implement error handling` stubs.
- A hand-styled lookalike of a component the repo already has (a second button class, a card `div`) is the duplicate helper in UI form, and it is where uneven padding, squeezed labels and unsized text come from. Use the existing part through its props and tokens (Benji Taylor, Stageshow `SKILL.md`).

## Logging, tests, scope

`console.log('here')`, entry/exit logs, and `✅ Successfully initialized!` are debug leftovers and ceremony; log what an operator needs in the repo's style, or nothing. Never delete, skip, or weaken a test to pass it; a test that reproduces the implementation's calculation passes when both are wrong — assert an independently known outcome. Keep the diff to what the task required; propose unrelated cleanup separately.

## When to apply

Before opening a PR on generated UI code, after any agent-written change, when a diff "reads like Copilot wrote it". Pair with [[review-format]] — a code tell is a row only when it changes what ships.

## Reference

A generated change and the same change after the pass:

```tsx
// Bad: narration, a non-null cast, a silent fallback, a V2 name, a lookalike button
// Fetch the invoices for the user
const data = (await fetchInvoicesV2(user!.id).catch(() => [])) as any
return <button className="btn-new" style={{ padding: '6px 14px' }}>Pay</button>

// Good: the name says what it holds, a failed fetch throws, the repo's own Button
const unpaidInvoices = await fetchInvoices(user.id, { status: 'unpaid' })
return <Button size="sm">Pay invoices</Button>
```

Gold example: `stageshow/examples/static-card/index.tsx`. Its few comments carry only reasons the code can't show (why the active nav item is marked by weight instead of a pill), and every part comes from the kit.
Check: run the repo's typecheck and tests before and after the pass; pre-existing failures are reported apart and never filtered into a pass (Stageshow `references/rehearse.md`, Typecheck). Then read only the comments left in the diff: each must say something the line under it can't.

## Gotcha

"Matching the room" cuts both ways. A repo with dense comments and defensive checks by convention is not slop; deleting to a standard the codebase doesn't hold is a drive-by change, which is item ten.

## Sources

- Emil Kowalski's design-engineering practice on generated code, distilled by AgentsORG.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/SKILL.md` (Use the kit part, never a lookalike), `stageshow/references/rehearse.md` (Typecheck), `stageshow/examples/static-card/index.tsx`.
- Related: [[review-format]], [[dependency-discipline]], [[unslop-pass]].
