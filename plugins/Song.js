const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");
const axiosRetry = require('axios-retry');

// Retry configuration
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

// Extract YouTube Video ID from any type of link
const getYoutubeVideoId = (url) => {
  const ytRegex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/;
  const match = url.match(ytRegex);
  return match ? match[1] : null;
};

cmd({
  pattern: "song",
  react: '🎵',
  desc: "Download audio from YouTube (supports Sinhala too).",
  category: "music",
  use: ".song <name or YouTube link>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) return reply("❗Please provide a song name or YouTube link.");

    let videoUrl;
    let videoInfo;

    const isYoutubeLink = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(searchQuery);

    if (isYoutubeLink) {
      const ytID = getYoutubeVideoId(searchQuery);
      if (!ytID) return reply("❌ Invalid YouTube link.");

      const searchById = await yts({ videoId: ytID });
      if (!searchById || !searchById.title) return reply("❌ Could not find the video.");

      videoInfo = searchById;
      videoUrl = `https://www.youtube.com/watch?v=${ytID}`;
    } else {
      const searchResults = await yts(searchQuery);
      if (!searchResults.videos.length) return reply(`❌ No results found for "${searchQuery}".`);

      videoInfo = searchResults.videos[0];
      videoUrl = videoInfo.url;
    }

    // Send song details
    const songDetails = `
🎶 *Song Found!*

📌 *Title:* ${videoInfo.title}
⏱ *Duration:* ${videoInfo.timestamp}
👀 *Views:* ${videoInfo.views}
🎤 *Author:* ${videoInfo.author.name}
`;

    await conn.sendMessage(from, {
      image: { url: videoInfo.thumbnail },
      caption: songDetails.trim()
    }, { quoted: mek });

    reply("⏬ Downloading audio, please wait...");

    // Use Sinhala-compatible ytmp3 API
    const apiUrl = `https://aemt.me/download/ytmp3?url=${videoUrl}`;
    const response = await axios.get(apiUrl);

    if (!response.data?.url) {
      console.log("API Error:", response.data);
      return reply("❌ Failed to fetch download link. Try another song.");
    }

    const { url, title, filesize } = response.data;
    const caption = `🎵 *${title || 'Audio'}*\n💾 ${filesize || ''}`;

    // Send the audio
    await conn.sendMessage(from, {
      audio: { url },
      mimetype: 'audio/mp4',
      fileName: `${title || 'song'}.mp3`,
      ptt: false
    }, { quoted: mek });

  } catch (error) {
    console.error("Song command error:", error);
    reply("❌ An unexpected error occurred. Please try again.");
  }
});
