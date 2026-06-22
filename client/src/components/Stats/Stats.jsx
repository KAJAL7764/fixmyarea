import './Stats.css';

const STATS = [
  {
    id: 1,
    number: '2.8K',
    label: 'Issues reported',
    trend: '+23% this month',
  },
  {
    id: 2,
    number: '68%',
    label: 'Resolution rate',
    trend: '+8% vs last month',
  },
  {
    id: 3,
    number: '4.2d',
    label: 'Avg. fix time',
    trend: 'Down from 7.1d',
  },
  {
    id: 4,
    number: '12K',
    label: 'Active citizens',
    trend: '+41% this quarter',
  },
];

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="section-inner">
        <span className="section-tag">Platform stats</span>
        <h2 className="section-h">Numbers that matter.</h2>

        <div className="stats-grid">
          {STATS.map((stat) => (
            <div key={stat.id} className="stat-box">
              <span className="stat-box__number">{stat.number}</span>
              <div className="stat-box__label">{stat.label}</div>
              <div className="stat-box__trend">
                <span>📈</span>
                <span>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}