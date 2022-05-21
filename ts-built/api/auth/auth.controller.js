"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthApi = exports.logout = exports.login = exports.signup = void 0;
const api_error_1 = require("../../error/api-error");
const logger_1 = require("../../logger");
const auth_service_1 = require("./auth.service");
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { first_name, last_name, email, password } = req.body;
            if (!(first_name && last_name && email && password)) {
                next(api_error_1.ApiError.signupError('Some details are missings'));
                return;
            }
            const user = yield auth_service_1.authService.signup({ first_name, last_name, email, password });
            delete user.password;
            res.status(201).json(user);
        }
        catch (error) {
            logger_1.logger.error(error.msg);
            next(error);
        }
    });
}
exports.signup = signup;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!(password && email)) {
                next(api_error_1.ApiError.signupError('All inputs are required'));
                return;
            }
            const user = yield auth_service_1.authService.login(email, password);
            res.status(200).json(user);
        }
        catch (error) {
            logger_1.logger.error;
            next(error);
        }
    });
}
exports.login = login;
function logout(req, res) { }
exports.logout = logout;
class AuthApi {
}
exports.AuthApi = AuthApi;
