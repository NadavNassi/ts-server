import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../error/api-error";
import { logger } from "../../logger";
import User from '../../model/user'
import { authService } from "./auth.service";
import bcrypt from 'bcrypt'
import { UserSignup } from "../../interface/user.interface";


export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { first_name, last_name, email, password } = req.body
        if (!(first_name && last_name && email && password)) {
            next(ApiError.signupError('Some details are missings'))
            return
        }
        const user = await authService.signup({ first_name, last_name, email, password } as UserSignup)
        delete user.password
        res.status(201).json(user)
    } catch (error) {
        logger.error(error.msg)
        next(error)
    }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { email, password } = req.body
        if (!(password && email)) {
            next(ApiError.signupError('All inputs are required'))
            return
        }
        const user: UserSignup = await authService.login(email, password)
        res.status(200).json(user)
    } catch (error) {
        logger.error
        next(error)
    }
}




export function logout(req: Request, res: Response): void { }

export class AuthApi {
}