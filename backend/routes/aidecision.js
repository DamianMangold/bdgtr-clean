const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/get-verdict", async (req, res) => {
  const { user, purchase } = req.body;

  const prompt = `
You are an AI helping users evaluate if they should make a purchase. Here's their info:

User Profile:
- Yearly Income: $${user.income || 'N/A'}
- Net Worth: $${user.netWorth || 'N/A'}
- Total Debt: $${user.totalDebt || 'N/A'}
- Monthly Debt Payments: $${user.monthlyPayments || 'N/A'}
- Current Cash: $${user.currentCash || 'N/A'}

Purchase Details:
- Item: ${purchase.what || 'N/A'}
- Cost: $${purchase.cost || 'N/A'}
- Necessity: ${purchase.necessity || 'N/A'}
- Recurring: ${purchase.recurring || 'N/A'}
- Frequency: ${purchase.recurringFrequency || 'N/A'}
- Recurring Cost: $${purchase.recurringCost || 'N/A'}
- Other Info: ${purchase.otherInfo || 'N/A'}

Respond with:
"Yes" or "No" followed by a brief personalized explanation in 2–3 sentences.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ verdict: aiResponse });
  } catch (err) {
    console.error("AI error:", err.message);
    res.status(500).json({ error: "Failed to get AI decision." });
  }
});

module.exports = router;
