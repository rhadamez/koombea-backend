import { UsersRepository } from "../../../repositories/UsersRepository";
import { User } from "../entities/User";

export class TypeormUserRepository implements UsersRepository {
  create(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByUsername(username: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
}