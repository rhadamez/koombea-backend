import { Router } from 'express'
import { contactsRouter } from '../../../../modules/contacts/infra/express/routes/contacts.routes'
import { CsvFileRoutes } from '../../../../modules/csvFiles/infra/express/routes/csvFile.routes'
import { sessionsRouter } from '../../../../modules/users/infra/express/routes/sessions.routes'
import { userRouter } from '../../../../modules/users/infra/express/routes/user.routes'

const router = Router()

router.use('/contacts', contactsRouter)
router.use('/users', userRouter)
router.use('/sessions', sessionsRouter)
router.use('/csv', CsvFileRoutes)

export default router
