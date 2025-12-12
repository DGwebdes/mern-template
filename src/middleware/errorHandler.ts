import { type Request, type Response, type NextFunction } from "express";
import { logger } from "./logger";

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(
    `${req.method} ${req.url} - ${err.status ? err.status : 500}: ${
      err.message
    }`
  );
  if (process.env.NODE_ENV !== "production") {
    logger.error(err.stack);
  }
  const response = {
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  };
  res.status(err.status || 500).json(response);
};

export const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};