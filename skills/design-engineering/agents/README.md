---
title: agents
summary: Subagents moved to the repo root for plugins CLI and Cursor plugin discovery.
tags: [meta, agents, subagents]
---

# Subagents (relocated)

Workflow subagents now live at the repo root so `npx plugins add` and per-host plugin manifests can discover them under `agents/`.

See [agents/README.md](../../../agents/README.md) for the directory index, selection guide, and spec.
