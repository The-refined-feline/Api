const Joi = require('joi');

const bankValidator = Joi.object({
  accountHolderName: Joi.string().required().messages({
    'string.empty': 'Account Holder Name is required.',
    'any.required': 'Account Holder Name is required.',
  }),
  accountNumber: Joi.string().required().pattern(/^\d+$/).messages({
    'string.empty': 'Account Number is required.',
    'string.pattern.base': 'Account Number must be numeric.',
    'any.required': 'Account Number is required.',
  }),
  accountHolderAddress: Joi.string().required().messages({
    'string.empty': 'Account Holder Address is required.',
    'any.required': 'Account Holder Address is required.',
  }),
  bankName: Joi.string().required().messages({
    'string.empty': 'Bank Name is required.',
    'any.required': 'Bank Name is required.',
  }),
  bankAddress: Joi.string().required().messages({
    'string.empty': 'Bank Address is required.',
    'any.required': 'Bank Address is required.',
  }),
  bankState: Joi.string().required().messages({
    'string.empty': 'Bank State is required.',
    'any.required': 'Bank State is required.',
  }),
  bankCity: Joi.string().required().messages({
    'string.empty': 'Bank City is required.',
    'any.required': 'Bank City is required.',
  }),
  routingNumber: Joi.string().required().pattern(/^\d+$/).messages({
    'string.empty': 'Routing Number is required.',
    'string.pattern.base': 'Routing Number must be numeric.',
    'any.required': 'Routing Number is required.',
  }),
});

const singleId = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  bankValidator,
  singleId,
};
