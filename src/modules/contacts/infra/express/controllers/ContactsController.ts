import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCsvFieldsService } from "../../../services/GetCsvFieldsService";

export class ContactsController {

  async getCsvFields(req: Request, rep: Response): Promise<Response> {
    const { file } = req as any
    
    const getCsvFieldsService = container.resolve(GetCsvFieldsService)
    await getCsvFieldsService.execute(file)
    return rep.status(201).json()
  }
}