const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/admin/support.service');
const viewSupport = catchAsync(async (req, res) => {
  const supportData = await service.supportData();

  res.status(200).json({
    supportData,
  });
});

module.exports = {
  viewSupport,
};
