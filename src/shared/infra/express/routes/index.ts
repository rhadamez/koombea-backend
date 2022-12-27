import { Router } from 'express'
import { userRouter } from '../../../../modules/users/infra/express/routes/user.routes'

const router = Router()

//router.use('/temp', tempRoutes)

//router.use('/sessions', authenticationRouter)

router.use('/users', userRouter)

export default router
