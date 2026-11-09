---
title: streaming-chat-scroll
summary: A streaming chat never moves the reader against their intent. Follow the reply only while the reader sits at the live edge; any scroll, selection, keypress, link or search stops the follow; a new turn anchors near the top with part of the last one still visible; off-screen activity gets a Jump to latest; saved threads reopen at the last meaningful turn; the log is announced as additions, busy while streaming. From shadcn/ui's Message Scroller.
tags: [components, ai, chat, streaming, scroll, accessibility, shadcn]
---

# Streaming chat scroll

The defining bug of AI chat UIs is the hand-rolled stick-to-bottom hook: the reply streams, the page drags the reader down while they are reading the paragraph above, and selecting text to copy is a fight. shadcn/ui rebuilt its chat layer around one rule, **never move the reader against their intent**, and published the fifteen behaviours it implies with its Message Scroller primitive. They hold for any chat, built with shadcn or not.

## The rules

| Situation | Behaviour |
|---|---|
| A reply is streaming and the reader is at the bottom | Follow it. Auto-scroll is never the default otherwise |
| The reader scrolls, selects text, presses a key, opens a link or searches | Stop following at once. Interaction always wins over the stream |
| The person sends a message | Anchor **their** turn near the top of the viewport and let the reply grow below it; keep a sliver of the previous turn visible for context |
| New content arrives off-screen | Show it: a "Jump to latest" button, which also re-engages following |
| A saved thread reopens | At the last meaningful turn (often the person's last message), not the bottom of a long answer |
| History loads above, layout shifts, stop, retry, branch, an error | Keep the reader's position: the line they were reading stays put ([[scroll-anchoring]]) |

## Accessibility

- The scroll viewport is `role="region"` with `aria-label="Messages"` and `tabIndex={0}`, so a keyboard can scroll it.
- The message list is `role="log"` with `aria-relevant="additions"`: a screen reader hears new turns, not every token ([[screen-reader-announcements]]).
- `aria-busy` on the list while a turn streams; the scroll button is `inert` when there is nothing to jump to.

## Text that streams

Render the reply with an append-stable markdown renderer (shadcn uses Streamdown) and append-stable type: no `:last-child`, `:has()` or `:empty` in layout rules, spacing only from `margin-block-start`, so each new token never re-lays out the paragraphs above it. Fenced code goes to a code block whose Copy stays disabled until the closing fence arrives; inline code stays inline.

## In a shadcn project

Build from `message-scroller`, `message`, `bubble` and `input-group` (`npx shadcn@latest add message-scroller message bubble input-group`), wrap every row in its scroller item, and never add `use-stick-to-bottom` or a raw `ScrollArea` for the thread ([[shadcn-reconciliation]]). The step list inside a reply is [[agent-trace-states]].

## Gotcha

Scrolling to the bottom on every token "works" in a demo with short answers. Test with a reply three screens long while selecting a sentence in its first paragraph: if the selection is dragged away, the follow rule is missing.

## Sources

- shadcn/ui (MIT, github.com/shadcn-ui/ui, HEAD `8ab2771`, read 2026-11-09): `apps/v4/content/docs/components/base/message-scroller.mdx` ("What Makes a Great Streaming Chat Experience"), `code-block.mdx#markdown`, `(root)/typeset.mdx`, `skills/shadcn/rules/chat.md`. Paraphrased.
