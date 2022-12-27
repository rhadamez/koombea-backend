import Contact from "../infra/typeorm/entities/Contact"

export interface ContactsRepository {
  createAll(contacts: Contact[]): Promise<void>
  findByEmail(email: string): Promise<Contact | undefined>
  listByUser(user_id: number): Promise<Contact[]>
}