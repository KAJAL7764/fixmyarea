import "./Footer.css";
import { Link } from "react-router-dom";



export default function Footer({ openDonate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-top">

          {/* Brand */}

          <div className="footer-brand-section">

            <h2 className="footer-brand">
              Fix<span>My</span>Area
            </h2>

            <p className="footer-desc">
              FixMyArea empowers citizens to report local civic issues,
              track their resolution, and build cleaner, safer
              communities through transparency and collaboration.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="footer-col-title">
              Product
            </h3>

            <div className="footer-links">

              <Link to="/map">
                Live Map
              </Link>

              <Link to="/report">
                Report Issue
              </Link>

              <Link to="/leaderboard">
                Leaderboard
              </Link>

              <Link to="/dashboard">
                Dashboard
              </Link>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="footer-col-title">
              Company
            </h3>

            <div className="footer-links">

              <Link to="/about">
                About
              </Link>

              <Link to="/contact">
                Contact
              </Link>

              <Link to="/privacy">
                Privacy Policy
              </Link>

              <Link to="/terms">
                Terms & Conditions
              </Link>

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="footer-col-title">
              Support
            </h3>

            <div className="footer-links">

              <a href="mailto:support@fixmyarea.in">
                Email Support
              </a>

              <Link to="/faq">
                FAQs
              </Link>

              <Link to="/feedback">
                Feedback
              </Link>

            </div>

          </div>

        </div>
        {/* Donate Section */}

<div className="footer-donate">

  <div className="footer-donate-content">

    <h2>
      Help Keep India Cleaner
    </h2>

    <p>
      Love FixMyArea? Your contribution helps us
      maintain servers.
    </p>

  <Link to="/donate">
  <button className="footer-donate-btn">
    ❤️ Donate
  </button>
</Link>

  </div>

</div>

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} FixMyArea. All rights reserved.
          </p>

          <div className="footer-social">

            <a href="#">
              GitHub
            </a>

            <a href="#">
              LinkedIn
            </a>

            <a href="#">
              Instagram
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}