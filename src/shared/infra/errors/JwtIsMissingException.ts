import { AppException } from './AppException'

export default class JwtIsMissingException extends AppException {
	constructor() {
		super(409, 'Jwt not informed')
	}
}
