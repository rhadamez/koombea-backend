import { injectable } from 'tsyringe'

@injectable()
export class GetCsvFieldsService {

	async execute(file: Express.Multer.File): Promise<void> {
		const { originalname, filename } = file
		console.log('originalname -> ' + originalname)
		console.log('filename -> ' + filename)
	}
}
