import express from "express";
import router from "./routes/itemRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

app.use("/api/items", router);

app.use(errorHandler);


export default app;
