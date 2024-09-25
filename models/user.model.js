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
    },
    number: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return v.length === 10;
        },
        message: 'Phone number must be 10 digits long.',
      },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', UserSchema);
