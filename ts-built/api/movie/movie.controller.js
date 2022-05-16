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
exports.getById = exports.getMovies = void 0;
const api_error_1 = require("../../error/api-error");
const logger_1 = require("../../logger");
const movie_service_1 = require("./movie.service");
function getMovies(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const q = req.query.q;
            logger_1.logger.info(`New request looking for ${q}`);
            const movies = yield movie_service_1.query(q);
            if (movies.Error) {
                next(api_error_1.ApiError.badRequest(movies.Error));
                return;
            }
            res.send(movies.Search);
        }
        catch (err) {
            logger_1.logger.error(err);
            next(api_error_1.ApiError.internalError('Bad request'));
        }
    });
}
exports.getMovies = getMovies;
function getById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const omdbID = req.params.omdbID;
            logger_1.logger.info(`New request looking for ${omdbID}`);
            const movie = yield movie_service_1.getById(omdbID);
            if (movie.Error) {
                next(api_error_1.ApiError.badRequest(movie.Error));
                return;
            }
            res.send(movie);
        }
        catch (err) {
            logger_1.logger.error('Failed to get items', err);
            next(api_error_1.ApiError.internalError('Bad request'));
        }
    });
}
exports.getById = getById;
