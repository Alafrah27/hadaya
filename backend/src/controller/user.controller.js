import User from "../Model/user.modal.js";
import bcrypt from "bcryptjs";
import generateToken from "../util/generateToken.js";
import { MailWelcome } from "../lib/nodeEmail.js";
import crypto from "crypto";

function generateOTP() {
  return crypto.randomInt(0, 100000).toString().padStart(5, "0");
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6 || name.length < 5) {
      return res.status(400).json({
        message: "Password or Name must be at least 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const otpCode = generateOTP();

    const user = new User({
      name,
      email,
      password: hashPassword,
      otpCode,
      otpExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // Send OTP email
    await MailWelcome(user.email, user.name, user.otpCode);

    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully. Please  verify your email",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerify) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { otpCode } = req.body;

    if (!otpCode) {
      return res.status(400).json({ message: "OTP required" });
    }

    const user = req.user; // 🔥 from middleware

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerify) {
      return res.status(400).json({ message: "Already verified" });
    }

    if (user.otpCode !== otpCode) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(401).json({ message: "OTP expired" });
    }

    user.isVerify = true;
    user.otpCode = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
