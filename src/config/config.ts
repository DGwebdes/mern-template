import * as dotenv from "dotenv";
dotenv.config();

//Environment configuration
type Config = {
  port: number;
  nodeEnv: string;
};
export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
};

// Database configuration
type DBConfig = {
  uri: string;
};
export const DBConfig: DBConfig = {
  uri: process.env.MONGO_URI!,
};
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is required!");
}

//token configuration
type JWTConfig = {
  accessSecret: string,
  refreshSecret: string,
  accessExpiry: string,
  refreshExpiry: string
}
export const JWTConfig: JWTConfig = {
  accessSecret: process.env.JWT_ACCESS!,
  refreshSecret: process.env.JWT_REFRESH!,
  accessExpiry: "15 minutes",
  refreshExpiry: "7 days"
}
