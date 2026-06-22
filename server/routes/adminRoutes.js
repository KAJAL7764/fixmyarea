import express from "express";

import { protect }
  from "../middleware/authMiddleware.js";

import { adminOnly }
  from "../middleware/adminMiddleware.js";

import {
  getDashboardStats,
  getAllProblemsAdmin,
  deleteProblem,
  getAllUsers,
  updateUserRole,
} from "../controllers/adminController.js";


const router = express.Router();

router.get(
  "/stats",
  protect,
  adminOnly,
  getDashboardStats
);

router.get(
  "/problems",
  protect,
  adminOnly,
  getAllProblemsAdmin
);

router.delete(
  "/problems/:id",
  protect,
  adminOnly,
  deleteProblem
);

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.patch(
  "/users/:id/role",
  protect,
  adminOnly,
  updateUserRole
);

export default router;