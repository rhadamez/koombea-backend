import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import { createConnection } from '../typeorm'
import '../../providers'
import routes from './routes'
import exceptionValidation from './middlewares/exceptionValidation'

createConnection()
const app = express()
app.use(express.json())
app.use(routes)
app.use(exceptionValidation)

export { app }
