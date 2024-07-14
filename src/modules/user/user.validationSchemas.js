import Joi from 'joi'
import { generalRules } from '../../utils/general.validation.rule.js'

export const updateUserSchema = {
    body: Joi.object({
        name: Joi.string().trim().min(3).max(12).required(),
        email: Joi.string().email().required(),
        })
}

export const authSchema = {
    headers: generalRules.headersRules,
}

export const updatePasswordSchema = {
    body: Joi.object({

        password: Joi.string().required(),


    })
}