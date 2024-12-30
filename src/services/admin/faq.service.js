const ApiError = require('../../helpers/apiErrorConverter');
const Faq = require('../../models/faq.model');
const addFaq = async (data) => {
  const faqData = await Faq.create(data);
  return faqData;
};

const faqListFind = async (
  limit = 10,
  page = 1,
  searchQuery = ''
) => {
  try {
    const query = {};
    if (searchQuery) {
      const sanitizedSearchTerm = searchQuery.replace(/"/g, '');
      query.$or = [
        { question: { $regex: sanitizedSearchTerm, $options: 'i' } }
      ];
    }
    const skip = (page - 1) * limit;
    const totalItems = await Faq.find(query).countDocuments();
    const faqs = await Faq.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const faqList = {
      faqs,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
      totalResults: totalItems,
    };

    return faqList;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const getfaq = async (id) => {
  try {
    const result = await Faq.findById(id);
    if (!result) {
      throw new ApiError('Data not found', 404);
    }
    return result;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const updateFaq = async (id, data) => {
  try {
    const result = await Faq.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!result) {
      throw new ApiError('Data not found', 404);
    }
    return result;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const deleteFaq = async (id) => {
  try {
    const result = await Faq.deleteOne({ _id: id });
    if (!result) {
      throw new ApiError('Data not found', 404);
    }
    return result;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

module.exports = {
  addFaq,
  getfaq,
  updateFaq,
  deleteFaq,
  faqListFind
};
