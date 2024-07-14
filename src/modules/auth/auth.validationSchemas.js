import Joi from "joi"

export const signUpSchema = {
    body: Joi.object({
        name: Joi.string().trim().min(3).max(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().trim().min(6).required()

    })
        .with('email', 'password'),

}

export const signInSchema = {
    body: Joi.object({
        email: Joi.string().email().required().regex(/@gmail\.com$/).messages({
            'any.required': 'Please enter your email',
            'string.email': 'Invalid email format',
            'string.pattern.base': 'Email must be a valid Gmail address'
        }),
        password: Joi.string().trim().min(6).required(),

    })


}