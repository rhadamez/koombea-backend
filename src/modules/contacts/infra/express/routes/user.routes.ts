import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const userRouter = Router()

const userController = new UserController()

userRouter.get('/', (req, res) => {
  return res.status(201).json({ bah: 'agora veio' })
})
userRouter.post('/', userController.create)

export { userRouter }