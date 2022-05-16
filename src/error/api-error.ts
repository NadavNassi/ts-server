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
}