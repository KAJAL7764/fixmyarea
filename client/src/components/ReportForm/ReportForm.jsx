import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './ReportForm.css';
import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";
import {  useNavigate, useParams, } from "react-router-dom";

const ISSUE_TYPES = [
  { emoji: '🕳️', label: 'Pothole' },
  { emoji: '🗑️', label: 'Garbage' },
  { emoji: '💧', label: 'Water leak' },
  { emoji: '💡', label: 'Broken light' },
  { emoji: '🚦', label: 'Traffic' },
  { emoji: '🌊', label: 'Drainage' },
];

export default function ReportForm() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [selectedType, setSelectedType] = useState(0);
  const [recentIssues, setRecentIssues] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [toast, setToast] = useState({ message: "",type: "",
  });
const [loading, setLoading] =
  useState(false);

 useEffect(() => {
  getLocation();
  fetchProblems();

  if (isEditMode) {
    fetchIssue();
  }
}, []);
const fetchIssue = async () => {
  try {
    const res = await api.get(
      `/problems/${id}`
    );

    const issue = res.data.problem;

    setDescription(
      issue.description
    );

    const index =
      ISSUE_TYPES.findIndex(
        (item) =>
          item.label === issue.category
      );

    if (index !== -1) {
      setSelectedType(index);
    }

  } catch (error) {
    console.log(error);
  }
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        console.log("LOCATION:", position);

        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log("LOCATION ERROR:", error);

        showToast(
          "Location permission required",
          "error"
        );
      }
    );
  }
};

  const fetchProblems = async () => {
    try {
      const res = await api.get('/problems');

      setRecentIssues(res.data.problems || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'reported':
        return 'status-badge--open';

      case 'in-progress':
        return 'status-badge--progress';

      case 'resolved':
        return 'status-badge--resolved';

      default:
        return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'reported':
        return 'Open';

      case 'in-progress':
        return 'Active';

      case 'resolved':
        return 'Fixed';

      default:
        return '';
    }
  };

  const handleSubmit = async () => {
  try {
    const token =
      localStorage.getItem("token");

 if (!token) {
  showToast(
    "Please login first",
    "error"
  );
  return;
}

if (!location && !isEditMode) {
  showToast(
    "Location is required",
    "error"
  );
  return;
}

if (!image && !isEditMode) {
  showToast(
    "Please upload an image",
    "error"
  );
  return;
}

if (!description.trim()) {
  showToast(
    "Please enter a description",
    "error"
  );
  return;
}

    setLoading(true);

    const selectedIssue =
      ISSUE_TYPES[selectedType];

 const formData = new FormData();

formData.append(
  "title",
  selectedIssue.label
);

formData.append(
  "description",
  description
);

formData.append(
  "category",
  selectedIssue.label
);

if (!isEditMode) {
  formData.append(
    "location",
    JSON.stringify(location)
  );
}

if (image) {
  formData.append(
    "image",
    image
  );
}

let res;

if (isEditMode) {

  res = await api.patch(
    `/problems/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

} else {

  res = await api.post(
    "/problems",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

}

showToast(
  res.data.message,
  "success"
);

setTimeout(() => {
  if (isEditMode) {
    navigate(`/issues/${id}`);
  } else {
    navigate("/issues");
  }
}, 1000);

    setDescription("");

    fetchProblems();

  } catch (error) {
showToast(
  error.response?.data?.message ||
  "Failed to submit report",
  "error"
);
  } finally {
    setLoading(false);
  }
};



  return (
    <>
  {/* <Toast
    message={toast.message}
    type={toast.type}
    onClose={() =>
      setToast({
        message: "",
        type: "",
      })
    }
  /> */}
    <section className="report-form-section">
      <div className="section-inner">
        <span className="section-tag">Report an issue</span>
        <h2 className="section-h">
          Drop a pin.
          <br />
          Make change.
        </h2>

        <div className="rf-grid">
          <div className="rf-form">
            <div className="rf-header">
              <div className="rf-header__title">
                <span>📄</span>
                <span>New issue report</span>
              </div>

              <div className="rf-header__progress">
                <div className="rf-progress-bar on" />
                <div className="rf-progress-bar on" />
                <div className="rf-progress-bar" />
              </div>
            </div>

            <div className="rf-body">
              <label className="form-label">
                Issue type
              </label>

              <div className="type-grid">
                {ISSUE_TYPES.map((type, idx) => (
                  <button
                    key={type.label}
                    className={`type-btn ${
                      selectedType === idx
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() =>
                      setSelectedType(idx)
                    }
                  >
                    <span className="type-btn__emoji">
                      {type.emoji}
                    </span>

                    <span>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Description
                </label>

        <textarea
  className="form-textarea"
  placeholder="Describe the issue — size, severity, duration..."
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>
              </div>

              <div className="form-group">
                <label className="form-label">
                  GPS coordinates
                  (auto-detected)
                </label>

                <div className="coords-row">
                  <input
                    type="text"
                    className="coord-input"
                    value={
  location
    ? location.lat
    : "Fetching..."
}
                    readOnly
                  />

                  <input
                    type="text"
                    className="coord-input"
                    value={
  location
    ? location.lng
    : "Fetching..."
}
                    readOnly
                  />
                </div>
              </div>

<div
  className="upload-area"
  onClick={() =>
    document.getElementById("imageInput").click()
  }
>
  <input
    id="imageInput"
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    onChange={(e) =>
      setImage(e.target.files[0])
    }
  />

  <span className="upload-icon">📷</span>

  <div className="upload-text">
    <strong>
      {image
        ? image.name
        : "Click to upload photo"}
    </strong>
    <br />
    Stored securely via Cloudinary · JPG, PNG up to 10MB
  </div>
</div>

             <button
  className="submit-btn"
  onClick={handleSubmit}
  disabled={loading}
>
  <span>📤</span>

  <span>
    {loading
      ? "Submitting..."
      : "Submit report"}
  </span>
</button>
            </div>
          </div>

          <div className="rf-sidebar">
            <div className="sidebar-card">
              <span className="sidebar-title">
                Recent issues near you
              </span>

              <div className="recent-list">
                {recentIssues.map((issue) => (
                  <div
                    key={issue._id}
                    className="recent-item"
                  >
           <div className="recent-image">
  <img
    src={issue.image}
    alt={issue.title}
  />
</div>

                    <div className="recent-info">
                      <div className="recent-name">
                        {issue.title}
                      </div>

                      <div className="recent-meta">
                        {issue.category}
                      </div>
                    </div>

                    <div
                      className={`status-badge ${getStatusClass(
                        issue.status
                      )}`}
                    >
                      {getStatusLabel(
                        issue.status
                      )}
                    </div>
                  </div>
                ))}
              </div>
          

<div
  style={{
    textAlign: "center",
    marginTop: "15px",
  }}
>
  <Link to="/issues">
    View All Issues →
  </Link>
</div>  </div>
            <div className="sidebar-card">
              <span className="sidebar-title">
                Your impact
              </span>

              <div className="impact-grid">
                <div className="impact-box">
                  <div className="impact-number">
                    14
                  </div>

                  <div className="impact-label">
                    Reports
                  </div>
                </div>

                <div className="impact-box">
                  <div
                    className="impact-number"
                    style={{
                      color:
                        'var(--lime)',
                    }}
                  >
                    9
                  </div>

                  <div className="impact-label">
                    Resolved
                  </div>
                </div>

                <div className="impact-box">
                  <div
                    className="impact-number"
                    style={{
                      fontSize: '20px',
                    }}
                  >
                    🏅
                  </div>

                  <div className="impact-label">
                    Rank #24
                  </div>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </section>
    </>
  );
}