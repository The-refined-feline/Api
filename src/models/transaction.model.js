const mongoose = require('mongoose');
const User = require('./user.model');
const Bank = require('./bank.model');
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },

    paidByUserId: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },

    bankId: {
      type: mongoose.Types.ObjectId,
      ref: Bank,
      default: null,
    },

    amount: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending',
    },

    type: {
      type: String,
      enum: ['withdraw', 'deposit'],
      required: true,
    },
    transactionId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
