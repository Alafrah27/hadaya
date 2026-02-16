import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { RegisterTemplate } from "../Template/Register.template.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use false for port 587
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.PASSWORD, // Your email app password
  },
  debug: true, // Add this for debugging information
});

export const MailWelcome = async (email, name, otpCode) => {
  try {
    const info = await transporter.sendMail({
      from: '"ShareGifts Team" <musdarthafa@gmail.com>', // sender address
      to: email,
      subject: "Welcome to ShareGifts!", // Subject line
      html: RegisterTemplate.replace("{username}", name).replace(
        "{Verifycode}",
        otpCode,
      ), // html body
    });
    console.log("Welcome Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.log("Error sending welcome email:", error);
  }
};
