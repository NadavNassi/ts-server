// const express = require('express')
// const movieController = require('./movie.controller')
import express, { IRouter } from 'express'
import { getById, getMovies } from './movie.controller'
const router: IRouter = express.Router()

router.get('/', getMovies)
router.get('/:omdbID', getById)

export const movieRoutes = router