const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

const axiosRetry = require('axios-retry'); // If you want to add retry mechanism
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

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
    
    // Searching for the video on YouTube using yt-search
    const searchResults = await yts(searchQuery);
    if (!searchResults.videos.length) return reply(`❌ No results found for "${searchQuery}".`);

    const firstResult = searchResults.videos[0];
    const videoUrl = firstResult.url;
    const thumbnailUrl = firstResult.thumbnail;

    // Song details formatting
    const songDetails = `
🎵 *Song Found!*

📌 *Title:* ${firstResult.title}
⏳ *Duration:* ${firstResult.timestamp}
👁 *Views:* ${firstResult.views}
🎤 *Author:* ${firstResult.author.name}
`;

    // Send song details and thumbnail image
    await conn.sendMessage(from, {
      image: { url: thumbnailUrl },
      caption: songDetails.trim()
    }, { quoted: mek });

    // API URL to fetch the audio download link
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`;

    // Make API call to get download link
    let response;
    try {
      response = await axios.get(apiUrl);
      if (response.status !== 200) {
        throw new Error(`Failed to fetch song. Status code: ${response.status}`);
      }
    } catch (apiErr) {
      console.error("API Error:", apiErr.message || apiErr);
      return reply("❌ Failed to fetch song from the server. The server might be down or unreachable. Please try again later.");
    }

    // Check if the API response contains a valid download_url
    if (!response.data.success || !response.data.result?.download_url) {
      return reply("❌ Failed to download the song. The server returned an invalid response.");
    }

    const { download_url } = response.data.result;

    // Send the audio file to the user
    await conn.sendMessage(from, {
      audio: { url: download_url },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: mek });

  } catch (error) {
    // Handle unexpected errors
    console.error("Song Plugin Error:", error?.message || error);
    reply(`❌ An error occurred: ${error?.message || 'Something went wrong. Please try again later.'}`);
  }
});
