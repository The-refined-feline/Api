const ApiError = require('../../helpers/apiErrorConverter');
const Support = require('../../models/support.model');
const supportData = async () => {
  try {
    const viewSupport = await Support.find();
    return viewSupport;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

module.exports = {
  supportData,
};
