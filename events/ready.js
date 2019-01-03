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
   client.user.setPresence({game: {name: `for your FCs`, type: 3}})
 
  
  setInterval(() => {(
 
  client.users.forEach(e => {
    client.request.ensure(e.id, {
      possible: 3,
      used: null,
      time: null
    })
    
    if ((new Date().getTime() - client.request.getProp(e.id, 'used') === client.request.getProp(e.id, 'time') || new Date().getTime() - client.request.getProp(e.id, 'used') > client.request.getProp(e.id, 'time')) && !client.request.getProp(e.id, 'used') === null) {
     client.request.set(e.id, {
       possible: 3,
       used: null,
       time: null
       })
      e.send('You can request again!')
    }
  }, 1000)
}
