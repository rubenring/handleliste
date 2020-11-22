import winston from "winston";
// creates a new Winston Logger
export const error = new winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
  exitOnError: false,
});
export const warn = new winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "warn",
    }),
  ],
  exitOnError: false,
});
export const info = new winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "info",
    }),
  ],
  exitOnError: false,
});
export default error;
