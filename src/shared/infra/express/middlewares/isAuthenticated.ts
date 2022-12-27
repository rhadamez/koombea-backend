import { verify } from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'
import auth from '../../../../config/auth'
import { AppException } from '../../errors/AppException'
import JwtIsMissingException from '../../errors/JwtIsMissingException'

interface TokenPayload {
	subject: number
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
	const authorization = req.headers['authorization']

	if (!authorization) throw new JwtIsMissingException()

	const [, token] = authorization.split(' ')

	try {
		const isTokenValid = verify(token, auth.jwt.secret)

		const { subject } = isTokenValid as TokenPayload

		req.user_id = subject

		return next()

	} catch (err) {
		throw new AppException(401, 'Invalid token')
	}
}
