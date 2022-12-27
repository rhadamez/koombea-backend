import { Router } from 'express'
import { contactsRouter } from '../../../../modules/contacts/infra/express/routes/contacts.routes'
import { sessionsRouter } from '../../../../modules/users/infra/express/routes/sessions.routes'
import { userRouter } from '../../../../modules/users/infra/express/routes/user.routes'

const router = Router()

router.use('/contacts', contactsRouter)
router.use('/users', userRouter)
router.use('/sessions', sessionsRouter)

export default router
