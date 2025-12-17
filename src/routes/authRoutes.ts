import { Router } from "express";
import {
    loginController,
    logoutController,
    refreshTokenController,
    registerController,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/refresh", refreshTokenController);
authRouter.get("/logout", logoutController);

/**
 * ? Test routes. Can be deleted before deploying to prod
 */
authRouter.get("/test", authMiddleware, (req, res) => {
    res.status(200).json({
        user: req.user,
    });
});

export default authRouter;
