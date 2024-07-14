import Joi from "joi"
import { generalRules } from '../../utils/general.validation.rule.js'

export const addTaskSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        type: Joi.string().valid('text', 'list').required(),
        textTask: Joi.when('type', {
            is: 'text',
            then: Joi.string().required(),
        }),
        listTask: Joi.when('type', {
            is: 'list',
            then: Joi.array().items(Joi.string()).required(),
        }),
        status: Joi.string().valid('toDo','doing','done'),
        shared: Joi.boolean().default(false),
        userID: generalRules.dbId,
        categoryID: generalRules.dbId,
    })
}

export const updateTaskSchema = {
    params: Joi.object({
        taskId: generalRules.dbId
    }),
    body: Joi.object({
        title: Joi.string().required(),
        type: Joi.string().valid('text', 'list').required(),
        textTask: Joi.when('type', {
            is: 'text',
            then: Joi.string().required(),
        }),
        listTask: Joi.when('type', {
            is: 'list',
            then: Joi.array().items(Joi.string()).required(),
        }),
        status: Joi.string().valid('toDo','doing','done'),
        shared: Joi.boolean().default(false),
        userID: generalRules.dbId,
        categoryID: generalRules.dbId,
    }),
    Headers: generalRules.headersRules,
}

export const deleteTaskSchema = {
    params: Joi.object({
        taskId: generalRules.dbId
    }),
    Headers: generalRules.headersRules,
}

export const getTaskSchema = {
    params: Joi.object({
        taskId: generalRules.dbId
    }),
    Headers: generalRules.headersRules,
}

export const getAllTaskSchema= {
    query: Joi.object({
        page: Joi.number(),
        size: Joi.number()
    }),
    Headers: generalRules.headersRules
}