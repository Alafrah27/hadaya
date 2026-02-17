import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
import connectDB from "../src/lib/db.js";
import userRoutes from "../src/routes/user.route.js";
import giftRoutes from "../src/routes/gift.route.js";

import giftClaimRoutes from "../src/routes/giftClaim.route.js";
import { job } from "./lib/cron.js";
job.start();
const allowedOrigins = [
  "https://hadiyati-app.netlify.app",
  "http://localhost:5173",
  "http://localhost:5174",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/gift", giftRoutes);
app.use("/api/v1/gift-claim", giftClaimRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on local http://localhost:${PORT} `);
  connectDB()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
});
