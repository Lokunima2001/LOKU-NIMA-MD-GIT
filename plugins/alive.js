/*
_  ______   _____ _____ _____ _   _

𝐍𝐈𝐌𝐀-𝐌𝐃-𝐕𝟏

*/

const { cmd } = require("../command");
const moment = require("moment");

let botStartTime = Date.now(); // Bot start time record
const ALIVE_VIDEO = "https://files.catbox.moe/obh10j.mp4"; // Replace with a valid video URL

cmd({
    pattern: "alive",
    desc: "Check if the bot is active.",
    category: "info",
    react: "💡",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        const pushname = m.pushName || "User";
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY");

        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        const formattedInfo = `
♻️ *NIMA MD V1 STATUS* ♻️
Hi 🫵🏽 ${pushname}
🕒 *Time*: ${currentTime}
📅 *Date*: ${currentDate}
⏳ *Uptime*: ${runtimeHours} hours, ${runtimeMinutes} minutes, ${runtimeSeconds} seconds

🤖 *Status*: *Nima is Alive and Ready!*

🎉 *Enjoy the Service!*
        `.trim();

        // Send the video message with caption
        await conn.sendMessage(from, {
            video: { url: ALIVE_VIDEO }, // Make sure this URL is a valid MP4/GIF
            caption: formattedInfo,
            gifPlayback: true, // Enable GIF-like autoplay
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363614256474114@newsletter',
                    newsletterName: '𝗡𝗜𝗠𝗔 𝗔𝗟𝗜𝗩𝗘',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
        
        // Send the audio file with context info
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/9p9v82.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363416256474114@newsletter',
                    newsletterName: '𝗡𝗜𝗠𝗔 𝗔𝗟𝗜𝗩𝗘',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in alive command: ", error);
        
        const errorMessage = `
❌ An error occurred while processing the alive command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});
