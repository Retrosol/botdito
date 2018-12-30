 exports.run = async (client, message, params) => {
  const Discord = require('discord.js'),
        cmd = params[0]
  
 if (!cmd) {
   const embed = new Discord.MessageEmbed()
   .setTitle('Here is a list of commands!')
   .setColor("RANDOM")
   .setTimestamp()
   .setDescription('``' + client.commands.map(m => m.help.name).join(', ').replace(', dm', '') + '``')
   .setFooter('For more info on a command, do !help (command name)')
   message.channel.send(embed)
 } else {
  if (client.commands.has(cmd)) {
    const props = require(`../commands/${cmd}.js`)
   const embed = new Discord.MessageEmbed()
   .setTitle(props.help.name)
   .setColor("RANDOM")
   .setTimestamp()
   .addField('Description', props.help.description)
   .addField('Usage', props.help.usage)
   .addField('Aliases', props.conf.aliases.length > 0 ? props.conf.aliases : "None")
   .setFooter('[] = Required | () = Optional')
   message.channel.send(embed)
  } else return message.channel.send('``Could not find command ' + cmd + '``')
 }
}

exports.conf = {
  aliases: ['cmd'],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "help",
  description: "Shows info about a command",
  usage: "!help (command name)"
}
