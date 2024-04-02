
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv=require("dotenv");
dotenv.config();
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Schema
const answerSchema = new mongoose.Schema({
  id: String,
  question: String,
  answer: String
});

const Answer = mongoose.model('Answer', answerSchema);

const ChatMessageSchema = new mongoose.Schema({
    message: String,
    sender: String,
    timestamp: { type: Date, default: Date.now }
});
  
  const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
  
  // Endpoint to fetch chat history
  app.get('/api/chatHistory', async (req, res) => {
    try {
      const chatHistory = await ChatMessage.find().sort({ timestamp: 'desc' });
      res.json(chatHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Endpoint to add new chat message
  app.post('/api/chat', async (req, res) => {
    const { message, sender } = req.body;
    try {
      const newMessage = new ChatMessage({ message, sender });
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
// API Endpoint to fetch answer by question
app.get('/api/answers', async (req, res) => {
  try {
    const question = req.query.question;
    const answer = await Answer.findOne({ question });
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
