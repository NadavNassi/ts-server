import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { ApiError } from '../error/api-error';

const config = process.env;

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        next(ApiError.noToken('No token in request'))
        return
    }
    try {
        const decoded = await jwt.verify(token, config.TOKEN_KEY);
        console.log("🚀 ~ file: auth.middleware.ts ~ line 17 ~ verifyToken ~ decoded", decoded)
        //@ts-ignore
        req.user = decoded;
    } catch (err) {
        next(ApiError.wrongCredentials('Invalid token'))
        return
    }
    next();
};