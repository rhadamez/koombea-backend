import { injectable } from 'tsyringe'
import csvParse from 'csv-parse'
import fs from 'fs'

@injectable()
export class GetCsvFieldsService {

	async execute(file: Express.Multer.File): Promise<any> {
		const fields = await this.readCsv(file)

		return { fields }
	}

	async readCsv(file: Express.Multer.File): Promise<string> {
		const stream = fs.createReadStream(file.path)

		const parseFile = csvParse.parse({
				delimiter: ','
		})

		stream.pipe(parseFile)

		return new Promise((res, rej) => {
			let i = 0
			let firstLine = ''
			parseFile.on('data', async (line) => {
					const [name, description] = line
					console.log(name)
					if(i === 0) firstLine = line
					else parseFile.addListener('end', () => {})
					i++
			})

			parseFile.on('end', () => {
				res(firstLine)
			})
		})
	}
}
