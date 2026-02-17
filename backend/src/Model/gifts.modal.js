import mongoose from "mongoose";

const GiftSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "SAR",
    },

    expectedRecipient: {
      FullName: String,
      phone: String,
      iban: String,
      description: String,
    },

  

    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "paid"],
      default: "pending",
    },

    Slug: {
      type: String,
      unique: true,
      required: true,
    },

    giftCode: {
      type: String,
      unique: true,
      required: true,
    },
    isExpire: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Gifts = mongoose.model("Gifts", GiftSchema);
export default Gifts;
