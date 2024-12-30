const Joi = require('joi');

const withdrawValidation = Joi.object({
  bankId: Joi.string().required().messages({
    'string.empty': 'Bank ID is required.',
    'any.required': 'Bank ID is required.',
  }),

  amount: Joi.string().required().messages({
    'string.empty': 'Withdraw Amount is required.',
    'any.required': 'Withdraw Amount is required.',
  }),

  status: Joi.string().optional(),
  type: Joi.string().optional(),
  transactionId: Joi.string().optional(),
  paidByUserId: Joi.string().optional(),
});

const pagination = Joi.object({
  limit: Joi.string().optional(),
  page: Joi.string().required(),
});

module.exports = {
  withdrawValidation,
  pagination,
};
