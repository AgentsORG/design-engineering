// The act -> verify -> fix loop contract shared by instructions and hooks.
// An agent that wants another verify round ends its reply with the marker
// below; hooks/verify-loop.ts continues the session (bounded) when it sees it.
// Anything else (no marker, a failed turn, a person's message) stops the loop:
// a timeout or a missing reply is never approval.

export const LOOP_MARKER = /<!--\s*loop:\s*continue(?:\s+round=(\d+))?\s*-->/i;
export const LOOP_DONE_MARKER = /<!--\s*loop:\s*(done|stop|blocked)\b[^>]*-->/i;
export const DEFAULT_ROUND_BUDGET = 3;

export interface LoopDecision {
  readonly continue: boolean;
  readonly round: number | null;
}

export function readLoopMarker(reply: readonly string[] | undefined): LoopDecision {
  const text = (reply ?? []).join("\n");
  if (LOOP_DONE_MARKER.test(text)) return { continue: false, round: null };
  const match = LOOP_MARKER.exec(text);
  if (!match) return { continue: false, round: null };
  return { continue: true, round: match[1] ? Number(match[1]) : null };
}
