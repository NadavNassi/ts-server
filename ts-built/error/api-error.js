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
}
exports.ApiError = ApiError;
