import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../lib/db.js";
import Gifts from "../Model/gifts.modal.js";

dotenv.config();

const dropIndex = async () => {
  try {
    await connectDB();
    console.log("Connected to database...");

    // Access the native collection
    const collection = mongoose.connection.collection("gifts");

    // Check if index exists before dropping
    const indexes = await collection.indexes();
    const indexExists = indexes.some((index) => index.name === "qrSlug_1");

    if (indexExists) {
      await collection.dropIndex("qrSlug_1");
      console.log("Index qrSlug_1 dropped successfully.");
    } else {
      console.log("Index qrSlug_1 not found.");
    }

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

dropIndex();
