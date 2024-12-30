const Joi = require('joi');

const password = (value, helpers) => {
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    )
  ) {
    return helpers.message(
      'Password must me 8 characters long with at least one capital letter, one small letter, one digit, one special character',
    );
  }
  return value;
};

const pagination = Joi.object({
  limit: Joi.string().optional(),
  page: Joi.string().required(),
});

const addUser = Joi.object({
  fullName: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  role: Joi.string().valid('admin', 'model', 'seeker').required(),
  password: Joi.string().required().custom(password),
  about: {
    age: Joi.string().trim().optional().allow('', null),
    location: Joi.string().trim().optional().allow('', null),
    gender: Joi.string().trim().optional().allow('', null),
    interestedIn: Joi.string().trim().optional().allow('', null),
  },
});

const updateuser = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().required(),
  about: {
    age: Joi.string().trim().optional().allow('', null),
    location: Joi.string().trim().optional().allow('', null),
    gender: Joi.string().trim().optional().allow('', null),
    interestedIn: Joi.string().trim().optional().allow('', null),
  },
});

const singleId = Joi.object({
  id: Joi.string().required(),
});

const statusSchema = Joi.object({
  isVerified: Joi.boolean().required(),
});

module.exports = {
  pagination,
  addUser,
  singleId,
  updateuser,
  statusSchema,
};
