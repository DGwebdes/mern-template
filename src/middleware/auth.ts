import type { Request, Response, NextFunction } from "express";
import { JWTConfig } from "../config/config";
import { verifyToken } from "../utils/tokens";
import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token missing" });

    try {
        const decoded = verifyToken(token, JWTConfig.accessSecret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Expired or Invalid token " });
    }
}

export { authMiddleware };