import { container } from "tsyringe";
import { TypeormUserRepository } from "../../modules/users/infra/typeorm/repositories/TypeormUserRepository";
import { UsersRepository } from "../../modules/users/repositories/UsersRepository";
import LocalStorageProvider from "./StorageProvider/implementations/LocalStorageProvider";
import IStorageProvider from "./StorageProvider/IStorageProvider";

container.registerSingleton<IStorageProvider>('StorageProvider', LocalStorageProvider)

container.registerSingleton<UsersRepository>('UsersRepository', TypeormUserRepository)