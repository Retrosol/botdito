module.exports = (client, message) => {
    if (message.author.bot) return;
if (message.channel.type == "dm") return
    let cmd

   
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  let params = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  let command = params.shift().toLowerCase();
  if (client.commands.get(command.toLowerCase())) {
    cmd = client.commands.get(command.toLowerCase());
  } else {
    const alias = client.aliases.get(command)
    if (!alias) return
  cmd = client.commands.get(client.aliases.get(command.toLowerCase()))
  }
return cmd.run(client, message, params)

  
}
