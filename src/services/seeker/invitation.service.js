const ApiError = require('../../helpers/apiErrorConverter');
const Invitation = require('../../models/invitation.model');
const invitation = async (data) => {
  const inviteData = await Invitation.create(data);
  return inviteData;
};

module.exports = {
  invitation,
};
