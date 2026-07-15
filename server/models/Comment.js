import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    likedBy: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},
parentComment: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Comment",
  default: null,
},
replies: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
],
  },
  
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);