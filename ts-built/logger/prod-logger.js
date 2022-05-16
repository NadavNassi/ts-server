"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProdLogger = void 0;
const winston_1 = require("winston");
const { timestamp, combine, errors, json } = winston_1.format;
function buildProdLogger() {
    const logger = winston_1.createLogger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json()),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.File({
                filename: 'combine.log',
                level: 'info'
            }),
            new winston_1.transports.File({
                filename: 'error.log',
                level: 'error'
            })
        ],
    });
    return logger;
}
exports.buildProdLogger = buildProdLogger;
