import mongoose from "mongoose";
import app from "./app";
import { config } from "./config/config";
import { connectDB } from "./config/database";

async function start() {
  try {
    await connectDB();
    //Wait for db to connect
    app.listen(config.port, () => {
      console.log(
        `First wheel app listening at http://localhost:${config.port}`
      );
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("\nShutting down.");
  await mongoose.connection.close();
  console.log("Database connection closed");
  process.exit(0);
});

start();
