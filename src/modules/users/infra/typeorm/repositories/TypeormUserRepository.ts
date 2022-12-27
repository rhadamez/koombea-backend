import { getRepository, Repository } from "typeorm";
import { UsersRepository } from "../../../repositories/UsersRepository";
import { User } from "../entities/User";

export class TypeormUserRepository implements UsersRepository {
	private ormRepository: Repository<User>

  constructor() {
		this.ormRepository = getRepository(User)
  }

  async create(user: User): Promise<void> {
    const newUser = this.ormRepository.create(user)

    await this.ormRepository.save(newUser)
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({ where: { username }})
  }
  
}