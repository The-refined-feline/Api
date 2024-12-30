const Bank = require('../../models/bank.model');
const ApiError = require('../../helpers/apiErrorConverter');
const addBank = async (data) => {
  const bankData = await Bank.create(data);
  return bankData;
};

const listBank = async () => {
  const listofBanks = await Bank.find();
  if (listofBanks.length === 0) {
    throw new ApiError('Data not found', 404);
  }
  return listofBanks;
};

const editBank = async (id) => {
  const bankData = await Bank.findById(id);
  if (!bankData) {
    throw new ApiError('Data not found', 404);
  }
  return bankData;
};

const updateBank = async (id, data) => {
  const updatedBank = await Bank.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return updatedBank;
};

const deleteBank = async (id) => {
  return await Bank.findByIdAndDelete(id);
};

module.exports = {
  addBank,
  listBank,
  editBank,
  updateBank,
  deleteBank,
};
