import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";
import { useRef } from "react";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
const hasVerified = useRef(false);

useEffect(() => {
  if (hasVerified.current) return;

  hasVerified.current = true;

  const verify = async () => {
    try {
      const res = await api.get(
        `/auth/verify-email/${token}`
      );

      showToast(res.data.message, "success");

      setTimeout(() => {
        navigate("/");
      }, 2500);

    } catch (error) {
      showToast(
        error.response?.data?.message ||
        "Verification failed",
        "error"
      );
    }
  };

  verify();
}, [token, navigate, showToast]);
  

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
      <div style={{ textAlign: "center" }}>
        <h1>Verifying your email...</h1>
        <p>Please wait a moment.</p>
      </div>
    </div>
  );
}