import { CsvFileDTO } from "../dtos/CsvFileDTO"
import CsvFile from "../infra/typeorm/entities/CsvFile"

export interface CsvFilesRepository {
  create(csvFile: CsvFileDTO): Promise<void>
  listByUser(user_id: number): Promise<CsvFile[]>
}