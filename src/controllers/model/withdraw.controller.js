const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/model/withdraw.service');

const withdrawRequest = catchAsync(async (req, res) => {
  req.body.userId = req.user._id;
  const withdraw = await service.withdrawRequest(req.body);
  res.status(200).json({
    message: 'Withdraw requested successfully',
    withdrawData: withdraw,
  });
});

const getTransactionList = catchAsync(async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const page = req.query.page ? Number(req.query.page) : 1;
  const { fromDate, toDate } = req.body;

  const transactionList = await service.getTransactionList(
    limit,
    page,
    req.user._id,
    fromDate,
    toDate,
  );

  res.status(200).send(transactionList);
});

module.exports = {
  withdrawRequest,
  getTransactionList,
};
