import "./Hero.css";
import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import CountUp from "react-countup";


export default function Hero() {

  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchHero = async () => {

      try {

        const res = await api.get("/stats/hero");

        setData(res.data);

      } catch (err) {
        console.log(err);
      }

    };

    fetchHero();

  }, []);

  if (!data) return null;

  return (
    <section className="hero-section">

      <div className="hero-container">

        {/* LEFT */}

        <div className="hero-left">

          <div className="tag">
            ● AI-powered civic platform • INDIA
          </div>

          <h1 className="hero-title">
            Your city.
            <br />
            <span>Your voice.</span>
            <br />
            Fixed.
          </h1>

          <p className="hero-description">
            Report potholes, broken lights, garbage and more —
            pinned live on the map.
            Real-time, community-powered,
            actually resolved.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Drop a pin now
            </button>

            <button className="secondary-btn">
              Browse the map
            </button>

          </div>

          <div className="hero-stats">

            <div>

              <h2>{data.stats.totalIssues}</h2>

              <p>Issues Reported</p>

            </div>

            <div>

              <h2>
{data.stats.resolutionRate}

                %

              </h2>

              <p>Resolution Rate</p>

            </div>

            <div>

              <h2>

            {data.stats.totalUsers}

              </h2>

              <p>Citizens</p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="map-card">

            <div className="map-header">

              <h3>LIVE ISSUE MAP</h3>

              <span>
                LIVE • {data.mapIssues.length} active
              </span>

            </div>

            <div className="fake-map">

              {data.mapIssues.slice(0,4).map((issue,index)=>(
                <div
                  key={issue._id}
                  className={`pin pin-${index}`}
                />
              ))}

            </div>

            <div className="issue-list">

              {data.latestIssues.map(issue=>(

                <div
                  key={issue._id}
                  className="issue-item"
                >

                  <div>

                    <h4>{issue.title}</h4>

                    <p>

                      {new Date(
                        issue.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>

                  <span className={issue.status}>

                    {issue.status}

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}