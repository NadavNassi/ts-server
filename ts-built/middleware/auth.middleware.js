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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_error_1 = require("../error/api-error");
const config = process.env;
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            next(api_error_1.ApiError.noToken('No token in request'));
            return;
        }
        try {
            const decoded = yield jsonwebtoken_1.default.verify(token, config.TOKEN_KEY);
            console.log("🚀 ~ file: auth.middleware.ts ~ line 17 ~ verifyToken ~ decoded", decoded);
            //@ts-ignore
            req.user = decoded;
        }
        catch (err) {
            next(api_error_1.ApiError.wrongCredentials('Invalid token'));
            return;
        }
        next();
    });
}
exports.verifyToken = verifyToken;
;
