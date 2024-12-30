const mongoose = require('mongoose');
const User = require('../models/user.model');
const supportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    subject: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Support = mongoose.model('Support', supportSchema);

module.exports = Support;
