const handleVideo = async (client, video, message, vc, playlist = false) => {
        let queue = client.queue.get(message.guild.id);
        let music = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
  let play = require('./play.js')

        if (!queue) {
            let queueConstruct = {
                textChannel: message.channel,
                voiceChannel: vc,
                connection: null,
                queue: [],
                volume: 50,
                playing: true
            };
  

            client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.queue.push(music);
           message.channel.send(`🎵 **${music.title}** is now playing`);

            try {
                var connection = await vc.join();
                queueConstruct.connection = connection;
                play(client, message.guild, queueConstruct.queue[0]);
            } catch (err) {
                client.queue.delete(message.guild.id);
                console.error(`I could not join your voice channel: ${err}`);
            }
        } else {
            queue.queue.push(music);
            if (playlist) return;
            else return message.channel.send(`🎵 **${music.title}** has been added to queue`);
        }
        return;

}

module.exports = handleVideo
