import "./AuthModal.css";
import { useState } from "react";
import api from "../../api/axios";
import { useToast } from "../../context/ToastContext";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
    const { showToast } = useToast();
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleSubmit = async () => {
  try {

    if (!isLogin) {

      if (password !== confirmPassword) {
        showToast(
          "Passwords do not match",
          "error"
        );
        return;
      }

      const res = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      showToast(
        res.data.message ||
        "Account created successfully",
        "success"
      );

      setIsLogin(true);
      return;
    }

    // Login
    const res = await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    showToast(
      "Login Successful",
      "success"
    );

    setTimeout(() => {
      window.location.reload();
    }, 1000);

  } catch (error) {

    showToast(
      error.response?.data?.message ||
      "Something went wrong",
      "error"
    );

  }
};

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>
          {isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />
        )}

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          {isLogin
            ? "Sign In"
            : "Sign Up"}
        </button>

        <p className="switch-text">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >
            {isLogin
              ? " Sign Up"
              : " Sign in"}
          </span>
        </p>

      </div>
    </div>
  );
}