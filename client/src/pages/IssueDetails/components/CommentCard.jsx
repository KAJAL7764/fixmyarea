import "./CommentCard.css";

export default function CommentCard({
  comment,
  currentUser,
  editingComment,
  editCommentText,
  setEditingComment,
  setEditCommentText,
  updateComment,
  deleteComment,
  likeComment,
  replyingTo,
  replyText,
  setReplyingTo,
  setReplyText,
  replyComment,
}) {
  const hasLiked = comment.likedBy?.some(
    (user) => user._id === currentUser?.id
  );

  return (
    <div className="comment-card">
      <h4>👤 {comment.user?.name || "Unknown User"}</h4>

      {editingComment === comment._id ? (
        <>
          <textarea
            value={editCommentText}
            onChange={(e) =>
              setEditCommentText(e.target.value)
            }
          />

          <div className="comment-actions">
            <button
              className="save-comment-btn"
              onClick={updateComment}
            >
              Save
            </button>

            <button
              className="cancel-comment-btn"
              onClick={() => {
                setEditingComment(null);
                setEditCommentText("");
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{comment.text}</p>

          <small>
            {new Date(comment.createdAt).toLocaleString()}
          </small>

          {replyingTo === comment._id && (
            <div className="reply-box">
              <textarea
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) =>
                  setReplyText(e.target.value)
                }
              />

              <button
                onClick={() =>
                  replyComment(comment._id)
                }
              >
                Post Reply
              </button>
            </div>
          )}

          <div className="comment-actions">
            <button
              className="like-comment-btn"
              onClick={() =>
                likeComment(comment._id)
              }
            >
              {hasLiked ? "❤️" : "🤍"}{" "}
              {comment.likedBy?.length || 0}
            </button>

            {(currentUser?.id === comment.user?._id ||
              currentUser?.role === "admin") && (
              <>
                <button
                  className="edit-comment-btn"
                  onClick={() => {
                    setEditingComment(comment._id);
                    setEditCommentText(comment.text);
                  }}
                >
                  ✏ Edit
                </button>

                <button
                  className="delete-comment-btn"
                  onClick={() =>
                    deleteComment(comment._id)
                  }
                >
                  🗑 Delete
                </button>
              </>
            )}

            <button
              className="reply-comment-btn"
              onClick={() => {
                if (replyingTo === comment._id) {
                  setReplyingTo(null);
                  setReplyText("");
                } else {
                  setReplyingTo(comment._id);
                  setReplyText("");
                }
              }}
            >
              💬 Reply
            </button>
          </div>

          {/* ================= REPLIES ================= */}

          {comment.replies?.length > 0 && (
            <div className="reply-list">
              {comment.replies.map((reply) => (
                <div
                  className="reply-card"
                  key={reply._id}
                >
                  <h5>
                    ↳ 👤 {reply.user?.name}
                  </h5>

                  <p>{reply.text}</p>

                  <small>
                    {new Date(
                      reply.createdAt
                    ).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}