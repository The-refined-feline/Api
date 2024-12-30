const User = require('../../models/user.model');
const Support = require('../../models/support.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ApiError = require('../../helpers/apiErrorConverter');
const Privatemedia = require('../../models/privatecontent.model');

// Create new user
const createUser = async (data) => {
  const checkEmail = await User.findOne({ email: data.email });
  if (checkEmail) {
    throw new ApiError('Email already exists', 400);
  }
  return User.create(data);
};

// User login
const loginUser = async (email, password) => {
  return User.loginUser(email, password);
};

// Find user by id
const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

// Change pasword
const changePassword = async (email, password) => {
  const pwd = await bcrypt.hash(password, 8);
  return User.findOneAndUpdate({ email }, { password: pwd });
};

// Update notification settings
const updateNotificationSetting = async (email, notification) => {
  return User.findOneAndUpdate({ email }, { notification });
};

const getUserById = async (id) => {
  try {
    // Fetch user data with populated fields
    const userData = await User.findById(new mongoose.Types.ObjectId(id)).populate([
      { path: 'about.ethnicity' },
      { path: 'about.bodyType' },
      { path: 'about.kids' },
      { path: 'about.smoking' },
      { path: 'about.drinking' },
      { path: 'about.relationshipStatus' },
      { path: 'about.education' },
    ]);

    // Fetch private media data
    const privetdata = await Privatemedia.find({ userId: new mongoose.Types.ObjectId(id) });

    // // Ensure both queries return data before merging
    if (!privetdata) {
      return userData;
    }

    // // Combine userData and privetdata
    const user = { ...userData._doc, privatemedia: privetdata.map((item) => item._doc), };
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


// Delete user account
const deleteAccountById = async (id) => {
  return User.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

// Update password
const updatePassword = async (user, newpass, oldpass) => {
  if (!(await bcrypt.compare(oldpass, user.password))) {
    throw new ApiError('Invalid Old Password', 400);
  }
  if (oldpass === newpass) {
    throw new ApiError('Old and New Password Can Not Be Same', 400);
  }
  return changePassword(user.email, newpass);
};

// update User
const updateUser = async (id, data) => {
  const checkEmail = await User.findOne({ email: data.email });
  if (checkEmail) {
    throw new ApiError('Email already exists', 400);
  }

  return User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, data, {
    returnDocument: 'after',
  });
};

const addSupport = async (data) => {
  const support = await Support.create(data);
  return support;
};

const addIntroMedia = async (id, data) => {
  const mediadata = await User.findByIdAndUpdate(
    id,
    {
      $push: { introImages: { $each: data } },
    },
    { new: true },
  );

  return mediadata;
};

const deleteIntroMedia = async (id) => {
  if (!id) {
    throw new ApiError('ID not found');
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { 'introImages._id': id },
      { $pull: { introImages: { _id: id } } },
      { new: true },
    );

    if (!updatedUser) {
      throw new ApiError('User or intro image not found');
    }

    return updatedUser;
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
};

const addPrivateMedia = async (data) => {
  const privateMedia = await Privatemedia.create(data);
  return privateMedia;
};

const deletePrivateMedia = async (id) => {
  return await Privatemedia.findByIdAndDelete(id);
};

const viewPrivateMedia = async (id) => {
  const privateMedia = await Privatemedia.find({ userId: id });
  if (privateMedia.length == 0) {
    throw new ApiError('Upload a private content', 200);
  }
  return privateMedia;
};

const addVerfication = async (userId, data) => {
  const verification = await User.findByIdAndUpdate(
    userId,
    { $set: data },
    {
      new: true,
    },
  );
  return verification;
};

const updateSocialLinks = async (userId, data) => {
  const verification = await User.findByIdAndUpdate(
    userId,
    { $set: data },
    {
      new: true,
    },
  );
  return verification;
};

module.exports = {
  createUser,
  loginUser,
  findUserByEmail,
  changePassword,
  getUserById,
  deleteAccountById,
  updatePassword,
  updateUser,
  updateNotificationSetting,
  addSupport,
  addIntroMedia,
  deleteIntroMedia,
  addPrivateMedia,
  deletePrivateMedia,
  viewPrivateMedia,
  addVerfication,
  updateSocialLinks,
};
