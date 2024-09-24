import { AiChatSchema } from '../models/ai.model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log('Error generating content:', error);
    throw error;
  }
};

export const generateAnswers = async (req, res) => {
  try {
    const question = req.body.question;
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }
    const result = await generate(question);
    const userInteraction = new AiChatSchema({
      user: req.user.id,
      question: question,
      answer: result,
    });
    await userInteraction.save();
    const timestamp = new Date().toISOString();
    res.json({
      message: 'Answer generated successfully',
      answer: result,
      timestamp: timestamp,
    });
  } catch (error) {
    console.log('Error generating answer:', error);
    res.status(500).json({ message: 'Error generating answer' });
  }
};

export const getAllChatHistory = async (req, res) => {
  try {
    const chatHistory = await AiChatSchema.find({ user: req.user.id });
    res.status(200).json({
      message: 'History generated successfully',
      history: chatHistory,
    });
  } catch (error) {
    console.error('Error fetching chat data', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteChatHistory = async (req, res) => {
  try {
    const result = await AiChatSchema.deleteMany({ user: req.user.id });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: 'No chat history found to delete' });
    }
    res.status(200).json({ message: 'Chat history deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat history', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteChatEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AiChatSchema.findByIdAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: 'Chat entry not found or unauthorized' });
    }
    res.status(200).json({ message: 'Chat entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat entry', error);
    res.status(500).json({ error: error.message });
  }
};
