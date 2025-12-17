import type { Request, Response, NextFunction } from "express";
import { login, refreshAccessToken, register } from "../services/authUsers";
import { loginSchema, registerSchema } from "../utils/validators";

async function registerController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const validRegister = registerSchema.parse(req.body);
        const result = await register(
            validRegister.username,
            validRegister.email,
            validRegister.password
        );

        res.cookie("refreshToken", result.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            user: result.user,
            token: result.token,
        });
    } catch (error) {
        next(error);
    }
}
async function loginController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const validLogin = loginSchema.parse(req.body);
        const result = await login(validLogin.email, validLogin.password);
        res.cookie("refreshToken", result.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            user: result.user,
            token: result.token,
        });
    } catch (error) {
        next(error);
    }
}
/**
 * * Refresh token utility
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function refreshTokenController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.status(401).json({ message: "Refresh token missing" });

        const newToken = await refreshAccessToken(refreshToken);
        res.status(200).json(newToken);
    } catch (error) {
        next(error);
    }
}

/**
 * * Logout
 * @param req
 * @param res
 * @param next
 */
async function logoutController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ message: `Logout successful` });
    } catch (error) {
        next(error);
    }
}

export {
    loginController,
    registerController,
    logoutController,
    refreshTokenController,
};
