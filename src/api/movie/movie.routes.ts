// const express = require('express')
// const movieController = require('./movie.controller')
import express, { IRouter } from 'express'
import { getById, getMovies } from './movie.controller'
import { logInfo } from '../../middleware/logger.middleware';

const router: IRouter = express.Router()

router.get('/', logInfo, getMovies)
router.get('/:omdbID', logInfo, getById)

export const movieRoutes = router