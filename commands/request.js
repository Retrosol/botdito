String.prototype.toProperCase = function(opt_lowerCaseTheRest) {
  return (opt_lowerCaseTheRest ? this.toLowerCase() : this)
    .replace(/(^|[\s\xA0])[^\s\xA0]/g, function(s){ return s.toUpperCase(); });
};
exports.run = async (client, message, params) => {
 if (!message.member.roles.has('480397935067004928')) return message.channel.send('Set your FC first!')
  
  const validate = require('validator').default;
  var pokemon1
  var pokemon2
  var pokemon3
  var ball1
  var ball2
  var ball3
  var gen1
  var gen2
  var gen3
      let mon_array = ["kyurem-black","kyurem-white","ium z","dusk-wings","ultra-wings","necrozma-dawn-wings", "necrozma-dusk-mane", "shaymin-sky","venusaur-mega", "charizard-mega", "blastoise-mega", "beedrill-mega", "pidgeot-mega", "alakazam-mega", "slowbro-mega", "gengar-mega", "kangaskhan-mega", "pinsir-mega", "gyarados-mega", "aerodactyl-mega", "mewtwo-mega", "ampharos-mega", "steelix-mega", "scizor-mega", "heracross-mega", "houndoom-mega", "tyranitar-mega", "sceptile-mega", "blaziken-mega", "swampert-mega", "gardevoir-mega", "sableye-mega", "mawile-mega", "aggron-mega", "medicham-mega", "manectric-mega", "sharpedo-mega", "camerupt-mega", "altaria-mega", "banette-mega", "absol-mega", "glalie-mega", "salamence-mega", "metagross-mega", "latias-mega", "latios-mega", "rayquaza-mega", "lopunny-mega", "garchomp-mega", "lucario-mega", "abomasnow-mega", "gallade-mega", "audino-mega", "diancie-mega"]
      message.author.send("Hello! I see you want to request a Pokemon. Is this correct?")
    const validAnswers = ["yes", "y", "no", "n", "cancel"];
  const poke = message.channel.createMessageCollector(m=>m.author.id === message.author.id, {time:30000});
poke.on('collect', async m => {
  const lower = m.content.toLowerCase()
  if (lower === "yes" || lower === "y") {
    poke.stop("confirm")
    } else
  if (lower === "no" || lower === "n" || lower === "cancel" || !validAnswers.includes(lower)) {
    message.author.send("Okay!")
    poke.stop("abort")
    }
  })
  
  poke.on("end", (collected, reason) => {
    if (reason === "abort") return
    if (reason === "confirm") {
      message.author.send("Okay! Let me check if you can request Pokemon!").then(e => {
       const possible = client.requests.getProp(message.author.id, "total")
       if (possible === 0) return message.channel.send("You can't request any Pokemon! Come back later!")
        message.author.send("You can currently request " + possible + " Pokemon. Which way would you like to request?\n\nA) pokepast.es\nB) Showdown Import\nC) PK7\n\nJust say A, B, or C").then(r => {
        const import = r.channel.createMessageCollector(m => m.author.id === message.author.id. {time: 36000})
          
          import.on('collect', async v => {
            const lower = v.toLowerCase()
            if (lower === "A") {
              import.stop("pokepaste")
              } else if (lower === "B") {
                import.stop("showdown")
                } else {
                  import.stop("pk7")
                  }
            })
          
          import.on("end", (collect, b) => {
            if (b === "pokepaste") {
              message.author.send("Okay! Send the link!").then(t => (
                t.channel.awaitMessages(m => m.author.id, { max : 1}).then(i => {
                  const link = i.first().content
                  const { get } = require('snekfetch')
                  const { body: teamstuff } = get(link)
                  console.log(teamstuff)
                  message.author.send("What's your IGN? This is so the genners can find you in-game quickly and easily.").then(o => {
                    t.channel.awaitMessages(m => m.author.id, { max : 1}).then(p => {
                      const ign = p.first().content
                      client.channels.get("456937038659321856").send(`${ign} (${message.author}) has submitted a Pokepaste!\n${link}`)
                      })
                    })
                  })
                })
              }
           else if (b === "showdown") {
                message.author.send('Okay, send your team over so I can validate it!').then(r => {
                  r.channel.awaitMessages(m => m.author.id, { max : 1}).then(i => {
                    const team = i.first().content
                    if (mon_array.some(o => team.includes(o)) return message.author.send("Sorry, this team has some things you can't request. Try again.")
                      validate(team, "gen7anythinggoes").then(resp => {
                        if (['Your team was rejected for the following reasons:'].some(as => resp.includes(as))) return message.author.send(resp)
                        message.author.send("Team is valid! What's your IGN? This is so the genners find you easier in-game.").then(uwu => {
                          uwu.channel.awaitMessages(m => m.author.id, { max : 1}).then(w => {
                          const ign = w.first().content
                          client.channels.get("456937038659321856").send(`${ign} (${message.author}) has submitted the following team!\n\`\`\`${team}\`\`\``)
                            })
                          })
                        })
                    })
                  })
                }
              else if (b === "pk7") {
                
                }
                                                               })
          
          })
        })
      }
    })
}

exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "request",
  description: "Requests a Pokemon (or 3)",
  usage: "+request"
}
