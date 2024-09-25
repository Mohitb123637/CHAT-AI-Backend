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
      minlength: 10,
      maxlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', UserSchema);
