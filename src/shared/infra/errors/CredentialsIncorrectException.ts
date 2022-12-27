import { AppException } from './AppException'

export default class CredentialsIncorrectException extends AppException {
	constructor() {
		super(400, 'E-mail or password are incorrects')
	}
}
