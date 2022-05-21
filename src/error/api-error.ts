export class ApiError {
    code: number
    msg: string
    constructor(code: number, msg: string) {
        this.code = code
        this.msg = msg
    }

    static badRequest(msg: string): ApiError {
        return new ApiError(400, msg)
    }

    static internalError(msg: string): ApiError {
        return new ApiError(500, msg)
    }

    static signupError(msg: string): ApiError {
        return new ApiError(422, msg)
    }

    static alredyExist(msg: string): ApiError {
        return new ApiError(409, msg)
    }

    static wrongCredentials(msg: string): ApiError {
        return new ApiError(401, msg)
    }

    static noToken(msg: string): ApiError {
        return new ApiError(403, msg)
    }
}