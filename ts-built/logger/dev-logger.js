"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDevLogger = void 0;
const winston_1 = require("winston");
const { timestamp, combine, printf, errors, colorize } = winston_1.format;
function buildDevLogger() {
    const myFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${message || stack}`;
    });
    const logger = winston_1.createLogger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), errors({ stack: true }), myFormat),
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.File({
                filename: 'dev-combine.log',
                level: 'info'
            }),
            new winston_1.transports.File({
                filename: 'dev-error.log',
                level: 'error'
            })
        ],
    });
    return logger;
}
exports.buildDevLogger = buildDevLogger;
