import { inject, injectable } from 'tsyringe'
import csvParse from 'csv-parse'
import fs from 'fs'
import { ContactsRepository } from '../repositories/ContactsRepository'
import { UsersRepository } from '../../users/repositories/UsersRepository'

interface HeaderTypes {
	original: string
	new: string
}

interface Request {
	user_id: number
	file: Express.Multer.File
	headers: HeaderTypes[]
}

@injectable()
export class PersistContactsFromCsv {

	constructor(
		@inject('ContactsRepository')
		private contactsRepository: ContactsRepository,

		@inject('UsersRepository')
		private usersRepository: UsersRepository
	) { }

	async execute({ user_id, file, headers }: Request): Promise<any> {
		const userExists = await this.usersRepository.findById(user_id)

		const contactsFormatted = await this.formatContacts(file, headers)
		return { contactsFormatted }
		}

	async formatContacts(file: Express.Multer.File, headers: HeaderTypes[]): Promise<string> {
		const stream = fs.createReadStream(file.path)

		const parseFile = csvParse.parse({
				delimiter: ','
		})

		stream.pipe(parseFile)

		return new Promise((res, rej) => {
				const contactsFromCsv: any = []
				let i = 0
				let firstLine: any[] = []
				parseFile.on('data', async (line) => {
						const [col1, col2, col3, col4, col5, col6] = line
						if(i === 0) firstLine = line
						else {
							const [fcol1, fcol2, fcol3, fcol4, fcol5, fcol6] = firstLine
							const aff = {
								[fcol1]: col1,
								[fcol2]: col2,
								[fcol3]: col3,
								[fcol4]: col4,
								[fcol5]: col5,
								[fcol6]: col6,
							}
							contactsFromCsv.push(aff)
						}
						i++
				})

				const contactsFormatted: any = []

				parseFile.on('end', () => {
					contactsFromCsv.map((contact: any) => {
						let newOb = {}
						for(let propName in contact) {
							const thereis = headers.find(n => n.original == propName)
							if(thereis) {
								newOb = {...newOb, [thereis.new]: contact[propName]}
							}
						}
						contactsFormatted.push(newOb)
					})
					console.log(contactsFormatted)
					res(contactsFormatted as any)
				})
			})
	}
}
