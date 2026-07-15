import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      // required: true,
      default: null,
    },
    googleId: {
  type: String,
  default: null,
},

avatar: {
  type: String,
  default: "",
},
    role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},
isVerified: {
  type: Boolean,
  default: false,
}, 
verificationToken: {
  type: String,
  default: null,
},

verificationTokenExpires: {
  type: Date,
  default: null,
},
resetPasswordToken: {
  type: String,
  default: null,
},

resetPasswordExpires: {
  type: Date,
  default: null,
},
  },
  { timestamps: true }
  
);


const User = mongoose.model("User", userSchema);

export default User;