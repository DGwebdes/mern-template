import winston from "winston";

const level = process.env.NODE_ENV === "production" ? "info" : "debug";
export const logger = winston.createLogger({
  level: level,
  format: winston.format.json(),
  defaultMeta: { service: "idein-manager" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
  ],
});

if (process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.File({ filename: "logs/error.log", level: "error" })
  );
  logger.add(new winston.transports.File({ filename: "logs/combined.log" }));
}
