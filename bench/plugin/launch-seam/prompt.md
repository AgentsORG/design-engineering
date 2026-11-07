---
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
tags: [launch-video, motion]
---

In our HyperFrames launch film the scene change dims halfway like a flash, and the held pricing card never stops breathing. Fix the GSAP:

```js
tl.to('#sceneA', { opacity: 0, duration: 0.6 }, 4.0);
tl.from('#sceneB', { opacity: 0, duration: 0.6 }, 4.3);
tl.to('#price', { scale: 1.03, yoyo: true, repeat: -1, duration: 1.2 }, 4.6);
```

Answer in one reply with every piece of code in fenced code blocks. The workspace is empty: do not look for project files and do not ask questions.
