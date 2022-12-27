import * as express from 'express'
import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine, MulterError } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
	tmpFolder: string
	subFolders: {
		customers_images: string
	}

	multer: {
		storage: StorageEngine
	}
}

export default {
	tmpFolder,
	subFolders: {
		customers_images: path.resolve(tmpFolder, 'customers_images')
	},
	multer: {
		storage: multer.diskStorage({
			destination: tmpFolder,
			filename: (request, file, callback) => {
				const fileHash = crypto.randomBytes(10).toString('hex')
				const fileName = `${fileHash}_${file.originalname}`

				return callback(null, fileName)
			}
		}),
		limits: {
			fileSize: (1024 * 1024) * 5,
			files: 1
		},
		fileFilter: (req: express.Request, file: any, cb: any) => {
			const allowedMimes = [
				'image/jpeg',
				'image/pjpeg',
				'image/png',
				'image/gif'
			]
			if (allowedMimes.includes(file.mimetype)) {
				cb(null, true)
			} else {
				cb(new MulterError('LIMIT_FILE_SIZE', 'foto'))
			}
		}
	},

} as IUploadConfig
