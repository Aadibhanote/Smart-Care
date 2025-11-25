const express = require("express");
const router = express.Router();

const Contact = require("../../models/contact");

// Save contact message
router.post("/", async (req, res) => {
  try {
    const { name, phone, issueType, message } = req.body;

    if (!name || !phone || !issueType || !message) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    await Contact.create({ name, phone, issueType, message });

    return res.json({
      success: true,
      message: "Your message has been submitted successfully!",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
