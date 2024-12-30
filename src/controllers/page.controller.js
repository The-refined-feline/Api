const catchAsync = require('../helpers/asyncErrorHandler');
const service = require('../services/page.service');

const viewPages = catchAsync(async (req, res) => {
  const pageData = await service.viewPage(req.params.id);
  res.status(200).json({
    pageDetails: pageData,
  });
});

const ViewFaq = catchAsync(async (req, res) => {
  const getFaq = await service.viewFaq();
  res.status(200).json({
    pageDetails: getFaq,
  });
});

module.exports = {
  viewPages,
  ViewFaq,
};
