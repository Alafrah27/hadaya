import express from "express";
import { claimGift, declineGift } from "../controller/giftclaims.controller.js";
import { JwtAuth } from "../middleware/jwt.js";

const router = express.Router();

router.post("/claim/:slug", claimGift);
router.post("/decline/:slug", declineGift);

export default router;
