const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/admin/user.service');
const listUser = catchAsync(async (req, res, next) => {
  const limit = req.params.limit ? Number(req.params.limit) : 10;
  const page = req.params.page ? Number(req.params.page) : 1;
  const search = req.body.search ? req.body.search : '';
  const role = req.body.role ? req.body.role : '';
  const users = await service.userListFind(
    req.user._id,
    limit,
    page,
    search,
    role,
  );
  res.status(200).send({ status: 200, users });
});

const addUser = catchAsync(async (req, res) => {
  const data = { ...req.body };
  const userData = await service.addUser(data);
  res.status(200).json({
    message: 'User added successfully',
    userdata: userData,
  });
});

const edituser = catchAsync(async (req, res) => {
  const userData = await service.editUser(req.params.id);
  console.log(req.params.id);
  res.status(200).send(userData);
});

const updateUser = catchAsync(async (req, res) => {
  const updateData = await service.updateUser(req.params.id, req.body);

  res.status(200).json({
    message: 'Data updated successfully',
    userData: updateData,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  await service.deleteUser(req.params.id);
  res.status(200).send('User deleted successfully');
});

const userVerification = catchAsync(async (req, res) => {
  const verificationStatus = await service.userVerification(
    req.params.id,
    req.body.isVerified,
  );
  res.status(200).json({
    message: 'Status updated',
    verificationStatus,
  });
});

module.exports = {
  listUser,
  addUser,
  edituser,
  updateUser,
  deleteUser,
  userVerification,
};
