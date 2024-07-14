import Joi from "joi"
import { generalRules } from '../../utils/general.validation.rule.js'

export const addCategorySchema = {
    body: Joi.object({
        name: Joi.string().required()
    }),
    Headers: generalRules.headersRules,
}

export const updateCategorySchema = {
    params: Joi.object({
        categoryId: generalRules.dbId
    }),
    body: Joi.object({
        name: Joi.string().required()
    }),
    Headers: generalRules.headersRules,
}

export const deleteCategorySchema = {
    params: Joi.object({
        categoryId: generalRules.dbId
    }),
    Headers: generalRules.headersRules,
}

export const getCategorySchema = {
    params: Joi.object({
        categoryId: generalRules.dbId
    }),
    Headers: generalRules.headersRules,
}

export const getAllCategorySchema = {
    query: Joi.object({
        page: Joi.number(),
        size: Joi.number()
    }),
    headers: generalRules.headersRules
}