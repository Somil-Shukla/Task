import React, { useState, useEffect } from 'react';

function ChatApp() {
  const [chatHistory, setChatHistory] = useState([]);

  // Fetch chat history from backend when component mounts
  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chatHistory');
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  return (
    <div>
      <h1>Chat History</h1>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={index % 2 === 0 ? "chat-bubble-user" : "chat-bubble-bot"}>
            <div className='questions'>{chat.question}</div>
            <div className='answers'>{chat.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatApp;
