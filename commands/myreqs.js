exports.run = async (client, message, params) => {
  const { RichEmbed } = require('discord.js'),
  statuses = {
  "ND": 'Not Done',
  'DBNT': 'Done but not traded',
  'TRADED': 'Done and traded',
  'ILLEGAL': 'Denied because request was illegal.'
  }
const embed = new RichEmbed()
.setTitle('Your Requests')
.setColor('RANDOM')

const reqs = client.requests.findAll('requester', message.author.id)
console.log(reqs)
embed.setDescription(reqs.map((m, k) => `**${k}** - ${statuses[m.status]}`).join('\n'))
message.channel.send(embed)
}

exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "myreqs",
  description: "Look at the status of your requests",
  usage: "!myreqs"
}
