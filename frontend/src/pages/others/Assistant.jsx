import React, { useState } from 'react';
import '../../styles/others/Assistant.css';
import { GoChevronLeft, GoArrowRight } from "react-icons/go";
import { useNavigate} from 'react-router-dom';
import assistantData from '../../assets/data/assistantData';

const ChatHeader = () =>{
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/');
      };
    return (
        <div className="chat-header">
          <button className="back-button" onClick={handleBackClick}>
            <GoChevronLeft className="back-arrow"/>
          </button>
          <span className="assistant-title">Cario Helper</span>
        </div>
      )
} ;


const ChatBubble = ({ text, isUser }) => (
  <div className={`chat-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
    {text}
  </div>
);


const QuestionButton = ({ text, onClick }) => (
  <button className="question-button" onClick={onClick}>
    {text}
  </button>
);

const Assistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, what would you like to ask?", isUser: false }
  ]);
  const [userQuestion, setUserQuestion] = useState('');

  const handleQuestionClick = (question) => {
    setUserQuestion(question);
  };

  const getResponseForQuestion = (question) => {
    const foundItem = assistantData.find(item => item.question === question);
    return { text: foundItem ? foundItem.response : "Sorry, I don't have an answer for that.", isUser: false };
  };

  const handleAskQuestion = () => {
    if (userQuestion.trim() === '') return;
    const userMessage = { text: userQuestion, isUser: true };
    const assistantResponse = getResponseForQuestion(userQuestion);
    
    setMessages((prevMessages) => [
      ...prevMessages, 
      userMessage, 
      assistantResponse
    ]);

    setUserQuestion('');
  };

  return (
    <div className="assistant-container">
      <ChatHeader />
      <div className="chat-window">
        {messages.map((message, index) => (
          <ChatBubble key={index} text={message.text} isUser={message.isUser} />
        ))}
      </div>

      <div className="scrollable-questions">
        {assistantData.map((item) => (
          <QuestionButton
            key={item.id}
            text={item.question}
            onClick={() => handleQuestionClick(item.question)}
          />
        ))}
      </div>

      <div className="question-input">
        <input 
          type="text"
          className="input-field"
          value={userQuestion}
          placeholder="Choose a Question..."
        />
        <button className="enter-button" onClick={handleAskQuestion}><GoArrowRight style={{fontSize: '18px', marginTop: '5px'}}/></button>
      </div>
    </div>
  );
};

export default Assistant;
