import { useState } from 'react'
import './ReportIssue.css'

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    type: 'pothole',
    description: '',
    location: '',
    image: null,
  })

  const issueTypes = [
    { value: 'pothole', label: '🕳️ Pothole', color: 'orange' },
    { value: 'garbage', label: '🗑️ Garbage', color: 'green' },
    { value: 'water', label: '💧 Water Leak', color: 'blue' },
    { value: 'light', label: '💡 Broken Light', color: 'yellow' },
    { value: 'traffic', label: '🚦 Traffic Signal', color: 'red' },
    { value: 'drainage', label: '🌊 Drainage', color: 'purple' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Issue reported successfully!')
  }

  return (
    <section className="report-section">
      <div className="report-container">
        <div className="report-header">
          <h1>Report an Issue</h1>
          <p>Help make your city better by reporting problems</p>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          {/* Issue Type */}
          <div className="form-group">
            <label>Issue Type *</label>
            <div className="type-grid">
              {issueTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className={`type-btn ${formData.type === type.value ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, type: type.value })}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              placeholder="Enter location or address..."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Upload Image</label>
            <div className="upload-zone">
              <input type="file" accept="image/*" />
              <p>📷 Click to upload or drag and drop</p>
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit Report</button>
        </form>
      </div>
    </section>
  )
}