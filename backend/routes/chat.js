const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for MV Water Level Controller store.
          We sell:
          1. Semi Automatic Water Level Controller - ₹4500
          2. Fully Automatic Water Level Controller - ₹5500
          Answer customer questions about products and pricing. Keep answers short and friendly.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;