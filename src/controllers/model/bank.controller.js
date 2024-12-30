const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/model/bank.service');
const addBank = catchAsync(async (req, res) => {
  req.body.userId = req.user._id;
  const bankData = await service.addBank(req.body);
  res.status(200).send({ bankData });
});

const listBank = catchAsync(async (req, res) => {
  const banklists = await service.listBank();
  res.status(200).send({ banklists });
});

const editBank = catchAsync(async (req, res) => {
  const bankdata = await service.editBank(req.params.id);
  res.status(200).send({ bankdata });
});

const updateBank = catchAsync(async (req, res) => {
  const updatedData = await service.updateBank(req.params.id, req.body);
  res.status(200).json({
    message: 'Bank updated successfully',
    BankData: updatedData,
  });
});

const deleteBank = catchAsync(async (req, res) => {
  await service.deleteBank(req.params.id);
  res.status(200).send('Bank deleted successfully');
});

module.exports = {
  addBank,
  listBank,
  editBank,
  updateBank,
  deleteBank,
};
