
import { format, createLogger, transports } from "winston";
const { timestamp, combine, errors, json } = format


export function buildProdLogger() {
    const logger = createLogger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json()),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.Console(),
            new transports.File({
                filename: 'combine.log',
                level: 'info'
            }),
            new transports.File({
                filename: 'error.log',
                level: 'error'
            })
        ],
    });
    return logger
}