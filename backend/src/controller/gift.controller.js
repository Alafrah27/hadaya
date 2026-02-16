import Gifts from "../Model/gifts.modal.js";
import generateSlug from "../util/generateSulg.js";
import QRCode from "qrcode";
export const createGift = async (req, res) => {
  try {
    const { amount, expectedRecipient } = req.body;
    if (!amount || !expectedRecipient) {
      return res.status(400).json({ message: "All fields required" });
    }
    const giftCode = Math.floor(100000 + Math.random() * 900000);
    const gift = new Gifts({
      sender: req.user._id,
      expectedRecipient,
      amount,
      Slug: generateSlug(),
      giftCode: `Gift-${giftCode}`,
    });
    await gift.save();
    res.status(201).json(gift);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      sluq: {
        senderName: gift.sender.name,
        amount: gift.amount,
        message: gift.expectedRecipient.description,
        status: gift.status,
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

    const url = `${process.env.CLIENT_URL}/gifts/${gift.Slug}`;

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
    const gifts = await Gifts.find({ sender: req.user._id }).sort({
      createdAt: -1,
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
