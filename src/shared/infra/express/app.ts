import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import createConnection from '../typeorm'
import cors from 'cors'

import '../../providers'
import routes from './routes'
import exceptionValidation from './middlewares/exceptionValidation'

createConnection()

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(exceptionValidation)

export { app }
