import { verifyToken } from '../utils/token.utlis.js';

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = verifyToken(token.split(' ')[1]);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid or Expired Token',
    });
  }
};
