import { User } from "../infra/typeorm/entities/User";

export interface UsersRepository {
  create(user: User): Promise<void>
  findByUsername(username: string): Promise<User | undefined>
  findById(id: number): Promise<User | undefined>
}