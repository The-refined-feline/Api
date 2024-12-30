const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const bcrypt = require('bcrypt');
const ApiError = require('../helpers/apiErrorConverter');
const { boolean } = require('joi');

const introImage = new mongoose.Schema({
  introImage: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new ApiError('Invalid email', 400);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true, // used by the toJSON plugin
    },

    role: {
      type: String,
      enum: ['admin', 'model', 'seeker'],
      default: 'seeker',
    },

    about: {
      age: {
        type: String,
        trim: true,
      },

      interest: {
        type: String,
        trim: true,
      },

      location: {
        type: String,
        trim: true,
      },

      height: {
        type: String,
        trim: true,
      },

      ethnicity: {
        type: mongoose.Types.ObjectId,
        ref: 'Filter'
      },

      bodyType: {
        type: mongoose.Types.ObjectId,
        ref: 'Filter'
      },

      kids: {
        type: mongoose.Types.ObjectId,
        ref: 'Filter'
      },

      smoking: {
        type: mongoose.Types.ObjectId,
        ref: 'Filter'
      },

      drinking: {
        type: mongoose.Types.ObjectId,
        ref: 'Filter'
      },

      gender: {
        type: String,
        trim: true,
      },

      interestedIn: {
        type: String,
        trim: true,
      },

      relationshipStatus: {
        type: mongoose.Types.ObjectId,
        ref: 'Filter'
      },

      education: {
        type: mongoose.Types.ObjectId,
        ref: 'Filter'
      },

      occupation: {
        type: String,
        trim: true,
      },

      bio: {
        type: String,
        trim: true,
      },
    },

    isSetupDone: {
      type: Boolean,
      default: false,
    },

    notification: {
      type: Boolean,
      default: false,
    },
    profileimageurl: {
      type: String,
      default: '',
    },
    introImages: [introImage],

    verification: {
      verificationId: {
        type: String,
      },

      selfie: {
        type: String,
      },
    },

    isVerfied: {
      type: Boolean,
      default: false,
    },

    socialLinks: {
      facebooklink: {
        type: String,
      },
      instagramlink: {
        type: String,
      },
      twitterlink: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

// add apgination plugin
userSchema.plugin(paginate);

// check is user password is matching
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

// hash the user password before saving data to db
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// login user
userSchema.statics.loginUser = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  if (!(await user.isPasswordMatch(password))) {
    throw new ApiError('Invalid email or password', 401);
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
