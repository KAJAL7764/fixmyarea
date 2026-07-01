

import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [showAuth, setShowAuth] =
    useState(false);

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

        {/* Logo */}
        <div className="logo-section">
          <div className="logo-box"></div>

          <h2 className="logo-text">
            Fix<span>My</span>Area
          </h2>
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
<li>
  <Link to="/dashboard">
    Dashboard
  </Link>
</li>

{user?.role === "admin" && (
  <li>
    <Link to="/admin">
      Admin Panel
    </Link>
  </li>
)}
          {/* <li>
            <Link
              to="/dashboard"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Dashboard
            </Link>
          </li> */}
        </ul>

        {/* Buttons */}

        {!token ? (
          <button
            className="signin-btn"
            onClick={() =>
              setShowAuth(true)
            }
          >
            Sign In
          </button>
        ) : (
          <button
            className="signin-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
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
