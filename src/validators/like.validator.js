const Joi = require('joi');

const addLike = Joi.object({
  iLikedWhom: Joi.string().required(),
});

const singleId = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  addLike,
  singleId,
};
