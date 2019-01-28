exports.run = async (client, message, params) => {
    client.fcs.delete(message.author.id)
    message.channel.send("Successfully deleted your FC!")
}

exports.conf = {
    aliases: [],
    permLevel: 0,
    nsfw: false
}

exports.help = {
    name: "fcdelete",
    description: "Deletes your fc",
    usage: "+fcdelete"
}