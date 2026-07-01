import { Link } from "react-router-dom";
import "./AuthRequired.css";

export default function AuthRequired() {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>🔒</h1>

        <h2>
          Login Required
        </h2>

        <p>
          You need to login first
          before accessing this page.
        </p>

        <Link to="/">
          <button>
            Go Home
          </button>
        </Link>

      </div>

    </div>
  );
}