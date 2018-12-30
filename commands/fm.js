exports.run = async (client, message, params) => {
const fm = require('lastfm-api-fixed'),
      fmapi = new fm({
        "api_key": process.env.LASTFMKEY,
        "secret": process.env.LASTFMSECRET
      }),
      { MessageEmbed } = require('discord.js'),
      userr = params[0] ? params[0] : client.fmusers.get(message.author.id),
      id = message.author.id

if (!userr) {
 message.channel.send("You need to set your lastfm username! To do so, do ``!fmset``!")
}
  if (userr) {
   fmapi.user.getRecentTracks({user:userr}, (err,user) => {
     if (user) {
   const embed = new MessageEmbed()

     .setAuthor(user['@attr'].user, message.author.avatarURL)
     .setDescription(`${user.track[0].name}` + ` [${user.track[0].album['#text']}]`)
     .setTitle(user.track[0].artist['#text'] ? user.track[0].artist['#text'] : "No Artist Found")
     .setThumbnail(user.track[0].image[3]['#text'] ? user.track[0].image[3]['#text'] : 'http://i2.wp.com/www.4motiondarlington.org/wp-content/uploads/2013/06/No-image-found.jpg')
     .setColor("RANDOM")
     .setFooter('Last Scrobble: ' + user.track[1].artist['#text'] + ' - ' + user.track[1].name + " | Total Scrobbles: " + user['@attr'].total, user.track[1].image[3]["#text"])
     
     message.channel.send(embed).then(async e => {
       await e.react('👍')
       await e.react('👎')
     })
   }})
  }
}
exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "fm",
  description: "Gets your lastest scrobble!",
  usage: "!fm (username)"
}
