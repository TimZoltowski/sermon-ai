require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require("openai");  // ✅ Correct way to import OpenAI

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ OpenAI API setup (Fixed version)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Route: Generate Sermon with AI
app.post("/generate-sermon", async (req, res) => {
  const { topic, scripture, tone } = req.body;
  if (!topic) return res.status(400).json({ error: "Topic is required" });

  try {
    const prompt = `Write a ${tone} sermon on '${topic}', including references to ${scripture}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
    });

    res.json({ sermon: response.choices[0].message.content });

  } catch (error) {
    console.error("❌ Error generating sermon:", error);
    res.status(500).json({ error: "Failed to generate sermon" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));