const service = require('../../services/auth/auth.service');
const token = require('../../services/auth/token.service');
const otp = require('../../services/auth/otp.service');
const catchAsync = require('../../helpers/asyncErrorHandler');
const ApiError = require('../../helpers/apiErrorConverter');

// Register
const register = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.profileimageurl = req.file.location;
  }
  const user = await service.createUser(req.body);
  const tokens = token.generateAuthTokens(user);
  //await otp.generateOtp(user, 'emailVerify');
  res.status(201).send({
    message: 'Registration successful, please verify your email',
    user,
    tokens,
  });
});

// Login
const login = catchAsync(async (req, res, next) => {
  const user = await service.loginUser(req.body.email, req.body.password);
  const tokens = token.generateAuthTokens(user);
  res.status(200).send({ message: 'Login successful', tokens, user });
});

// Forget password send otp
const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await service.findUserByEmail(req.body.email);
  if (!user) {
    throw new ApiError('User Not Found', 404);
  }
  await otp.generateOtp(user, 'forgetPass');
  res.status(200).send({ message: 'Otp Sent to your email address' });
});

// Otp verify
const verify = catchAsync(async (req, res, next) => {
  const user = await service.findUserByEmail(req.body.email);
  if (!user) {
    throw new ApiError('User Not Found', 404);
  }
  await otp.verifyOtp(user.email, req.body.otp);
  res.status(200).send({ message: 'Otp verified successfully' });
});

// Reset password
const reset = catchAsync(async (req, res, next) => {
  const user = await service.findUserByEmail(req.body.email);
  if (!user) {
    throw new ApiError('User Not Found', 404);
  }
  await otp.getOtpIfVerified(user.email, req.body.otp);
  await service.changePassword(user.email, req.body.password);
  res.status(200).send({ message: 'Password reset Successfull' });
});

// Refresh token
const refreshTokens = catchAsync(async (req, res, next) => {
  let data;
  try {
    data = await token.verifyToken(req.body.token, 'refresh');
  } catch (e) {
    throw new ApiError(e.message, 404);
  }
  const user = await service.getUserById(data.sub);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  const tokens = token.generateAuthTokens(user);
  await token.blacklistToken(req.body.token, 'refresh');
  res.status(200).send({ message: 'Token refresh succesfull', tokens });
});

// Logout
const logout = catchAsync(async (req, res, next) => {
  await token.blacklistToken(req.body.access, 'access');
  await token.blacklistToken(req.body.refresh, 'refresh');
  res.status(200).send({ message: 'Logout successfull' });
});

// Resend Otp
const forgotPasswordResend = catchAsync(async (req, res, next) => {
  const user = await service.findUserByEmail(req.body.email);
  if (!user) {
    throw new ApiError('User Not Found', 404);
  }
  await otp.generateOtp(user, 'resend');
  res.status(200).send({ message: 'Otp Sent to the email address' });
});

module.exports = {
  register,
  login,
  forgotPassword,
  verify,
  reset,
  refreshTokens,
  logout,
  forgotPasswordResend,
};
