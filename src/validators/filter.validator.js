const Joi = require('joi')

const addFilter = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required()
})

const updateFilter = Joi.object({
    name: Joi.string().optional(),
    type: Joi.string().optional()
})

module.exports = {
    addFilter,
    updateFilter,
}