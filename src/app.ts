import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/itemRoutes";
import { errorHandler, morganStream } from "./middleware/errorHandler";
import morgan from "morgan";

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

//Routes
app.use("/api/items", router);

//Health checks and Error handlers
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});
app.use(errorHandler);


export default app;
