import { Router } from 'express'
import ensureAuthenticated from '../../../../../shared/infra/express/middlewares/isAuthenticated'
import { CsvFileController } from '../controllers/CsvFileController'

const CsvFileRoutes = Router()

const csvFileController = new CsvFileController()

CsvFileRoutes.use(ensureAuthenticated)
CsvFileRoutes.get('/', csvFileController.listAll)

export { CsvFileRoutes }