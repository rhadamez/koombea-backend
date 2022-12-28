import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListFilesByUserService } from "../../../services/ListFilesByUserService";

export class CsvFileController {

  async listAll(req: Request, rep: Response): Promise<Response> {
    const { user_id } = req as any

    const listFilesByUserService = container.resolve(ListFilesByUserService)
    const files = await listFilesByUserService.execute({ user_id })
    return rep.status(201).json(files)
  }
}