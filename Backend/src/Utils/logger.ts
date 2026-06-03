import pino from "pino";
import path from "path";
import fs from "fs";
import rfs from "rotating-file-stream";

const logDir = path.join(process.cwd(), "logs");

// Create logs directory if not exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// General application logs
    const appStream = rfs.createStream("app.log", {
    interval: "1d", // Rotate daily
    path: logDir,
    maxFiles: 30, // Keep last 30 files
    compress: "gzip",
});

// Error logs
const errorStream = rfs.createStream("error.log", {
    interval: "1d",
    path: logDir,
    maxFiles: 30,
    compress: "gzip",
});

const transport =
    process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
            },
        }
        : undefined;

export const logger = pino(
    {
        level: process.env.LOG_LEVEL || "info",

        timestamp: pino.stdTimeFunctions.isoTime,

        formatters: {
        level(label) {
            return { level: label };
        },
        },

        redact: [
        "password",
        "token",
        "accessToken",
        "refreshToken",
        "authorization",
        ],
    },
    transport ? pino.transport(transport) : appStream
);

// Separate error logger
export const errorLogger = pino(
    {
        level: "error",
        timestamp: pino.stdTimeFunctions.isoTime,
    },
    errorStream
);