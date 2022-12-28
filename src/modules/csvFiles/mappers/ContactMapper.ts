import { ContactDTO } from "../dtos/ContactDTO";
import Contact from "../infra/typeorm/entities/Contact";

export class ContactMapper {
  static contactEntityToDTO(contact: Contact): ContactDTO {
    const newDTO: ContactDTO = {
      address: contact.address,
      card_last_digits: contact.card_last_digits,
      date_of_birth: contact.date_of_birth,
      email: contact.email,
      franchise: contact.franchise,
      name: contact.name,
      phone: contact.phone
    }

    return newDTO
  }
}