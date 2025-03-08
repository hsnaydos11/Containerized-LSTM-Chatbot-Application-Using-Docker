import { useRef } from "react";
import { HiArrowUp } from "react-icons/hi2"; // Ensure the correct import path

const ChatbotForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value.trim();
    if (!userMessage) return;
    inputRef.current.value = ""; // Clear input after submit

    // Kullanıcı mesajını doğrudan ekle, bekleme mesajı ekleme
    const updatedHistory = [...chatHistory, { text: userMessage, role: "user" }];
    setChatHistory(updatedHistory);

    // Bot cevabını getirmek için çağır
    generateBotResponse(updatedHistory);
  };

  return (
    <div>
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          className="message-input"
          ref={inputRef}
          required
        />
        <button type="submit">
          <HiArrowUp />
        </button>
      </form>
    </div>
  );
};

export default ChatbotForm;
