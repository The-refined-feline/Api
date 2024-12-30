const Joi = require('joi');

const invitation = Joi.object({
  description: Joi.string().required().messages({
    'any.required': 'Description is required.',
  }),

  transportationMoney: Joi.string().optional(),

  date: Joi.string().required().messages({
    'any.required': 'Message is required.',
  }),
});

const singleId = Joi.object({
  id: Joi.string().required(),
});

const getInvitation = Joi.object({
  month: Joi.string().required().messages({
    'any.required': 'Month is required.',
  }),

  year: Joi.string().required().messages({
    'any.required': 'Year is required.',
  }),
});

module.exports = {
  invitation,
  singleId,
  getInvitation,
};
