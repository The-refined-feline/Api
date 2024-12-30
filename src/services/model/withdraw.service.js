const ApiError = require('../../helpers/apiErrorConverter');
const Transaction = require('../../models/transaction.model');
const withdrawRequest = async (data) => {
  const withdrawData = await Transaction.create(data);
  return withdrawData;
};

const getTransactionList = async (limit, page, id, fromDate, toDate) => {
  const matchConditions = {
    type: 'deposit',
    userId: id,
  };

  // Add date range filtering if provided
  if (fromDate || toDate) {
    matchConditions.createdAt = {};
    if (fromDate) matchConditions.createdAt.$gte = new Date(fromDate);
    if (toDate) matchConditions.createdAt.$lte = new Date(toDate);
  }

  const depositLists = await Transaction.aggregate([
    {
      $match: matchConditions,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'paidByUserId',
        foreignField: '_id',
        as: 'paidByUserDetails',
      },
    },
    {
      $unwind: '$paidByUserDetails',
    },
    {
      $project: {
        _id: 0,
        fullName: '$paidByUserDetails.fullName',
        profileImageUrl: '$paidByUserDetails.profileimageurl',
        amount: 1,
        time: {
          $dateToString: {
            format: '%H:%M',
            date: '$createdAt',
            timezone: 'UTC',
          },
        },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ]);

  const totalResults = await Transaction.countDocuments(matchConditions);
  const totalPages = Math.ceil(totalResults / limit);

  if (depositLists.length === 0) {
    throw new ApiError('Data not found', 404);
  }

  return {
    data: depositLists,
    page,
    limit,
    totalPages,
    totalResults,
  };
};

module.exports = {
  withdrawRequest,
  getTransactionList,
};
