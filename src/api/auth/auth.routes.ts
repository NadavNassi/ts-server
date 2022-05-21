import express, { IRouter } from 'express'
import { login, logout, signup } from './auth.controller'

const router: IRouter = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/signup', signup)

export const authRoutes = router