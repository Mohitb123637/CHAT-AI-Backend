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
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          );
        },
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      },
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
