import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import path from 'path'
import cluster from 'cluster'
import os from 'os'

import { movieRoutes } from './api/movie/movie.routes'
import { logger } from './logger'
import { errorHandler } from './middleware/error-handler.middleware'

const app: Express = express()

const cpuNum = os.cpus().length

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions: CorsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use('/api/movie', movieRoutes)

app.get('/**', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(errorHandler)
const port: number | string = process.env.PORT || 3030

if (cluster.isPrimary) {
    for (let i = 0; i < cpuNum; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        logger.error(`worker ${worker.process.pid} died`);
        cluster.fork()
    })
} else {
    app.listen(port,
        () => logger.info(`pid: [${process.pid}] Server is running on port:  ${port}`)
    )
}

// app.listen(port,
//     () => logger.info('Server is running on port: ' + port)
// )