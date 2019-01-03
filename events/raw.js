const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd'
};
module.exports = async (client, event) => {
  if (!events.hasOwnProperty(event.t)) return;
  const { d: data } = event;
const user = client.users.get(data.user_id);
const channel = client.channels.get(data.channel_id)
if (channel.messages.has(data.message_id)) return;

const message = await channel.fetchMessages(data.message_id);
  const emojiKey = data.emoji.name && data.emoji.id ? data.emoji.id : data.emoji.name
  const reaction = message.reactions.find(r => r.emoji.name === emojiKey);
  
  client.emit(events[event.t], reaction, user);
}
