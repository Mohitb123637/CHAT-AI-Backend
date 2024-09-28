import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.utlis.js';
import { sendVerificationCode } from '../config/Email.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, number } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (number.toString().length !== 10) {
      return res
        .status(400)
        .json({ message: 'Invalid phone number, must be 10 digits' });
    }
    // Validate password for uppercase letter and special character
    if (!/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return res.status(400).json({
        message:
          'Password must contain at least one uppercase letter and one special character.',
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'This Email already exists' });
    }
    // Check if phone number is already registered
    const userByNumber = await User.findOne({ number });
    if (userByNumber) {
      return res
        .status(400)
        .json({ message: 'Phone number is already registered' });
    }
    // hassing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // verification otp code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      number,
      verificationCode,
    });
    await newUser.save();
    sendVerificationCode(newUser.email, verificationCode);
    // Generate JWt Token
    const token = await generateToken(newUser);
    res.json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        number: newUser.number,
      },
    });
    console.log(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Verification email

export const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'User not found Please Signup' });
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: 'Invalid Verification Code' });
    }
    user.isVerified = true;
    await user.save();
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'User not found Please Signup' });

    // Check if the user is verified
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: 'Please verify your email before logging in.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });
    const token = await generateToken(user);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    console.log(user, 'user is');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.json({ message: 'Logged Out Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
