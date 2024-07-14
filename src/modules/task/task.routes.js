import { Router } from "express"
import * as taskController from './task.controller.js'
import expressAsyncHandler from 'express-async-handler'
import {auth} from '../../middlewares/auth.middleware.js'
import { validationMiddleware } from "../../middlewares/validation.middleware.js"
import * as validationSchemas from './task.validationSchemas.js'
const route = Router()

route.post('/:categoryID', auth(),validationMiddleware(validationSchemas.addTaskSchema), expressAsyncHandler(taskController.addtask))
route.put('/:taskId', auth(), validationMiddleware(validationSchemas.updateTaskSchema),expressAsyncHandler(taskController.updateTask))
route.delete('/:taskId', auth(), validationMiddleware(validationSchemas.deleteTaskSchema),expressAsyncHandler(taskController.deleteTask))
route.get('/get/:taskId', auth(), validationMiddleware(validationSchemas.getTaskSchema), expressAsyncHandler(taskController.getTask))
route.get('/task', auth(), expressAsyncHandler(taskController.listTask))
route.get('/filter',auth(), expressAsyncHandler(taskController.filtertask))
route.get('/tasks', auth(), validationMiddleware(validationSchemas.getAllTaskSchema),expressAsyncHandler(taskController.getAllTasks))
route.get('/sort', auth(), expressAsyncHandler(taskController.sortTasks));


export default route