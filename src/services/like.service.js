const ApiError = require('../helpers/apiErrorConverter');
const Like = require('../models/like.model');
const User = require('../models/user.model');

const addLike = async (data) => {
  const { myId, iLikedWhom } = data;
  const findLike = await Like.find({ myId, iLikedWhom });
  if (findLike.length === '0') {
    console.log(findLike.length);
    throw new ApiError('Already Liked', 400);
  }
  const addLikeResult = await Like.create(data);
  return addLikeResult;
};

const iLikedData = async (id) => {
  const likedUsers = await Like.aggregate([
    { $match: { myId: id } },
    {
      $lookup: {
        from: 'users',
        localField: 'iLikedWhom',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    { $unwind: '$userDetails' },
    {
      $project: {
        _id: 0,
        userId: '$userDetails._id',
        fullName: '$userDetails.fullName',
        profileimageurl: '$userDetails.profileimageurl',
        location: '$userDetails.about.location',
      },
    },
  ]);

  if (likedUsers.length === 0) {
    throw new ApiError('data not found', 404);
  }

  return likedUsers;
};

const whoLikedMe = async (id) => {
  const likedUsers = await Like.aggregate([
    { $match: { iLikedWhom: id } },
    {
      $lookup: {
        from: 'users',
        localField: 'myId',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    { $unwind: '$userDetails' },
    {
      $project: {
        _id: 0,
        userId: '$userDetails._id',
        fullName: '$userDetails.fullName',
        profileimageurl: '$userDetails.profileimageurl',
        location: '$userDetails.about.location',
      },
    },
  ]);

  if (likedUsers.length === 0) {
    throw new ApiError('data not found', 404);
  }

  return {
    count: likedUsers.length,
    users: likedUsers,
  };
};

const deleteLike = async (id) => {
  const deletedLike = await Like.findByIdAndDelete(id);

  if (!deletedLike) {
    throw new ApiError('Not Found', 404);
  }

  return deletedLike;
};

module.exports = {
  addLike,
  iLikedData,
  whoLikedMe,
  deleteLike,
};
