import Problem from "../models/Problem.js";
export const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
    } = req.body;

    const existingProblem =
      await Problem.findOne({
        title,
        category,
        status: { $ne: "resolved" },
      });

    if (existingProblem) {
      existingProblem.upvotes += 1;

      await existingProblem.save();

      return res.status(200).json({
        success: true,
        message:
          "Issue already exists. Upvote added.",
        problem: existingProblem,
      });
    }

    const problem = await Problem.create({
      title,
      description,
      category,
      location,
      reportedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      problem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProblems = async (req, res) => {
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

export const getMyProblems = async (req, res) => {
  try {
    const problems = await Problem.find({
      reportedBy: req.user.id,
    }).sort({ createdAt: -1 });

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

export const upvoteProblem = async (req, res) => {
  try {
    const updated = await Problem.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { upvotes: 1 },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      problem: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const updateProblemStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

      // ✅ Validation goes here
      const allowedStatuses = [
        "reported",
        "in-progress",
        "resolved",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      const problem =
        await Problem.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      if (!problem) {
        return res.status(404).json({
          success: false,
          message: "Problem not found",
        });
      }

      res.status(200).json({
        success: true,
        problem,
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
      .populate(
        "reportedBy",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

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