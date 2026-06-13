export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    username,
    telegramUsername,
    plan,
    method,
    txRef,
    time
  } = req.body || {};

  const message = `
🚨 New Order

Plan: ${plan}
X Username: ${username}
Telegram Username: ${telegramUsername}
Payment Method: ${method}
Transaction Reference: ${txRef}
Time: ${time}
`;

  const response = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    }
  );

  if (!response.ok) {
    return res.status(500).json({ error: "Telegram failed" });
  }

  res.status(200).json({ success: true });
}