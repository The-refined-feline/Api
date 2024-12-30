const User = require('../models/user.model');
const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: User,
  },

  description: {
    type: String,
    trim: true,
  },

  transportationMoney: {
    type: String,
    trim: true,
  },

  date: {
    type: Date,
    trim: true,
  },
});

const invitation = mongoose.model('invitation', invitationSchema);

module.exports = invitation;
