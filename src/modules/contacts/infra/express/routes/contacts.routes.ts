import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../../config/uploadConfig'
import ensureAuthenticated from '../../../../../shared/infra/express/middlewares/isAuthenticated'

import { ContactsController } from '../controllers/ContactsController'

const contactsRouter = Router()

const upload = multer(uploadConfig.multer)

const contactsController = new ContactsController()

contactsRouter.use(ensureAuthenticated)
contactsRouter.get('/', contactsController.listAll)
contactsRouter.post('/', contactsController.saveAll)
contactsRouter.post('/import', upload.single('file'), contactsController.getCsvFields)

export { contactsRouter }