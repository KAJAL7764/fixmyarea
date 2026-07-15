import express from "express";
import {
  createProblem,
  getProblems,
  getMyProblems,
  getProblemById,
  upvoteProblem,
  updateProblemStatus,
  deleteProblem,
  updateProblem,
} from "../controllers/ProblemController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";




export const router = express.Router();


router.get("/", getProblems);
router.get("/my", protect, getMyProblems);
router.get("/:id", getProblemById);
router.post("/", protect,   upload.single("image"),createProblem);
router.patch("/:id", protect, upload.single("image"),updateProblem);
router.patch("/:id/upvote", protect, upvoteProblem);
router.patch("/:id/status", protect, isAdmin, updateProblemStatus);
router.delete("/:id", protect, deleteProblem);
export default router;