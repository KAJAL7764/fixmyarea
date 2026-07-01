import { useEffect, useState } from "react";
import api from "../../api/axios";
import MapView from "../../components/MapView/MapView";
import "./LiveMap.css";

export default function LiveMap() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await api.get("/problems");
      setIssues(res.data.problems);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    const statusMatch =
      statusFilter === "All" ||
      issue.status === statusFilter;

    const categoryMatch =
      categoryFilter === "All" ||
      issue.category === categoryFilter;

    return statusMatch && categoryMatch;
  });

  return (
    <>
      <div className="map-toolbar">

        <div className="status-buttons">

          <button
            className={statusFilter === "All" ? "active" : ""}
            onClick={() => setStatusFilter("All")}
          >
            All
          </button>

          <button
            className={statusFilter === "open" ? "active" : ""}
            onClick={() => setStatusFilter("open")}
          >
            Open
          </button>

          <button
            className={statusFilter === "inprogress" ? "active" : ""}
            onClick={() => setStatusFilter("inprogress")}
          >
            In Progress
          </button>

          <button
            className={statusFilter === "resolved" ? "active" : ""}
            onClick={() => setStatusFilter("resolved")}
          >
            Resolved
          </button>

        </div>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >
          <option value="All">All Categories</option>
          <option value="Pothole">Pothole</option>
          <option value="Garbage">Garbage</option>
          <option value="Water leak">Water Leak</option>
          <option value="Broken light">Broken Light</option>
          <option value="Traffic">Traffic</option>
          <option value="Drainage">Drainage</option>
        </select>

        <div className="live-count">
          📍 {filteredIssues.length} Live Issues
        </div>

      </div>

      <div className="map-layout">

        <div className="map-section">

          <MapView
            problems={filteredIssues}
            selectable={false}
            selectedPosition={{
              lat: 28.6139,
              lng: 77.2090,
            }}
          />

        </div>

        <div className="sidebar">

          <h2>Live Issues</h2>

          <p>{filteredIssues.length} Issues</p>

          {filteredIssues.map((issue) => (

            <div
              className="sidebar-card"
              key={issue._id}
            >

              <h3>{issue.title}</h3>

              <p>{issue.description}</p>

              <div className="sidebar-meta">
                <span>👍 {issue.upvotes}</span>
                <span>{issue.status}</span>
              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}