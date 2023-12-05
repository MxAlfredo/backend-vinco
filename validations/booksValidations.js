const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().regex(/^[a-zA-Z\u00C0-\u017F\s]+$/).required().messages({
        'string.pattern.base': 'El autor solo puede contener letras y espacios',
    }),
    year: Joi.number().integer().max(new Date().getFullYear()).required().messages({
        'number.max': 'El año no puede ser mayor al año actual',
    }),
    isbn: Joi.string().regex(/^[0-9-]+$/).required().messages({
        'string.pattern.base': 'El ISBN solo puede contener números y guiones',
    }),
    status: Joi.boolean().required(),
    id: Joi.number(),
});

const bookValidation = (datosLibro) => {
    return bookSchema.validate(datosLibro);
};

module.exports = {
    bookValidation
}
