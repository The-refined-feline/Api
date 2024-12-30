const ApiError = require('../helpers/apiErrorConverter');
const Page = require('../models/page.model');
const Faq = require('../models/faq.model');

const viewPage = async (id) => {
  try {
    const result = await Page.findById(id);
    if (!result) {
      throw new ApiError('Data not found', 404);
    }
    return result;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const viewFaq = async () => {
  const result = await Faq.find();
  if (result.length === 0) {
    throw new ApiError('Data not found', 404);
  }
  return result;
};

module.exports = {
  viewPage,
  viewFaq,
};
