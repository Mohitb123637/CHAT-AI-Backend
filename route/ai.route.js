import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  deleteChatEntry,
  deleteChatHistory,
  generateAnswers,
  getAllChatHistory,
} from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/', authMiddleware, generateAnswers);
router.get('/chat-history', authMiddleware, getAllChatHistory);
router.delete('/delete-chat', authMiddleware, deleteChatHistory);
router.delete('/delete-chat-entry/:id', authMiddleware, deleteChatEntry);
export default router;
