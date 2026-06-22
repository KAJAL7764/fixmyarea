import "./ReportModal.css";

export default function ReportModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Report Issue</h2>

        <input
          type="text"
          placeholder="Issue Title"
        />

        <select>
          <option>Select Category</option>
          <option>Pothole</option>
          <option>Garbage</option>
          <option>Street Light</option>
          <option>Water Leakage</option>
        </select>

        <textarea
          rows="4"
          placeholder="Describe the issue"
        ></textarea>

        <input type="file" />

        <button className="submit-btn">
          Submit Report
        </button>

      </div>
    </div>
  );
}