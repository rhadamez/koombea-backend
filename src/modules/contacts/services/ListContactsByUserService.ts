import { inject, injectable } from "tsyringe";
import Contact from "../infra/typeorm/entities/Contact";
import { ContactsRepository } from "../repositories/ContactsRepository";

interface Request {
  user_id: number
}

@injectable()
export class ListContactsByUserService {
  
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: ContactsRepository
  ) { }

  async execute({ user_id }: Request): Promise<Contact[]> {
    return await this.contactsRepository.listByUser(user_id)
  }
}