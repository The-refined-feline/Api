const catchAsync = require('../helpers/asyncErrorHandler');
const service = require('../services/like.service');
const addLike = catchAsync(async (req, res) => {
  console.log(req.user._id);
  const data = {
    myId: req.user._id,
    iLikedWhom: req.body.iLikedWhom,
  };
  const likeDetails = await service.addLike(data);
  res.status(200).json({
    message: 'Liked',
    likeData: likeDetails,
  });
});

const iLiked = catchAsync(async (req, res) => {
  const iLikedData = await service.iLikedData(req.user._id);
  res.status(200).send({ iLikedData });
});

const whoLikedMe = catchAsync(async (req, res) => {
  const likeData = await service.whoLikedMe(req.user._id);
  res.status(200).send({ likeData });
});

const deleteLike = catchAsync(async (req, res) => {
  const id = req.params.id;
  await service.deleteLike(id);
  res.status(200).send('disliked');
});

module.exports = {
  addLike,
  iLiked,
  whoLikedMe,
  deleteLike,
};
