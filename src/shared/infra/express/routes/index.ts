import { Router } from 'express'
import { sessionsRouter } from '../../../../modules/users/infra/express/routes/sessions.routes'
import { userRouter } from '../../../../modules/users/infra/express/routes/user.routes'

const router = Router()

router.use('/users', userRouter)
router.use('/sessions', sessionsRouter)

export default router
