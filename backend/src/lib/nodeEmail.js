import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { RegisterTemplate } from "../Template/Register.template.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 465 for secure connection
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Helps with some self-signed cert issues or proxy blocks
  },
  connectionTimeout: 10000, // 10 seconds timeout
  greetingTimeout: 10000,
  socketTimeout: 10000,
  debug: true,
  logger: true, // Enable logging
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
