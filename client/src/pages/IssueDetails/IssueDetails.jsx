import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../api/axios";
import "./IssueDetails.css";

import { useToast } from "../../context/ToastContext";

import IssueInfo from "./components/IssueInfo";
import IssueActions from "./components/IssueActions";
import CommentForm from "./components/CommentForm";
import CommentSection from "./components/CommentSection";

export default function IssueDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { showToast } = useToast();

  const [issue, setIssue] = useState(null);

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");

  const [editingComment, setEditingComment] = useState(null);

  const [editCommentText, setEditCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetchIssue();

    fetchComments();
  }, [id]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchIssue = async () => {
    try {
      const res = await api.get(`/problems/${id}`);

      setIssue(res.data.problem);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${id}`);

      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  if (!issue) {
    return <h2>Loading...</h2>;
  }

  const isOwner = currentUser?.id === issue.reportedBy._id;

  const hasUpvoted = issue.upvotedBy?.includes(currentUser?.id);

  const handleUpvote = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showToast("Please login first", "error");

        return;
      }

      const res = await api.patch(
        `/problems/${issue._id}/upvote`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIssue(res.data.problem);

      showToast(res.data.message, "success");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to upvote",

        "error",
      );
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(
        `/problems/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Issue deleted successfully", "success");

      navigate("/issues");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to delete issue",

        "error",
      );
    }
  };

  const addComment = async () => {
    if (!commentText.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/comments/${id}`,

        {
          text: commentText,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCommentText("");

      showToast("Comment added successfully", "success");

      fetchComments();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to add comment",

        "error",
      );
    }
  };

  const replyComment = async (parentCommentId) => {
    if (!replyText.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/comments/${id}`,
        {
          text: replyText,
          parentComment: parentCommentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Reply added successfully", "success");

      setReplyText("");
      setReplyingTo(null);

      fetchComments();
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to reply", "error");
    }
  };

  const deleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Delete this comment?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showToast("Comment deleted", "success");

      fetchComments();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to delete comment",
        "error",
      );
    }
  };

  const updateComment = async () => {
    if (!editCommentText.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/comments/${editingComment}`,

        {
          text: editCommentText,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Comment updated", "success");

      setEditingComment(null);
      setEditCommentText("");

      fetchComments();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to update comment",
        "error",
      );
    }
  };

  const likeComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.patch(
        `/comments/${commentId}/like`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast(res.data.message, "success");

      fetchComments();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to like comment",
        "error",
      );
    }
  };

  return (
    <section className="issue-details-page">
      <div className="issue-details-container">
        <IssueInfo issue={issue} />

        <IssueActions
          isOwner={isOwner}
          issue={issue}
          navigate={navigate}
          handleDelete={handleDelete}
          handleUpvote={handleUpvote}
          hasUpvoted={hasUpvoted}
        />

        <div className="comments-section">
          <h2>💬 Discussion</h2>

          <CommentForm
            commentText={commentText}
            setCommentText={setCommentText}
            addComment={addComment}
          />

          <CommentSection
            comments={comments}
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
        </div>
      </div>
    </section>
  );
}
