import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCsvFieldsService } from "../../../services/GetCsvFieldsService";
import { ListContactsByUserService } from "../../../services/ListContactsByUserService";
import { PersistContactsFromCsv } from "../../../services/PersistContactsFromCsv";

export class ContactsController {

  async listAll(req: Request, rep: Response): Promise<Response> {
    const { user_id } = req as any

    const listContactsByUserService = container.resolve(ListContactsByUserService)
    const headers = await listContactsByUserService.execute({ user_id })
    return rep.status(201).json(headers)
  }

  async getCsvFields(req: Request, rep: Response): Promise<Response> {
    const { file } = req as any

    const getCsvFieldsService = container.resolve(GetCsvFieldsService)
    const headers = await getCsvFieldsService.execute(file)
    return rep.status(201).json(headers)
  }

  async saveAll(req: Request, rep: Response): Promise<Response> {
    const { file, user_id } = req as any
    const headers = [
      {
        original: 'name contact',
        new: 'name'
      },
      {
        original: 'contact e-mail',
        new: 'email'
      },
      {
        original: 'birth',
        new: 'date_of_birth'
      },
      {
        original: 'telephone',
        new: 'phone'
      },
      {
        original: 'contact address',
        new: 'address'
      },
      {
        original: 'credit card number',
        new: 'credit_card'
      },
    ]

    const persistContactsFromCsv = container.resolve(PersistContactsFromCsv)
    const contacts = await persistContactsFromCsv.execute({ user_id, file, headers})
    return rep.status(201).json(contacts)
  }
}