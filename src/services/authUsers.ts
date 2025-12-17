import bcrypt from "bcrypt";
import { genAccessToken, genRefreshToken, verifyToken } from "../utils/tokens";
import { User } from "../models/Users";
import type { TUserToken } from "../utils/types";
import { logger } from "../middleware/logger";
import { JWTConfig } from "../config/config";

async function login(
    email: string,
    password: string
): Promise<{ user: any; token: string; refresh: string }> {
    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("incorrect password");
        }

        const { token, refresh } = getTokens({
            _id: user._id.toString(),
            email: user.email,
        });
        return {
            user: { _id: user._id.toString(), email: user.email },
            token,
            refresh,
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
async function register(
    username: string,
    email: string,
    password: string
): Promise<{ user: any; token: string; refresh: string }> {
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error(`User already exists`);
        }

        const user = await User.create({ username, email, password });
        const { token, refresh } = getTokens({
            _id: user._id.toString(),
            email: user.email,
        });
        return {
            user: {
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
            },
            token,
            refresh,
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function refreshAccessToken(refreshToken: string) {
    const decoded = verifyToken(refreshToken, JWTConfig.refreshSecret);
    const userID = typeof decoded === "string" ? decoded : decoded.userId;
    const user = await User.findOne({ _id: userID });
    if (!user) throw new Error("No user found");

    const newAccessToken = genAccessToken({
        _id: user._id.toString(),
        email: user.email,
    });
    return { token: newAccessToken };
}

function getTokens(user: TUserToken) {
    const token = genAccessToken(user);
    const refresh = genRefreshToken(user);

    return { token, refresh };
}

export { login, register, refreshAccessToken };
