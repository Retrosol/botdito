const validate = require("pokemon-showdown-validator").default
const { get } = require("snekfetch")

function pokes(t, str) {
    var count = 0
    for (let i = 0; i < t.length; i++) {
        if (t[i] == str) {
            count++
        }
    }
    return count + 1
}

function recalcPossible(client, id) {
    const possible = client.request.getProp(id, "possible")
    const lastUsed = client.request.getProp(id, "used")
    if(possible === 0 && Date.now() > (lastUsed + 28800000))
        client.request.setProp(id, "possible", 3)
}


exports.run = async (client, message, params) => {
    client.request.ensure(message.author.id, {
        possible: 3,
        used: null,
        time: null
    })

    recalcPossible(client, message.author.id)

    if (!message.member.roles.has("480397935067004928")) return message.channel.send("Set your FC first!")

    let mon_array = ["kyurem-black", "kyurem-white", "ium z", "dusk-wings", "ultra-wings", "necrozma-dawn-wings", "necrozma-dusk-mane", "shaymin-sky", "venusaur-mega", "charizard-mega", "blastoise-mega", "beedrill-mega", "pidgeot-mega", "alakazam-mega", "slowbro-mega", "gengar-mega", "kangaskhan-mega", "pinsir-mega", "gyarados-mega", "aerodactyl-mega", "mewtwo-mega", "ampharos-mega", "steelix-mega", "scizor-mega", "heracross-mega", "houndoom-mega", "tyranitar-mega", "sceptile-mega", "blaziken-mega", "swampert-mega", "gardevoir-mega", "sableye-mega", "mawile-mega", "aggron-mega", "medicham-mega", "manectric-mega", "sharpedo-mega", "camerupt-mega", "altaria-mega", "banette-mega", "absol-mega", "glalie-mega", "salamence-mega", "metagross-mega", "latias-mega", "latios-mega", "rayquaza-mega", "lopunny-mega", "garchomp-mega", "lucario-mega", "abomasnow-mega", "gallade-mega", "audino-mega", "diancie-mega"]
    let e = await message.author.send("Hello! I see you want to request a Pokemon. Is this correct?")
    const validAnswers = ["yes", "y", "no", "n", "cancel"]
    const poke = e.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 30000 })

    poke.on("collect", async m => {
        const lower = m.content.toLowerCase()
        if (lower === "yes" || lower === "y") {
            poke.stop("confirm")
        } else
        if (lower === "no" || lower === "n" || lower === "cancel" || !validAnswers.includes(lower)) {
            message.author.send("Okay!")
            poke.stop("abort")
        }
    })

    poke.on("end", async (collected, reason) => {
        if (reason === "abort") return
        if (reason === "confirm") {
            await message.author.send("Okay! Let me check if you can request Pokemon!")
            const possible = client.request.getProp(message.author.id, "possible")
            if (possible === 0) return message.channel.send("You can't request any Pokemon! Come back later!")
            let r = await message.author.send("You can currently request " + possible + " Pokemon. Which way would you like to request?\n\nA) pokepast.es\nB) Showdown Import\nC) PK7\n\nJust say A, B, or C")
            const importa = r.channel.createMessageCollector(m => m.author.id === message.author.id, {
                time: 36000
            })

            importa.on("collect", async v => {
                const lower = v.content.toLowerCase()
                if (lower === "a") {
                    importa.stop("pokepaste")
                } else if (lower === "b") {
                    importa.stop("showdown")
                } else {
                    importa.stop("pk7")
                }
            })

            importa.on("end", async (collect, b) => {
                if (b === "pokepaste") {
                    let t = await message.author.send("Okay! Send the link!")
                    let i = await t.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1
                    })

                    const link = i.first().content + "/json"

                    let r = await get(link)
                    const team = JSON.parse(r.body.toString()).paste

                    const total = pokes(team, "\r\n\r\n") < 3 ? pokes(team, "\r\n\r\n") : 3
                    client.request.math(message.author.id, "-", total, "possible")
                    client.request.setProp(message.author.id, "used", new Date().getTime())
                    client.request.setProp(message.author.id, "time", 28800000)
                    await message.author.send("What's your IGN? This is so the genners can find you in-game quickly and easily.")
                    let p = t.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1
                    })
                    const ign = p.first().content
                    let w = await client.channels.get("456937038659321856").send(`${ign} (${message.author}) has submitted the following team!\n\`\`\`${team}\`\`\``)
                    client.requests.set(w.id, {
                        status: "ND",
                        requester: message.author.id
                    })
                } else if (b === "showdown") {
                    let r = await message.author.send("Okay, send your team over so I can validate it!")
                    let i = await r.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1
                    })
                    const team = i.first().content
                    if (mon_array.some(o => team.includes(o))) return message.author.send("Sorry, this team has some things you can't request. Try again.")
                    let resp = await validate(team, "gen7anythinggoes")
                    if (["Your team was rejected for the following reasons:"].some(as => resp.includes(as))) return message.author.send(resp)
                    let uwu = await message.author.send("Team is valid! What's your IGN? This is so the genners find you easier in-game.")
                    const total = pokes(team, "\n\n") < 3 ? pokes(team, "\n\n") : 3
                    client.request.math(message.author.id, "-", total, "possible")
                    client.request.setProp(message.author.id, "used", new Date().getTime())
                    client.request.setProp(message.author.id, "time", 28800000)
                    let w = await uwu.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 })
                    const ign = w.first().content
                    let m = await client.channels.get("456937038659321856").send(`${ign} (${message.author}) has submitted the following team!\n\`\`\`${team}\`\`\``)
                    client.requests.set(m.id, {
                        status: "ND",
                        requester: message.author.id
                    })
                } else if (b === "pk7") {
                    let r = await message.author.send("Okay, please send the pk7s.")
                    let p = await r.channel.awaitMessages(m => m.author.id === message.author.id && m.attachments.some(e => e.url.includes("pk7")) > 0 && m.attachments.size > 0 && m.attachments.size < 4, { max: 1 })
                    let o = await message.author.send("Okay! Whats your IGN? This is so genners can find you in-game quicker and easier.")
                    let t = await o.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 })
                    const ign = t.first().content
                    client.request.math(message.author.id, "-", p.attachments.size, "possible")
                    client.request.setProp(message.author.id, "used", new Date().getTime())
                    client.request.setProp(message.author.id, "time", 28800000)

                    let w = await client.channels.get("456937038659321856").send(ign + `(${message.author})` + " has submitted pk7s!\n" + p.first().attachments.map(m => m.url).join(", "))
                    client.requests.set(w.id, {
                        status: "ND",
                        requester: message.author.id
                    })
                }
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