export default function IssueActions({
  isOwner,
  issue,
  navigate,
  handleDelete,
  handleUpvote,
  hasUpvoted,
}) {
  return (
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
  );
}