import express from "express";
import {
  createGift,
  generateGiftQR,
  getAllGifts,
  getAllMyGifts,
  getGiftBySlug,
} from "../controller/gift.controller.js";
import { JwtAuth } from "../middleware/jwt.js";

const router = express.Router();

router.post("/create", JwtAuth, createGift);
router.get("/my-gifts", JwtAuth, getAllMyGifts);
router.get("/allgifts", JwtAuth, getAllGifts);
router.get("/:slug",JwtAuth, getGiftBySlug);
router.get("/qr/:id", generateGiftQR);

export default router;
