import { Rating } from "./rating.interface";

export interface Movie {
    Error?: string,
    title: string,
    year: string,
    rated: string,
    released: string,
    runtime: string,
    genre: string,
    director: string,
    writer: string,
    actors: string,
    plot: string,
    language: string,
    country: string,
    awards: string,
    poster: string,
    imdbRating: string,
    imdbVotes: string,
    production: string,
    website: string,
    ratings: Rating[],
    metascore: string
}