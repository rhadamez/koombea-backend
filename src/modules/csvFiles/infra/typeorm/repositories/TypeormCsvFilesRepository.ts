import { getRepository, Repository } from "typeorm";
import { CsvFileDTO } from "../../../dtos/CsvFileDTO";
import { CsvFilesRepository } from "../../../repositories/CsvFilesRepository";
import CsvFile from "../entities/CsvFile";

export class TypeormCsvFilesRepository implements CsvFilesRepository {
  private ormRepository: Repository<CsvFile>

  constructor() {
		this.ormRepository = getRepository(CsvFile)
  }

  async create(csvFile: CsvFileDTO): Promise<void> {
    const newContacts = this.ormRepository.create(csvFile)

    await this.ormRepository.save(newContacts)
  }

}