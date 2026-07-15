import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
    getProfile,
  googleLogin,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.get("/verify-email/:token", verifyEmail);
router.get("/profile", protect, getProfile);
router.post(
  "/forgot-password",
  forgotPassword
);
router.post(
  "/reset-password/:token",
  resetPassword
);
export default router;