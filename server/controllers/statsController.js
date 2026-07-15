import Problem from "../models/Problem.js";
import User from "../models/User.js";

export const getHeroStats = async (req, res) => {
  try {
    const totalIssues = await Problem.countDocuments();

    const resolved = await Problem.countDocuments({
      status: "resolved",
    });

    const totalUsers = await User.countDocuments();

    const latestIssues = await Problem.find()
      .sort({ createdAt: -1 })
      .limit(3);

    const mapIssues = await Problem.find()
      .select("location category status title createdAt")
      .limit(20);

    const resolutionRate =
      totalIssues === 0
        ? 0
        : Math.round((resolved / totalIssues) * 100);

    res.json({
      success: true,

      stats: {
        totalIssues,
        resolved,
        totalUsers,
        resolutionRate,
      },

      latestIssues,

      mapIssues,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const getTickerStats = async (req, res) => {
  try {
    const totalIssues = await Problem.countDocuments();

    const resolvedIssues = await Problem.countDocuments({
      status: "resolved",
    });

    const totalUsers = await User.countDocuments();

    const resolutionRate =
      totalIssues === 0
        ? 0
        : Math.round((resolvedIssues / totalIssues) * 100);

    res.json({
      success: true,
      stats: {
        totalIssues,
        resolvedIssues,
        totalUsers,
        resolutionRate,
        avgResponseTime: "4.2 days", // we'll calculate this later
      },
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};