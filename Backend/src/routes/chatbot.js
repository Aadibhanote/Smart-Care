const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const chatbotRouter = express.Router();

const SYSTEM_PROMPT = `You are SmartCare Assistant, a friendly and helpful AI healthcare chatbot for the SmartCare hospital platform. 

Your capabilities:
- Help users find the right doctor based on their symptoms
- Explain medical specialities (General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist)
- Guide users on how to book appointments on SmartCare
- Answer general health and wellness questions
- Provide first-aid tips and when to see a doctor urgently
- Explain SmartCare features: booking appointments, viewing doctor profiles, managing donations, viewing your profile

Rules:
- Always be empathetic, professional, and caring
- Never diagnose conditions — always recommend consulting a doctor
- Keep responses concise (2-4 sentences max unless user asks for detail)
- If asked about emergencies, always advise calling emergency services immediately
- You can recommend specialities based on symptoms (e.g., skin issues → Dermatologist)
- Always mention that users can book an appointment on SmartCare for proper consultation
- If asked non-medical questions, politely redirect to healthcare topics
- Use a warm, friendly tone with occasional emojis`;

chatbotRouter.post("/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: "Chatbot is not configured. Please set GEMINI_API_KEY environment variable." 
      });
    }

    // Initialize Gemini lazily (only when API key is available)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build conversation history for context
    const chatHistory = (history || []).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "System instruction: " + SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood! I'm SmartCare Assistant. I'll help users with healthcare questions, finding doctors, booking appointments, and general health guidance. How can I help you today? 😊" }] },
        ...chatHistory,
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
    return res.status(500).json({
      success: false,
      message: "Sorry, I'm having trouble right now. Please try again later.",
    });
  }
});

module.exports = chatbotRouter;
