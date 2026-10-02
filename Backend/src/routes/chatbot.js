const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const chatbotRouter = express.Router();

// Cache Gemini client to avoid re-initializing on every request
let cachedGenAI = null;

function getGenAI() {
  if (!cachedGenAI && process.env.GEMINI_API_KEY) {
    cachedGenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return cachedGenAI;
}

const SYSTEM_PROMPT = `You are SmartCare Assistant, a concise healthcare chatbot.
Specialities: General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist.
Rules: Be empathetic. Never diagnose — recommend a doctor. Keep answers 2-3 sentences. Suggest booking on SmartCare. For emergencies, say call 112. Redirect non-medical questions politely. Use a warm tone with emojis.`;

chatbotRouter.post("/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
      return res.status(500).json({ 
        success: false, 
        message: "Chatbot is not configured yet. The admin needs to add a valid GEMINI_API_KEY." 
      });
    }

    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    // Only keep last 6 messages for context (faster responses)
    const recentHistory = (history || []).slice(-6).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Got it! I'm SmartCare Assistant. How can I help? 😊" }] },
        ...recentHistory,
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return res.status(200).json({
      success: true,
      reply: response,
    });
  } catch (error) {
    console.error("Chatbot error:", error.message);
    
    if (error.message && (error.message.includes("CONSUMER_SUSPENDED") || error.message.includes("403") || error.message.includes("API_KEY_INVALID"))) {
      return res.status(500).json({
        success: false,
        message: "The chatbot API key is invalid or suspended. Please generate a new key at https://aistudio.google.com/apikey",
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Sorry, I'm having trouble right now. Please try again later.",
    });
  }
});

module.exports = chatbotRouter;
