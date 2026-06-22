import './Ticker.css';

const TICKER_ITEMS = [
  { icon: '📍', text: '2,841 issues mapped across India' },
  { icon: '✅', text: '1,932 resolved by authorities' },
  { icon: '👥', text: '12,400 active citizens' },
  { icon: '⭐', text: '68% average resolution rate' },
  { icon: '⚡', text: 'Avg response time: 4.2 days' },
];

export default function Ticker() {
  const duplicatedItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker">
      <div className="ticker__track">
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="ticker__item">
            <span className="ticker__icon">{item.icon}</span>
            <span>{item.text}</span>
            <span className="ticker__dot" />
          </div>
        ))}
      </div>
    </div>
  );
}