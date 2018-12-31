exports.run = async (client, message, params) => {
         const Discord = require('discord.js')

       if (!params[0] || message.mentions.users.first()) {
       const q = client.fcs.get(message.author.id)
       if (!q) return message.channel.send('You need to set your FC!')
           const embed4 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("Your FC is " + q)
           message.channel.send(embed4)
     } else {
       let object = message.guild.members.filter(e => e.user.username.toLowerCase().includes(params.slice(0).join(' ').toLowerCase()) || e.displayName.toLowerCase().includes(params.slice(0).join(' ').toLowerCase()))
if (object.size > 0) {
       let index = 0
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(object.map(e => `${++index} - ${e.user.username}`))
message.channel.send(embed).then(q => {
  message.channel.send('Which one would you like to view?')
  const filter = m => m.author === message.author && !isNaN(parseInt(m.content))
  q.channel.awaitMessages(filter, {
  max: 1
  }).then(f => {
    const id = parseInt(f.first().content)
    const map = object.map(e => e)
    const fc = client.fcs.get(map[id-1].id)
    
    const embed5 = new Discord.RichEmbed()
    .setColor("RANDOM")

    
    if (!fc) {
     embed5.setDescription("This user needs to set their FC!") 
    } else {
      embed5.setDescription("This user's FC is " + fc)
    }
      message.channel.send(embed5)
  })
})
     } else return message.channel.send('User not found.')
     } 
}

exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "fcview",
  description: "Allows you to see an FC",
  usage: "+fcview (username)"
}