import { MailWelcome } from "../lib/nodeEmail.js";

export const testEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    console.log("Attempting to send test email to:", email);

    // Check if env vars are loaded (do not log password)
    console.log("Email Env Check:", {
      hasEmail: !!process.env.EMAIL,
      hasPassword: !!process.env.PASSWORD,
    });

    await MailWelcome(email, "Test User", "12345");

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Test Email Error:", error);
    return res.status(500).json({
      message: "Email failed",
      error: error.message,
      stack: error.stack,
    });
  }
};
