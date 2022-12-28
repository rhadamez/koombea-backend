import { ReadStream } from "fs"

export default interface IStorageProvider {
    find(file: string): ReadStream
    delete(file: string): Promise<void>
}