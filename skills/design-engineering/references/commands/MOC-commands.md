---
title: MOC-commands
summary: The verbs behind the single entry `/design-engineering [verb] [target]` — one command file per job, each a whole procedure that points into the graph.
tags: [moc, commands, routing]
---

# MOC — Commands

The skill has one entry point. `/design-engineering` reads its first argument, and if that is a verb, it opens the matching file here. The dispatch table at the top of SKILL.md is the canonical index of verbs and aliases. This MOC exists so the graph view shows the cluster.

- [[cmd-review]] — a judge-posture UI review; change-scoped for a diff.
- [[cmd-polish]] — the screen works but feels unfinished; fixes applied.
- [[cmd-motion]] — whether it should move, then concrete timing and easing.
- [[cmd-tells]] — AI-default tells as a deletion list.
- [[cmd-a11y]] — an evidence-only accessibility audit.
- [[cmd-tokens]] — find the design contract and thread its tokens.
- [[cmd-sound]] — decide, design, generate and wire a sound family.
- [[cmd-svg]] — `create`, `animate` or `sticker`.
- [[cmd-film]] — `plan`, `review` or `formats` for a launch film.
- [[cmd-stage]] — `still`, `demo`, `bento` or `review`: faux product UI, framed first and filmed.
- [[cmd-ship]] — the whole-app production pass: every lane, fixed and verified.
- [[cmd-break]] — worst-case data until something breaks; reports and stops.
- [[cmd-mobile]] — a web app that feels native on a phone.
- [[cmd-council]] — judges on different providers score; you fix and re-judge until all clear a hidden bar.
- [[cmd-grade]] — a report card on a finished design episode, human or agent, on one scale.
- [[cmd-small]] — `diagram`, `options` (`riff`, `tune`, `mix`, `keep`), `pick`, `name`, `which`, `agentation`, `pov`.

## Rules for a command file

A command file is a procedure, not knowledge. It names its posture, the nodes to read in order, the steps, the output shape and where to hand off, and it says nothing a node already says. Each one must run on its own, because a skills.sh install has no subagents. A new verb needs a row in the SKILL.md table, a file here and a line in `evals/dispatch.jsonl`, or CI fails.

Every command file ends its procedure with a `## Hand-offs` section: two or three neighbour verbs, each with a short reason that says when to move on ("the soundtrack, once picture is locked → `sound`"). It is the one source for a verb's pairings: the README's Pairs with column and any skill page ([[skill-docs-pages]]) read it and keep no copy of their own.

## Gotcha

A bare `/design-engineering` never auto-runs a verb. It shows the menu and leads with the two or three verbs that fit what is in front of it, the way impeccable's no-argument menu does. Auto-running surprises users, and a wrong guess spends a whole pass.

## Sources

- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG: two or three pairings per skill, each with a reason.
- AgentsORG, the 3.0.0 single-entry migration. Its pattern comes from pbakaus/impeccable's command table and no-argument menu (`SKILL.md`, `reference/routing.md`), and from the Claude Code skills docs (`ARGUMENTS:` is appended when the body has no placeholder; routing belongs in the first 5,000 tokens, which survive compaction).
