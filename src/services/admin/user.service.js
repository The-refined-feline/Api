const User = require('../../models/user.model');
const ApiError = require('../../helpers/apiErrorConverter');
const mongoose = require('mongoose');
const { http } = require('winston');
const email = require('../email/email.service');

const userListFind = async (
  id,
  limit = 10,
  page = 1,
  searchQuery = '',
  role = '',
) => {
  try {
    const query = {};
    if (searchQuery) {
      const sanitizedSearchTerm = searchQuery.replace(/"/g, '');
      query.$or = [
        { firstName: { $regex: sanitizedSearchTerm, $options: 'i' } },
        { lastName: { $regex: sanitizedSearchTerm, $options: 'i' } },
        { email: { $regex: sanitizedSearchTerm, $options: 'i' } },
      ];
    }

    if (role) {
      query.role = role;
    }

    if (id) {
      query._id = { $ne: id };
    }
    const skip = (page - 1) * limit;
    const totalItems = await User.find(query).countDocuments();
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const userList = {
      users,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
      totalResults: totalItems,
    };

    return userList;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const addUser = async (userData) => {
  const userCheck = await User.findOne({ email: userData.email });
  if (userCheck) {
    throw new ApiError('User already exists', 400);
  }
  const user = await User.create(userData);
  const userEmaildata = {
    Message: 'Account Created successfully',
    UserName: userData.password,
    userData: userData.password,
  };

  await email.sendSendgridEmail(
    user.email,
    'Email Verification',
    userEmaildata,
    'd-92ce28b7f6664d5a9f53bb53003609f3',
  );

  return user;
};

const getUserById = (id) => {
  return User.findById(id);
};

const editUser = async (id) => {
  try {
    const userData = await getUserById(id).populate([
      { path: 'about.ethnicity' },
      { path: 'about.bodyType' },
      { path: 'about.kids' },
      { path: 'about.smoking' },
      { path: 'about.drinking' },
      { path: 'about.relationshipStatus' },
      { path: 'about.education' },
    ]);
    if (!userData) {
      throw new ApiError('User not found', 404);
    }

    const user = { ...userData._doc };
    return user;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new ApiError('User not found', 404);

    if (data.about) {
      data.about = { ...user.about.toObject(), ...data.about };
    }

    Object.assign(user, data);
    await user.save();

    // const userData = await User.findOneAndUpdate(
    //   { _id: new mongoose.Types.ObjectId(id) },
    //   { $set: data },
    //   {
    //     returnDocument: 'after',
    //   },
    // );
    return user;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const userVerification = async (id, status) => {
  const userData = await User.findByIdAndUpdate(
    id,
    {
      $set: { isVerfied: status },
    },
    { new: true },
  );
  return userData;
};

module.exports = {
  userListFind,
  addUser,
  editUser,
  updateUser,
  deleteUser,
  userVerification,
};
