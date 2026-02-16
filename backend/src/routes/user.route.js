import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  getMe,
} from "../controller/user.controller.js";
import { JwtAuth } from "../middleware/jwt.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify-otp", JwtAuth, verifyEmail);
router.get("/me", JwtAuth, getMe);

export default router;
