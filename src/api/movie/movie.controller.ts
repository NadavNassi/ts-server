import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../error/api-error';
import { Movie } from '../../interface/movie.interface'
import { Movies } from '../../interface/movies.interface'
import { logger } from '../../logger';
import { movieService } from './movie.service';

export async function getMovies(req: Request, res: Response, next: NextFunction) {
    try {
        const q = req.query.q
        logger.info(`New request looking for ${q}`)
        const movies: Movies = await movieService.query(q as string) as Movies
        if (movies.Error) {
            next(ApiError.badRequest(movies.Error))
            return
        }
        res.send(movies.Search)
    } catch (err) {
        logger.error(err)
        next(ApiError.internalError('Bad request'))
    }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
    try {
        const omdbID: string = req.params.omdbID
        logger.info(`New request looking for ${omdbID}`)
        const movie: Movie = await movieService.getById(omdbID) as Movie
        if (movie.Error) {
            next(ApiError.badRequest(movie.Error))
            return
        }
        res.send(movie)
    } catch (err) {
        logger.error('Failed to get items', err)
        next(ApiError.internalError('Bad request'))
    }
}
