module.exports = (client, message) => {
    if (message.author.bot) return;

  if (message.channel.type == "dm" && !message.author.id === "406643416789942298" && !message.author.id === "447548069030920202") {
client.users.get('447548069030920202').send(message.content + ' (from: ' + message.author.username + ')')
    client.users.get('406643416789942298').send(message.content + '(from: ' + message.author.username + ')')
  }
if (message.channel.type == "dm") return

  if (message.content.indexOf(client.config.prefix) !== 0) return;
  let params = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  let command = params.shift().toLowerCase();
  let cmd
  if (client.commands.get(command.toLowerCase())) {
    cmd = client.commands.get(command.toLowerCase());
  } else {
    const alias = client.aliases.get(command)
    if (!alias) return
  cmd = client.commands.get(client.aliases.get(command.toLowerCase()))
  }

  

  let propo
  
  if (client.commands.get(command.toLowerCase())) {
   propo = command 
  } else {
   const alias = client.aliases.get(command)
   if (!alias) return
   propo = client.commands.get(client.aliases.get(command.toLowerCase())).help.name
  }
  return cmd.run(client, message, params)

  
}