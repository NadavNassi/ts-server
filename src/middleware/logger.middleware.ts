import { logger } from "../logger";
import { Request, Response, NextFunction } from 'express'

export function logInfo(req: Request, res: Response, next: NextFunction) {
    logger.info(`New request was made to pid [${process.pid}]`)
    next()
}