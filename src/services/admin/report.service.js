const ApiError = require('../../helpers/apiErrorConverter');
const Report = require('../../models/report.model');
const User = require('../../models/user.model');
const viewReport = async () => {
  const reportData = await Report.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'reportedUserId',
        foreignField: '_id',
        as: 'reportedUserDetails',
      },
    },
    {
      $project: {
        chatId: 1,
        report: 1,
        userDetails: {
          $map: {
            input: '$userDetails',
            as: 'user',
            in: {
              _id: '$$user._id',
              fullName: '$$user.fullName',
              role: '$$user.role',
            },
          },
        },
        reportedUserDetails: {
          $map: {
            input: '$reportedUserDetails',
            as: 'reportedUser',
            in: {
              _id: '$$reportedUser._id',
              fullName: '$$reportedUser.fullName',
              role: '$$reportedUser.role',
            },
          },
        },
      },
    },
    {
      $unwind: {
        path: '$userDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: '$reportedUserDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  return reportData;
};

module.exports = {
  viewReport,
};
