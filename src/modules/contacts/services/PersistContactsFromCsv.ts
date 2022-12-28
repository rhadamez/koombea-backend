import fs from 'fs'
import crypto from 'crypto'
import { inject, injectable } from 'tsyringe'
import csvParse from 'csv-parse'
import cardValidator from 'card-validator'

import { ContactsRepository } from '../repositories/ContactsRepository'
import { ContactDTO } from '../dtos/ContactDTO'
import { ContactMapper } from '../mappers/ContactMapper'

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
		private contactsRepository: ContactsRepository
	) { }

	async execute({ user_id, file, headers }: Request): Promise<any> {
		const contactsFormatted = await this.formatContactsFromCsv(file, headers)
		const contactsWithFranchise = this.addNewPropsToContacts(contactsFormatted, user_id)

		const contacts = await this.contactsRepository.createAll(contactsWithFranchise)
		const contactsDTO = contacts.map(item => ContactMapper.contactEntityToDTO(item))

		return { contacts: contactsDTO }
	}

	addNewPropsToContacts(contactsFormatted: any[], user_id: number): any[] {
		return contactsFormatted.map(c => {
			const franchise = this.setCardFranchise(c.credit_card)
			const credit_card = crypto.createHash('md5').update(c.credit_card).digest("hex")
			const cardLastDigits = new String(c.credit_card)
			const card_last_digits = cardLastDigits.substring(cardLastDigits.length - 4, cardLastDigits.length)
			return {...c, franchise, credit_card: credit_card, card_last_digits, user_id }
		})
	}

	async formatContactsFromCsv(file: Express.Multer.File, headers: HeaderTypes[]): Promise<any[]> {
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
						let newOb: any = {}
						for(let propName in contact) {
							const thereis = headers.find(n => n.original == propName)
							if(thereis) {
								newOb = {...newOb, [thereis.new]: contact[propName]}
							}
						}
						contactsFormatted.push(newOb)
					})
					console.log(contactsFormatted)
					res(contactsFormatted)
				})
			})
	}

	setCardFranchise(cardNumber: any) {
		const { card } = cardValidator.number(cardNumber)
		const type = card && card.type
		return type
	}
}
