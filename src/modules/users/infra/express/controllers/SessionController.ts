import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserService } from "../../../services/AuthenticateUserService";

export class SessionController {
  async create(req: Request, rep: Response): Promise<Response> {
    const { email, password } = req.body
    const authenticateUserService = container.resolve(AuthenticateUserService)
    const auth = await authenticateUserService.execute(email, password)
    return rep.status(201).json(auth)
  }
}