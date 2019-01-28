const { RichEmbed } = require("discord.js")

exports.run = async (client, message, params) => {
    client.fcs.ensure(message.author.id, {
        "3ds": "",
        "switch": ""
    })

    if (!params[0]) return message.channel.send("You need to say which FC you want to view! [3ds|switch]")

    if (!params[1]) {
        try {
            const q = client.fcs.getProp(message.author.id, params[0])
            const embed = new RichEmbed()
                .setColor("RANDOM")
                .setDescription(`Your FC is ${q}`)
            message.channel.send(embed)
        } catch (err) {
            return message.channel.send("You need to set your FC!")
        }
    } else if (message.mentions.users.first()) {
        try {
            const q = client.fcs.getProp(message.mentions.users.first().id, params[0])
            const embed = new RichEmbed()
                .setColor("RANDOM")
                .setDescription(`This user's FC is ${q}`)
            message.channel.send(embed)
        } catch (err) {
            return message.channel.send("You need to set your FC!")
        }
    } else {
        let query = params.slice(1).join(" ").toLowerCase()
        let object = message.guild.members.filter(e => e.user.username.toLowerCase().includes(query) || e.displayName.toLowerCase().includes(query))
        if (object.size > 0) {
            let index = 0
            const embed = new RichEmbed()
                .setColor("RANDOM")
                .setDescription(object.map(e => `${++index} - ${e.user.username}`))
            message.channel.send(embed).then(q => {
                message.channel.send("Which one would you like to view?")
                const filter = m => m.author === message.author && !isNaN(parseInt(m.content))
                q.channel.awaitMessages(filter, {
                    max: 1
                }).then(f => {
                    const id = parseInt(f.first().content)
                    const map = object.map(e => e)
                    const fc = client.fcs.getProp(map[id - 1].id, params[0])

                    const embed = new RichEmbed()
                        .setColor("RANDOM")

                    if (!fc) {
                        embed.setDescription("This user needs to set their FC!")
                    } else {
                        embed.setDescription("This user's FC is " + fc)
                    }
                    message.channel.send(embed)
                })
            })
        } else return message.channel.send("User not found.")
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
    usage: "+fcview [switch or 3ds] (username)"
}