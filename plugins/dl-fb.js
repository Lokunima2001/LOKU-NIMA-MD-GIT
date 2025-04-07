const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    // Check if URL is valid
    if (!q || !q.startsWith("https://")) {
      return reply("*`Please provide a valid Facebook URL!`*");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Use the API to get Facebook video
    const apiUrl = `https://lance-frank-asta.onrender.com/api/downloader?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    // Check if data contains the necessary video information
    if (!data?.content?.status || !data?.content?.data?.result?.length) {
      throw new Error("Invalid API response or no video found.");
    }

    // Find the best video quality
    let videoData = data.content.data.result.find(v => v.quality === "HD") ||
                    data.content.data.result.find(v => v.quality === "SD");

    if (!videoData) {
      throw new Error("No valid video URL found.");
    }

    // Format the video info and send it back to user
    const formattedInfo = `📥 *Downloaded in ${videoData.quality} Quality*\n\n> 🔗 *Powered by NIMA-MD*`;

    // Send the video back to the user on WhatsApp
    await conn.sendMessage(from, {
      video: { url: videoData.url },
      caption: formattedInfo,
      contextInfo: { 
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
      }
    }, { quoted: m });

  } catch (error) {
    console.error("FB Download Error:", error);

    // Send error details to the bot owner
    const ownerNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerNumber, {
      text: `⚠️ *FB Downloader Error!*\n\n📍 *Group/User:* ${from}\n💬 *Query:* ${q}\n❌ *Error:* ${error.message || error}`
    });

    // Notify the user
    reply("❌ *Error:* Unable to process the request. Please try again later.");
  }
});
