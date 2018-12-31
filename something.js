exports.run = async (client, message, params) => {

  const user = message.mentions.users.first()
    const role = message.guild.roles.find(r => r.name === 'Staff')
  if (!message.guild.member(message.author).roles.has(role.id)) return
if (!user) return message.reply("you've gotta let me know who didnt stole an ingie first 😤")
 
                       
  const points = params[1] ? parseInt(params[1]) : 1
        client.db.connect(() => {
          client.db.query('UPDATE currency SET confirmed = confirmed - $2 WHERE id = $1', [user.id, points], (err, res) => {
  message.channel.send(`Looks like <@${user.id}> didnt get this :pensivebread:\n\n\`\`\`User's current confirmed hits: ${res.rows[0].confirmed}\`\`\``)
  function isEven(num) {
    return num % 2;
}
  if (isEven(res.rows[0].confirmed)) {
    const roles = {
      2: "Bronze II",
      4: "Bronze III",
      6: "Silver I",
      8: "Silver II",
      10: "Silver III",
      12: "Gold I",
      14: "Gold II",
      16: "Gold III"
    }
    
      if (message.guild.member(user).roles.has(message.guild.roles.find(role => role.name ===  'Gold').id) && message.guild.member(user).roles.has(message.guild.roles.find(role => role.name ===  'Gold I').id)) message.guild.member(user).roles.remove(message.guild.roles.find(role => role.name ===  'Gold').id)
        message.guild.member(user).roles.remove(message.guild.roles.find(role => role.name === roles[res.rows[0].confirmed + points]).id)
      message.channel.send(`<@${user.id}> has been demoted to ${roles[res.rows[0].confirmed - points]}!`)
      }
})
})
    }

exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "remove",
  description: "removes steals",
  usage: "!remove @user"
}
