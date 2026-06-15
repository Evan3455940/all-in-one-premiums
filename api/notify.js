import Busboy from "busboy";

// Vercel এর default body parser বন্ধ করা হলো যাতে file (multipart) পড়া যায়
export const config = { api: { bodyParser: false } };

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const bb = Busboy({ headers: req.headers });
    const fields = {};
    let fileBuffer = null, fileName = "", fileType = "";

    bb.on("field", (name, val) => { fields[name] = val; });
    bb.on("file", (name, stream, info) => {
      const chunks = [];
      fileName = info.filename || "profile";
      fileType = info.mimeType || "image/jpeg";
      stream.on("data", (d) => chunks.push(d));
      stream.on("end", () => { fileBuffer = Buffer.concat(chunks); });
    });
    bb.on("close", () => resolve({ fields, fileBuffer, fileName, fileType }));
    bb.on("error", reject);
    req.pipe(bb);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let fields = {}, fileBuffer = null, fileName = "", fileType = "";
  try {
    ({ fields, fileBuffer, fileName, fileType } = await parseForm(req));
  } catch (err) {
    return res.status(400).json({ error: "Invalid form data" });
  }

    const {
    orderId,
    plan,

    username,
    xProfileLink,
    telegramUsername,
    method,
    txRef,
    time,
    hasPicture
  } = fields;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const pictureNote = fileBuffer
    ? "Profile picture: attached (sent above)."
    : (hasPicture === "Yes" ? "Profile picture attached on website." : "Profile picture: none.");

    const message =
    "🚨 New Order\n\n" +
    "🆔 Order ID: " + orderId + "\n\n" +
    "📦 Plan: " + plan + "\n" +
    "👤 X Username: " + username + "\n" +
    "🔗 X Profile Link: " + xProfileLink + "\n" +
    "💬 Telegram Username: " + telegramUsername + "\n" +
    "💳 Payment Method: " + method + "\n" +
    "🧾 Transaction Reference: " + txRef + "\n" +
    "🕒 Time: " + time + "\n" +
    pictureNote;

    "X Username: " + username + "\n" +
    "X Profile Link: " + xProfileLink + "\n" +
    "Telegram Username: " + telegramUsername + "\n" +
    "Payment Method: " + method + "\n" +
    "Transaction Reference: " + txRef + "\n" +
    "Time: " + time + "\n" +
    pictureNote;

  try {
    if (fileBuffer) {
      // ছবি থাকলে আগে ছবি পাঠানো হবে, caption এ order details সহ
      const form = new FormData();
      form.append("chat_id", chatId);
      form.append("caption", message);
      form.append("photo", new Blob([fileBuffer], { type: fileType }), fileName);

      const photoRes = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: "POST",
        body: form
      });

      if (!photoRes.ok) {
        // ছবি পাঠাতে না পারলে অন্তত text message পাঠানো হবে
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: true })
        });
      }
    } else {
      const msgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: true })
      });
      if (!msgRes.ok) return res.status(502).json({ error: "Telegram failed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Notify error" });
  }

  return res.status(200).json({ success: true });
}
