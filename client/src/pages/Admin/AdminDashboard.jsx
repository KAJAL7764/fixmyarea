import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminDashboard.css";
import showToast  from "../../components/Toast/Toast"
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);


  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await api.get("/problems");
      setIssues(res.data.problems);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/problems/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id
            ? {
                ...issue,
                status,
              }
            : issue
        )
      );
         showToast(
      "success",
      "Issue status updated successfully!"
    );
    } catch (error) {
  console.log(error);

 showToast("error", "Failed to update issue status.");
}}

  const total = issues.length;

  const open = issues.filter(
    (i) => i.status === "open"
  ).length;

  const progress = issues.filter(
    (i) => i.status === "inprogress"
  ).length;

  const resolved = issues.filter(
    (i) => i.status === "resolved"
  ).length;

  const deleteIssue = async (id) => {

  const confirmDelete = window.confirm(
    "Delete this issue?"
  );

  if (!confirmDelete) return;

  try {

    const token = localStorage.getItem("token");

    const res = await api.delete(
      `/problems/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showToast(res.data.message);

    setIssues((prev) =>
      prev.filter((issue) => issue._id !== id)
    );

  } catch (error) {

    showToast(
      error.response?.data?.message ||
      "Delete failed"
    );

  }

};


const handleEdit = (issue) => {

  console.log("Edit clicked:", issue);

    navigate(`/issues/edit/${issue._id}`);
  };


  return (
    <section className="admin-page">

      <div className="admin-header">
        <h1>🛠 Admin Dashboard</h1>

        <p>
          Manage reported issues across the city.
        </p>
      </div>

      <div className="admin-stats">

        <div className="admin-card">
          <h2>{total}</h2>
          <p>Total Issues</p>
        </div>

        <div className="admin-card">
          <h2>{open}</h2>
          <p>Open</p>
        </div>

        <div className="admin-card">
          <h2>{progress}</h2>
          <p>In Progress</p>
        </div>

        <div className="admin-card">
          <h2>{resolved}</h2>
          <p>Resolved</p>
        </div>

      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>Issue</th>
              <th>Category</th>
              <th>Status</th>
              <th>Upvotes</th>
              <th>Reporter</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {issues.map((issue) => (

              <tr key={issue._id}>

                <td>{issue.title}</td>

                <td>{issue.category}</td>

                <td>

                  <select
                    className="status-select"
                    value={issue.status}
                    onChange={(e) =>
                      updateStatus(
                        issue._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="open">
                      Open
                    </option>

                    <option value="inprogress">
                      In Progress
                    </option>

                    <option value="resolved">
                      Resolved
                    </option>

                  </select>

                </td>

                <td>
                  👍 {issue.upvotes}
                </td>

                <td>
                  {issue.reportedBy?.name || "Unknown"}
                </td>

                <td>

                 <button
  className="edit-btn"
  onClick={() => handleEdit(issue)}
>
  Edit
</button>

                  <button
  className="delete-btn"
  onClick={() => deleteIssue(issue._id)}
>
  Delete
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}