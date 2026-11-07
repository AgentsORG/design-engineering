import { Badge, Card, Meter, Stage, Text, Window } from '../../kit'
import '../_de/de.css'

// Built from examples/static-card: a light window pinned top-left that runs
// off the right and the bottom, and one detail card over its empty margin.
// The window is grade.mjs's report card as it prints it (# Design grade, the
// episode line, then Axis | Score | Ceiling | Band); the card is the one
// axis the checks capped, with its fact and the interpretation line the
// script writes. Scores are one solid accent; the capped axis takes the
// warning tone because a cap is a status.
type Axis = [label: string, score: number, ceiling: number, band: string]
const AXES: Axis[] = [
  ['Craft', 8.1, 10, 'refined'],
  ['Motion', 7.2, 10, 'crafted'],
  ['Restraint', 7.8, 10, 'crafted'],
  ['Access', 6.4, 6.4, 'crafted'],
  ['Verification', 7.6, 10, 'crafted'],
]
const COLS = { gridTemplateColumns: '88px 130px 30px 52px 64px' }

export default function Grade() {
  return (
    <Stage width={800} height={420} className="de de-grade">
      {() => (
        <>
          <Window title="Design grade" className="de-win de-card-win" style={{ width: 820, height: 440 }}>
            <div className="de-page">
              <Text className="de-mono de-dim">Episode a3f9c2e1 · 4 file(s) · 2 evidence file(s) · judges: claude ok, codex ok</Text>
              <div className="de-table">
                <div className="de-tr" data-head style={COLS}>
                  <Text className="de-label">Axis</Text><Text className="de-label">Score</Text><span /><Text className="de-label">Ceiling</Text><Text className="de-label">Band</Text>
                </div>
                {AXES.map(([label, score, ceiling, band]) => (
                  <div key={label} className="de-tr" style={COLS}>
                    <Text className="de-sub de-strong">{label}</Text>
                    <Meter value={score / 10} tone={ceiling < 10 ? 'warning' : 'accent'} />
                    <Text className="de-num">{score.toFixed(1)}</Text>
                    <Text className="de-sub">{String(ceiling)}</Text>
                    <Text className="de-sub">{band}</Text>
                  </div>
                ))}
              </div>
            </div>
          </Window>
          <Card className="de-sat de-grade__card" pad="medium" gap={10}>
            <div className="de-grade__head">
              <Text className="de-h">Access: 6.4</Text>
              <Badge tone="warning">capped</Badge>
            </div>
            <Text className="de-mono de-grade__fact" wrap>color #8a8f98 on #1c1d21 = 2.9:1</Text>
            <Text className="de-sub" wrap>Judges said 7.1; the checks cap it at 6.4.</Text>
          </Card>
        </>
      )}
    </Stage>
  )
}
