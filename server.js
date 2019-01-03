require("dotenv").config()
const moment = require('moment')
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

const Discord = require('discord.js'),
      client = new Discord.Client(),
      fs = require('fs'),
      config = require('./config.json'),
     Enmap = require("enmap")

client.config = config
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.fcs = new Enmap({name: 'fcs'})
client.requests = new Enmap({name: 'requests'})
client.request = new Enmap({name: 'request'})

fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    if (f.endsWith('.js')) {
    const props = require(`./commands/${f}`);
    log(`Loading ${props.help.name}...`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  }
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });

      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.login(process.env.TOKEN)
