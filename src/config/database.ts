import mongoose from "mongoose";
import { DBConfig } from "./config";

export async function connectDB() {
  try {
    await mongoose.connect(DBConfig.uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Failed to Connect, error:", error);
    throw error;
  }
}
