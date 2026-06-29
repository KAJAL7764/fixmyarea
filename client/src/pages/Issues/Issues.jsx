
import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Issues.css";
import { Link } from "react-router-dom";


export default function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] =
  useState("All");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await api.get("/problems");
      setIssues(res.data.problems);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load issues. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "status-open";
      case "inprogress":
      case "progress":
        return "status-progress";
      case "resolved":
        return "status-resolved";
      default:
        return "status-open";
    }
  };

  if (loading) {
    return (
      <section className="issues-section">
        <div className="issues-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading issues...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="issues-section">
        <div className="issues-container">
          <div className="error-state">
            <p>⚠️ {error}</p>
            <button onClick={fetchIssues} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

const filteredIssues = issues.filter(
  (issue) => {
    const matchesSearch =
      issue.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      issue.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      issue.category === category;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
);

  return (
    <section className="issues-section">
      <div className="issues-container">
        {/* Header */}
        <div className="issues-header">
          <h1>All Issues</h1>
          <p className="issues-subtitle">
            {issues.length} {issues.length === 1 ? "issue" : "issues"} reported
          </p>
            <div className="search-box">
    <input
      type="text"
      placeholder="🔍 Search issues..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  
</div>
        </div>
<div className="filter-box">
  <select
    value={category}
    onChange={(e) =>
      setCategory(e.target.value)
    }
  >
    <option value="All">All Categories</option>
    <option value="Pothole">Pothole</option>
    <option value="Garbage">Garbage</option>
    <option value="Water leak">Water leak</option>
    <option value="Broken light">Broken light</option>
    <option value="Traffic">Traffic</option>
    <option value="Drainage">Drainage</option>
  </select>
</div>
        {/* Empty State */}
        {issues.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📭</p>
            <p className="empty-text">No issues found yet</p>
            <p className="empty-subtext">
              Be the first to report an issue in your city!
            </p>
          </div>
        ) : (
          /* Issues List */
          <div className="issues-list">
            {filteredIssues.map((issue) => (
              <div key={issue._id} className="issue-row">
                {/* Image */}
                <div className="issue-image-wrapper">
                  {issue.image ? (
                    <img
                      src={issue.image}
                      alt={issue.title}
                      className="issue-image"
                    />
                  ) : (
                    <div className="image-placeholder">📷</div>
                  )}
                </div>

                {/* Content */}
                <div className="issue-details">
                  <h3 className="issue-title">{issue.title}</h3>
                  <p className="issue-description">{issue.description}</p>

                  {/* Meta Information */}
                  <div className="issue-meta">
                    <span className={`status-badge ${getStatusColor(issue.status)}`}>
                      {issue.status || "Reported"}
                    </span>
                    <span className="upvotes-badge">
                      👍 {issue.upvotes || 0} upvotes
                    </span>
                  </div>
                </div>

                {/* Action Button */}
             <Link
  to={`/issues/${issue._id}`}
>
  <button className="view-btn">
    View →
    
  </button>
</Link>
                 
              
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}