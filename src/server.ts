import mongoose from "mongoose";
import app from "./app";
import { config } from "./config/config";
import { connectDB } from "./config/database";
import { logger } from "./middleware/logger";
import { User } from "./models/Users";

async function start() {
  try {
    await connectDB();
    //Wait for db to connect
    app.listen(config.port, () => {
      logger.info(
        `First wheel app listening at http://localhost:${config.port}`
      );
      logger.info(`Environment: ${config.nodeEnv}`);
    });

  } catch (error) {
    logger.error("Failed to start the server", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  logger.warn("\nShutting down.");
  await mongoose.connection.close();
  logger.warn("Database connection closed");
  process.exit(0);
});

start();
