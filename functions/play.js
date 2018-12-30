const func = (client, guild, music) => {
  const ytdl = require("ytdl-core")
        let queue = client.queue.get(guild.id);
        if (!music) {
            queue.voiceChannel.leave();
            client.queue.delete(guild.id);
            return queue.textChannel.send(`🎵 Music playback has ended`);
        }

        let dispatcher = queue.connection.play(ytdl(music.url, {filter: "audioonly", quality: "highest"}))
            .on('end', () => {
                queue.queue.shift();
                setTimeout(() => {
                    func(client, guild, queue.queue[0]);
                }, 250);
            })
            .on('error', err => console.error(err));
        dispatcher.setVolumeLogarithmic(queue.volume / 100);

    }


module.exports = func
