import express from "express";

import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
  likeComment,
} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:problemId", getComments);
router.post("/:problemId", protect, addComment);
router.patch("/:commentId", protect, updateComment);
router.delete("/:commentId", protect, deleteComment);
router.patch("/:commentId/like", protect, likeComment);

export default router;
