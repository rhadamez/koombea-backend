import { container } from "tsyringe";
import { TypeormContactRepository } from "../../modules/contacts/infra/typeorm/repositories/TypeormContactRepository";
import { ContactsRepository } from "../../modules/contacts/repositories/ContactsRepository";
import { TypeormUserRepository } from "../../modules/users/infra/typeorm/repositories/TypeormUserRepository";
import { UsersRepository } from "../../modules/users/repositories/UsersRepository";
import LocalStorageProvider from "./StorageProvider/implementations/LocalStorageProvider";
import IStorageProvider from "./StorageProvider/IStorageProvider";

container.registerSingleton<IStorageProvider>('StorageProvider', LocalStorageProvider)

container.registerSingleton<UsersRepository>('UsersRepository', TypeormUserRepository)
container.registerSingleton<ContactsRepository>('ContactsRepository', TypeormContactRepository)