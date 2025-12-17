import { Router } from "express";
import {
    loginController,
    logoutController,
    refreshTokenController,
    registerController,
} from "../controllers/authController";
const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/refresh", refreshTokenController);
authRouter.get("/logout", logoutController);

export default authRouter;
