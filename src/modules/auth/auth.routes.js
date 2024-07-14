import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import * as authController from "./auth.controller.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js"
import * as validationSchemas from './auth.validationSchemas.js'


const router = Router();


router.post('/signUp', validationMiddleware(validationSchemas.signUpSchema), expressAsyncHandler(authController.signUp))
router.get('/verify-email', expressAsyncHandler(authController.verifyEmail))
router.post('/login', validationMiddleware(validationSchemas.signInSchema), expressAsyncHandler(authController.signIn))



export default router