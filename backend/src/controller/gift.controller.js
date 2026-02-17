import Gifts from "../Model/gifts.modal.js";
import generateSlug from "../util/generateSulg.js";
import QRCode from "qrcode";
export const createGift = async (req, res) => {
  try {
    const { amount, expectedRecipient } = req.body;

    if (!amount || !expectedRecipient) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.user._id) {
      return res.status(400).json({
        message: "User not authenticated",
      });
    }
    // 1️⃣ Check if user already has pending gift
    const existingPendingGift = await Gifts.findOne({
      sender: req.user._id,
    });

    if (existingPendingGift && existingPendingGift.status !== "pending") {
      return res.status(400).json({
        message:
          "THis git Invaild or in process, Please wait until the current gift is processed before creating a new one",
      });
    }

    // 2️⃣ Generate secure gift code
    const giftCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

    // 3️⃣ Create gift
    const gift = new Gifts({
      sender: req.user._id,
      expectedRecipient: expectedRecipient,
      amount,
      Slug: generateSlug(), // correct field name
      giftCode: `Gift-${giftCode}`,
      status: "pending",
    });

    await gift.save();

    res.status(201).json({
      message: "Gift created successfully",
      gift,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getGiftBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const gift = await Gifts.findOne({ Slug: slug }).populate(
      "sender",
      "name email",
    );

    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }

    return res.status(200).json({
      gift: {
        senderName: gift.sender.name,
        amount: gift.amount,
        message: gift.expectedRecipient.description,
        status: gift.status,
        createdAt: gift.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateGiftQR = async (req, res) => {
  try {
    const { id } = req.params;

    const gift = await Gifts.findById(id);

    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }
    const isdevelopment =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.CLIENT_URL;
    const url = `${isdevelopment}/gifts/${gift.Slug}`;

    const qrImage = await QRCode.toDataURL(url);

    res.status(200).json({
      qr: qrImage,
      gift: {
        giftCode: gift.giftCode,
        amount: gift.amount,
        currency: gift.currency,
        createdAt: gift.createdAt,
        isExpire: gift.isExpire,
        status: gift.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMyGifts = async (req, res) => {
  try {
    const gifts = await Gifts.find({ sender: req.user._id })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "sender",
        select: "name email",
      });
    if (!gifts) {
      return res.status(404).json({ message: "No gifts found" });
    }
    return res.status(200).json(gifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllGifts = async (req, res) => {
  try {
    const gifts = await Gifts.find({})
      .populate("sender", "name email")
      .sort({ createdAt: -1 });
    if (!gifts) {
      return res.status(404).json({ message: "No gifts found" });
    }
    return res.status(200).json(gifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
