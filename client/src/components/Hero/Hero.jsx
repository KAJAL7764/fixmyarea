import './Hero.css'
export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Side */}
        <div className="hero-left">
          <div className="tag">● CIVIC TECH • INDIA</div>

          <h1 className="hero-title">
            Your city.<br />
            <span>Your voice.</span><br />
            Fixed.
          </h1>

          <p className="hero-description">
            Report potholes, broken lights, garbage and more — pinned
            live on the map. Real-time, community-powered, actually
            resolved.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Drop a pin now</button>
            <button className="secondary-btn">Browse the map</button>
          </div>

          <div className="hero-stats">
            <div>
              <h2>2.8K</h2>
              <p>Issues reported</p>
            </div>

            <div>
              <h2>68%</h2>
              <p>Resolution rate</p>
            </div>
            <div>
              <h2>12K</h2>
              <p>Citizens</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-right">
          <div className="map-card">
            <div className="map-header">
              <h3>LIVE ISSUE MAP</h3>
              <span>LIVE • 37 active</span>
            </div>

            <div className="fake-map">
              <div className="pin orange"></div>
              <div className="pin blue"></div>
              <div className="pin green"></div>
              <div className="pin yellow"></div>
            </div>

            <div className="issue-list">
              <div className="issue-item">
                <div>
                  <h4>Pothole — MG Road</h4>
                  <p>Sector 14, Delhi • 2h ago</p>
                </div>  <span className="open">Open</span>
              </div>

              <div className="issue-item">
                <div>
                  <h4>Pipe leak near metro</h4>
                  <p>Rajouri Garden • 5h ago</p>
                </div>
                <span className="progress">In Progress</span>
              </div>

              <div className="issue-item">
                <div>
                  <h4>Garbage near school</h4>
                  <p>Dwarka Sector 6 • 1d ago</p>
                </div>
                <span className="resolved">Resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

