const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

cmd({
  pattern: "song",
  react: '🎵',
  desc: "Download audio from YouTube with details and thumbnail.",
  category: "music",
  use: ".song <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) return reply("❗Please provide a song name or YouTube link.");
    
    // Debug: print the search query
    console.log("Search Query:", searchQuery);

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos.length) return reply(`❌ No results found for "${searchQuery}".`);

    const firstResult = searchResults.videos[0];
    const videoUrl = firstResult.url;
    const thumbnailUrl = firstResult.thumbnail;

    // Debug: print the first result URL
    console.log("First Result URL:", videoUrl);

    const songDetails = `
🎵 *Song Found!*

📌 *Title:* ${firstResult.title}
⏳ *Duration:* ${firstResult.timestamp}
👁 *Views:* ${firstResult.views}
🎤 *Author:* ${firstResult.author.name}
`;

    // Send song details and thumbnail
    await conn.sendMessage(from, {
      image: { url: thumbnailUrl },
      caption: songDetails.trim()
    }, { quoted: mek });

    // API URL to download the audio
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`;

    // Debug: print the API URL
    console.log("API URL:", apiUrl);

    // Make API call to get download link
    let response;
    try {
      response = await axios.get(apiUrl);
    } catch (apiErr) {
      console.error("API Error:", apiErr);
      return reply("❌ Failed to fetch song from the server. Please try again later.");
    }

    // Debug: print the response data
    console.log("API Response:", response.data);

    if (!response.data.success || !response.data.result?.download_url) {
      return reply("❌ Failed to download the song. The server returned an invalid response.");
    }

    const { download_url } = response.data.result;

    // Send the audio
    await conn.sendMessage(from, {
      audio: { url: download_url },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: mek });

  } catch (error) {
    // Debug: print any unexpected errors
    console.error("Song Plugin Error:", error?.message || error);
    reply(`❌ An error occurred: ${error?.message || 'Something went wrong. Please try again later.'}`);
  }
});
