exports.run = async (client, message, params) => {
  const r = require('request'),
        pokemon = params.slice(0).join('_').toLowerCase(),
        embedColours = {
          Red: 16724530,
          Blue: 2456831,
          Yellow: 16773977,
          Green: 4128590,
          Black: 3289650,
          Brown: 10702874,
          Purple: 10894824,
          Gray: 9868950,
          White: 14803425,
          Pink: 16737701
        },
        pokemon_url = params.slice(0).join('-').toLowerCase()
  
  let poke_info
  
  r(`https://github.com/jalyna/oakdex-pokedex/blob/master/data/pokemon/${pokemon}.json`, (err, res, body) => {
    console.log(err, res, body)
  })
}

exports.conf = {
  aliases: [],
  permLevel: 0,
  nsfw: false
}

exports.help = {
  name: "dex",
  description: "A Pokèdex... in Discord!",
  usage: "+dex <pokemon>"
}
