import React from 'react'
import { FaRobot } from "react-icons/fa6";

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.sender === "bot" ? "bot-message" : "user-message"}`}>
      {chat.sender === "bot" && <FaRobot />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage
