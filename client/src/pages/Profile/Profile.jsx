import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
        setStats(res.data.stats);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
  <div className="profile-page">

    <div className="profile-card">

      <div className="profile-avatar-large">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <h1 className="profile-name">
        {user.name}
      </h1>

      <p className="profile-email">
        {user.email}
      </p>

      <div className="profile-badges">

        <span className="role-badge">
          {user.role === "admin"
            ? "🛡 Administrator"
            : "👤 Citizen"}
        </span>

        {user.isVerified ? (
          <span className="verified-badge">
            ✔ Verified
          </span>
        ) : (
          <span className="not-verified-badge">
            ❌ Not Verified
          </span>
        )}

      </div>

      <p className="joined-date">
        Joined{" "}
        {new Date(user.createdAt).toLocaleDateString()}
      </p>

      <div className="profile-buttons">

        <button className="edit-btn">
          Edit Profile
        </button>

        <button className="password-btn">
          Change Password
        </button>

      </div>

    </div>

    <div className="stats-container">

      <div className="stat-card">
        <h2>{stats?.reports}</h2>
        <p>Reports Submitted</p>
      </div>

      <div className="stat-card">
        <h2>{stats?.upvotes}</h2>
        <p>Total Upvotes</p>
      </div>

      <div className="stat-card">
        <h2>{stats?.resolved}</h2>
        <p>Resolved Issues</p>
      </div>

    </div>

  </div>
);
}