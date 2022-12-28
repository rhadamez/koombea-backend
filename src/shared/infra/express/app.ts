import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import createConnection from '../typeorm'
import cors from 'cors'

import '../../providers'
import routes from './routes'
import exceptionValidation from './middlewares/exceptionValidation'
import uploadConfig from '../../../config/uploadConfig'

createConnection()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.tmpFolder))
app.use(routes)
app.use(exceptionValidation)

export { app }
