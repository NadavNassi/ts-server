import { Request, Response, NextFunction, Errback } from 'express'
import { ApiError } from '../error/api-error'
import { logger } from '../logger'


export function errorHandler(error: ApiError, req: Request, res: Response, next: NextFunction) {
    logger.error(error)
    if (error instanceof ApiError) {
        res.status(error.code).json(error.msg)
        return
    }
    res.status(500).json('something went wrong')
}