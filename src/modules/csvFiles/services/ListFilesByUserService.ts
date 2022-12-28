import { inject, injectable } from "tsyringe";
import { CsvFileWithLinkDTO } from "../dtos/CsvFileWithLinkDTO";
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

  async execute({ user_id }: Request): Promise<CsvFileWithLinkDTO[]> {
    const files = await this.csvFilesRepository.listByUser(user_id)
    const filesDTO = files.map(item => CsvFileMapper.fileToFileWithLinkdDTO(item))
    return filesDTO
  }
}