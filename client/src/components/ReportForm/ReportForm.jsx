import { useState } from 'react';
import './ReportForm.css';

const ISSUE_TYPES = [
  { emoji: '🕳️', label: 'Pothole' },
  { emoji: '🗑️', label: 'Garbage' },
  { emoji: '💧', label: 'Water leak' },
  { emoji: '💡', label: 'Broken light' },
  { emoji: '🚦', label: 'Traffic' },
  { emoji: '🌊', label: 'Drainage' },
];

const RECENT_ISSUES = [
  { emoji: '🕳️', name: 'Pothole — MG Road', meta: '120m away · 2h ago', status: 'open' },
  { emoji: '💧', name: 'Pipe burst near metro', meta: '310m away · 5h ago', status: 'progress' },
  { emoji: '💡', name: 'Street light out', meta: '540m away · 1d ago', status: 'resolved' },
  { emoji: '🗑️', name: 'Garbage pile · Sector 6', meta: '800m away · 3h ago', status: 'open' },
];

export default function ReportForm() {
  const [selectedType, setSelectedType] = useState(0);

  const getStatusClass = (status) => {
    switch (status) {
      case 'open':
        return 'status-badge--open';
      case 'progress':
        return 'status-badge--progress';
      case 'resolved':
        return 'status-badge--resolved';
      default:
        return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'progress':
        return 'Active';
      case 'resolved':
        return 'Fixed';
      default:
        return '';
    }
  };

  return (
    <section className="report-form-section">
      <div className="section-inner">
        <span className="section-tag">Report an issue</span>
        <h2 className="section-h">Drop a pin.<br />Make change.</h2>

        <div className="rf-grid">
          <div className="rf-form">
            <div className="rf-header">
              <div className="rf-header__title">
                <span>📄</span>
                <span>New issue report</span>
              </div>
              <div className="rf-header__progress">
                <div className="rf-progress-bar on" />
                <div className="rf-progress-bar on" />
                <div className="rf-progress-bar" />
              </div>
            </div>

            <div className="rf-body">
              <label className="form-label">Issue type</label>
              <div className="type-grid">
                {ISSUE_TYPES.map((type, idx) => (
                  <button
                    key={type.label}
                    className={`type-btn ${selectedType === idx ? 'selected' : ''}`}
                    onClick={() => setSelectedType(idx)}
                  >
                    <span className="type-btn__emoji">{type.emoji}</span>
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Describe the issue — size, severity, duration..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">GPS coordinates (auto-detected)</label>
                <div className="coords-row">
                  <input
                    type="text"
                    className="coord-input"
                    value="28.6448° N"
                    readOnly
                  />
                  <input
                    type="text"
                    className="coord-input"
                    value="77.2167° E"
                    readOnly
                  />
                </div>
              </div>

              <div className="upload-area">
                <span className="upload-icon">📷</span>
                <div className="upload-text">
                  <strong>Click to upload photo</strong> or drag here<br />
                  Stored securely via Cloudinary · JPG, PNG up to 10MB
                </div>
              </div>

              <button className="submit-btn">
                <span>📤</span>
                <span>Submit report</span>
              </button>
            </div>
          </div>

          <div className="rf-sidebar">
            <div className="sidebar-card">
              <span className="sidebar-title">Recent issues near you</span>
              <div className="recent-list">
                {RECENT_ISSUES.map((issue, idx) => (
                  <div key={idx} className="recent-item">
                    <span className="recent-icon">{issue.emoji}</span>
                    <div className="recent-info">
                      <div className="recent-name">{issue.name}</div>
                      <div className="recent-meta">{issue.meta}</div>
                    </div>
                    <div className={`status-badge ${getStatusClass(issue.status)}`}>
                      {getStatusLabel(issue.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <span className="sidebar-title">Your impact</span>
              <div className="impact-grid">
                <div className="impact-box">
                  <div className="impact-number">14</div>
                  <div className="impact-label">Reports</div>
                </div>
                <div className="impact-box">
                  <div className="impact-number" style={{ color: 'var(--lime)' }}>
                    9
                  </div>
                  <div className="impact-label">Resolved</div>
                </div>
                <div className="impact-box">
                  <div className="impact-number" style={{ fontSize: '20px' }}>
                    🏅
                  </div>
                  <div className="impact-label">Rank #24</div>
                </div>
              </div>
            </div>

            <div className="sidebar-card api-banner">
              <div className="api-content">
                <div className="api-icon">⚙️</div>
                <div className="api-text">
                  <div className="api-title">REST API powered</div>
                  <div className="api-desc">
                    Node.js + Express backend. Full CRUD — create, fetch, update, delete. MongoDB + Cloudinary. Scales to millions of reports.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}