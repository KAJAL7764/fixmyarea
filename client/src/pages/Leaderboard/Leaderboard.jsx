import './Leaderboard.css'

export default function Leaderboard() {
  const topReporters = [
    { rank: 1, name: 'Raj Kumar', reports: 142, resolved: 98, points: 1420 },
    { rank: 2, name: 'Priya Singh', reports: 128, resolved: 95, points: 1280 },
    { rank: 3, name: 'Amit Patel', reports: 115, resolved: 87, points: 1150 },
    { rank: 4, name: 'Neha Sharma', reports: 98, resolved: 76, points: 980 },
    { rank: 5, name: 'Rohan Das', reports: 87, resolved: 64, points: 870 },
  ]

  return (
    <section className="leaderboard-section">
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h1>Leaderboard</h1>
          <p>Top civic reporters making a difference</p>
        </div>

        <div className="leaderboard-table">
          <div className="table-header">
            <div>Rank</div>
            <div>Reporter</div>
            <div>Reports</div>
            <div>Resolved</div>
            <div>Points</div>
          </div>

          {topReporters.map((reporter) => (
            <div key={reporter.rank} className="table-row">
              <div className="rank">
                {reporter.rank === 1 && '🥇'}
                {reporter.rank === 2 && '🥈'}
                {reporter.rank === 3 && '🥉'}
                {reporter.rank > 3 && `#${reporter.rank}`}
              </div>
              <div className="name">{reporter.name}</div>
              <div className="reports">{reporter.reports}</div>
              <div className="resolved">{reporter.resolved}</div>
              <div className="points" style={{ color: '#c8ff32' }}>{reporter.points}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}