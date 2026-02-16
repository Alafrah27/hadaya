import mongoose from "mongoose";

const GiftClaimSchema = new mongoose.Schema({
  gift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gifts",
    required: true,
  },

  name: String,

  phone: String,

  iban: String,

  isMatched: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const GiftClaim = mongoose.model("GiftClaim", GiftClaimSchema);
export default GiftClaim;
