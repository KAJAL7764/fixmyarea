import './ProblemTypes.css';

const PROBLEM_TYPES = [
  {
    id: 1,
    number: '01',
    emoji: '🕳️',
    name: 'Potholes',
    desc: 'Dangerous road craters that damage vehicles and cause accidents. Tag exact location for faster repair.',
    count: 487,
    bgColor: 'rgba(251, 146, 60, 0.1)',
  },
  {
    id: 2,
    number: '02',
    emoji: '🗑️',
    name: 'Garbage dumps',
    desc: 'Uncleared waste piling up in public spaces. Photo evidence auto-escalates to municipal corp.',
    count: 312,
    bgColor: 'rgba(34, 197, 94, 0.1)',
  },
  {
    id: 3,
    number: '03',
    emoji: '💧',
    name: 'Water leakage',
    desc: 'Broken pipes wasting thousands of litres daily. Geotagged reports reach water boards in minutes.',
    count: 198,
    bgColor: 'rgba(96, 165, 250, 0.1)',
  },
  {
    id: 4,
    number: '04',
    emoji: '💡',
    name: 'Broken lights',
    desc: 'Dark streets are unsafe streets. Street light outages auto-assigned to electricity boards.',
    count: 356,
    bgColor: 'rgba(250, 204, 21, 0.1)',
  },
  {
    id: 5,
    number: '05',
    emoji: '🚦',
    name: 'Traffic issues',
    desc: 'Broken signals, blocked intersections, missing signage. Raises tickets with traffic police instantly.',
    count: 143,
    bgColor: 'rgba(167, 139, 250, 0.1)',
  },
  {
    id: 6,
    number: '06',
    emoji: '🌊',
    name: 'Drainage problems',
    desc: 'Clogged drains causing flooding in monsoon. Real-time alerts help prevent neighborhood waterlogging.',
    count: 221,
    bgColor: 'rgba(244, 114, 182, 0.1)',
  },
];

export default function ProblemTypes() {
  return (
    <section className="problem-types">
      <div className="section-inner">
        <span className="section-tag">What you can report</span>
        <h2 className="section-h">Every problem<br />deserves a pin.</h2>
        <p className="section-sub">
          From potholes to drainage — if it's broken, tag it. Our system routes it to the right authority automatically.
        </p>

        <div className="pt-grid">
          {PROBLEM_TYPES.map((type) => (
            <div key={type.id} className="pt-card">
              <div className="pt-card__number">{type.number}</div>

              <div className="pt-card__content">
                <div
                  className="pt-card__icon"
                  style={{ background: type.bgColor }}
                >
                  {type.emoji}
                </div>

                <h3 className="pt-card__name">{type.name}</h3>

                <p className="pt-card__desc">{type.desc}</p>

                <div className="pt-card__footer">
                  <span className="pt-card__count">{type.count}</span>
                  <span className="pt-card__label">Reported</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}