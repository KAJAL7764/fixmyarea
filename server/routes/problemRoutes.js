import express from "express";

import {
  createProblem,
  getProblems,
  getMyProblems,
  upvoteProblem,
    updateProblemStatus,
} from "../controllers/problemController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProblems);
router.get("/my", protect, getMyProblems);
router.post("/", protect, createProblem);
router.patch("/:id/upvote", upvoteProblem);
router.patch("/:id/status", updateProblemStatus);

export default router;