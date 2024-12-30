const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/invitation/invitation.service');

const addInvitation = catchAsync(async (req, res) => {
  req.body.userId = req.user._id;
  const invitationData = await service.addInvitation(req.body);
  res.status(200).json({
    message: 'Invitation created successfully',
    inviteData: invitationData,
  });
});

const getInvitation = catchAsync(async (req, res) => {
  const invitationResult = await service.getInvitation(req.body);
  res.status(200).json({ invitationResult });
});

const updateInvitation = catchAsync(async (req, res) => {
  const invitationData = await service.updateInvitation(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    message: 'Invitation updated successfully',
    updatedInvite: invitationData,
  });
});

const deleteInvitation = catchAsync(async (req, res) => {
  await service.deleteInvitation(req.params.id);
  res.status(200).send('Invitation deleted successfully');
});

const latestInvitation = catchAsync(async (req, res) => {
  const invitationData = await service.latestInvitation();
  res.status(200).send(invitationData);
});

module.exports = {
  addInvitation,
  getInvitation,
  updateInvitation,
  deleteInvitation,
  latestInvitation,
};
