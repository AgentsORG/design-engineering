import { Bar, Stage, Text, Window, Badge, Card } from '../../kit'
import '../_de/de.css'

// A review: every finding is a Before | After | Why row, citing the node that owns the rule.
const ROWS: [string, string, string, string][] = [
  ['transition: all .3s ease-in', 'transform 160ms cubic-bezier(.25,1,.5,1)', 'Name the properties; enter on ease-out', 'easing-curves'],
  ['transform: scale(0)', 'scale(.95); opacity: 0', 'Nothing appears from nothing', 'never-scale-from-zero'],
  ['.card:hover { … }', '@media (hover: hover) { … }', 'No sticky hover after a tap', 'touch-and-focus'],
]
const COLS = '190px 250px 1fr'

export default function Review() {
  return (
    <Stage width={720} height={380} className="de">
      {() => (
        <>
          <Window title="review — Card.tsx" className="de-win">
            <div className="de-body">
              <div className="de-line" style={{ width: 664 }}>
                <Text className="de-h">3 findings</Text>
                <Badge tone="warning" dot>Needs work</Badge>
              </div>
              <div className="de-table" style={{ width: 664 }}>
                <div className="de-tr" data-head style={{ gridTemplateColumns: COLS }}>
                  <Text className="de-label">Before</Text><Text className="de-label">After</Text><Text className="de-label">Why</Text>
                </div>
                {ROWS.map(([b, a, w, n]) => (
                  <div key={n} className="de-tr" style={{ gridTemplateColumns: COLS }}>
                    <Text className="de-code" data-strike="">{b}</Text>
                    <Text className="de-code">{a}</Text>
                    <div className="de-stack">
                      <Text className="de-small">{w}</Text>
                      <Text className="de-code de-accent">{`[[${n}]]`}</Text>
                    </div>
                  </div>
                ))}
                {[0, 1].map((i) => (
                  <div key={i} className="de-tr" style={{ gridTemplateColumns: COLS }}>
                    <Bar w={140} tone={2} /><Bar w={170} tone={2} /><Bar w={120} tone={2} />
                  </div>
                ))}
              </div>
            </div>
          </Window>
          <Card className="de-sat" pad="medium" gap={8}>
            <Text className="de-label">Verdict</Text>
            <Text className="de-h">Ship after 3 fixes</Text>
            <Bar w={150} h={5} tone={2} />
          </Card>
        </>
      )}
    </Stage>
  )
}
