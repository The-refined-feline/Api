const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/admin/faq.service');

const listFaq = catchAsync(async (req, res, next) => {
  const limit = req.params.limit ? Number(req.params.limit) : 10;
  const page = req.params.page ? Number(req.params.page) : 1;
  const search = req.body.search ? req.body.search : '';
  const faqs = await service.faqListFind
    (
      limit,
      page,
      search,
    );
  res.status(200).send({ status: 200, faqs });
});

const addFaq = catchAsync(async (req, res) => {
  const faqData = await service.addFaq(req.body);
  res.status(200).json({
    message: 'Faq added successfully',
    data: faqData,
  });
});
const getFaq = catchAsync(async (req, res) => {
  const faq = await service.getfaq(req.params.id);
  res.status(200).json({
    data: faq,
  });
});
const updateFaq = catchAsync(async (req, res) => {
  const updatefaqData = await service.updateFaq(req.params.id, req.body);
  res.status(200).json({
    message: 'Faq updated succesfully',
    updatedData: updatefaqData,
  });
});
const deleteFaq = catchAsync(async (req, res) => {
  await service.deleteFaq(req.params.id);
  res.status(200).send('Faq deleted successfully');
});

module.exports = {
  addFaq,
  getFaq,
  updateFaq,
  deleteFaq,
  listFaq
};
