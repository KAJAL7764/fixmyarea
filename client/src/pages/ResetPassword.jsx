import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(res.data.message);

      navigate("/");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Reset failed"
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#111",
        color: "white",
      }}
    >
      <div
        style={{
          width: 350,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            padding: "12px",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={handleReset}
          style={{
            padding: "12px",
            background: "#B6FF00",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}