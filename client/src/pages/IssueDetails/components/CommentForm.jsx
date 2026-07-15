export default function CommentForm({
  commentText,
  setCommentText,
  addComment,
}) {
  return (
    <div className="comment-input">

      <textarea
        placeholder="Write your comment..."
        value={commentText}
        onChange={(e) =>
          setCommentText(e.target.value)
        }
      />

      <button onClick={addComment}>
        Post Comment
      </button>

    </div>
  );
}