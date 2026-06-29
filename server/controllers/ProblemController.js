import Problem from "../models/Problem.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
  const stream =
  cloudinary.uploader.upload_stream(
    {
      folder: "fixmyarea",
      resource_type: "image",
    },
    (error, result) => {
      if (error) {
        console.log(
          "CLOUDINARY ERROR:",
          error
        );
        reject(error);
      } else {
        resolve(result);
      }
    }
  );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const createProblem = async (req, res) => {
  try {
      console.log("FILE:", req.file);
    console.log("BODY:", req.body);
       
    const { 
      title, description, category, location } = req.body;

    const parsedLocation = JSON.parse(location);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const uploadedImage = await uploadToCloudinary(req.file.buffer);

    const imageUrl = uploadedImage.secure_url;


    const problem = await Problem.create({
      title,
      description,
      category,
      image: imageUrl,
      location: parsedLocation,
      reportedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      problem,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find()
      .populate("reportedBy", "name")
      .sort({ createdAt: -1 }).limit(8);

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

export const getProblemById = async (
  req,
  res
) => {
  try {
    const problem =
      await Problem.findById(
        req.params.id
      ).populate(
        "reportedBy",
        "name email"
      );

    if (!problem) {
      return res.status(404).json({
        success: false,
        message:
          "Problem not found",
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
    const problem = await Problem.findById(
      req.params.id
    );

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // Has this user already upvoted?
    const alreadyUpvoted =
      problem.upvotedBy.includes(
        req.user.id
      );

    if (alreadyUpvoted) {
      return res.status(400).json({
        success: false,
        message: "You have already upvoted this issue.",
      });
    }

    problem.upvotes += 1;

    problem.upvotedBy.push(
      req.user.id
    );

    await problem.save();

    res.status(200).json({
      success: true,
      message: "Upvote added!",
      problem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProblemStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // ✅ Validation goes here
    const allowedStatuses = ["reported", "in-progress", "resolved"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
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

export const getAllProblemsAdmin = async (req, res) => {
  try {
    const problems = await Problem.find()
      .populate("reportedBy", "name email")
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

export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    // Check ownership
    if (
      problem.reportedBy.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this issue",
      });
    }

    await problem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    // Owner check
    if (
      problem.reportedBy.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this issue",
      });
    }

    const {
      title,
      description,
      category,
    } = req.body;

    problem.title = title;
    problem.description = description;
    problem.category = category;

    await problem.save();

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      problem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};