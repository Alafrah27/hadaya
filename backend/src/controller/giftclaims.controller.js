import GiftClaim from "../Model/giftClaim.modal.js";
import Gifts from "../Model/gifts.modal.js";

export const claimGift = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name, phone, iban } = req.body;

    // 1️⃣ Validate input
    if ( !phone) {
      return res.status(400).json({
        message: " phone is important to claim the gift",
      });
    }

    // 2️⃣ Find gift by qrSlug
    const gift = await Gifts.findOne({ Slug: slug });

    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }

    // 3️⃣ Check if gift already processed
    if (gift.status !== "pending") {
      return res.status(400).json({
        message: "Gift already processed or not available",
      });
    }

    // 4️⃣ Match recipient info
    const expected = gift.expectedRecipient;

    const isMatch =
      expected.phone === phone 


    if (!isMatch) {
      return res.status(400).json({
        message: "Information does not match gift details",
      });
    }

    // 5️⃣ Prevent duplicate claims
    const existingClaim = await GiftClaim.findOne({
      gift: gift._id,
    });

    if (existingClaim) {
      return res.status(400).json({
        message: "Gift already claimed",
      });
    }

    // 6️⃣ Create claim
    const newClaim = new GiftClaim({
      gift: gift._id,
      name,
      phone,
      iban,
      isMatched: true,
      status: "accepted",
    });

    await newClaim.save();

    // 7️⃣ Update gift status
    gift.status = "accepted";
    await gift.save();

    return res.status(200).json({
      message: "Gift claimed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const declineGift = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1️⃣ Find gift
    const gift = await Gifts.findOne({ Slug: slug });

    if (!gift) {
      return res.status(404).json({
        message: "Gift not found",
      });
    }

    // 2️⃣ Check if gift still pending
    if (gift.status !== "pending") {
      return res.status(400).json({
        message: "Gift already processed",
      });
    }

    // 3️⃣ Prevent duplicate decline/claim
    const existingClaim = await GiftClaim.findOne({
      gift: gift._id,
    });

    if (existingClaim) {
      return res.status(400).json({
        message: "Gift already handled",
      });
    }

    // 4️⃣ Create rejection record
    const declineRecord = new GiftClaim({
      gift: gift._id,
      isMatched: false,
      status: "rejected",
    });

    await declineRecord.save();

    // 5️⃣ Update gift status
    gift.status = "declined";
    gift.isExpire = true; // Mark as expired to prevent future claims
    await gift.save();

    return res.status(200).json({
      message: "Gift declined successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
