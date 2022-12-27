import { container } from "tsyringe";
import { TypeormUserRepository } from "../../modules/users/infra/typeorm/repositories/TypeormUserRepository";
import { UsersRepository } from "../../modules/users/repositories/UsersRepository";

container.registerSingleton<UsersRepository>('UsersRepository', TypeormUserRepository)