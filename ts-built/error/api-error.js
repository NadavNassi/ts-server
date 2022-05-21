"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }
    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    static internalError(msg) {
        return new ApiError(500, msg);
    }
    static signupError(msg) {
        return new ApiError(422, msg);
    }
    static alredyExist(msg) {
        return new ApiError(409, msg);
    }
    static wrongCredentials(msg) {
        return new ApiError(401, msg);
    }
    static noToken(msg) {
        return new ApiError(403, msg);
    }
}
exports.ApiError = ApiError;
