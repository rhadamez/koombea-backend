import { getRepository, Repository } from "typeorm";
import { ContactsRepository } from "../../../repositories/ContactsRepository";
import Contact from "../entities/Contact";

export class TypeormContactRepository implements ContactsRepository {
  private ormRepository: Repository<Contact>

  constructor() {
		this.ormRepository = getRepository(Contact)
  }

  async createAll(contacts: Contact[]): Promise<Contact[]> {
    const newContacts = this.ormRepository.create(contacts)

    return await this.ormRepository.save(newContacts)
  }

  async findByEmail(email: string): Promise<Contact | undefined> {
    return await this.ormRepository.findOne({ where: { email }})
  }

  async listByUser(user_id: number): Promise<Contact[]> {
    return await this.ormRepository.find({ where: { user_id }})
  }

}