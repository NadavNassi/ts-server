"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const api_error_1 = require("../error/api-error");
const logger_1 = require("../logger");
function errorHandler(error, req, res, next) {
    logger_1.logger.error(error);
    if (error instanceof api_error_1.ApiError) {
        res.status(error.code).json(error.msg);
        return;
    }
    res.status(500).json('something went wrong');
}
exports.errorHandler = errorHandler;
