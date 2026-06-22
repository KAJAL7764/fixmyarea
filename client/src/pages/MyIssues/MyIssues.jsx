import './MyIssues.css'

export default function MyIssues() {
  const myIssues = [
    { id: 1, type: '🕳️', title: 'Pothole near my home', location: 'Sector 12', status: 'resolved', date: '2024-01-15' },
    { id: 2, type: '💧', title: 'Water pipe burst', location: 'Nearby park', status: 'progress', date: '2024-01-10' },
    { id: 3, type: '🗑️', title: 'Garbage accumulation', location: 'Street corner', status: 'open', date: '2024-01-08' },
  ]

  return (
    <section className="myissues-section">
      <div className="myissues-container">
        <div className="myissues-header">
          <h1>My Issues</h1>
          <p>Track all your reported issues</p>
        </div>

        <div className="issues-list">
          {myIssues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <span className="issue-type">{issue.type}</span>
                <h3>{issue.title}</h3>
              </div>
              <p className="issue-location">📍 {issue.location}</p>
              <div className="issue-footer">
                <span className="issue-date">{issue.date}</span>
                <span className={`status-badge status-${issue.status}`}>
                  {issue.status === 'open' && 'Open'}
                  {issue.status === 'progress' && 'In Progress'}
                  {issue.status === 'resolved' && 'Resolved'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}