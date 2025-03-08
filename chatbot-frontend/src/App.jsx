import { useState } from "react";
import "./App.css";
import { FaRobot } from "react-icons/fa6";
import ChatbotForm from "./components/ChatbotForm";
import ChatMessage from "./components/ChatMessage";

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    const userMessage = history[history.length - 1].text; // Kullanıcının son mesajını al

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { text: data.response, sender: "bot" },
        ]);
      } else {
        console.error("Hata:", data.error);
      }
    } catch (error) {
      console.error("API isteğinde hata oluştu:", error);
    }
  };

  return (
    <div className="container">
      <div className="chatbot-popup">
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <h2 className="logo-text">ChatBot</h2>
          </div>
          <button className="close-btn" onClick={() => console.log("Chatbot kapatıldı")}>
            <span className="material-symbols-rounded">x</span>
          </button>
        </div>
        <div className="chatbot-body">
          <div className="message bot-message">
            <FaRobot />
            <p className="message-text">Welcome! How can i help you?</p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        <div className="chatbot-footer">
          <ChatbotForm 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;