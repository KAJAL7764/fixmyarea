import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import problemRoutes from "./routes/problemRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/problems", problemRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/payment", paymentRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
