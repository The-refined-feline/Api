const Filter = require('../../models/filter.model');
const ApiError = require('../../helpers/apiErrorConverter');

// create filter
const createFilter = async (data) => {
  try {
    const filter = await Filter.create(data);
    return filter;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

// get filter by id
const getFilterById = async (id) => {
  try {
    const filter = await Filter.findById(id);
    return filter;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

// get unique types name
const getUniqueTypes = async () => {
  try {
    const types = await Filter.distinct('type');
    return types;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

// get all name from type
const getNamesByType = async (type) => {
  try {
    const names = await Filter.find({ type });
    return names;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

// update filter
const updateFilter = async (id, data) => {
  try {
    const filter = await Filter.findByIdAndUpdate(id, data, { new: true });
    return filter;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

// delete filter
const deleteFilter = async (id) => {
  try {
    await Filter.findByIdAndDelete(id);
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

module.exports = {
  createFilter,
  getUniqueTypes,
  getNamesByType,
  updateFilter,
  deleteFilter,
  getFilterById,
};
