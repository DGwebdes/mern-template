import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
    changeUserPasswordController,
    deleteUserProfileController,
    getProfileController,
    updateUserProfileController,
} from "../controllers/userController";

const userRouter = Router();

// userRouter.get("/:id");
userRouter.get("/me", authMiddleware, getProfileController);
userRouter.patch("/me", authMiddleware, updateUserProfileController);
userRouter.patch("/changePass", authMiddleware, changeUserPasswordController);
userRouter.delete("/me", authMiddleware, deleteUserProfileController);

export default userRouter;
