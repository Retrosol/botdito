exports.run = async (client, message, params) => {
       var friend = params.slice(0).join(' '),
           Discord = require('discord.js')
        client.fcs.set(message.author.id, friend)

        const embed = new Discord.RichEmbed()
         .setAuthor('SnowBuddy', client.user.avatarURL)
      .setColor("RANDOM")
      .setThumbnail(message.author.avatarURL)
      .setDescription(friend)
      .setFooter("Added by " + message.author.username, message.author.avatarURL)
        .setTimestamp()
        client.channels.get("451676070689636355").send(embed).then(e => e.pin())
        message.channel.send('Successfully set your FC!')
    
    const role = message.guild.roles.find(r => r.id == "480397935067004928")
    console.log(role)
  if (!message.member.roles.has(role.id)) {
   message.member.addRole(role.id)
    message.channel.send('You are now able to request Pokemon!')
  } else return
}

exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "fcadd",
  description: "Sets your FC",
  usage: "+fcadd [fc]"
}