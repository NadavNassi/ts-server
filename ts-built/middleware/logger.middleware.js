"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = void 0;
const logger_1 = require("../logger");
function logInfo(req, res, next) {
    logger_1.logger.info(`New request was made to pid [${process.pid}]`);
    next();
}
exports.logInfo = logInfo;
