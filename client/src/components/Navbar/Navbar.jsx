import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
// import profile from "../../pages/Profile/Profile"

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [showAuth, setShowAuth] =
    useState(false);
    const [showMenu, setShowMenu] = useState(false);

  const token =
    localStorage.getItem("token");
    const user = JSON.parse(
  localStorage.getItem("user")
);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

       
   <div className="logo-section">
  <Link to="/" className="logo-link">
    <div className="logo-box"></div>
    <h2 className="logo-text">
      Fix<span>My</span>Area
    </h2>
  </Link>
</div>

        {/* Navigation Links */}
        <ul
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <li>
            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/map"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Live Map
            </Link>
          </li>

          <li>
            <Link
              to="/issues"
              onClick={() =>
                setMenuOpen(false)
              }
            >
               Issues
            </Link>
          </li>

          <li>
            <Link
              to="/leaderboard"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Leaderboard
            </Link>
          </li>

{user?.role === "admin" && (
  <li>
    <Link to="/admin">
      Admin Panel
    </Link>
  </li>
  
)}
<li className="mobile-only">
  <Link
    to="/report"
    onClick={() => setMenuOpen(false)}
  >
    Report Issue
  </Link>
</li>

{token && (
  <>
    <li className="mobile-only">
      <Link
        to="/dashboard"
        onClick={() => setMenuOpen(false)}
      >
        Dashboard
      </Link>
    </li>

    <li className="mobile-only">
      <Link
        to="/profile"
        onClick={() => setMenuOpen(false)}
      >
        Profile
      </Link>
    </li>
  </>
)}
        </ul>

{!token ? (
  <button
    className="signin-btn"
    onClick={() => setShowAuth(true)}
  >
    Sign In
  </button>
) : (
  <div className="profile-menu">

  <div
  className="profile-trigger"
  onClick={() => setShowMenu(!showMenu)}
>

  <div className="profile-avatar">
    {user?.name?.charAt(0).toUpperCase()}
  </div>


</div>

    {showMenu && (
      <div className="profile-dropdown">

        <p className="dropdown-name">
          {user?.name}
        </p>

        <p className="dropdown-email">
          {user?.email}
        </p>

        <hr />

        <Link to="/profile" onClick={() => setShowMenu(false)}>
        👤  My Profile
        </Link>
        <Link
          to="/dashboard"
          onClick={() => setShowMenu(false)}
        >
          📊 Dashboard
        </Link>

         <Link
          to="/setting"
          onClick={() => setShowMenu(false)}
        >
         ⚙️ Settings  (coming soon)
 
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>
    )}

  </div>
)}

        <Link to="/report">
          <button className="report-btn">
            Report Issue
          </button>
        </Link>

        {showAuth && (
          <AuthModal
            onClose={() =>
              setShowAuth(false)
            }
          />
        )}

        {/* Mobile Menu Icon */}
        <div
          className={`menu-icon ${
            menuOpen ? "open" : ""
          }`}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </nav>
  );
}
