import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../../../modules/users/infra/typeorm/entities/User"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "123321",
    database: "backend",
    entities: [User],
    //synchronize: true,
    logging: false,
})

const createConnection = async () => {
  await AppDataSource.initialize()
}

export { createConnection }