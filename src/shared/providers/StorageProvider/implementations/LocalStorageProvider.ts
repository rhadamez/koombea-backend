import fs from 'fs'
import { resolve } from 'path'

import IStorageProvider from "../IStorageProvider";

import upload from '../../../../config/uploadConfig'

export default class LocalStorageProvider implements IStorageProvider {

    async save(file: string): Promise<string> {
        try {
			await fs.promises.stat(upload.tmpFolder)
		} catch (err) {
			await fs.promises.mkdir(upload.tmpFolder, { recursive: true })
		}

        // await fs.promises.rename(
        //     resolve(upload.tmpFolder, file),
        //     resolve(`${upload.tmpFolder}`, file)
        // )

        return file
    }

    async delete(file: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}`, file)

        try {
            await fs.promises.stat(filename)
            await fs.promises.unlink(filename)
        } catch {
            return
        }

    }

}