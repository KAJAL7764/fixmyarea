import { Link } from "react-router-dom";

export default function AdminAccessDenied() {
  return (
    <div className="access-denied">

      <h1>🔒 Admin Dashboard</h1>

      <p>
        You don't have permission to access this page.
      </p>

      <p>
        Please contact the administrator if you believe this is an error.
      </p>

      <Link to="/">
        Back to Home
      </Link>

    </div>
  );
}