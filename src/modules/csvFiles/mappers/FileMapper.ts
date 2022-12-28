import { CsvFileWithLinkDTO } from "../dtos/CsvFileWithLinkDTO";
import CsvFile from "../infra/typeorm/entities/CsvFile";

export class CsvFileMapper {
  static fileToFileDTO(csvFile: CsvFile): CsvFileWithLinkDTO {
    const newCsvFile: CsvFileWithLinkDTO = {
      file: csvFile.file,
      file_status: csvFile.file_status,
      file_url: 'http://localhost:3333/files/'+csvFile.file
    }

    return newCsvFile
  }
}