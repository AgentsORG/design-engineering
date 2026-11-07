import { Bar, Stage, Text, Window, Badge, Card, Meter } from '../../kit'
import '../_de/de.css'

// The grader's report card: axes 1-10, a band, and the case against.
const AXES: [string, number][] = [['Craft', 8.1], ['Motion', 7.2], ['Restraint', 7.8], ['Access', 6.4], ['Verification', 7.6]]

export default function Grade() {
  return (
    <Stage width={720} height={380} className="de">
      {() => (
        <>
          <Window title="grade.mjs — episode 0142" className="de-win">
            <div className="de-body">
              <div className="de-score">
                <Text className="de-big">7.4</Text>
                <Badge tone="accent">crafted</Badge>
                <Text className="de-small de-dim">agent with skill, confidence 0.82</Text>
              </div>
              <div style={{ width: 360 }}>
                {AXES.map(([a, v]) => (
                  <div key={a} className="de-line de-axis">
                    <Text className="de-small de-strong">{a}</Text>
                    <div className="de-pair"><Meter value={v / 10} tone={a === 'Access' ? 'warning' : 'accent'} className="de-meter--wide" /><Text className="de-num de-num--slot">{v.toFixed(1)}</Text></div>
                  </div>
                ))}
              </div>
            </div>
          </Window>
          <Card className="de-sat" pad="medium" gap={8}>
            <Text className="de-label">Counterweight</Text>
            <Text className="de-small" wrap>Focus ring fails 3:1 on the dark card, so checks cap Access at 6.4.</Text>
            <Bar w={120} h={5} tone={2} />
          </Card>
        </>
      )}
    </Stage>
  )
}
