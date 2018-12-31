module.exports = (client, member) => {
    client.requests.ensure(member.user.id, {
     requests: {},
      amount: 0,
      time: null,
      used: null
    })
}