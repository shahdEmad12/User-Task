import { Router } from "express"
import * as categoryController from './category.controller.js'
import expressAsyncHandler from 'express-async-handler'
import {auth} from '../../middlewares/auth.middleware.js'
import { validationMiddleware } from "../../middlewares/validation.middleware.js"
import * as validationSchemas from './category.validationSchemas.js'
const route = Router()

route.post('/', auth(),validationMiddleware(validationSchemas.addCategorySchema), expressAsyncHandler(categoryController.addCategory))
route.put('/:categoryId', auth(), validationMiddleware(validationSchemas.updateCategorySchema),expressAsyncHandler(categoryController.updateCategory))
route.delete('/:categoryId', auth(), validationMiddleware(validationSchemas.deleteCategorySchema),expressAsyncHandler(categoryController.deleteCategory))
route.get('/get/:categoryId', auth(), validationMiddleware(validationSchemas.getCategorySchema), expressAsyncHandler(categoryController.getCategory))
route.get('/categories', auth(), validationMiddleware(validationSchemas.getAllCategorySchema),expressAsyncHandler(categoryController.getAllCategories))
route.get('/filter', auth(),expressAsyncHandler(categoryController.filterCategory))
route.get('/sort', auth(), expressAsyncHandler(categoryController.sortCategories));




export default route