import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/leaderboard");
      setLeaders(res.data.leaderboard);
    } catch (error) {
      console.log(error);
    }
  };

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <section className="leaderboard-page">

      <h1 className="leaderboard-title">
        🏆 Community Leaderboard
      </h1>

      <div className="leaderboard-list">

        {leaders.map((user, index) => (

          <div
            key={user._id}
            className="leader-card"
          >

            <div className="rank">
              {getMedal(index)}
            </div>

            <div className="leader-info">

              <h2>{user.name}</h2>

              <p>
                ⭐ {user.points} Points
              </p>

              <div className="leader-stats">

                <span>
                  📍 {user.reports} Reports
                </span>

                <span>
                  ✅ {user.resolved} Resolved
                </span>

                <span>
                  👍 {user.totalUpvotes} Upvotes
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}