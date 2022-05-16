
import { format, createLogger, transports } from "winston";
const { timestamp, combine, printf, errors } = format


export function buildDevLogger() {
    const myFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${message || stack}`;
    });

    const logger = createLogger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), myFormat),
        transports: [
            new transports.Console(),
            new transports.File({
                filename: 'dev-combine.log',
                level: 'info'
            }),
            new transports.File({
                filename: 'dev-error.log',
                level: 'error'
            })
        ],
    });
    return logger
}