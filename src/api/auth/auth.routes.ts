import express, { IRouter } from 'express'
import { login, signup } from './auth.controller'

const router: IRouter = express.Router()

router.post('/login', login)
router.post('/signup', signup)

export const authRoutes = router