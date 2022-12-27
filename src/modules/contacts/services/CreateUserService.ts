import { inject, injectable } from "tsyringe"

import bcryptjs from 'bcryptjs'

import UserAlreadyExistsException from "../../../shared/infra/errors/UserAlreadyExistsException"
import { User } from "../infra/typeorm/entities/User"
import { UsersRepository } from "../repositories/UsersRepository"

interface Request {
  username: string
  password: string
}

@injectable()
export class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) { }

  async execute(request: Request): Promise<void> {
    const { username, password } = request
    const userExists = await this.usersRepository.findByUsername(username)
    if(userExists) throw new UserAlreadyExistsException()

    const newUser = new User()
    newUser.username = username
    newUser.password = await bcryptjs.hash(password, 10)

    await this.usersRepository.create(newUser)

    return
  }
}