import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    category: {
      type: String,
      default: "other",
    },

    location: {
      lat: Number,
      lng: Number,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    upvotes: {
      type: Number,
      default: 0,
    },
    upvotedBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

    status: {
      type: String,
      enum: [
        "reported",
        "in-progress",
        "resolved",
      ],
      default: "reported",
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model(
  "Problem",
  problemSchema
);

export default Problem;
