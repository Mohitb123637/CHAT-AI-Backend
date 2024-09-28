import express from 'express';
import {
  login,
  logout,
  profile,
  signup,
  verifyEmail,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verifyEmail', verifyEmail);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.get('/logout', authMiddleware, logout);

export default router;
