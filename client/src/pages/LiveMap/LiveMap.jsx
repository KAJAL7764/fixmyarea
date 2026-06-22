import { useState } from 'react';
import './LiveMap.css';

const ISSUES = [
  { id: 1, type: 'Pothole', emoji: '🕳️', location: 'MG Road, Sector 14', time: '2h ago', status: 'open', reporter: 'Arjun S.', votes: 24, x: 38, y: 42 },
  { id: 2, type: 'Water leak', emoji: '💧', location: 'Rajouri Garden Metro', time: '5h ago', status: 'progress', reporter: 'Priya M.', votes: 18, x: 62, y: 28 },
  { id: 3, type: 'Broken light', emoji: '💡', location: 'Sector 7, Block C', time: '1d ago', status: 'resolved', reporter: 'Ravi K.', votes: 9, x: 55, y: 65 },
  { id: 4, type: 'Garbage', emoji: '🗑️', location: 'Dwarka Sector 6', time: '3h ago', status: 'open', reporter: 'Neha T.', votes: 31, x: 22, y: 58 },
  { id: 5, type: 'Traffic', emoji: '🚦', location: 'NH-48 Junction', time: '30m ago', status: 'open', reporter: 'Kiran B.', votes: 47, x: 75, y: 48 },
  { id: 6, type: 'Drainage', emoji: '🌊', location: 'Model Town', time: '6h ago', status: 'progress', reporter: 'Suresh P.', votes: 12, x: 44, y: 22 },
  { id: 7, type: 'Pothole', emoji: '🕳️', location: 'Lajpat Nagar', time: '4h ago', status: 'open', reporter: 'Amit D.', votes: 19, x: 68, y: 72 },
  { id: 8, type: 'Broken light', emoji: '💡', location: 'Janakpuri West', time: '2d ago', status: 'resolved', reporter: 'Pooja R.', votes: 6, x: 30, y: 75 },
];

const FILTERS = ['All', 'Open', 'In Progress', 'Resolved'];
const TYPES = ['All types', 'Pothole', 'Garbage', 'Water leak', 'Broken light', 'Traffic', 'Drainage'];

const STATUS_MAP = {
  open: { label: 'Open', class: 'status--open' },
  progress: { label: 'In Progress', class: 'status--progress' },
  resolved: { label: 'Resolved', class: 'status--resolved' },
};

const PIN_COLOR = {
  open: '#ef4444',
  progress: '#fb923c',
  resolved: '#c8ff00',
};

export default function LiveMap() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeType, setActiveType] = useState('All types');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = ISSUES.filter((issue) => {
    const statusMatch =
      activeFilter === 'All' ||
      (activeFilter === 'Open' && issue.status === 'open') ||
      (activeFilter === 'In Progress' && issue.status === 'progress') ||
      (activeFilter === 'Resolved' && issue.status === 'resolved');
    const typeMatch = activeType === 'All types' || issue.type === activeType;
    return statusMatch && typeMatch;
  });

  return (
    <div className="livemap">
      <div className="livemap__toolbar">
        <div className="toolbar__filters">
          {FILTERS.map((f) => (
            <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="toolbar__right">
          <select className="type-select" value={activeType} onChange={(e) => setActiveType(e.target.value)}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <div className="live-badge">
            <span className="live-dot" />
            <span>{filtered.length} live issues</span>
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen((p) => !p)}>
            {sidebarOpen ? '✕ Hide list' : '☰ Show list'}
          </button>
        </div>
      </div>

      <div className="livemap__body">
        <div className="livemap__map">
          <div className="map-bg">
            <div className="map-grid" />
            <div className="map-roads" />
            <div className="map-label map-label--1">Sector 14</div>
            <div className="map-label map-label--2">Rajouri Garden</div>
            <div className="map-label map-label--3">Dwarka</div>
            <div className="map-label map-label--4">NH-48</div>
            <div className="map-label map-label--5">Model Town</div>
            {filtered.map((issue) => (
              <button
                key={issue.id}
                className={`map-pin ${selectedIssue?.id === issue.id ? 'map-pin--active' : ''}`}
                style={{ left: `${issue.x}%`, top: `${issue.y}%`, '--pin-color': PIN_COLOR[issue.status] }}
                onClick={() => setSelectedIssue(issue.id === selectedIssue?.id ? null : issue)}
              >
                <span className="map-pin__dot" />
                <span className="map-pin__ring" />
                {selectedIssue?.id === issue.id && (
                  <div className="map-pin__popup">
                    <div className="popup__type">{issue.emoji} {issue.type}</div>
                    <div className="popup__loc">{issue.location}</div>
                    <div className={`popup__status status-badge ${STATUS_MAP[issue.status].class}`}>{STATUS_MAP[issue.status].label}</div>
                  </div>
                )}
              </button>
            ))}
            <div className="map-legend">
              <div className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} />Open</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#fb923c' }} />In Progress</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#c8ff00' }} />Resolved</div>
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div className="livemap__sidebar">
            <div className="sidebar__head">
              <span className="sidebar__count">{filtered.length} issues</span>
              <span className="sidebar__sub">sorted by recent</span>
            </div>
            <div className="issue-list">
              {filtered.map((issue) => (
                <div
                  key={issue.id}
                  className={`issue-card ${selectedIssue?.id === issue.id ? 'issue-card--selected' : ''}`}
                  onClick={() => setSelectedIssue(issue.id === selectedIssue?.id ? null : issue)}
                >
                  <div className="issue-card__top">
                    <span className="issue-card__emoji">{issue.emoji}</span>
                    <div className="issue-card__info">
                      <div className="issue-card__type">{issue.type}</div>
                      <div className="issue-card__loc">{issue.location}</div>
                    </div>
                    <div className={`status-badge ${STATUS_MAP[issue.status].class}`}>{STATUS_MAP[issue.status].label}</div>
                  </div>
                  <div className="issue-card__meta">
                    <span>{issue.time}</span><span>·</span>
                    <span>{issue.reporter}</span><span>·</span>
                    <span>▲ {issue.votes}</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <div className="empty-state">No issues match this filter.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}