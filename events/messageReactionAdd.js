module.exports = (client, reaction, user) => {
if (reaction.message.channel.id !== '456937038659321856') return
const auser = client.users.get(client.requests.getProp(reaction.message.id, 'requester'))
if (reaction.emoji.name === '✨') {
client.requests.setProp(reaction.message.id, "status", "DBNT")
return console.log(client.requests.getProp(reaction.message.id, 'status'))
}
if (reaction.emoji.name === '❌') {
client.requests.setProp(reaction.message.id, "status", "ILLEGAL")
return console.log(client.requests.getProp(reaction.message.id, 'status'))
}
if (reaction.emoji.name = 'aacheck') {
client.requests.setProp(reaction.message.id, "status", "TRADED")
  return console.log(client.requests.getProp(reaction.message.id, 'status'))
}
}
