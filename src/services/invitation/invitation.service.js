const Invitation = require('../../models/invitation.model');

const addInvitation = async (data) => {
  const invitationData = await Invitation.create(data);
  return invitationData;
};

const getInvitation = async (data) => {
  const { month, year } = data;

  const paddedMonth = month.toString().padStart(2, '0');

  const startDate = new Date(`${year}-${paddedMonth}-01T00:00:00.000Z`);
  const endDate = new Date(year, parseInt(month), 0, 23, 59, 59, 999);

  const invitationData = await Invitation.aggregate([
    {
      $match: {
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: '$date',
        invitations: { $push: '$$ROOT' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return invitationData.map(({ _id, invitations, count }) => ({
    date: new Date(_id).toISOString(),
    invitations,
    count,
  }));
};

const updateInvitation = async (id, data) => {
  const updatedInvite = await Invitation.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedInvite;
};

const deleteInvitation = async (id) => {
  return await Invitation.findByIdAndDelete(id);
};

const latestInvitation = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayInvite = await Invitation.aggregate([
    {
      $match: {
        date: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    },
    { $sort: { date: 1 } },
    { $limit: 1 },
  ]);

  if (todayInvite.length > 0) {
    return todayInvite[0];
  }
  const nextInvite = await Invitation.aggregate([
    {
      $match: {
        date: { $gt: today },
      },
    },
    { $sort: { date: 1 } },
    { $limit: 1 },
  ]);

  return nextInvite.length > 0 ? nextInvite[0] : null;
};

module.exports = {
  addInvitation,
  getInvitation,
  updateInvitation,
  deleteInvitation,
  latestInvitation,
};
