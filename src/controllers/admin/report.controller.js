const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/admin/report.service');
const viewReport = catchAsync(async (req, res) => {
  const reportData = await service.viewReport();
  res.status(200).send({ reportData });
});

module.exports = {
  viewReport,
};
