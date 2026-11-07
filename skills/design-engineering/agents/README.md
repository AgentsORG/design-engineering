---
title: agents
summary: Subagents live in plugin/agents/ at the repo root, where the plugin manifests point.
tags: [meta, agents, subagents]
---

# Subagents (relocated)

Workflow subagents live in `plugin/agents/` at the repo root, outside the skill, and every plugin manifest points there.

See [docs/subagents.md](../../../docs/subagents.md) for the directory index, selection guide, and spec. `plugin/agents/` holds only subagent files, because the plugin registers every `.md` in it as a subagent.
