import React, { useState } from 'react';
import './mainChat.css'; // Import the CSS file

function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Fetch answer from backend
    try {
      const response = await fetch(`http://localhost:5000/api/answers?question=${question}`);
      const data = await response.json();
      setAnswer(data.answer);
      setChatHistory([...chatHistory, { question, answer: data.answer }]);
    } catch (error) {
      console.error('Error fetching answer:', error.message);
      setAnswer('Error fetching answer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Ask a Question</h2>
            <div className="chat-history">
            {chatHistory.map((chat, index) => (
          <div key={index} className={index % 2 === 0 ? "chat-bubble-user" : "chat-bubble-bot"}>
            <div className='questions'>You: {chat.question}</div>
            <div className='answers'>Bot: {chat.answer}</div>
          </div>
        ))}
      </div>
    
      <form onSubmit={handleSubmit}>
        <div className='chat-input'>
          <div>
            <label className="form-label">  
              <input
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                className="form-input"
                placeholder='ASK MARCO'
                required
              />
            </label>
          </div>
          <div>
            <button type="submit" className="form-button" disabled={isLoading}>
              {isLoading ? 'Asking...' : 'Ask'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
