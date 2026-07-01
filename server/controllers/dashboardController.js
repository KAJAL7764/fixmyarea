import Problem from "../models/Problem.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const reports = await Problem.find({
      reportedBy: userId,
    }).sort({ createdAt: -1 });

    const totalReports = reports.length;

    const resolved = reports.filter(
      (p) => p.status === "resolved"
    ).length;

    const open = reports.filter(
      (p) => p.status === "open"
    ).length;

    const totalUpvotes = reports.reduce(
      (sum, p) => sum + p.upvotes,
      0
    );

    const user = await User.findById(userId);

    res.status(200).json({
      success: true,

      stats: {
        name: user.name,
        reports: totalReports,
        resolved,
        open,
        upvotes: totalUpvotes,
      },

      recentReports: reports.slice(0, 5),
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};