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
