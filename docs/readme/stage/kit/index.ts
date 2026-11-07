// Trimmed for the design-engineering README scenes: only the parts the
// scenes in examples/de-* import. The full kit is Stageshow's
// (github.com/benjitaylor/skills, MIT); copy a part back from there with
// its CSS before using it here. Components import their own CSS.

// The stage: the canvas, measuring and playback
export { Stage } from './stage'
export type { StageProps, Play, LookTokens } from './stage'
export type { Act, Script } from './act'
export type { Point, Rect, Target } from './measure'
export type { Theme, Palette, Fidelity, Layout } from './looks'

// Frames
export { Window, Bar, Text, Prompt, Caret } from './window'
export type { WindowProps, BarProps, TextProps, PromptProps } from './window'

// Small parts
export { Card } from './parts/Card'
export { Row } from './parts/Row'
export type { RowProps } from './parts/Row'
export { Meter } from './parts/Meter'
export { Badge } from './controls/Badge'
export { Code } from './code'
export type { CodeLine } from './code'
