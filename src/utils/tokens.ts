import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWTConfig } from "../config/config";
import type { TUserToken } from "./types";

function genAccessToken(user: TUserToken): string {
    const payload = {
        userId: user._id,
        email: user.email,
    };
    const secret = JWTConfig.accessSecret;
    const options = {
        algorithm: "HS256",
        expiresIn: JWTConfig.accessExpiry,
    };

    const token = jwt.sign(payload, secret, options as jwt.SignOptions);

    return token;
}
function genRefreshToken(user: TUserToken) {
  const payload = { userId: user._id };
  const refresh = jwt.sign(payload, JWTConfig.refreshSecret, {
    expiresIn: JWTConfig.refreshExpiry,
  } as jwt.SignOptions);

  return refresh;
}
function verifyToken(token: string, secret: string): JwtPayload | string {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw error;
  }
}


export { genAccessToken, genRefreshToken, verifyToken };
