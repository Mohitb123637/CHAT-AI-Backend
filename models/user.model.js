import mongoose from 'mongoose';
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (v) {
          return /[A-Z]/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v);
        },
        message:
          'Password must contain at least one uppercase letter and one special character.',
      },
    },
    number: {
      type: Number,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', UserSchema);
