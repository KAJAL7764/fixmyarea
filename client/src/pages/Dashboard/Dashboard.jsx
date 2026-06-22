import './Dashboard.css'

export default function Dashboard() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>2.8K</h3>
            <p>Issues Reported</p>
          </div>
          <div className="stat-card">
            <h3>68%</h3>
            <p>Resolution Rate</p>
          </div>
          <div className="stat-card">
            <h3>4.2d</h3>
            <p>Avg Fix Time</p>
          </div>
          <div className="stat-card">
            <h3>12K</h3>
            <p>Active Citizens</p>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-card">
            <h3>Issues by Type</h3>
            <div className="chart-placeholder">Chart here</div>
          </div>
          <div className="chart-card">
            <h3>Status Distribution</h3>
            <div className="chart-placeholder">Chart here</div>
          </div>
        </div>
      </div>
    </section>
  )
}