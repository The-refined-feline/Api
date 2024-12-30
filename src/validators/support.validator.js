const Joi = require('joi');

const support = Joi.object({
  subject: Joi.string().required().messages({
    'any.required': 'Subject is required.',
  }),
  message: Joi.string().required().messages({
    'any.required': 'Message is required.',
  }),
});

module.exports = {
  support,
};
