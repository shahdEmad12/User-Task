import {Router} from 'express'
import * as userController from './user.controller.js'
import expressAsyncHandler from 'express-async-handler'
import {auth} from '../../middlewares/auth.middleware.js'
import { validationMiddleware } from '../../middlewares/validation.middleware.js'
import * as validationSchemas from './user.validationSchemas.js'

const route = Router()

route.put('/', auth(), validationMiddleware(validationSchemas.updateUserSchema), expressAsyncHandler(userController.updateUser))
route.put('/pass', auth(), validationMiddleware(validationSchemas.updatePasswordSchema), expressAsyncHandler(userController.updatePassword))
route.delete('/', auth(), expressAsyncHandler(userController.deleteUser))
route.get('/profile', auth(), expressAsyncHandler(userController.getUser))

export default route