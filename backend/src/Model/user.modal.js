import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  otpCode: {
    type: String,
    default: "",
  },
  otpExpiry: {
    type: Date,
    default: Date.now() + 10 * 60 * 1000,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
