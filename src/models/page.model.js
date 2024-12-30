const mongoose = require('mongoose');
const User = require('./user.model');
const pageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;
