import fs from 'fs'
import { resolve } from 'path'

import IStorageProvider from "../IStorageProvider";

import upload from '../../../../config/uploadConfig'
import uploadConfig from '../../../../config/uploadConfig';

export default class LocalStorageProvider implements IStorageProvider {

    find(filename: string): fs.ReadStream {
        const pathToFile = resolve(`${uploadConfig.tmpFolder}`, filename)
        return fs.createReadStream(pathToFile)
    }

    async delete(file: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}`, file)
        try {
            await fs.promises.stat(filename)
            await fs.promises.unlink(filename)
        } catch(err) {
            console.log(err)
            return
        }

    }

}