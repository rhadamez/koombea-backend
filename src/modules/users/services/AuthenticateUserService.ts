import { inject, injectable } from 'tsyringe'

import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

import auth from '../../../config/auth'
import { UsersRepository } from '../repositories/UsersRepository'
import CredentialsIncorrectException from '../../../shared/infra/errors/CredentialsIncorrectException'

interface IResponse {
	token: string
	user: {
		id: number
		username: string
	}
}

@injectable()
export class AuthenticateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: UsersRepository
	) { }

	async execute(email: string, password: string): Promise<IResponse> {
		const userExists = await this.usersRepository.findByUsername(email)
		if (!userExists) throw new CredentialsIncorrectException()

		const isPassCorrect = await compare(password, userExists.password)
		if (!isPassCorrect) throw new CredentialsIncorrectException()

		const { secret, expiresIn, algorithm } = auth.jwt

		const token = sign(
			{ subject: userExists.id },
			secret,
			{ expiresIn, algorithm })

		const user = {
			id: userExists.id,
			username: userExists.username
		}

		return { token, user }
	}
}
