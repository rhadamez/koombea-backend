import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../../../services/CreateUserService";

export class UserController {
  async create(req: Request, rep: Response): Promise<Response> {
    const { username, password } = req.body
    const createUserService = container.resolve(CreateUserService)
    await createUserService.execute({ username, password })
    return rep.status(201).json()
  }
}