exports.run = async (client, message, params) => {
  const suggestion = params.slice(0).join(" "),
             { MessageEmbed } = require("discord.js"),
             embed = new MessageEmbed()
 .setAuthor(message.author.username, message.author.avatarURL)
.setDescription(suggestion)
.setColor('RANDOM')

message.guild.channels.get('529056011554652190').send(embed).then(async (e) => {
await e.react('👍')
await e.react('👎')
})

}

exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "suggest",
  description: "Have an idea? Suggest it here!",
  usage: "!suggest [suggestion]"
}

