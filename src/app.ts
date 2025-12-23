import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes";
import { errorHandler, morganStream } from "./middleware/errorHandler";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";

const app = express();

//Configuration and Middleware
app.use(
    morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", {
        stream: morganStream,
    })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users/", userRoutes);

//Health checks and Error handlers
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});
app.use(errorHandler);


export default app;
