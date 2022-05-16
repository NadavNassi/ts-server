import { MovieList } from "./movie-list.interface"

export interface Movies {
    Search: MovieList[]
    Error?: string
}