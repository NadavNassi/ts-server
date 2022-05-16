// const axios = require('axios').default
import axios from 'axios'
import { MovieDetails } from '../../interface/movie-details.interface'
import { MovieError } from '../../interface/movie-error.interface'
import { MovieListError } from '../../interface/movie-list-error.interface'
import { MovieList } from '../../interface/movie-list.interface'
import { Movie } from '../../interface/movie.interface'
import { Movies } from '../../interface/movies.interface'
const { OMDB_KEY } = process.env
const BASE_URL: string = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&`

export const movieService = {
    query,
    getById
}

async function query(searchTerm: string): Promise<Movies | MovieListError> {
    const movies: Movies | MovieListError = await axios.get(`${BASE_URL}s=${searchTerm}`).then(res => res.data)
    return movies
}

async function getById(omdbID: string): Promise<Movie | MovieError> {
    const movie: MovieDetails = await axios.get(`${BASE_URL}&i=${omdbID}`).then(res => res.data)
    if (movie.Error) return movie
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, imdbRating, imdbVotes, Production, Website, Ratings, Metascore } = movie
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
    }
}


module.exports = {
    query,
    getById
}


