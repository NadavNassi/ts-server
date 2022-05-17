"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRoutes = void 0;
// const express = require('express')
// const movieController = require('./movie.controller')
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("./movie.controller");
const logger_middleware_1 = require("../../middleware/logger.middleware");
const router = express_1.default.Router();
router.get('/', logger_middleware_1.logInfo, movie_controller_1.getMovies);
router.get('/:omdbID', logger_middleware_1.logInfo, movie_controller_1.getById);
exports.movieRoutes = router;
