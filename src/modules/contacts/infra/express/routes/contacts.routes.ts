import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../../config/uploadConfig'
import { ContactsController } from '../controllers/ContactsController'

const contactsRouter = Router()

const upload = multer(uploadConfig.multer)

const contactsController = new ContactsController()

contactsRouter.post('/import', upload.single('file'), contactsController.getCsvFields)
contactsRouter.post('/upload-csv', upload.single('file'), contactsController.saveAll)

export { contactsRouter }