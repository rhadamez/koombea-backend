import { CsvFileDTO } from "../dtos/CsvFileDTO"

export interface CsvFilesRepository {
  create(csvFile: CsvFileDTO): Promise<void>
}