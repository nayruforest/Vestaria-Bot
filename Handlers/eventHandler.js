// /Handlers/eventHandler.js
module.exports = (client) => {
  client.on('ready', () => {
    client.user.setActivity('your reports.', { type: 'WATCHING' }); // set bot's activity status
    client.user.setStatus('idle'); // set bot's status to idle
    console.log(`Logged in as ${client.user.tag}!`); // log a message when the bot is ready
  });
};
