import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  getMe,
  resendOtp,
} from "../controller/user.controller.js";
import { testEmail } from "../controller/test.controller.js";
import { JwtAuth } from "../middleware/jwt.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify-otp", JwtAuth, verifyEmail);
router.get("/me", JwtAuth, getMe);
router.post("/resend-otp", JwtAuth, resendOtp);

export default router;
