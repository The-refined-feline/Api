const catchAsync = require('../helpers/asyncErrorHandler');
const service = require('../services/report.service');
const addReport = catchAsync(async (req, res) => {
  req.body.userId = req.user._id;
  const addReport = await service.addReport(req.body);
  res.status(200).json({
    message: 'Reported Successfully',
    data: addReport,
  });
});

module.exports = {
  addReport,
};
