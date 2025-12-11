import * as dotenv from "dotenv";
dotenv.config();

type Config = {
  port: number;
  nodeEnv: string;
};

export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
};

type DBConfig = {
  uri: string;
};

export const DBConfig: DBConfig = {
  uri: process.env.MONGO_URI!,
};
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is required!");
}