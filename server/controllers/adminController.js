import User from "../models/User.js";
import Problem from "../models/Problem.js";

export const getAdminDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalIssues = await Problem.countDocuments();

    const openIssues = await Problem.countDocuments({
      status: "open",
    });

    const inProgress = await Problem.countDocuments({
      status: "inprogress",
    });

    const resolved = await Problem.countDocuments({
      status: "resolved",
    });

    res.status(200).json({
      totalUsers,
      totalIssues,
      openIssues,
      inProgress,
      resolved,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};