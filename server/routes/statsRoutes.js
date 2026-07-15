import express from "express";
import { getHeroStats } from "../controllers/statsController.js";
import { getTickerStats } from "../controllers/statsController.js";

const router = express.Router();

router.get("/hero", getHeroStats);
router.get("/ticker", getTickerStats);
export default router;