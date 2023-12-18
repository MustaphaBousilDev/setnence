const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    // Other tag-related fields
    first_name: {
      type: String,
      required: [true, "first name is required"],
      min: 6,
      max: 255,
      lowercase: true,
      validator: (value) => {
        // remove all spaces from string value
        return validator.isAlpha(value.replace(/\s/g, ""));
      },
      trim: true,
      default: null,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
      min: 6,
      max: 255,
      lowercase: true,
      validator: (value) => {
        // remove all spaces from string value
        return validator.isAlpha(value.replace(/\s/g, ""));
      },
      default: null,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    mobile: {
      type: String,
      min: 10,
      max: 10,
      unique: true,
      default: null,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [128, "Password must be less than 128 characters long"],
      validate: {
        validator: function (value) {
          // Require at least one uppercase le tter, one lowercase letter, one special character and one number
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
          return regex.test(value);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number",
      },
    },
    loginCount: {
      type: Number,
      default: 0,
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
      trim: true,
    },
    // role: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Role",
    //   required: true,
    //   default: "65639f02790359a11fef4850",
    // },

    isBlocked: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    // search: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Search",
    //     default: null,
    //   },
    // ],
    // address: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Address",
    //     default: null,
    //   },
    // ],
    refreshToken: {
      type: String,
      default: "",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.methods.incrementLoginCount = function () {
  this.loginCount += 1;
  return this.save();
};

module.exports = userSchema;
