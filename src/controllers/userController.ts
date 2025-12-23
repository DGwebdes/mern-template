import type { Request, Response, NextFunction } from "express";
import {
    changeUserPassword,
    deleteUserProfile,
    getUserById,
    updateUserProfile,
} from "../services/userService";
import { changePasswordSchema, updateProfileSchema } from "../utils/validators";

async function getProfileController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId =
            typeof req.user === "string" ? req.user : req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await getUserById(userId);
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

async function updateUserProfileController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId =
            typeof req.user === "string" ? req.user : req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const valid = updateProfileSchema.parse(req.body);
        const user = await updateUserProfile(userId, valid);
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

async function changeUserPasswordController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId =
            typeof req.user === "string" ? req.user : req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { oldPassword, newPass } = changePasswordSchema.parse(req.body);
        const user = await changeUserPassword(userId, { oldPassword, newPass });
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

async function deleteUserProfileController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId =
            typeof req.user === "string" ? req.user : req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const deleted = await deleteUserProfile(userId);
        res.status(200).json({ deleted });
    } catch (error) {
        next(error);
    }
}

export {
    getProfileController,
    updateUserProfileController,
    deleteUserProfileController,
    changeUserPasswordController,
};
