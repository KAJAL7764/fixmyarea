import "./Chatbot.css";
import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import api from "../../api/axios";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm FixMyArea AI.",
    },
    {
      sender: "bot",
      text: "Ask me anything about FixMyArea.",
    },
  ]);

  const [typing, setTyping] = useState(false);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userInput = input;

  const userMessage = {
    sender: "user",
    text: userInput,
  };

  // Show user message immediately
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setTyping(true);

  try {
    const chatHistory = messages
  .filter(
    (msg) =>
      msg.text !== "👋 Hello! I'm FixMyArea AI." &&
      msg.text !== "Ask me anything about FixMyArea."
  )
  .map((msg) => ({
    role: msg.sender === "bot" ? "assistant" : "user",
    content: msg.text,
  }));

chatHistory.push({
  role: "user",
  content: userInput,
});
  

    const res = await api.post("/ai/chat", {
      messages: chatHistory,
     
    }
  );
   console.log("Chat history sent to server:", chatHistory),

    setTyping(false);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: res.data.reply,
      },
    ]);

  } catch (error) {
    setTyping(false);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "⚠️ Sorry, I couldn't connect to the AI.",
      },
    ]);

    console.error(error);
  }
};


  return (
    <>
      {!open && (
        <button
          className="chatbot-float"
          onClick={() => setOpen(true)}
        >
          <FaRobot />
        </button>
      )}

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            🤖 FixMyArea AI

            <FaTimes
              className="close-chat"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "bot"
                    ? "bot-message"
                    : "bot-message user-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {typing && (
              <div className="bot-message">
                Typing...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  sendMessage();
              }}
              placeholder="Ask FixMyArea AI..."
            />

            <button onClick={sendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}