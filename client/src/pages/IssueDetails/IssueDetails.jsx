import { useEffect, useState } from "react";
import {useParams, useNavigate,} from "react-router-dom";
import api from "../../api/axios";
import "./IssueDetails.css";
import { useToast } from "../../context/ToastContext";

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [issue, setIssue] = useState(null);

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = async () => {
    try {
      const res = await api.get(
        `/problems/${id}`
      );

      setIssue(res.data.problem);

    } catch (error) {
      console.log(error);
    }
  };

  if (!issue) {
    return <h2>Loading...</h2>;
  }

  const currentUser =
  JSON.parse(
    localStorage.getItem("user")
  );

  const isOwner =
  currentUser?.id ===
  issue.reportedBy._id;

  const hasUpvoted =
  issue.upvotedBy?.includes(
    currentUser?.id
  );


  const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this issue?"
  );

  if (!confirmDelete) return;

  try {
    const token =
      localStorage.getItem("token");

    await api.delete(
      `/problems/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

 showToast(
  "Issue deleted successfully",
  "success"
);

setTimeout(() => {
  navigate("/issues");
}, 1000);

} catch (error) {
  showToast(
    error.response?.data?.message ||
    "Failed to delete issue",
    "error"
  );
}
  }
const handleUpvote = async () => {
  try {
    const token = localStorage.getItem("token");

  if (!token) {
  showToast(
    "Please login first",
    "error"
  );
  return;
}

    const res = await api.patch(
      `/problems/${issue._id}/upvote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIssue(res.data.problem);

   showToast(
  res.data.message,
  "success"
);

  } catch (error) {
    showToast(
      error.response?.data?.message ||
      "Failed to upvote",
      "error"
    );
  }
};

 return (
  <section className="issue-details-page">
    <div className="issue-details-container">
      <div className="issue-card">

        <img
          src={issue.image}
          alt={issue.title}
          className="issue-banner"
        />

        <div className="issue-content">

          <h1 className="issue-title">
            {issue.title}
          </h1>

          <p className="issue-description">
            {issue.description}
          </p>

          <div className="issue-meta-grid">

            <div className="meta-card">
              <div className="meta-label">Status</div>
              <div className="meta-value">
                {issue.status}
              </div>
            </div>



            <div className="meta-card">
              <div className="meta-label">Upvotes</div>
              <div className="meta-value">
                👍 {issue.upvotes}
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-label">Latitude</div>
              <div className="meta-value">
                {issue.location.lat}
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-label">Longitude</div>
              <div className="meta-value">
                {issue.location.lng}
              </div>
            </div>

          </div>

          <div className="reporter-section">
            <div className="reporter-title">
              Reported By
            </div>

            <div className="reporter-info">
              <p>{issue.reportedBy.name}</p>
              <p>{issue.reportedBy.email}</p>
            </div>
          </div>


<div className="action-buttons">
  {isOwner ? (
    <>
     <button
  className="edit-btn"
  onClick={() =>
    navigate(`/issues/edit/${issue._id}`)
  }
>
  Edit Issue
</button>

    <button
  className="delete-btn"
  onClick={handleDelete}
>
  Delete Issue
</button>
    </>
  ) : (
 <button
  className="upvote-btn"
  onClick={handleUpvote}
  disabled={hasUpvoted}
>
  {hasUpvoted
    ? "✅ Upvoted"
    : "👍 Upvote"}
</button>
  )}
</div>
        </div>

      </div>
    </div>
  </section>
);
}