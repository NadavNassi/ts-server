import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { ApiError } from "../../error/api-error";
import User from "../../model/user";
import { UserSignup } from "../../interface/user.interface";

const SALT_ROUNDES = 10


async function signup(credentials: UserSignup): Promise<UserSignup> {
    const oldUser = await User.findOne({ email: credentials.email })
    if (oldUser) {
        throw ApiError.alredyExist('Email exist, please log in')
    }
    const encryptedPassword = await bcrypt.hash(credentials.password, SALT_ROUNDES)
    const user = await User.create({
        email: credentials.email,
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        password: encryptedPassword
    })
    const token = jwt.sign(
        { user_id: user._id, email: credentials.email },
        process.env.TOKEN_KEY,
        {
            expiresIn: '2h'
        }
    )
    user.token = token
    return user
}

async function login(email: string, password: string): Promise<UserSignup> {
    const user = await User.findOne({ email })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (user && isPasswordValid) {
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h'
            }
        )
        user.token = token
        return user
    } else {
        throw ApiError.wrongCredentials('Wrong cradentials')
    }
}



export const authService = {
    login,
    signup
}