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
      message.author.send("Hello! I see you want to request a Pokemon. Is this correct?").then(a => {
          const filter = m => m.author === message.author
          a.channel.awaitMessages(filter, {max: 1}).then(b => {
            const resp = b.first().content
            if (resp.toLowerCase() === "yes") {
              message.author.send("Checking to see if you can request...")
              a.channel.startTyping()
              const time1 = new Date().getTime()
              const time2 = client.requests.getProp(message.author.id, 'time')
              const used = client.requests.getProp(message.author.id, "used"),
                    total = client.requests.getProp(message.author.id, "amount")
              setTimeout(() => {
              if (total !== 3) {
              a.channel.stopTyping()
                const amount = 3 - client.requests.getProp(message.author.id, "amount")
                a.channel.send("How many Pokemon do you want to request? You can currently request " + amount + " Pokemon.").then(c => {
                  c.channel.awaitMessages(filter, {max: 1}).then(d => {
                    const num = parseInt(d.first().content)
                    if (num > amount) return c.channel.send("That is too many Pokemon. Please try again!")
                    client.requests.math(message.author.id, "+", num, "amount")
                    if (amount === 0) {
                      client.requests.setProp(message.author.id, "used", new Date().getTime())
                      client.requests.setProp(message.author.id, "time", 3600000 * 8)
                    }
                    if (num > 0) {
                      c.channel.send("What is the species of the first Pokemon?\n\nExample: ``salamence`` or ``hoopa-unbound``").then(e => {
                        e.channel.awaitMessages(filter, {max: 1}).then(f => {
                          let poke1 = f.first().content
                          let p1ke = poke1.toProperCase()
                          console.log(p1ke)
                          let poke4 = poke1.toLowerCase()
                          if (mon_array.includes(poke4)) return message.author.send("That is a banned species, try again!")
                          e.channel.send("What do you want your 1st Pokemon to be called? If you don't want a nickname, just say 'N/A'").then(g => {
                                                   e.channel.awaitMessages(filter, {max: 1}).then(h => {
                                                     let nickname1 = h.first().content
                                                     g.channel.send('What item do you want your 1st Pokemon to hold? If you don\'t want an item, just say \'N/A\'').then(i => {
                                                       i.channel.awaitMessages(filter, {max:1}).then(j => {
                                                         let item1 = j.first().content.toProperCase()
                                                                                   if (mon_array.some(vag => item1.toLowerCase().includes(vag))) return message.author.send("That is a banned item, try again!")
                                                         i.channel.send("Do you want your pokemon to be shiny?").then(k => {
                                                         k.channel.awaitMessages(filter, {max:1}).then(l => {
                                                                let shiny1 = l.first().content.toProperCase()  
                                                                k.channel.send("What ability do you want your Pokemon to have? Be sure to make sure that it is a valid ability for this Pokemon.").then(m => {
                                                                  m.channel.awaitMessages(filter, {max:1}).then(n => {
                                                                    let ability1 = n.first().content.toProperCase()
                                                                    m.channel.send("What nature do you want your Pokemon to have?").then(o => {
                                                                      o.channel.awaitMessages(filter, {max:1}).then(p => {
                                                                        let nature1 = p.first().content.toProperCase()
                                                                        o.channel.send("What is the EV spread you want for your Pokemon? It has to be at MAX 508 points.\n\nExample: ```252 Atk / 4 SpA / 252 Spe```").then(q => {
                                                                          q.channel.awaitMessages(filter, {max:1}).then(r => {
                                                                            let EV1 = r.first().content
                                                                            q.channel.send("What moves do you want on your Pokemon?\n\nExample: ```- Dark Pulse\n- Explosion\n- Facade\n- Mind Blown```\nNote: Please seperate each move with a line break.").then(s => {
                                                                              s.channel.awaitMessages(filter, {max:1}).then(t => {
                                                                                let moves1 = t.first().content.toProperCase()
                                                                                
                                                                                 pokemon1 = `${nickname1.toLowerCase() !== "n/a" ? nickname1 + ` (${p1ke})` : p1ke} ${item1.toLowerCase() !== "n/a" ? ' @ ' + item1 : ''}\nAbility: ${ability1}${shiny1.toLowerCase() !== "no" ? '\nShiny: ' + shiny1 : ''}\nEVs: ${EV1}\n${nature1} Nature\n${moves1}`
                                                                                console.log(pokemon1)
                                                                                s.channel.send("Validating this Pokemon...")
                                                                                s.channel.startTyping()
                                                                                validate(pokemon1, 'gen7anythinggoes').then(u => {
                                                                                  
                                                                                  // if (['rejected'].some(e => u.includes(e))) return message.author.send(u)
                                                                                  message.author.send('Pokemon is valid!')
                                                                                  message.author.send('What generation is this Pokemon in? Valid generations are 6 and 7...').then(t => {
                                                                                    t.channel.awaitMessages(filter, {max:1}).then(v => {
                                                                                  gen1 = v.first().content
                                                                                  t.channel.send('What ball do you want your Pokemon in?').then(w => {
                                                                                    w.channel.awaitMessages(filter, {max: 1}).then(x => {
                                                                                    ball1 = x.first().content

                                                                                  if (num === 1) {
                                                                                                                                                                        w.channel.send("Whats your IGN?").then(y => {
                                                                                      y.channel.awaitMessages(filter, {max:1}).then(z => {
                                                                                        let IGN = z.first().content
                                                                                              
                                                                                   client.channels.get('456937038659321856').send(`${IGN} (${message.author}) has submitted the following team:\n\`\`\`${pokemon1}\n\nBall: ${ball1}\nGeneration: ${gen1}\`\`\``) 
                                                                                    })
                                                                                      })
                                                                                      } else {
                                                                                                              if (num > 1) {
                                              c.channel.send("What is the species of the second Pokemon?\n\nExample: ``salamence`` or ``hoopa-unbound``").then(e => {
                        e.channel.awaitMessages(filter, {max: 1}).then(f => {
                          let poke1 = f.first().content
                          let p1ke = poke1.toProperCase()
                          console.log(p1ke)
                          let poke4 = poke1.toLowerCase()
                          if (mon_array.includes(poke4)) return message.author.send("That is a banned species, try again!")
                          e.channel.send("What do you want your 2nd Pokemon to be called? If you don't want a nickname, just say 'N/A'").then(g => {
                                                   e.channel.awaitMessages(filter, {max: 1}).then(h => {
                                                     let nickname1 = h.first().content
                                                     g.channel.send('What item do you want your 2nd Pokemon to hold? If you don\'t want an item, just say \'N/A\'').then(i => {
                                                       i.channel.awaitMessages(filter, {max:1}).then(j => {
                                                         let item1 = j.first().content.toProperCase()
                                                                                   if (mon_array.some(vag => item1.toLowerCase().includes(vag))) return message.author.send("That is a banned item, try again!")
                                                         i.channel.send("Do you want your pokemon to be shiny?").then(k => {
                                                         k.channel.awaitMessages(filter, {max:1}).then(l => {
                                                                let shiny1 = l.first().content.toProperCase()  
                                                                k.channel.send("What ability do you want your Pokemon to have? Be sure to make sure that it is a valid ability for this Pokemon.").then(m => {
                                                                  m.channel.awaitMessages(filter, {max:1}).then(n => {
                                                                    let ability1 = n.first().content.toProperCase()
                                                                    m.channel.send("What nature do you want your Pokemon to have?").then(o => {
                                                                      o.channel.awaitMessages(filter, {max:1}).then(p => {
                                                                        let nature1 = p.first().content.toProperCase()
                                                                        o.channel.send("What is the EV spread you want for your Pokemon? It has to be at MAX 508 points.\n\nExample: ```252 Atk / 4 SpA / 252 Spe```").then(q => {
                                                                          q.channel.awaitMessages(filter, {max:1}).then(r => {
                                                                            let EV1 = r.first().content
                                                                            q.channel.send("What moves do you want on your Pokemon?\n\nExample: ```- Dark Pulse\n- Explosion\n- Facade\n- Mind Blown```\nNote: Please seperate each move with a line break.").then(s => {
                                                                              s.channel.awaitMessages(filter, {max:1}).then(t => {
                                                                                let moves1 = t.first().content.toProperCase()
                                                                                
                                                                                 pokemon2 = `${nickname1.toLowerCase() !== "n/a" ? nickname1 + ` (${p1ke})` : p1ke} ${item1.toLowerCase() !== "n/a" ? ' @ ' + item1 : ''}\nAbility: ${ability1}\n${shiny1.toLowerCase() !== "no" ? 'Shiny: ' + shiny1 : ''}\nEVs: ${EV1}\n${nature1} Nature\n${moves1}`
                                                                                
                                                                                s.channel.send("Validating this Pokemon...")
                                                                                s.channel.startTyping()
                                                                                validate(pokemon2, 'gen7anythinggoes').then(u => {
                                                                                 // if (['rejected'].some(e => u.includes(e))) return message.author.send(u)
                                                                                  message.author.send('Pokemon is valid!')
                                                                                  message.author.send('What generation is this Pokemon in? Valid generations are 6 and 7...').then(t => {
                                                                                    t.channel.awaitMessages(filter, {max:1}).then(v => {
                                                                                  gen2 = v.first().content
                                                                                  t.channel.send('What ball do you want your Pokemon in? Format it like this:').then(w => {
                                                                                    w.channel.awaitMessages(filter, {max: 1}).then(x => {
                                                                                     ball2 = x.first().content

                                                                                  if (num === 2) {
                                                                                                                                                                        w.channel.send("Whats your IGN?").then(y => {
                                                                                      y.channel.awaitMessages(filter, {max:1}).then(z => {
                                                                                        let IGN = z.first().content
                                                                                              
                                                                                   client.channels.get('456937038659321856').send(`${IGN} (${message.author}) has submitted the following team:\n\`\`\`${pokemon1}\n\nBall: ${ball1}\nGeneration: ${gen1}\n${pokemon2}\n\nBall: ${ball2}\nGeneration: ${gen2}\`\`\``) 
                                                                                    })
                                                                                      })
                                                                                      } else {
                                                                                                                if (num > 2) {
                                                                       c.channel.send("What is the species of the third Pokemon?\n\nExample: ``salamence`` or ``hoopa-unbound``").then(e => {
                        e.channel.awaitMessages(filter, {max: 1}).then(f => {
                          let poke1 = f.first().content
                          let p1ke = poke1.toProperCase()
                          console.log(p1ke)
                          let poke4 = poke1.toLowerCase()
                          if (mon_array.includes(poke4)) return message.author.send("That is a banned species, try again!")
                          e.channel.send("What do you want your 3rd Pokemon to be called? If you don't want a nickname, just say 'N/A'").then(g => {
                                                   e.channel.awaitMessages(filter, {max: 1}).then(h => {
                                                     let nickname1 = h.first().content
                                                     g.channel.send('What item do you want your 3rd Pokemon to hold? If you don\'t want an item, just say \'N/A\'').then(i => {
                                                       i.channel.awaitMessages(filter, {max:1}).then(j => {
                                                         let item1 = j.first().content.toProperCase()
                                                                                   if (mon_array.some(vag => item1.toLowerCase().includes(vag))) return message.author.send("That is a banned item, try again!")
                                                         i.channel.send("Do you want your pokemon to be shiny?").then(k => {
                                                         k.channel.awaitMessages(filter, {max:1}).then(l => {
                                                                let shiny1 = l.first().content.toProperCase()  
                                                                k.channel.send("What ability do you want your Pokemon to have? Be sure to make sure that it is a valid ability for this Pokemon.").then(m => {
                                                                  m.channel.awaitMessages(filter, {max:1}).then(n => {
                                                                    let ability1 = n.first().content.toProperCase()
                                                                    m.channel.send("What nature do you want your Pokemon to have?").then(o => {
                                                                      o.channel.awaitMessages(filter, {max:1}).then(p => {
                                                                        let nature1 = p.first().content.toProperCase()
                                                                        o.channel.send("What is the EV spread you want for your Pokemon? It has to be at MAX 508 points.\n\nExample: ```252 Atk / 4 SpA / 252 Spe```").then(q => {
                                                                          q.channel.awaitMessages(filter, {max:1}).then(r => {
                                                                            let EV1 = r.first().content
                                                                            q.channel.send("What moves do you want on your Pokemon?\n\nExample: ```- Dark Pulse\n- Explosion\n- Facade\n- Mind Blown```\nNote: Please seperate each move with a line break.").then(s => {
                                                                              s.channel.awaitMessages(filter, {max:1}).then(t => {
                                                                                let moves1 = t.first().content.toProperCase()
                                                                                
                                                                                 pokemon3 = `${nickname1.toLowerCase() !== "n/a" ? nickname1 + ` (${p1ke})` : p1ke} ${item1.toLowerCase() !== "n/a" ? ' @ ' + item1 : ''}\nAbility: ${ability1}\n${shiny1.toLowerCase() !== "no" ? 'Shiny: ' + shiny1 : ''}\nEVs: ${EV1}\n${nature1} Nature\n${moves1}`
                                                                                
                                                                                s.channel.send("Validating this Pokemon...")
                                                                                s.channel.startTyping()
                                                                                validate(pokemon2, 'gen7anythinggoes').then(u => {
                                                                                 // if (['rejected'].some(e => u.includes(e))) return message.author.send(u)
                                                                                  message.author.send('Pokemon is valid!')
                                                                                  message.author.send('What generation is this Pokemon in? Valid generations are 6 and 7...').then(t => {
                                                                                    t.channel.awaitMessages(filter, {max:1}).then(v => {
                                                                                  gen3 = v.first().content
                                                                                  t.channel.send('What ball do you want your Pokemon in? Format it like this:').then(w => {
                                                                                    w.channel.awaitMessages(filter, {max: 1}).then(x => {
                                                                                     ball3 = x.first().content

                                                                                  if (num === 3) {
                                                                                                                                                                        w.channel.send("Whats your IGN?").then(y => {
                                                                                      y.channel.awaitMessages(filter, {max:1}).then(z => {
                                                                                        let IGN = z.first().content
                                                                                              
                                                                                   client.channels.get('456937038659321856').send(`${IGN} (${message.author}) has submitted the following team:\n\`\`\`${pokemon1}\n\nBall: ${ball1}\nGeneration: ${gen1}\n${pokemon2}\n\nBall: ${ball2}\nGeneration: ${gen2}\n\n${pokemon3}\n\nBall: ${ball3}\nGeneration: ${gen3}\`\`\``) 
                                                                                    })
                                                                                      })
                                                                                      }
                                                                                
                                                                                    })
                                                                                    })
                                                                                    })
                                                                                    })
                                                                                })
                                                                              })
                                                                            })
                                                                          })
                                                                        })
                                                                      })
                                                                    })
                                                                })
                                                            })
                                                         })
                                                       })
                                                     })
                                                   })
                          })
                        })
                      })
                      })
                        } 
                                                                                      }
                                                                                
                                                                                    })
                                                                                    })
                                                                                    })
                                                                                    })
                                                                                })
                                                                              })
                                                                            })
                                                                          })
                                                                        })
                                                                      })
                                                                    })
                                                                })
                                                            })
                                                         })
                                                       })
                                                     })
                                                   })
                          })
                        })
                      })
                      })
                      }
 
                                                                                      }
                                                                                
                                                                                    })
                                                                                    })
                                                                                    })
                                                                                    })
                                                                                })
                                                                              })
                                                                            })
                                                                          })
                                                                        })
                                                                      })
                                                                    })
                                                                })
                                                            })
                                                         })
                                                       })
                                                     })
                                                   })
                          })
                        })
                      })
                      })
                    }                       
                      
                    })
                }) 
              } else {
              a.channel.stopTyping()
                return message.author.send('You cannot request yet! Wait a while and try again!')
              }
              }, 1000)
            } else return message.author.send("Oh okay!")
          })

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