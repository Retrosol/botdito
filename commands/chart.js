exports.run = async (client, message, params) => {
const username = client.fmusers.get(message.author.id),
      { MessageAttachment } = require('discord.js'),
      times = {
        "1w": '7day',
        "1m": "1month",
        "3m": "3month",
        "6m": "6month",
        "1y": "12month",
        "overall": "overall"
      },
time = params[1] ? params[1] : (params[0] ? params[0] : "1w"),
      size = params[0] ? params[0] : "3x3",
      options = params[2] ? params[2] : (params[1] ? params[1] : (params[0] ? params[0] : '')),
      stuff = {
        '--artist': '&artistonly=true',
        '': ''
      },
      {get} = require('snekfetch'),
   { body: img } = await get(`http://www.tapmusic.net/collage.php?user=${username}&type=${times[time]}&size=${size}&caption=true${stuff[options]}&playcount=true`)

message.channel.startTyping()
setTimeout(() => {
message.channel.send("Here's your chart!", new MessageAttachment(img, "chart.png"))
message.channel.stopTyping()
}, 1000)
}

exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "chart",
  description: "Sends your chart for last fm scrobbles",
  usage: "!chart [options (sizes: 3x3, 4x4, 5x5, 2x6) (times: 1w, 1m, 3m, 6m, 1y, overall)]"
}
