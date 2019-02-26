const { RichEmbed } = require("discord.js")

exports.run = async (client, message, params) => {
    const statuses = {
        "ND": "Not Done",
        "DBNT": "Done but not traded",
        "TRADED": "Done and traded",
        "ILLEGAL": "Denied because request was illegal."
    }
    const embed = new RichEmbed()
        .setTitle("Your Requests")
        .setColor("RANDOM")

    const reqs = client.requests.findAll("requester", message.author.id)
    console.log(reqs)
    let index = 0
    let requests = reqs.map((m, k) => `**${k}** - ${statuses[m.status]}`).join("\n").match(/((.*\n){1,10}.*\n?)/g)
    embed.setDescription(reqs.map((m, k) => `**${k}** - ${statuses[m.status]}`).join("\n").match(/((.*\n){1,10}.*\n?)/g)[index])
    message.channel.send(embed).then(msg => { 
   msg.react('⬅️')
        msg.react('⏹')
        msg.react('➡️')
        
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id; 
      const stopFilter = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;
        
      const backwards = msg.createReactionCollector(backwardsFilter ); 
      const forwards = msg.createReactionCollector(forwardsFilter); 
      const stop = msg.createReactionCollector(stopFilter)
      
      backwards.on('collect', r => { 
        if (index === 0) return; 
        index--;
        embed.setDescription(reqs.map((m, k) => `**${k}** - ${statuses[m.status]}`).join("\n").match(/((.*\n){1,10}.*\n?)/g)[index]); 
        msg.edit(embed) 
            r.users.remove(message.author.id)
      }) 
     
      forwards.on('collect', r => { 
        if (index === requests.length) return; 
        index++; 
        embed.setDescription(reqs.map((m, k) => `**${k}** - ${statuses[m.status]}`).join("\n").match(/((.*\n){1,10}.*\n?)/g)[index]); 
        msg.edit(embed) 
                        r.users.remove(message.author.id)

      })
      stop.on('collect', r => {
        msg.delete()
      })
})
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
