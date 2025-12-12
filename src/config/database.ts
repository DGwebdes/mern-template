import mongoose from "mongoose";
import { DBConfig } from "./config";
import { logger } from "../middleware/logger";

export async function connectDB() {
  try {
    await mongoose.connect(DBConfig.uri);
    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error("MongoDB Failed to Connect, error:", error);
    throw error;
  }
}
