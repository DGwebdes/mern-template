import type { TConfig, TDBConfig, TJWTConfig } from "../utils/types";
import * as dotenv from "dotenv";
dotenv.config();

//Environment configuration

export const config: TConfig = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
};

// Database configuration

export const DBConfig: TDBConfig = {
    uri: process.env.MONGO_URI!,
};
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is required!");
}

//token configuration
const short = 15;
const long = 7;
export const JWTConfig: TJWTConfig = {
    accessSecret: process.env.JWT_ACCESS!,
    refreshSecret: process.env.JWT_REFRESH!,
    accessExpiry: `${short}min`,
    refreshExpiry: `${long}days`,
};
