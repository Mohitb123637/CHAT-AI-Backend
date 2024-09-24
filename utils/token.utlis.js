import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error('JWT secret key is not defined');
}

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
  };
  return jwt.sign(payload, secretKey, {
    expiresIn: '5d',
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
