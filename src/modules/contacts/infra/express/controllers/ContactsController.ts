import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCsvFieldsService } from "../../../services/GetCsvFieldsService";
import { PersistContactsFromCsv } from "../../../services/PersistContactsFromCsv";

export class ContactsController {

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

    const persistContactsFromCsv = container.resolve(PersistContactsFromCsv)
    const contacts = await persistContactsFromCsv.execute({ user_id, file, headers})
    return rep.status(201).json(contacts)
  }
}