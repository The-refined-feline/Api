const mongoose = require('mongoose');
const User = require('../models/user.model');
const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },

    reportedUserId: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    chatId: {
      type: String,
      required: true,
    },

    report: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
