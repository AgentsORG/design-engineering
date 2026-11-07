import { Bar, Stage, Text, Window, Badge, Card, Meter } from '../../kit'
import '../_de/de.css'

// The benchmark report: same model in every arm, the skill on, off, or minus one cluster.
// Real numbers only on the two arms that have run (2026-09-05); cluster rows are filler.
const ARMS: [string, string, number, string][] = [
  ['none', 'own knowledge', 32 / 36, '32 / 36'],
  ['full', 'with the skill', 35 / 36, '35 / 36'],
]
const COLS = '64px 100px 136px 56px'

export default function Bench() {
  return (
    <Stage width={720} height={380} className="de">
      {() => (
        <>
          <Window title="REPORT.md — 2026-09-05, sonnet" className="de-win">
            <div className="de-body">
              <div className="de-line" style={{ width: 404 }}>
                <Text className="de-h">Rules passed, per arm</Text>
                <Badge>10 fixtures</Badge>
              </div>
              <div className="de-table" style={{ width: 404 }}>
                <div className="de-tr" data-head style={{ gridTemplateColumns: COLS }}>
                  <Text className="de-label">Arm</Text><Text className="de-label">Agent</Text><Text className="de-label">Rules</Text><Text className="de-label">Score</Text>
                </div>
                {ARMS.map(([a, d, v, s], i) => (
                  <div key={a} className="de-tr" data-on={i === 1 || undefined} style={{ gridTemplateColumns: COLS }}>
                    <Text className="de-mono">{a}</Text>
                    <Text className="de-small">{d}</Text>
                    <Meter value={v} tone={i === 1 ? 'accent' : 'ink'} className="de-meter--mid" />
                    <Text className="de-num">{s}</Text>
                  </div>
                ))}
                {[0, 1, 2].map((i) => (
                  <div key={i} className="de-tr" style={{ gridTemplateColumns: COLS }}>
                    <Bar w={50} tone={3} /><Bar w={80} tone={2} /><Bar w={110} tone={2} /><Bar w={36} tone={2} />
                  </div>
                ))}
              </div>
            </div>
          </Window>
          <Card className="de-sat" pad="medium" gap={6}>
            <Text className="de-label">Per cluster</Text>
            {(['keep', 'slim', 'retire'] as const).map((v, i) => (
              <div key={v} className="de-line">
                <Bar w={90 - i * 14} tone={3} />
                <Badge tone={v === 'keep' ? 'success' : v === 'slim' ? 'warning' : 'neutral'}>{v}</Badge>
              </div>
            ))}
          </Card>
        </>
      )}
    </Stage>
  )
}
