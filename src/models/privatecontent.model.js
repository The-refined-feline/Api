const mongoose = require('mongoose');
const User = require('./user.model');

const privateContentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },

    privatemedia: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Privatemedia = mongoose.model('Privatemedia', privateContentSchema);

module.exports = Privatemedia;
