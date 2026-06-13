// Vercel Serverless Function — keeps the bot token off the client.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, plan, method, txRef, time } = req.body || {};
  if (!username || !plan || !method || !txRef) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const message =
    `🚨 New Order\n\nPlan: ${plan}\nX Username: ${username}\n` +
    `Payment Method: ${method}\nTransaction Reference: ${txRef}\nTime: ${time}`;

  const tgRes = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: message })
    }
  );

  if (!tgRes.ok) return res.status(502).json({ error: "Telegram failed" });
  return res.status(200).json({ ok: true });
}
