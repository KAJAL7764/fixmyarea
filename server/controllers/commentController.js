import Comment from "../models/Comment.js";

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { text, parentComment } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty",
      });
    }
    const comment = await Comment.create({
      problem: req.params.problemId,
      user: req.user.id,
      text,
      parentComment: parentComment || null,
    });
    if (parentComment) {
      const parent = await Comment.findById(parentComment);
      parent.replies.push(comment._id);
      await parent.save();
    }

    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "name",
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Comments
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      problem: req.params.problemId,
      parentComment: null,
    })

      .populate("user", "name")

      .populate("likedBy", "_id")

      .populate({
        path: "replies",
        populate: [
          {
            path: "user",
            select: "name",
          },
          {
            path: "likedBy",
            select: "_id",
          },
        ],
      })

      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    comment.text = req.body.text;

    await comment.save();

    res.json({
      success: true,
      message: "Comment updated",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    const likedBy = comment.likedBy || [];

    const alreadyLiked = likedBy.some(
      (id) => id && id.toString() === req.user.id,
    );

    if (alreadyLiked) {
      comment.likedBy = likedBy.filter(
        (id) => id && id.toString() !== req.user.id,
      );
    } else {
      comment.likedBy.push(req.user.id);
    }

    await comment.save();

    res.status(200).json({
      message: alreadyLiked ? "Comment unliked" : "Comment liked",

      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
