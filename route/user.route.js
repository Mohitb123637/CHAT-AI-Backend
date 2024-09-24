import express from 'express';
import {
  login,
  logout,
  profile,
  signup,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.get('/logout', authMiddleware, logout);

export default router;
