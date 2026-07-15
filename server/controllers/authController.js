import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAuth } from "../config/firebaseAdmin.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import Problem from "../models/Problem.js";



export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      isVerified: false,

      verificationToken,

      verificationTokenExpires:
        Date.now() + 1000 * 60 * 60 * 24,
    });

    // Verification link
    const verificationLink =
      `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    // Send email
    await sendEmail(
      email,
      "Verify your FixMyArea account",
      `
      <h2>Welcome to FixMyArea!</h2>

      <p>Click the button below to verify your email.</p>

      <a
        href="${verificationLink}"
        style="
          background:#7CFC00;
          color:black;
          padding:12px 20px;
          text-decoration:none;
          border-radius:8px;
          font-weight:bold;
          display:inline-block;
        "
      >
        Verify Email
      </a>

      <p>This link expires in 24 hours.</p>
      `
    );


    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email.",
    });

  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

   const decoded = await getAuth().verifyIdToken(token);

    const { uid, email, name, picture } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        googleId: uid,
        avatar: picture,
      });
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
  return res.status(403).json({
    success: false,
    message: "Please verify your email before logging in.",
  });
}

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    // Get user
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // All issues reported by this user
    const problems = await Problem.find({
      reportedBy: req.user.id,
    });

    // Statistics
    const reports = problems.length;

    const resolved = problems.filter(
      (problem) => problem.status === "resolved"
    ).length;

    const upvotes = problems.reduce(
      (total, problem) => total + problem.upvotes,
      0
    );

    res.status(200).json({
      success: true,
      user,
      stats: {
        reports,
        resolved,
        upvotes,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

   const resetToken = crypto.randomBytes(32).toString("hex");

user.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetLink =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Reset your FixMyArea password",
      `
      <h2>Password Reset</h2>

      <p>Click the button below to reset your password.</p>

      <a
        href="${resetLink}"
        style="
          background:#7CFC00;
          color:black;
          padding:12px 20px;
          border-radius:8px;
          text-decoration:none;
          font-weight:bold;
        "
      >
        Reset Password
      </a>

      <p>This link expires in 30 minutes.</p>
      `
    );

    res.json({
      success: true,
      message: "Password reset email sent.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    // Hash the token from the URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};