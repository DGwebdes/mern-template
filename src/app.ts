import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/itemRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
//Configuration and Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/items", router);

//Health checks and Error handlers
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.use(errorHandler);


export default app;
