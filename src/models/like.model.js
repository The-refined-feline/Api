const User = require('./user.model');
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  myId: {
    type: mongoose.Types.ObjectId,
    ref: User,
  },

  iLikedWhom: {
    type: mongoose.Types.ObjectId,
    ref: User,
  },
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
