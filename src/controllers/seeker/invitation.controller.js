const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/seeker/invitation.service');
const invitation = catchAsync(async (req, res) => {
  const invitationData = await service.invitation(req.body);
  res.status(200).json({
    message: 'Invitation updated succesfully',
    data: invitationData,
  });
});

module.exports = {
  invitation,
};
