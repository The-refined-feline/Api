const Joi = require('joi');

const report = Joi.object({
  reportedUserId: Joi.string().required().messages({
    'any.required': 'Reported user is required.',
  }),
  chatId: Joi.string().required().messages({
    'any.required': 'Chat ID is required.',
  }),

  report: Joi.string().required().messages({
    'any.required': 'Report message is required.',
  }),
});

module.exports = {
  report,
};
