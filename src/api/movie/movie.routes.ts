// const express = require('express')
// const movieController = require('./movie.controller')
import express, { IRouter } from 'express'
import { getById, getMovies } from './movie.controller'
import { logInfo } from '../../middleware/logger.middleware';
import { verifyToken } from '../../middleware/auth.middleware';

const router: IRouter = express.Router()

router.get('/', verifyToken, logInfo, getMovies)
router.get('/:omdbID', verifyToken, logInfo, getById)

export const movieRoutes = router