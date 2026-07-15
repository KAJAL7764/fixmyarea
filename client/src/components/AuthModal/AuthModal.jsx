import "./AuthModal.css";
import { useState } from "react";
import api from "../../api/axios";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase.js";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";


export default function AuthModal({ onClose }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const [confirmPassword, setConfirmPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    
  const googleLogin = async () => {
  try {
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const idToken = await result.user.getIdToken();

    const res = await api.post("/auth/google", {
      token: idToken,
    });

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

    onClose();

    navigate("/");

  } catch (error) {

    console.log(error);

    showToast(
      error.response?.data?.message ||
      error.message,
      "error"
    );
  }
};


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
    console.log("Login Response:", res.data);

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
  onClose();      // closes the login modal
  navigate("/");  // goes to Home page
}, 1000);

  } catch (error) {

    showToast(
      error.response?.data?.message ||
      "Something went wrong",
      "error"
    );

  }
};

const forgotPassword = async () => {
  if (!email.trim()) {
    showToast("Please enter your email.", "error");
    return;
  }

  try {
    const res = await api.post("/auth/forgot-password", {
      email,
    });

    showToast(res.data.message, "success");

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

        <h2 className="auth-title">
  {isLogin ? "Welcome Back " : "Create Account"}
</h2>

<p className="auth-subtitle">
  {isLogin
    ? "Sign in to continue using FixMyArea."
    : "Join FixMyArea and start reporting issues."}
</p>

{!isLogin && (
<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
)}

<input
type="email"
placeholder=" Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<div className="password-box">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <span
    className="toggle-password"
    onClick={() => setShowPassword(!showPassword)}
  >
   {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

{!isLogin && (
<div className="password-box">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />

  <span
    className="toggle-password"
    onClick={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
  >{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>
)}

{isLogin && (
<p
  className="forgot-password"
  onClick={forgotPassword}
>
  Forgot Password?
</p>
)}

<button
className="submit-btn"
onClick={handleSubmit}
>
{isLogin ? "Sign In" : "Create Account"}
</button>

<div className="divider">
<span>OR</span>
</div>

{/* <button
className="google-btn"
onClick={googleLogin}
>
<img
src="https://www.svgrepo.com/show/475656/google-color.svg"
alt=""
/>
  Continue with Google
</button> */}

<button
  className="google-btn"
  onClick={googleLogin}
>
  <FaGoogle />
  Continue with Google
</button>

<p className="switch-text">
{isLogin
? "Don't have an account?"
: "Already have an account?"}

<span
onClick={() => setIsLogin(!isLogin)}
>
{isLogin ? " Sign Up" : " Sign In"}
</span>
</p>

      </div>
    </div>
  );
}