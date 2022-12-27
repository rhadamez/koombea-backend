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

		const novos = [{
			original: 'e-mail',
			new: 'E-mail'
		},
	  {
			original: 'birth',
			new: 'Birthday'
		},
		{
			original: 'credit card',
			new: 'Card type'
		}
	]

	return new Promise((res, rej) => {
			const atualizado: any = []
			let i = 0
			let firstLine: any[] = []
			parseFile.on('data', async (line) => {
					const [col1, col2, col3] = line
					if(i === 0) firstLine = line
					else {
						const [fcol1, fcol2, fcol3] = firstLine
						const aff = {
							[fcol1]: col1,
							[fcol2]: col2,
							[fcol3]: col3,
						}
						atualizado.push(aff)
						
					}
					//console.log(line)
					//else parseFile.addListener('end', () => {})
					i++
			})

			const amem: any = []

			parseFile.on('end', () => {
				const newArray = atualizado.map((a, i) => {
					for(let aa in a) {
						const thereis = novos.find(n => n.original == aa)
						if(thereis) {
							amem.push({
								[thereis.new]: a[aa]
							})
						}
					}
				})
				console.log(amem)
				res(amem as any)
			})
		})
	}
}
