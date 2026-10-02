import React, { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi there! 👋 I'm SmartCare Assistant. How can I help you today? You can ask me about doctors, symptoms, appointments, or general health questions!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_URL || import.meta.env.VITE_BACKEND_URL || "http://localhost:8989";
      // Only send last 6 messages for faster responses
      const history = messages.slice(-6).map((m) => ({
        role: m.role === "user" ? "user" : "model",
        content: m.content,
      }));

      const response = await fetch(`${backendUrl}/api/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Sorry, I couldn't process that. Please try again! 🙏" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Oops! I'm having connection issues. Please try again later. 🔄" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What specialities are available?",
    "How do I book an appointment?",
    "I have a headache",
    "What are your working hours?",
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(102, 126, 234, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          zIndex: 9999,
          transform: isOpen ? "scale(0)" : "scale(1)",
        }}
        aria-label="Open chat"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "380px",
            maxWidth: "calc(100vw - 48px)",
            height: "550px",
            maxHeight: "calc(100vh - 100px)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            animation: "chatSlideUp 0.3s ease",
            background: "#f8f9fa",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <div>
                <h3 style={{ color: "white", margin: 0, fontSize: "16px", fontWeight: 600 }}>
                  SmartCare Assistant
                </h3>
                <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "12px" }}>
                  {isLoading ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "white",
                    color: msg.role === "user" ? "white" : "#333",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    background: "white",
                    padding: "12px 18px",
                    borderRadius: "16px 16px 16px 4px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <span className="chatbot-dot" style={{ animationDelay: "0s" }}>●</span>
                  <span className="chatbot-dot" style={{ animationDelay: "0.2s" }}>●</span>
                  <span className="chatbot-dot" style={{ animationDelay: "0.4s" }}>●</span>
                </div>
              </div>
            )}

            {/* Quick questions — only show when there's just the welcome message */}
            {messages.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q);
                      // Auto-submit after setting input
                      setTimeout(() => {
                        const form = document.getElementById("chatbot-form");
                        if (form) form.requestSubmit();
                      }, 50);
                    }}
                    style={{
                      background: "white",
                      border: "1px solid #667eea",
                      color: "#667eea",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#667eea";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "white";
                      e.target.style.color = "#667eea";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            id="chatbot-form"
            onSubmit={sendMessage}
            style={{
              padding: "12px 16px",
              borderTop: "1px solid #e9ecef",
              background: "white",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your health question..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid #dee2e6",
                borderRadius: "24px",
                outline: "none",
                fontSize: "14px",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#dee2e6")}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  isLoading || !input.trim()
                    ? "#ccc"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatDotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        .chatbot-dot {
          animation: chatDotBounce 1.4s infinite;
          color: #667eea;
          font-size: 10px;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
