const { RichEmbed } = require("discord.js")

exports.run = async (client, message, params) => {
    client.fcs.ensure(message.author.id, {
        "3ds": "",
        "switch": ""
    })

    if (params[0].toLowerCase() === "3ds") {
        let friend = params.slice(0).join(" ")

        client.fcs.setProp(message.author.id, "3ds", friend)

        const embed = new RichEmbed()
            .setAuthor("SnowBuddy", client.user.avatarURL)
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL)
            .setDescription(friend)
            .setFooter("Added by " + message.author.username, message.author.avatarURL)
            .setTimestamp()
        message.channel.send(embed)
        client.channels.get("451676070689636355").send(embed)
        message.channel.send("Successfully set your FC!")

        const role = message.guild.roles.find(r => r.id == "480397935067004928")

        if (!message.member.roles.has(role.id)) {
            message.member.addRole(role.id)
            message.channel.send("You are now able to request Pokemon!")
        } else return
    } else if (params[0].toLowerCase() === "switch") {
        let friend = params.slice(0).join(" ")

        client.fcs.setProp(message.author.id, "switch", friend)

        const embed = new RichEmbed()
            .setAuthor("SnowBuddy", client.user.avatarURL)
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL)
            .setDescription(friend)
            .setFooter("Added by " + message.author.username, message.author.avatarURL)
            .setTimestamp()
        client.channels.get("451676070689636355").send(embed)
        message.channel.send("Successfully set your FC!")

    }
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