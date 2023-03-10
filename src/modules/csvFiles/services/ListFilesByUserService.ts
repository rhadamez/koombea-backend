import { inject, injectable } from "tsyringe";
import { CsvFileMapper } from "../mappers/FileMapper";
import { CsvFilesRepository } from "../repositories/CsvFilesRepository";

interface Request {
  user_id: number
}

@injectable()
export class ListFilesByUserService {
  constructor(
    @inject('CsvFilesRepository')
    private csvFilesRepository: CsvFilesRepository
  ) {}

  async execute({ user_id }: Request): Promise<any> {
    const files = await this.csvFilesRepository.listByUser(user_id)
    const filesDTO = files.map(item => CsvFileMapper.fileToFileWithLinkdDTO(item))
    return { files: filesDTO }
  }
}