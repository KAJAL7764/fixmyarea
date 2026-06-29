import "./Toast.css";

export default function Toast({
  message,
  type,
  onClose,
}) {
  if (!message) return null;

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>

      <button
        className="toast-close"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
}