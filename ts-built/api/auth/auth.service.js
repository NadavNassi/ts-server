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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_error_1 = require("../../error/api-error");
const user_1 = __importDefault(require("../../model/user"));
const SALT_ROUNDES = 10;
function signup(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const oldUser = yield user_1.default.findOne({ email: credentials.email });
        if (oldUser) {
            throw api_error_1.ApiError.alredyExist('Email exist, please log in');
        }
        const encryptedPassword = yield bcrypt_1.default.hash(credentials.password, SALT_ROUNDES);
        const user = yield user_1.default.create({
            email: credentials.email,
            first_name: credentials.first_name,
            last_name: credentials.last_name,
            password: encryptedPassword
        });
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email: credentials.email }, process.env.TOKEN_KEY, {
            expiresIn: '2h'
        });
        user.token = token;
        return user;
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email });
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (user && isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
                expiresIn: '2h'
            });
            user.token = token;
            return user;
        }
        else {
            throw api_error_1.ApiError.wrongCredentials('Wrong cradentials');
        }
    });
}
exports.authService = {
    login,
    signup
};
