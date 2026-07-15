import CommentCard from "./CommentCard";

export default function CommentSection({
  comments,
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
  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div className="comments-list">

      {comments.map((comment) => (

        <CommentCard
          key={comment._id}
          comment={comment}
          currentUser={currentUser}
          editingComment={editingComment}
          editCommentText={editCommentText}
          setEditingComment={setEditingComment}
          setEditCommentText={setEditCommentText}
          updateComment={updateComment}
          deleteComment={deleteComment}
          likeComment={likeComment}
            replyingTo={replyingTo}
  replyText={replyText}
  setReplyingTo={setReplyingTo}
  setReplyText={setReplyText}
  replyComment={replyComment}
        />

      ))}

    </div>
  );
} 