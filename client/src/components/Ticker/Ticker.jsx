import "./Ticker.css";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Ticker() {

  const [items, setItems] = useState([]);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await api.get("/stats/ticker");

const s = res.data.stats;

        setItems([
          {
            icon: "📍",
            text: `${s.totalIssues} issues mapped across India`,
          },
          {
            icon: "✅",
            text: `${s.resolvedIssues} resolved by authorities`,
          },
          {
            icon: "👥",
            text: `${s.totalUsers} active citizens`,
          },
          {
            icon: "⭐",
            text: `${s.resolutionRate}% average resolution rate`,
          },
          {
            icon: "⚡",
            text: `Avg response time: ${s.avgResponseTime}`,
          },
        ]);

      } catch (err) {
        console.log(err);
      }

    };

    fetchStats();

  }, []);

  const duplicatedItems = [...items, ...items];

  return (
    <div className="ticker">
      <div className="ticker__track">

        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="ticker__item">

            <span className="ticker__icon">
              {item.icon}
            </span>

            <span>{item.text}</span>

            <span className="ticker__dot" />

          </div>
        ))}

      </div>
    </div>
  );
}