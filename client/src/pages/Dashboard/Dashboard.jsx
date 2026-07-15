import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Dashboard.css";

export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [recentReports, setRecentReports] = useState([]);

const token = localStorage.getItem("token");

if (!token) {
  return (
    <section className="login-required">
      <div className="login-card">
        <h1>🔒 Login Required</h1>

        <p>
          Please login to view your personal dashboard.
        </p>

        <button
          onClick={() => window.location.href = "/"}
        >
          Go to Home
        </button>
      </div>
    </section>
  );
}

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setStats(res.data.stats);
    setRecentReports(res.data.recentReports);

  } catch (error) {
    console.log(error);
  }
};
if (!stats) {
  return (
    <div className="dashboard-loading">
      Loading Dashboard...
    </div>
  );
}

  return (
    <section className="dashboard-page">

      <div className="dashboard-header">

        <h1>
          Welcome, {stats.name} 👋
        </h1>

        <p>
          Here's your FixMyArea activity.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>📍</h2>
          <h3>{stats.reports}</h3>
          <p>Total Reports</p>
        </div>

        <div className="stat-card">
          <h2>👍</h2>
          <h3>{stats.upvotes}</h3>
          <p>Total Upvotes</p>
        </div>

        <div className="stat-card">
          <h2>✅</h2>
          <h3>{stats.resolved}</h3>
          <p>Resolved</p>
        </div>
<div className="stat-card">
  <h2>⏳</h2>
  <h3>{stats.open}</h3>
  <p>Open Issues</p>
</div>
      </div>

      <div className="recent-section">

        <h2>Recent Reports</h2>

        {recentReports.length === 0 ? (

          <p className="empty">
            You haven't reported anything yet.
          </p>

        ) : (

          recentReports.map((report) => (

            <div
              className="report-card"
              key={report._id}
            >

              <div>

                <h3>{report.title}</h3>

                <p>{report.description}</p>

              </div>

              <span className={`status ${report.status}`}>
                {report.status}
              </span>

            </div>

          ))

        )}

      </div>

    </section>
  );
}