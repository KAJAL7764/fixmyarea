import Problem from "../models/Problem.js";
import User from "../models/User.js";

export const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalProblems =
      await Problem.countDocuments();

    const reported =
      await Problem.countDocuments({
        status: "reported",
      });

    const inProgress =
      await Problem.countDocuments({
        status: "in-progress",
      });

    const resolved =
      await Problem.countDocuments({
        status: "resolved",
      });

    const totalUsers =
      await User.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalProblems,
        reported,
        inProgress,
        resolved,
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllProblemsAdmin = async (
  req,
  res
) => {
  try {
    const problems = await Problem.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProblem = async (
  req,
  res
) => {
  try {
    const problem =
      await Problem.findById(
        req.params.id
      );

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    await problem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Problem deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Admin → Get All Users
export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Promote User to Admin
export const updateUserRole = async (
  req,
  res
) => {
  try {
    const { role } = req.body;

    if (
      role !== "user" &&
      role !== "admin"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};