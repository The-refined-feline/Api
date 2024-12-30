const mongoose = require('mongoose');
const User = require('./user.model');
const bankSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    accountHolderName: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      unique: true,
      trim: true,
    },
    accountHolderAddress: {
      type: String,
      trim: true,
    },
    bankName: {
      type: String,
      trim: true,
    },
    bankAddress: {
      type: String,
      trim: true,
    },
    bankState: {
      type: String,
      trim: true,
    },
    bankCity: {
      type: String,
      trim: true,
    },
    routingNumber: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  },
);

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
