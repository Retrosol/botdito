module.exports = client => {
  const moment = require('moment')
        console.log(`----------------------------------------         `)
        console.log(`            ${client.user.username} -            `)
        console.log(`            STATUS               `)
        console.log(`                  ONLINE                         `)
        console.log(`----------------------------------------         `)
        console.log(`       Watching over ${client.guilds.size} server(s)`)
        console.log(`       With over ${client.users.size.toLocaleString()} user(s)`)
        console.log(`----------------------------------------`)
    let singular = client.users.size === 1
   client.user.setPresence({game: {name: `things`, type: 1}})
}
