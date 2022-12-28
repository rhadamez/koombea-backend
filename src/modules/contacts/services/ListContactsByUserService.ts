import { inject, injectable } from "tsyringe";
import { ContactDTO } from "../dtos/ContactDTO";
import { ContactMapper } from "../mappers/ContactMapper";
import { ContactsRepository } from "../repositories/ContactsRepository";

interface Request {
  user_id: number
}

interface Response {
  contacts: ContactDTO[]
}

@injectable()
export class ListContactsByUserService {

  constructor(
    @inject('ContactsRepository')
    private contactsRepository: ContactsRepository
  ) { }

  async execute({ user_id }: Request): Promise<Response> {
    const contacts = await this.contactsRepository.listByUser(user_id)
		const contactsDTO = contacts.map(item => ContactMapper.contactEntityToDTO(item))

    return { contacts: contactsDTO }
  }
}