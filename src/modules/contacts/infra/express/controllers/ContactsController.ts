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
    const { user_id } = req as any
    const { filename, headers } = req.body

    const persistContactsFromCsv = container.resolve(PersistContactsFromCsv)
    const contacts = await persistContactsFromCsv.execute({ user_id, filename, headers})
    return rep.status(201).json(contacts)
  }
}