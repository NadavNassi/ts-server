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
exports.movieService = void 0;
// const axios = require('axios').default
const axios_1 = __importDefault(require("axios"));
const { OMDB_KEY } = process.env;
const BASE_URL = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&`;
exports.movieService = {
    query,
    getById
};
function query(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        const movies = yield axios_1.default.get(`${BASE_URL}s=${searchTerm}`).then(res => res.data);
        return movies;
    });
}
function getById(omdbID) {
    return __awaiter(this, void 0, void 0, function* () {
        const movie = yield axios_1.default.get(`${BASE_URL}&i=${omdbID}`).then(res => res.data);
        if (movie.Error)
            return movie;
        const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, imdbRating, imdbVotes, Production, Website, Ratings, Metascore } = movie;
        return {
            title: Title,
            year: Year,
            rated: Rated,
            released: Released,
            runtime: Runtime,
            genre: Genre,
            director: Director,
            writer: Writer,
            actors: Actors,
            plot: Plot,
            language: Language,
            country: Country,
            awards: Awards,
            poster: Poster,
            imdbRating,
            imdbVotes,
            production: Production,
            website: Website,
            ratings: Ratings,
            metascore: Metascore
        };
    });
}
module.exports = {
    query,
    getById
};
