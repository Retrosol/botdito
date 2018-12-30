exports.run = async (client, message, params) => {
  const username = params[0],
             fm = require('lastfm-api-fixed'),
      fmapi = new fm({
        "api_key": process.env.LASTFMKEY,
        "secret": process.env.LASTFMSECRET
      })

if (!username) return message.channel.send("Provide a username")
  fmapi.user.getRecentTracks({user:username}, (err,user) => {
     if (user) {
const { MessageEmbed } = require('discord.js')
   const embed = new MessageEmbed()

     .setAuthor(user['@attr'].user, message.author.avatarURL)
     .setDescription(`\`\`${user.track[0].name}\`\`` + " on " + `\`\`${user.track[0].album['#text']}\`\``)
     .setTitle('Artist', user.track[0].artist['#text'] ? user.track[0].artist['#text'] : "No Artist Found", true)
     .setThumbnail(user.track[0].image[3]['#text'] ? user.track[0].image[3]['#text'] : 'http://i2.wp.com/www.4motiondarlington.org/wp-content/uploads/2013/06/No-image-found.jpg')
     .setColor("RANDOM")
     .setFooter('User has ' + user['@attr'].total + ' total scrobbles')
     
     message.channel.send(embed)

client.fmusers.set(message.author.id, username)
   }
if (err) {
message.channel.send("I couldn't seem to find that username... Have you scrobbled anything?")
}
})
  }



exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "fmset",
  description: "Sets your last.fm username",
  usage: "!fmset [username]"
}

