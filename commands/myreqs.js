exports.run = async (client, message, params) => {
  const { MessageEmbed } = require('discord.js'),
  statuses = {
  "ND": 'Not Done',
  'DBNT': 'Done but not traded',
  'TRADED': 'Done and traded',
  'ILLEGAL': 'Denied because request was illegal.'
  }
const embed = new MessageEmbed()
.setTitle('Your Requests')
.setColor('RANDOM')

const reqs = client.requests.filter((e, k) => e.requester === message.author.id && !e.status === 'DONE' && !e.status === 'ILLEGAL')
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
