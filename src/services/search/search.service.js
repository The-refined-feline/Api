const User = require('../../models/user.model');

const searchWithFilters = async (
  id,
  filters,
  sortOption,
  limit,
  currentPage,
  searchTerm,
) => {
  try {
    const requestingUser = await User.findById(id).select('role');
    if (!requestingUser) {
      throw new Error('User not found');
    }

    const roleToSearch = requestingUser.role === 'model' ? 'seeker' : 'model';
    const matchStage = { role: roleToSearch };
    const sortStage = {};

    if (searchTerm && searchTerm.trim() !== '') {
      const sanitizedSearchTerm = searchTerm.replace(/"/g, '');
      matchStage.$or = [
        { fullName: { $regex: sanitizedSearchTerm, $options: 'i' } },
        { 'about.location': { $regex: sanitizedSearchTerm, $options: 'i' } },
        {
          'about.gender': { $regex: `^${sanitizedSearchTerm}$`, $options: 'i' },
        },
      ];
    }

    if (filters.age) {
      const [minAge, maxAge] = filters.age.split('-').map(Number);
      matchStage['about.age'] = { $gte: minAge, $lte: maxAge };
    }

    if (filters.location) {
      matchStage['about.location'] = {
        $regex: filters.location,
        $options: 'i',
      };
    }

    if (filters.gender) {
      matchStage['about.gender'] = filters.gender;
    }

    if (filters.bodyType) {
      matchStage['about.bodyType'] = filters.bodyType;
    }

    if (filters.ethnicity) {
      matchStage['about.ethnicity'] = filters.ethnicity;
    }

    if (filters.verified) {
      matchStage['isSetupDone'] = filters.verified === 'true';
    }

    if (filters.online !== undefined) {
      matchStage['online'] = filters.online === 'true';
    }

    switch (sortOption) {
      case 'Closest to me':
        break;
      case 'Newest users':
        sortStage['createdAt'] = -1;
        break;
      case 'Youngest to oldest':
        sortStage['about.age'] = 1;
        break;
      case 'Recently created Invitation':
        sortStage['invitation.createdAt'] = -1;
        break;
      case 'Oldest to youngest':
        sortStage['about.age'] = -1;
        break;
      default:
        sortStage['createdAt'] = -1;
    }

    const pipeline = [
      { $match: matchStage },
      { $sort: sortStage },
      { $skip: (currentPage - 1) * limit },
      { $limit: limit },
      {
        $project: {
          fullName: 1,
          email: 1,
          profileimageurl: 1,
          'about.age': 1,
          'about.location': 1,
          'about.bodyType': 1,
          'about.ethnicity': 1,
          'about.gender': 1,
          'about.bio': 1,
          createdAt: 1,
        },
      },
    ];

    const users = await User.aggregate(pipeline);

    const totalItems = await User.aggregate([
      { $match: matchStage },
      { $count: 'count' },
    ]);
    const totalResults = totalItems.length > 0 ? totalItems[0].count : 0;

    return {
      users: users,
      page: currentPage,
      limit,
      totalPages: Math.ceil(totalResults / limit),
      totalResults,
    };
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

module.exports = {
  searchWithFilters,
};
