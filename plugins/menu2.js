const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "menu",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `*┋* ${commands[i].pattern}\n`;
 }
}

let madeMenu = `*├♻️* *.ᴍᴇɴᴜ2*
*├♻️* *.ᴍᴏᴅᴇ*
*├♻️* *.ᴀᴜᴛᴏᴛʏᴘɪɴɢ*
*├♻️* *.ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ*
*├♻️* *.ᴀᴜᴛᴏʀᴇᴄᴏʀᴅɪɴɢ*
*├♻️* *.ᴀᴜᴛᴏʀᴇᴀᴅsᴛᴀᴛᴜs*
*├♻️* *.ᴀɴᴛɪʙᴀᴅ*
*├♻️* *.ᴀᴜᴛᴏsᴛɪᴄᴋᴇʀ*
*├♻️* *.ᴀᴜᴛᴏʀᴇᴘʟʏ*
*├♻️* *.ᴀᴜᴛᴏʀᴇᴀᴄᴛ*
*├♻️* *.ᴀɴᴛɪʟɪɴᴋ*
*┕──────────────❒*
*╭────❒⁠⁠⁠⁠* *🎡 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥-𝗡𝗜𝗠𝗔𝗛 🎡* *❒⁠⁠⁠⁠* 
*├♻️* *.sᴛɪᴄᴋᴇʀ*
*├♻️* *.ᴛᴀᴋᴇ*
*├♻️* *.ᴛʀᴛ*
*├♻️* *.ᴛᴛs*
*├♻️* *.ꜰᴀɴᴄʏ*
*├♻️* *.ᴜʀʟ*
*├♻️* *.sᴇɴᴅɪᴍᴀɢᴇ*
*├♻️* *.Aɢᴇ*
*├♻️* *.Cᴏɴᴠᴇʀᴛ*
*├♻️* *.ᴛɪɴʏ*
*├♻️* *.ᴛɢs*
*┕─────────────❒*
*╭────❒⁠⁠⁠⁠* *⛱️ 𝗥𝗔𝗡𝗗𝗢𝗢𝗠-𝗡𝗜𝗠𝗔𝗛 ⛱️* *❒⁠⁠⁠⁠* 
*├♻️* *.ᴋᴇʀᴍ*
*├♻️* *.ᴅᴏɢ*
*├♻️* *.ᴄᴀᴛ*
*├♻️* *.ᴅɪᴀʀʏ*
*├♻️* *.ᴀɴɪᴍᴇ*
*├♻️* *.ᴄᴏᴜᴘʟᴇᴘᴘ*
*├♻️* *.ꜰɪɴᴅɴᴀᴍᴇ*
*├♻️* *.ʟᴏʟɪ*
*├♻️* *.ᴡᴀɪꜰᴜ*
*├♻️* *.ᴄᴏsᴘʟᴀʏ*
*├♻️* *.ɴᴇᴋᴏ*
*├♻️* *.ʀᴀɴᴅᴏᴍᴀɴɪᴍᴇ*
*├♻️* *.Sᴇɴᴅɪᴍᴀɢᴇ*
*├♻️* *.ᴀɴɪᴍᴇɢɪʀʟ*
*├♻️* *.ᴀɴɪᴍᴇɢɪʀʟ1*
*├♻️* *.ᴀɴɪᴍᴇɢɪʀʟ2*
*├♻️* *.ᴀɴɪᴍᴇɢɪʀʟ3*
*├♻️* *.ᴀɴɪᴍᴇɢɪʀʟ4*
*├♻️* *.ᴀɴɪᴍᴇɢɪʀʟ5*
*├♻️* *.ᴘɪᴄᴋᴜᴘʟɪɴᴇ*
*┕──────────────❒*
*╭────❒⁠⁠⁠⁠* *🏜️ 𝗪𝗔𝗟𝗟𝗣𝗔𝗣𝗘𝗥𝗦-𝗡𝗜𝗠𝗔𝗛 🏜️* *❒⁠⁠⁠⁠* 
*├♻️* *.ɪᴍɢ*
*├♻️* *.ʟᴏɢᴏ*
*├♻️* *.ss*
*┕──────────────❒*
*╭────❒⁠⁠⁠⁠* *🌐 𝗢𝗧𝗛𝗘𝗥-𝗡𝗜𝗠𝗔𝗛🌐* *❒⁠⁠⁠⁠* 
*├♻️* *.ᴛʀᴛ*
*├♻️* *.ᴊᴏᴋᴇ*
*├♻️* *.ꜰᴀᴄᴛ*
*├♻️* *.ɢɪᴛʜᴜʙ*
*├♻️* *.ɢᴘᴀꜱꜱ*
*├♻️* *.ʜᴀᴄᴋ*
*├♻️* *.ǫᴜᴏᴛᴇ*
*├♻️* *.ǫʀ*
*├♻️* *.vv*
*├♻️* *.sᴘᴀᴍ*
*├♻️* *.ᴠᴄᴀʀᴅ*
*├♻️* *.ꜱʀᴇᴘᴏ*
*├♻️* *.sʏsᴛᴇᴍ*
*├♻️* *.ʀᴀɴᴋ*
*├♻️* *.Tɪᴍᴇᴢᴏɴᴇ*
*├♻️* *.ᴅᴇꜰɪɴᴇ*
*├♻️* *.Dᴀɪʟʏꜰᴀᴄᴛ*
*├♻️* *.Mɪɴᴜᴛᴏʀ*
*┕─────────────❒*
`

await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
