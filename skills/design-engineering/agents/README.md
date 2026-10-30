---
title: agents
summary: Subagents moved to the repo root for plugins CLI and Cursor plugin discovery.
tags: [meta, agents, subagents]
---

# Subagents (relocated)

Workflow subagents now live at the repo root so `npx plugins add` and per-host plugin manifests can discover them under `agents/`.

See [docs/subagents.md](../../../docs/subagents.md) for the directory index, selection guide, and spec. The root `agents/` folder holds only subagent files, because Claude Code registers every `.md` in it as a subagent.
