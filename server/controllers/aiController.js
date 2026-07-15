import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({
        success: false,
        message: "Messages are required.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are FixMyArea AI.

Your job is to help citizens use the FixMyArea platform.

You can answer questions about:
- Reporting civic issues
- Potholes
- Garbage
- Water leakage
- Street lights
- Dashboards
- Leaderboard
- Maps
- Login
- Signup
- Email verification
- Password reset

Rules:
- Be friendly.
- Keep answers short.
- If someone asks something unrelated, politely say you're the FixMyArea assistant.

Remember previous conversation.
          `,
        },

        
         ...messages,
      ],

      temperature: 0.5,
      max_tokens: 500,
    });

    res.json({
      success: true,
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};