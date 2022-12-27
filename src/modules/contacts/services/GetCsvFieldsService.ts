import { injectable } from 'tsyringe'
import csvParse from 'csv-parse'
import fs from 'fs'

@injectable()
export class GetCsvFieldsService {

	async execute(file: Express.Multer.File): Promise<any> {
		const fields = await this.getCsvHeaders(file)

		return { fields }
	}

	async getCsvHeaders(file: Express.Multer.File): Promise<string> {
		const stream = fs.createReadStream(file.path)

		const parseFile = csvParse.parse({
				delimiter: ','
		})

		stream.pipe(parseFile)

		return new Promise((res, rej) => {
				let i = 0
				let csvHeaders: any[] = []
				parseFile.on('data', async (line) => {
						if(i === 0) csvHeaders = line
						else parseFile.emit('end')
						i++
				})

				parseFile.on('end', () => {
					res(csvHeaders as any)
				})
			})
	}
}
