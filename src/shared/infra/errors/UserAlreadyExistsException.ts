import { AppException } from './AppException'

export default class UserAlreadyExistsException extends AppException {
	constructor() {
		super(409, 'User already exists')
	}
}
