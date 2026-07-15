import express from "express";
import { createOrder } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);

export default router;