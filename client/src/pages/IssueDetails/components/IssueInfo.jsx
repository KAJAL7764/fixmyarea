export default function IssueInfo({ issue }) {
  return (
    <div className="issue-card">

      <img
        src={issue.image}
        alt={issue.title}
        className="issue-banner"
      />

      <div className="issue-content">

        <h1 className="issue-title">
          {issue.title}
        </h1>

        <p className="issue-description">
          {issue.description}
        </p>

        <div className="issue-meta-grid">

          <div className="meta-card">
            <div className="meta-label">Status</div>
            <div className="meta-value">
              {issue.status}
            </div>
          </div>

          <div className="meta-card">
            <div className="meta-label">Upvotes</div>
            <div className="meta-value">
              👍 {issue.upvotes}
            </div>
          </div>

          <div className="meta-card">
            <div className="meta-label">Latitude</div>
            <div className="meta-value">
              {issue.location.lat}
            </div>
          </div>

          <div className="meta-card">
            <div className="meta-label">Longitude</div>
            <div className="meta-value">
              {issue.location.lng}
            </div>
          </div>

        </div>

        <div className="reporter-section">

          <div className="reporter-title">
            Reported By
          </div>

          <div className="reporter-info">
            <p>{issue.reportedBy.name}</p>
            <p>{issue.reportedBy.email}</p>
          </div>

        </div>

      </div>

    </div>
  );
}